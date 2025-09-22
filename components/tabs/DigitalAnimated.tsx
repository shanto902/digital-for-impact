"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

type VideoItem = {
  id: string;
  src: string; // video file url
  poster?: string; // optional poster image
  title?: string; // optional label
};

const demoVideos: VideoItem[] = [
  {
    id: "v1",
    src: "/videos/dac-1.mp4",
    poster: "/videos/one.jpg",
  },
  {
    id: "v2",
    src: "/videos/dac-2.mp4",
    poster: "/videos/two.jpg",
  },
  {
    id: "v3",
    src: "/videos/dac-3.mp4",
    poster: "/videos/three.jpg",
  },
  {
    id: "v4",
    src: "/videos/dac-4.mp4",
    poster: "/videos/four.jpg",
  },
  {
    id: "v5",
    src: "/videos/dac-5.mp4",
    poster: "/videos/five.jpg",
  },
  {
    id: "v6",
    src: "/videos/dac-6.mp4",
    poster: "/videos/six.jpg",
  },
  {
    id: "v7",
    src: "/videos/dac-7.mp4",
    poster: "/videos/seven.jpg",
  },
  {
    id: "v8",
    src: "/videos/dac-8.mp4",
    poster: "/videos/eight.jpg",
  },
  {
    id: "v9",
    src: "/videos/dac-9.mp4",
    poster: "/videos/nine.jpg",
  },
  {
    id: "v10",
    src: "/videos/dac-10.mp4",
    poster: "/videos/ten.jpg",
  },
  {
    id: "v11",
    src: "/videos/dac-11.mp4",
    poster: "/videos/eleven.jpg",
  },
];

const capturePoster = (src: string, timeInSeconds = 1): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous"; // keep for remote files (requires CORS)
    video.muted = true; // some browsers require muted to seek/autoplay programmatically
    video.playsInline = true;

    const cleanup = () => {
      video.pause();
      video.src = "";
      video.removeAttribute("src");
      video.load();
    };

    const onError = (e: Event) => {
      cleanup();
      reject(new Error(`Failed to load video for poster: ${src}`));
    };

    const onSeeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas 2D not supported");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        cleanup();
        resolve(dataUrl);
      } catch (err) {
        cleanup();
        reject(err);
      }
    };

    // When metadata is ready we can know dimensions and safely seek
    const onLoadedMeta = () => {
      // clamp seek time if video shorter than requested
      const target = Math.min(timeInSeconds, video.duration || timeInSeconds);
      // iOS sometimes needs a play/pause before seeking
      const trySeek = () => {
        video.currentTime = target > 0 ? target : 0.1;
      };
      try {
        trySeek();
      } catch {
        // fallback: wait a tick
        setTimeout(trySeek, 50);
      }
    };

    video.addEventListener("error", onError, { once: true });
    video.addEventListener("loadedmetadata", onLoadedMeta, { once: true });
    video.addEventListener("seeked", onSeeked, { once: true });
    // Start load
    video.load();
  });
};

const DigitalAnimated: React.FC<{ videos?: VideoItem[] }> = ({
  videos = demoVideos,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false); // for portal safety
  const [active, setActive] = useState<VideoItem | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // auto-generated posters map: id -> dataURL
  const [autoPosters, setAutoPosters] = useState<Record<string, string>>({});

  useEffect(() => setMounted(true), []);

  // Generate posters for items that don't provide a poster
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (const v of videos) {
        if (v.poster || autoPosters[v.id]) continue;
        try {
          const dataUrl = await capturePoster(v.src, 1); // pick frame at 1s
          if (!cancelled) {
            setAutoPosters((m) => ({ ...m, [v.id]: dataUrl }));
          }
        } catch {
          // ignore failures; leave without a poster
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos]);

  // Stagger in on mount/update
  useEffect(() => {
    if (!containerRef.current) return;
    const cards = Array.from(
      containerRef.current.querySelectorAll(".video-card")
    );
    gsap.from(cards, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
      clearProps: "all",
    });
  }, [videos, autoPosters]);

  const openModal = (item: VideoItem) => setActive(item);

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

  const getPoster = (v: VideoItem) => v.poster || autoPosters[v.id] || "";

  return (
    <>
      <section className="w-full ">
        <div
          ref={containerRef}
          className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {videos.map((v) => {
            const poster = getPoster(v);
            return (
              <button
                key={v.id}
                onClick={() => openModal(v)}
                className="video-card group relative overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow hover:shadow-lg transition-transform duration-300 will-change-transform focus:outline-none focus:ring-2 focus:ring-black/30"
              >
                {/* Poster / video preview */}
                <div className="relative aspect-video w-full overflow-hidden">
                  {
                    <video
                      src={v.src}
                      className="h-full w-full object-cover"
                      playsInline
                      muted
                      autoPlay
                      loop
                    />
                  }

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Modal */}
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
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 h-10 w-10 md:h-12 md:w-12 rounded-full bg-black text-white grid place-items-center shadow-lg border border-white/10"
              >
                ✕
              </button>

              {/* Responsive, ratio-friendly box */}
              <div className="rounded-2xl shadow-2xl bg-neutral-950 flex items-center justify-center max-w-[92vw] max-h-[82vh]">
                <video
                  src={active.src}
                  poster={active.poster || autoPosters[active.id]}
                  className="block w-auto h-auto max-w-[92vw] max-h-[82vh] object-contain select-none"
                  controls
                  autoPlay
                  playsInline
                />
              </div>

              {active.title && (
                <div className="mt-3 text-white/90">
                  <p className="text-sm sm:text-base">{active.title}</p>
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
