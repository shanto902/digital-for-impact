"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

type SiteItem = {
  id: string;
  title: string;
  poster: string; // small/regular thumbnail/poster
  longShot: string; // long/tall screenshot shown in popup
  url?: string; // optional live link
};

const demoSites: SiteItem[] = [
  {
    id: "s1",
    title: "Chill Inn Thailand",
    poster: "/images/wd-01.jpg",
    longShot: "/images/wd-01.jpg",
    url: "https://www.chillinnthailand.com/",
  },
  {
    id: "s2",
    title: "Anahata Samui",
    poster: "/images/wd-02.jpg",
    longShot: "/images/wd-02.jpg",
    url: "https://anahatasamui.com/",
  },
  {
    id: "s3",
    title: "Samui Fishing Club",
    poster: "/images/wd-03.jpg",
    longShot: "/images/wd-03.jpg",
    url: "https://samuifishingclubandresort.com/",
  },

  {
    id: "s4",
    title: "The Hive Samui ",
    poster: "/images/wd-04.jpg",
    longShot: "/images/wd-04.jpg",
    url: "https://www.hivehotelsamui.com/",
  },
  {
    id: "s5",
    title: "Uhub - University Hostel",
    poster: "/images/wd-05.jpg",
    longShot: "/images/wd-05.jpg",
    url: "https://uhubchaweng.com/",
  },
  {
    id: "s6",
    title: "Pixel Thailand",
    poster: "/images/wd-06.jpg",
    longShot: "/images/wd-06.jpg",
    url: "https://www.pixelthailand.com/",
  },
  {
    id: "s7",
    title: "Paka Dhaka",
    poster: "/images/wd-07.jpg",
    longShot: "/images/wd-07.jpg",
    url: "https://www.pakadhaka.shop/",
  },
];

const WebDevelopment: React.FC<{ items?: SiteItem[] }> = ({
  items = demoSites,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false); // for portal
  const [active, setActive] = useState<SiteItem | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Stagger in cards
  useEffect(() => {
    if (!containerRef.current) return;
    const cards = Array.from(
      containerRef.current.querySelectorAll(".site-card")
    );
    gsap.from(cards, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
      clearProps: "all",
    });
  }, [items]);

  const openModal = (item: SiteItem) => setActive(item);

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

  // Animate modal in + lock scroll + Esc to close
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
      <section className="w-full">
        <div
          ref={containerRef}
          className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        >
          {items.map((s) => (
            <button
              key={s.id}
              onClick={() => openModal(s)}
              className="site-card group relative overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow hover:shadow-lg transition-transform duration-300 will-change-transform focus:outline-none focus:ring-2 focus:ring-black/30"
            >
              {/* Poster */}
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={s.poster}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] select-none"
                  draggable={false}
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70" />
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <span className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-black/80 text-white text-base font-semibold shadow">
                    View
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-3 sm:p-4">
                <p className="text-sm sm:text-base font-medium">{s.title}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal (shows long screenshot) */}
      {mounted &&
        active &&
        createPortal(
          <div
            ref={backdropRef}
            className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4"
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
                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 h-10 w-10 md:h-12 md:w-12 rounded-full bg-black cursor-pointer text-white grid place-items-center shadow-lg border border-white/10"
              >
                ✕
              </button>

              {/* Scrollable long screenshot area */}
              <div className="rounded-2xl shadow-2xl bg-neutral-950 overflow-auto max-h-[88vh]">
                {/* Keep width responsive; height grows and scrolls */}
                <img
                  src={active.longShot}
                  alt={`${active.title} long screenshot`}
                  className="block w-full h-auto object-contain select-none"
                  draggable={false}
                />
              </div>

              {/* Footer actions */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {active.url && (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-white text-black hover:bg-neutral-200 transition"
                  >
                    Visit live site
                  </a>
                )}
                <span className="text-white/70 text-xs sm:text-sm">
                  {active.title}
                </span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default WebDevelopment;
