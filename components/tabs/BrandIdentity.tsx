"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { brandImages } from "@/data";
import { TBrandItem } from "@/types";

// In the future you can replace this with API data

const BrandIdentity: React.FC<{ items: TBrandItem[] }> = ({
  items = brandImages,
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
              <div className="relative w-full h-full">
                <Image
                  src={b.src}
                  alt={b.title ?? b.id}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 20vw, 16vw"
                  draggable={false}
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BrandIdentity;
