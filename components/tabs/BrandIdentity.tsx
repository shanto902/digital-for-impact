"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

type BrandItem = {
  id: string;
  src: string; // image path
  href: string; // link
  title?: string;
};

// In the future you can replace this with API data
export const images: BrandItem[] = [
  {
    id: "bi-01",
    src: "/images/bi-01.png",
    href: "https://www.gameof11.com/",
    title: "Game of 11",
  },
  {
    id: "bi-02",
    src: "/images/bi-02.png",
    href: "https://www.facebook.com/MooliciousBD/",
    title: "Moolicious",
  },
  {
    id: "bi-03",
    src: "/images/bi-03.png",
    href: "https://www.facebook.com/CThreeSixty/",
    title: "CThreeSixty",
  },
  {
    id: "bi-04",
    src: "/images/bi-04.png",
    href: "https://www.facebook.com/gofood.live/",
    title: "GoFood",
  },
  {
    id: "bi-05",
    src: "/images/bi-05.png",
    href: "https://nsusn.framer.ai/",
    title: "NSU Startup Next",
  },
  {
    id: "bi-06",
    src: "/images/bi-06.png",
    href: "https://firsttrip.com/",
    title: "FirstTrip",
  },
  {
    id: "bi-07",
    src: "/images/bi-07.png",
    href: "https://example.com/brand-7",
    title: "Lotus",
  },
  {
    id: "bi-08",
    src: "/images/bi-08.png",
    href: "https://marveloftomorrow.xyz/",
    title: "Marvel of Tomorrow",
  },
  {
    id: "bi-09",
    src: "/images/bi-09.png",
    href: "https://fbcci.org/",
    title: "FBCCI",
  },
  {
    id: "bi-10",
    src: "/images/bi-10.png",
    href: "https://www.programming-hero.com/",
    title: "Programming Hero",
  },
];

const BrandIdentity: React.FC<{ items?: BrandItem[] }> = ({
  items = images,
}) => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const nodes = Array.from(gridRef.current.querySelectorAll(".brand-icon"));
    gsap.from(nodes, {
      opacity: 0,
      y: 16,
      duration: 0.55,
      ease: "power3.out",
      stagger: 0.06,
      clearProps: "all",
    });
  }, [items]);

  return (
    <section className="w-full ">
      <div
        ref={gridRef}
        className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 sm:gap-6"
      >
        {items.map((b) => (
          <a
            key={b.id}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-icon group rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900/70 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/30 dark:focus:ring-white/30"
            title={b.title}
          >
            <div className="aspect-square p-5 flex items-center justify-center">
              <img
                src={b.src}
                alt={b.title ?? b.id}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BrandIdentity;
