"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type LogoImage = {
  src: string;
  href?: string;
  alt?: string;
  title?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export interface LogoLoopProps {
  logos: LogoImage[];
  speed?: number; // px/s (positive=left, negative=right overridden by direction)
  direction?: "left" | "right";
  width?: number | string;
  logoHeight?: number; // px
  gap?: number; // px
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;

  /** Pause animation if offscreen (saves battery) */
  suspendWhenHidden?: boolean;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

const toCssLength = (v?: number | string) =>
  typeof v === "number" ? `${v}px` : v ?? undefined;

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

const useResizeObserver = (
  callback: () => void,
  elements: Array<React.RefObject<Element | null>>,
  deps: React.DependencyList
) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
      const handler = () => callback();
      (window as Window).addEventListener("resize", handler);
      callback();
      return () => window.removeEventListener("resize", handler);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const ro = new ResizeObserver(() => callback());
      ro.observe(ref.current);
      return ro;
    });

    callback();

    return () => observers.forEach((o) => o?.disconnect());
  }, deps);
};

const useImageLoader = (
  rootRef: React.RefObject<HTMLElement | null>,
  onLoad: () => void,
  deps: React.DependencyList
) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const images = root.querySelectorAll<HTMLImageElement>("img");
    if (images.length === 0) {
      onLoad();
      return;
    }

    let remaining = images.length;

    const done = () => {
      remaining -= 1;
      if (remaining <= 0) onLoad();
    };

    images.forEach((img) => {
      if (img.complete) {
        // completed (success or error)
        done();
      } else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", done);
        img.removeEventListener("error", done);
      });
    };
  }, deps);
};

const useVisibilityGuards = (
  containerRef: React.RefObject<HTMLElement | null>,
  enabled: boolean
) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== "undefined" ? !document.hidden : true
  );

  useEffect(() => {
    if (!enabled) return;

    // Page Visibility
    const onVis = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    // Intersection
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && containerRef.current) {
      io = new IntersectionObserver(
        (entries) => {
          setIsVisible(entries[0]?.isIntersecting ?? true);
        },
        { root: null, threshold: 0 }
      );
      io.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, [enabled, containerRef]);

  return enabled ? isVisible && isTabVisible : true;
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  isHovered: boolean,
  pauseOnHover: boolean,
  canRun: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    // Ensure we start from a bounded offset
    if (seqWidth > 0) {
      offsetRef.current =
        ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    }

    if (prefersReduced || !canRun) {
      // stop anim & reset timestamp
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    const animate = (t: number) => {
      if (lastTsRef.current == null) lastTsRef.current = t;

      const dt = Math.max(0, t - lastTsRef.current) / 1000;
      lastTsRef.current = t;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;
      const easing = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velRef.current += (target - velRef.current) * easing;

      if (seqWidth > 0) {
        let next = offsetRef.current + velRef.current * dt;
        next = ((next % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = next;
        track.style.transform = `translate3d(${-next}px,0,0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, canRun]);
};

export const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = "Partner logos",
  className,
  style,
  suspendWhenHidden = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState<number>(
    ANIMATION_CONFIG.MIN_COPIES
  );
  const [hovered, setHovered] = useState(false);

  const canRun = useVisibilityGuards(containerRef, suspendWhenHidden);

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dir = direction === "left" ? 1 : -1;
    const sign = speed < 0 ? -1 : 1;
    return mag * dir * sign;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const cont = containerRef.current;
    const seq = seqRef.current;
    if (!cont || !seq) return;
    const containerWidth = cont.clientWidth;
    const sequenceWidth = Math.ceil(seq.getBoundingClientRect().width);

    if (sequenceWidth > 0) {
      setSeqWidth(sequenceWidth);
      const copiesNeeded =
        Math.ceil(containerWidth / sequenceWidth) +
        ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  useResizeObserver(
    updateDimensions,
    [containerRef, seqRef],
    [logos, gap, logoHeight]
  );

  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);

  useAnimationLoop(
    trackRef,
    targetVelocity,
    seqWidth,
    hovered,
    pauseOnHover,
    canRun
  );

  const vars = useMemo(
    () =>
      ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
      } as React.CSSProperties),
    [gap, logoHeight, fadeOutColor]
  );

  const rootClasses = useMemo(
    () =>
      cx(
        "relative overflow-x-hidden group",
        "[--logoloop-gap:32px]",
        "[--logoloop-logoHeight:28px]",
        "[--logoloop-fadeColorAuto:#ffffff] dark:[--logoloop-fadeColorAuto:#0b0b0b]",
        scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]",
        className
      ),
    [scaleOnHover, className]
  );

  const onEnter = useCallback(
    () => pauseOnHover && setHovered(true),
    [pauseOnHover]
  );
  const onLeave = useCallback(
    () => pauseOnHover && setHovered(false),
    [pauseOnHover]
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="flex items-center"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, idx) => {
            const img = (
              <img
                className={cx(
                  "h-[var(--logoloop-logoHeight)] w-auto block object-contain",
                  "[-webkit-user-drag:none] pointer-events-none",
                  "[image-rendering:-webkit-optimize-contrast]",
                  scaleOnHover &&
                    "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120"
                )}
                src={item.src}
                srcSet={item.srcSet}
                sizes={item.sizes}
                width={item.width}
                height={item.height}
                alt={item.alt ?? ""}
                title={item.title}
                loading="lazy"
                decoding="async"
                draggable={false}
                fetchPriority="low"
              />
            );

            const inner = item.href ? (
              <a
                className={cx(
                  "inline-flex items-center no-underline rounded",
                  "transition-opacity duration-200 ease-linear hover:opacity-80",
                  "focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2"
                )}
                href={item.href}
                aria-label={item.alt ?? item.title ?? "logo link"}
                target="_blank"
                rel="noreferrer noopener"
              >
                {img}
              </a>
            ) : (
              img
            );

            return (
              <li
                className={cx(
                  "flex-none mr-[var(--logoloop-gap)] leading-[1]",
                  scaleOnHover && "overflow-visible group/item"
                )}
                key={`${copyIndex}-${idx}`}
                role="listitem"
                style={{ fontSize: `var(--logoloop-logoHeight)` }}
              >
                {inner}
              </li>
            );
          })}
        </ul>
      )),
    [copyCount, logos, scaleOnHover]
  );

  const containerStyle = useMemo(
    (): React.CSSProperties => ({
      width: toCssLength(width) ?? "100%",
      ...vars,
      ...style,
    }),
    [width, vars, style]
  );

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {fadeOut && (
        <>
          <div
            aria-hidden
            className={cx(
              "pointer-events-none absolute inset-y-0 left-0 z-[1]",
              "w-[clamp(24px,8%,120px)]",
              "bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
            )}
          />
          <div
            aria-hidden
            className={cx(
              "pointer-events-none absolute inset-y-0 right-0 z-[1]",
              "w-[clamp(24px,8%,120px)]",
              "bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
            )}
          />
        </>
      )}

      <div
        className={cx(
          "flex w-max will-change-transform select-none",
          "motion-reduce:transform-none"
        )}
        ref={trackRef}
      >
        {logoLists}
      </div>
    </div>
  );
};

export default LogoLoop;
