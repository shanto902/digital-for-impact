"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

/** TYPES */
type CaseItem = {
  title: string;
  src: string; // poster/thumbnail
  content?: ReactNode; // JSX content shown in modal
};

/** DUMMY CONTENT (unchanged) */
const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="mb-4 rounded-3xl bg-[#F5F5F7] p-8 dark:bg-neutral-800 md:p-14"
          >
            <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height={500}
              width={500}
              className="mx-auto h-full w-full object-contain md:h-1/2 md:w-1/2"
            />
          </div>
        );
      })}
    </>
  );
};

/** YOUR DATA (unchanged) */
const data: CaseItem[] = [
  {
    title: "Thik Fast & Think Digital First",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    title: "Enhance your productivity.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    title: "Launching the new Apple Vision Pro.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    title: "Maps for your iPhone 15 Pro Max.",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    title: "Photography just got better.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    title: "Hiring for a Staff Software Engineer",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
];

/** SIMPLE GRID + MODAL (same method as WebDevelopment) */
export function CaseStudies({ items = data }: { items?: CaseItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<CaseItem | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Stagger in cards (light GSAP, same as WebDevelopment)
  useEffect(() => {
    if (!containerRef.current) return;
    const cards = Array.from(containerRef.current.querySelectorAll(".cs-card"));
    gsap.from(cards, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
      clearProps: "all",
    });
  }, [items]);

  const openModal = (item: CaseItem) => setActive(item);

  const closeModal = () => {
    if (!backdropRef.current || !cardRef.current) {
      setActive(null);
      return;
    }
    const tl = gsap.timeline({ onComplete: () => setActive(null) });
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

  // Modal in + lock scroll + ESC to close
  useEffect(() => {
    if (!active) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    if (backdropRef.current && cardRef.current) {
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(cardRef.current, { opacity: 0, y: 10, scale: 0.94 });
      const tl = gsap.timeline();
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.22,
        ease: "power2.out",
      }).to(
        cardRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" },
        "<"
      );
    }

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <>
      {/* GRID */}
      <section className="w-full">
        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {items.map((s) => (
            <button
              key={s.title + s.src}
              onClick={() => openModal(s)}
              className="cs-card group relative overflow-hidden rounded-2xl border border-black/5 bg-black/5 shadow transition-transform duration-300 will-change-transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black/30 dark:border-white/10 dark:bg-white/5"
            >
              {/* Poster */}
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={s.src}
                  alt={s.title}
                  className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  draggable={false}
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70" />
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-base font-semibold text-white shadow">
                    View
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-3 sm:p-4">
                <p className="mt-1 text-sm font-semibold sm:text-base">
                  {s.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* MODAL (renders JSX content like WebDevelopment does) */}
      {mounted &&
        active &&
        createPortal(
          <div
            ref={backdropRef}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]"
            role="dialog"
            aria-modal="true"
            onClick={closeModal}
          >
            <div
              ref={cardRef}
              className="relative w-full max-w-[1000px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute -right-3 -top-3 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-black text-white shadow-lg md:-right-4 md:-top-4 md:h-12 md:w-12"
              >
                ✕
              </button>

              {/* Scrollable content area (renders JSX) */}
              <div className="max-h-[88vh] overflow-auto rounded-2xl bg-white shadow-2xl dark:bg-neutral-950">
                {active.content ? (
                  <div className="w-full">{active.content}</div>
                ) : (
                  <div className="p-8 text-center text-neutral-500">
                    No content provided.
                  </div>
                )}
              </div>

              {/* Footer (optional) */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-white/70 sm:text-sm">
                  {active.title}
                </span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default CaseStudies;
