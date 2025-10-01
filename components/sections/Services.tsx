"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import { services } from "@/data";
// import { cn } from "@/lib/utils"; // optional if you prefer class merging

export function Services() {
  return (
    <section className="mb-10">
      <h2 className="text-4xl font-bold text-center mt-8 mb-14">
        Our Services
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl px-5 mx-auto w-full">
        {services.map(
          ({
            id,
            title,
            description,
            image,
            gradient,
            gridSpan,
            minHeight,
            imageClass,
          }) => (
            <WobbleCard
              key={id}
              containerClassName={[
                gridSpan ?? "col-span-1",
                "h-full",
                gradient ?? "bg-gradient-to-r from-neutral-800 to-neutral-700",
                minHeight ?? "min-h-[300px]",
              ].join(" ")} // replace with cn(...) if you use it
            >
              <div className="max-w-sm md:max-w-lg">
                <h3 className="text-left max-w-[26rem] text-balance text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  {title}
                </h3>
                <p className="mt-4 max-w-[26rem] text-left text-lg text-neutral-200">
                  {description}
                </p>
              </div>

              {image && (
                <img
                  src={image}
                  width={500}
                  height={500}
                  alt={title}
                  className={
                    imageClass ??
                    "absolute -right-4 -bottom-4 object-contain rounded-2xl"
                  }
                />
              )}
            </WobbleCard>
          )
        )}
      </div>
    </section>
  );
}
