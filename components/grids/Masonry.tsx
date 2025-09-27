import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function useMedia(
  queries: string[],
  values: number[],
  defaultValue: number
): number {
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
    setValue(match());
    return () =>
      mediaList.forEach((m) => m.removeEventListener("change", handler));
  }, [queries, values]);

  return value;
}

interface Item {
  id: string;
  img: string;
  url?: string;
}

interface MasonryProps {
  items: Item[];
  gap?: number; // px
  itemDelayMs?: number; // stagger gap per item
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  gap = 16,
  itemDelayMs = 60,
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1100px)",
      "(min-width:800px)",
      "(min-width:500px)",
    ],
    [5, 4, 3, 2],
    1
  );

  // Stagger entrance trigger
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    // small RAF so DOM paints before transitions fire
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [items]);

  // Modal
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [modalShown, setModalShown] = useState(false); // for animating in/out

  useEffect(() => setMounted(true), []);

  const open = (index: number) => {
    setActiveIndex(index);
    // allow portal to mount, then animate
    setTimeout(() => setModalShown(true), 0);
  };

  const close = () => {
    // animate out then unmount
    setModalShown(false);
    setTimeout(() => setActiveIndex(null), 180);
  };

  // Lock scroll + Esc to close
  useEffect(() => {
    if (activeIndex === null) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex]);

  const gridStyle = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gap: `${gap}px`,
    }),
    [columns, gap]
  );

  return (
    <>
      {/* tiny CSS for stagger & modal transitions */}
      <style>{`
        .stagger-item {
          opacity: 0;
          transform: translateY(8px) scale(0.995);
        }
        .entered .stagger-item {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: opacity 220ms ease, transform 220ms ease;
        }
        .modal-backdrop {
          opacity: 0;
          transition: opacity 180ms ease;
        }
        .modal-backdrop.shown {
          opacity: 1;
        }
        .modal-card {
          opacity: 0;
          transform: translateY(8px) scale(0.98);
          transition: opacity 180ms ease, transform 180ms ease;
        }
        .modal-card.shown {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>

      {/* Grid */}
      <div style={gridStyle} className={entered ? "entered" : ""}>
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => open(idx)}
            className="group relative rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 stagger-item"
            style={{
              aspectRatio: "1 / 1",
              // stagger delay per item
              transitionDelay: entered ? `${idx * itemDelayMs}ms` : "0ms",
            }}
            aria-label="Open image"
          >
            <img
              src={item.img}
              alt=""
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              draggable={false}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Modal */}
      {mounted &&
        activeIndex !== null &&
        createPortal(
          <div
            className={`fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 modal-backdrop ${
              modalShown ? "shown" : ""
            }`}
            role="dialog"
            aria-modal="true"
            onClick={close}
          >
            <div
              className={`relative modal-card ${modalShown ? "shown" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute -top-4 -right-4 md:-top-5 md:-right-5 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/95 text-black hover:bg-white grid place-items-center shadow-lg border border-black/10"
              >
                ✕
              </button>

              {/* Full image: keep entire photo visible */}
              <img
                src={items[activeIndex].img}
                alt=""
                className="h-[80vh] rounded-3xl w-auto max-w-[98vw] object-contain select-none"
                draggable={false}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Masonry;
