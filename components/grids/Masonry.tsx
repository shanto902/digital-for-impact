import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

export function useMedia(
  queries: string[],
  values: number[],
  defaultValue: number
): number {
  // Helper: run only in browser
  const match = () =>
    typeof window !== "undefined"
      ? values[queries.findIndex((q) => window.matchMedia(q).matches)] ??
        defaultValue
      : defaultValue;

  const [value, setValue] = useState<number>(match);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = () => setValue(match);

    const mediaList = queries.map((q) => window.matchMedia(q));
    mediaList.forEach((m) => m.addEventListener("change", handler));

    // Initial set
    setValue(match());

    return () =>
      mediaList.forEach((m) => m.removeEventListener("change", handler));
  }, [queries, values]);

  return value;
}
const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  // Modal state
  const [activeItem, setActiveItem] = useState<GridItem | null>(null);
  const [mounted, setMounted] = useState(false); // for portal safety on Next.js
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right"] as const;
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2; // your sizing rule
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  // Modal open/close
  const openModal = (item: GridItem) => setActiveItem(item);

  const closeModal = () => {
    if (!backdropRef.current || !cardRef.current) {
      setActiveItem(null);
      return;
    }
    const tl = gsap.timeline({
      onComplete: () => setActiveItem(null),
    });
    tl.to(
      cardRef.current,
      { y: 20, scale: 0.98, opacity: 0, duration: 0.18, ease: "power2.out" },
      0
    ).to(
      backdropRef.current,
      { opacity: 0, duration: 0.18, ease: "power2.out" },
      0
    );
  };

  // Animate modal in + scroll lock + Esc
  useEffect(() => {
    if (!activeItem) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    if (backdropRef.current && cardRef.current) {
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(cardRef.current, { opacity: 0, y: 20, scale: 0.98 });
      const tl = gsap.timeline();
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      }).to(
        cardRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: "power3.out" },
        "<"
      );
    }

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [activeItem]);

  return (
    <>
      <div ref={containerRef} className="relative w-full min-h-[200px]">
        {grid.map((item) => (
          <div
            key={item.id}
            data-key={item.id}
            className="absolute box-content cursor-pointer"
            style={{ willChange: "transform, width, height, opacity" }}
            onClick={() => openModal(item)}
            onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
          >
            <div
              className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px]"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              {colorShiftOnHover && (
                <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Portal-based modal to avoid parent overflow/stacking issues */}
      {mounted &&
        activeItem &&
        createPortal(
          <div
            ref={backdropRef}
            className="fixed inset-0 z-[99999] bg-white/70 backdrop-blur-[2px] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={closeModal}
          >
            <div
              ref={cardRef}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white text-black hover:bg-black hover:text-white grid place-items-center shadow-lg border border-white/10 cursor-pointer"
              >
                ✕
              </button>

              <div className="overflow-hidden rounded-2xl flex justify-center shadow-2xl bg-white max-h-[85vh]">
                <img
                  src={activeItem.img}
                  alt=""
                  className="block w-auto h-full object-contain select-none"
                  draggable={false}
                />
              </div>

              {/* <div className="mt-3 flex flex-wrap items-center gap-2">
                <a
                  href={activeItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-white text-black hover:bg-neutral-200 transition"
                >
                  Open link in new tab
                </a>
              </div> */}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Masonry;
