"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  JSX,
  useCallback,
} from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  autoPlay?: boolean;
  interval?: number; // ms
  pauseOnHover?: boolean;
}

type Card = { src: string };

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const Carousel = ({
  items,
  initialScroll = 0,
  autoPlay = true,
  interval = 3500,
  pauseOnHover = true,
}: CarouselProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const stepRef = useRef<number>(300); // will be measured
  const rAF = useRef<number | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Measure step size from first card (width + gap)
  const measureStep = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    // card wrappers are motion.div children
    const firstCard = rail.querySelector<HTMLElement>("[data-card-wrapper]");
    if (!firstCard) return;

    // gap is set via Tailwind (gap-4). We can compute using offset + margin-right.
    const style = window.getComputedStyle(firstCard);
    const marginRight = parseFloat(style.marginRight || "0");
    stepRef.current = Math.round(firstCard.offsetWidth + marginRight);
  }, []);

  const updateArrows = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    // rAF throttle
    if (rAF.current) cancelAnimationFrame(rAF.current);
    rAF.current = requestAnimationFrame(() => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      // best-effort index
      const step = stepRef.current || 1;
      setCurrentIndex(Math.round(scrollLeft / step));
    });
  }, []);

  // Initial scroll & observers
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollLeft = initialScroll;

    // Keep arrows/step up to date
    const resizeObs = new ResizeObserver(() => {
      measureStep();
      updateArrows();
    });
    resizeObs.observe(el);
    if (railRef.current) resizeObs.observe(railRef.current);

    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });

    // Measure once after mount
    measureStep();
    updateArrows();

    return () => {
      el.removeEventListener("scroll", onScroll);
      resizeObs.disconnect();
      if (rAF.current) cancelAnimationFrame(rAF.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialScroll, measureStep, updateArrows]);

  // Auto play
  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const playNext = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const step = stepRef.current || 300;
    const max = el.scrollWidth - el.clientWidth;

    // If at (or near) end, wrap to 0
    if (el.scrollLeft >= max - 4) {
      el.scrollTo({
        left: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      return;
    }
    el.scrollBy({
      left: step,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  const schedule = useCallback(() => {
    if (!autoPlay || paused || prefersReducedMotion()) return;
    clearTimer();
    timer.current = setTimeout(() => {
      playNext();
      schedule();
    }, Math.max(1500, interval));
  }, [autoPlay, interval, paused, playNext]);

  useEffect(() => {
    schedule();
    return clearTimer;
  }, [schedule]);

  // Pause on visibility change
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Controls
  const scrollLeft = () => {
    const el = viewportRef.current;
    if (!el) return;
    const step = stepRef.current || 300;
    el.scrollBy({
      left: -step,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const scrollRight = () => {
    const el = viewportRef.current;
    if (!el) return;
    const step = stepRef.current || 300;
    el.scrollBy({
      left: step,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  // Pause/resume on hover or user interaction
  const onPointerDown = () => setPaused(true);
  const onPointerUp = () => setPaused(false);

  return (
    <CarouselContext.Provider
      value={{
        onCardClose: (index) => {
          const el = viewportRef.current;
          if (!el) return;
          const step = stepRef.current || 300;
          el.scrollTo({
            left: step * (index + 1),
            behavior: prefersReducedMotion() ? "auto" : "smooth",
          });
          setCurrentIndex(index);
        },
        currentIndex,
      }}
    >
      <div
        className="relative w-full"
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => pauseOnHover && setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          ref={viewportRef}
          className={cn(
            "flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] pb-5 snap-x snap-mandatory",
            "no-scrollbar"
          )}
          aria-roledescription="carousel"
          aria-label="image carousel"
        >
          {/* fade edge if you want: kept container for future gradient */}
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l pointer-events-none" />

          <div
            ref={railRef}
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-4xl" // remove to span full width
            )}
          >
            {items.map((item, index) => (
              <motion.div
                data-card-wrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.12 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[10%]  snap-start"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="ml-5 flex justify-start gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center cursor-pointer justify-center rounded-full bg-gray-100 disabled:opacity-50 hover:bg-green-200"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Previous"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-green-200 disabled:opacity-50 cursor-pointer"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Next"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  return (
    <motion.button
      layoutId={layout ? `card-${card.src}` : undefined}
      className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[70vh] md:w-120 dark:bg-neutral-900"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <BlurImage
        src={card.src}
        alt={"about-us"}
        className="absolute inset-0 z-10 object-cover"
      />
    </motion.button>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  sizes = "(min-width: 768px) 384px, 224px", // tweak to your card widths
  ...rest
}: {
  height?: number;
  width?: number;
  src: string;
  className?: string;
  alt?: string;
  sizes?: string;
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  // In case image is already cached when mounted
  React.useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  // Strip props that aren't valid on <img> (e.g., "fill" coming from caller)
  const { fill, ...safeRest } = rest as any;

  return (
    <img
      ref={imgRef}
      className={cn(
        "h-full w-full object-cover transition duration-300",
        loaded ? "blur-0" : "blur-sm",
        className
      )}
      src={src}
      width={width}
      height={height}
      alt={alt ?? "Image"}
      loading="lazy"
      decoding="async"
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)} // fail-safe to remove blur if load fails
      {...safeRest}
    />
  );
};
