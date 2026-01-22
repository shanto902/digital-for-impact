'use client'
import { THomeVideo } from "@/types";
import React, { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  strips: THomeVideo[];
  className?: string;
};

export default function SkewedVideos({ strips, className = "" }: Props) {
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false);

  useEffect(() => {
    // Delay video loading to prioritize initial page load (LCP)
    const timer = setTimeout(() => {
      setShouldLoadVideos(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={` w-full bg-background ${className}`}
      aria-label="Diagonal video strips"
    >
      <div className="absolute inset-0 h-screen bg-gradient-to-b from-background via-transparent to-transparent z-20 pointer-events-none" />

      <div
        className="absolute inset-0 -left-[10%] w-[120%] flex justify-center md:skew-x-[18deg] -skew-y-[18deg] md:-skew-y-0"
      >
        <div className="md:grid h-full w-full flex flex-col md:grid-cols-3">
          {strips.map((s, i) => (
            <div
              key={i}
              className="relative block h-screen overflow-hidden"
            >
              <div
                className="relative h-full w-full"
              >
                {/* 
                   Un-skew Wrapper: We un-skew this container instead of individual tags.
                   We use w-[180%] and -ml-[40%] to ensure the diagonal strips are filled 
                   completely even on ultra-wide monitors.
                */}
                <div className="absolute inset-0 md:h-full h-[200%] md:w-[200%] md:-ml-[50%] -mt-[25%] md:-mt-0 md:-skew-x-[18deg] skew-y-[18deg] md:skew-y-0">
                  {/* Poster Image */}
                  {s.poster && (
                    <Image
                      src={s.poster}
                      alt={s.label || "Video placeholder"}
                      fill
                      priority
                      className="absolute inset-0 h-full w-full object-cover z-0"
                    />
                  )}

                  {/* Video - Fades in over the poster */}
                  {shouldLoadVideos && (
                    <video
                      className="absolute inset-0 h-full w-full object-cover z-10 animate-in fade-in duration-1000 ease-in-out"
                      src={s.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )}
                </div>
              </div>

              {/* Subtle divider line */}
              {i < 2 && (
                <span className="pointer-events-none absolute right-0 top-0 h-full w-px bg-white/40 z-30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
