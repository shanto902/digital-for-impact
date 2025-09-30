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
        className={`absolute inset-0 -left-[10%] w-[120%] flex justify-center md:skew-x-[18deg] -skew-y-[18deg] md:-skew-y-0 `}
      >
        <div className="md:grid  h-full w-full flex flex-col md:grid-cols-3">
          {strips.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={s.onClick}
              aria-label={s.label ?? `Video strip ${i + 1}`}
              className="relative block h-screen  overflow-hidden focus:outline-none"
            >
              <div
                className={`relative md:h-full h-[200%] md:w-[150%] md:-ml-[25%] -mt-[25%] md:-mt-0 `}
              >
                <video
                  className="absolute md:-skew-x-[18deg] skew-y-[18deg] md:skew-y-0 inset-0 h-full w-full object-cover"
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
