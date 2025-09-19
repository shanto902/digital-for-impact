"use client";

import React from "react";

type Strip = {
  src: string;
  poster?: string;
  onClick?: () => void;
  label?: string;
};

type Props = {
  strips: [Strip, Strip, Strip];
  angleDeg?: number;
  className?: string;
};

export default function SkewedVideos({
  strips,
  angleDeg = 18,
  className = "",
}: Props) {
  const skewNeg = `skew-y-[-${angleDeg}deg]`;
  const skewPos = `skew-y-[${angleDeg}deg]`;

  return (
    <section
      className={` w-full  bg-black ${className}`}
      aria-label="Diagonal video strips"
    >
      <div className=" absolute inset-0 h-screen bg-gradient-to-b from-white via-transparent to-transparent z-20"></div>

      <div
        className={`absolute inset-0 -left-[10%] w-[120%] flex justify-center skew-x-[18deg] `}
      >
        <div className="grid  h-full w-full grid-cols-3">
          {strips.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={s.onClick}
              aria-label={s.label ?? `Video strip ${i + 1}`}
              className="relative block h-screen  overflow-hidden focus:outline-none"
            >
              <div className={`relative h-full w-[150%] -ml-[25%] ${skewPos}`}>
                <video
                  className="absolute -skew-x-[18deg] inset-0 h-full w-full object-cover"
                  src={s.src}
                  poster={s.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>

              {/* Optional: a subtle divider line on the right edge */}
              {i < 2 && (
                <span className="pointer-events-none absolute right-0 top-0 h-full w-px  bg-white/40" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
