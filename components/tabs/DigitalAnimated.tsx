"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import Image from "next/image";
import { TVideoItem } from "@/types";

interface VideoCardProps {
  video: TVideoItem;
  generatedPoster?: string;
  onClick: (v: TVideoItem) => void;
}

const VideoCard = memo(({ video, generatedPoster, onClick }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const posterSrc =  generatedPoster;

  return (
    <button
      onClick={() => onClick(video)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="video-card group relative overflow-hidden rounded-2xl hover:shadow-lg transition-all duration-300 will-change-transform focus:outline-none focus:ring-2 focus:ring-black/30 w-full bg-neutral-200 dark:bg-neutral-800"
    >
      <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center">
        {/* Static Poster */}
        {posterSrc ? (
          <Image
            src={posterSrc}
            alt={video.title || "Video thumbnail"}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 20vw, 16vw"
            unoptimized={!!generatedPoster}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
             <svg className="w-8 h-8 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        )}

        {/* Video Player (Only on Hover) */}
        {isHovered && (
          <video
            src={video.src}
            className="absolute inset-0 h-full w-full object-cover z-10"
            playsInline
            muted
            autoPlay
            loop
          />
        )}

        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70 z-20" />
      </div>
    </button>
  );
});

VideoCard.displayName = "VideoCard";

const DigitalAnimated: React.FC<{ videos: TVideoItem[] }> = ({ videos }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<TVideoItem | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  // No need for complex fetching useEffect anymore. 
  // We construct the URL directly in the render or via a helper.
  
  // GSAP Animation
  useEffect(() => {
    if (!containerRef.current) return;
    // Select only video cards roughly
    const cards = containerRef.current.querySelectorAll(".video-card");
    if (cards.length === 0) return;
    
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        clearProps: "all",
      }
    );
  }, [videos]); // Removed autoPosters dependency to prevent re-animating on every poster load

  const openModal = (item: TVideoItem) => setActive(item);

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

  // Modal Animation & Keyboard
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
          className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5"
        >
          {videos.map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              generatedPoster={
                  v.poster || `/api/poster?videoSrc=${encodeURIComponent(v.src)}`
              }
              onClick={openModal}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      {mounted &&
        active &&
        createPortal(
          <div
            ref={backdropRef}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={closeModal}
          >
            <div
              ref={cardRef}
              className="relative w-full max-w-5xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-8 h-8 md:w-10 md:h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="rounded-2xl shadow-2xl overflow-hidden bg-neutral-950 w-auto max-h-[85vh]">
                <video
                  src={active.src}
                  poster={active.poster || `/api/poster?videoSrc=${encodeURIComponent(active.src)}`}
                  className="w-full h-full max-h-[85vh] object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              </div>

              {active.title && (
                <div className="absolute -bottom-10 left-0 text-white/90">
                  <p className="text-lg font-medium">{active.title}</p>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default DigitalAnimated;
