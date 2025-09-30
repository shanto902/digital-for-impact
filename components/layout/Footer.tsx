"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";

type Logo = {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
};

type Props = {
  brandName?: string;
  tagline?: string;
  linkedinUrl?: string; // e.g. "https://www.linkedin.com/company/digital-for-impact/"
  affiliated?: Logo[]; // three logos recommended
};

export default function Footer({
  brandName = "Digital For Impact",
  tagline = "Building meaningful products that move the needle.",
  linkedinUrl = "https://www.linkedin.com/search/results/companies/?keywords=Digital%20For%20Impact",
  affiliated = [
    { src: "/logos/1.png", alt: "Alpha Labs", href: "#" },
    { src: "/logos/2.png", alt: "Beta Ventures", href: "#" },
    { src: "/logos/3.png", alt: "Gamma Studio", href: "#" },
  ],
}: Props) {
  return (
    <footer className="relative mt-20 bg-white dark:bg-neutral-950 border-t border-neutral-200/70 dark:border-white/10 transition-colors">
      {/* soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[36rem] rounded-full blur-3xl
                   bg-gradient-to-r from-[#c0ff72]/20 via-[#c0ff72]/20 to-[#c0ff72]/20 dark:from-[#c0ff72]/10 dark:via-[#c0ff72]/10 dark:to-[#c0ff72]/10"
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-14">
        {/* center brand block */}
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            {brandName}
          </h3>
          <p className="mt-3 text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            {tagline}
          </p>

          {/* Primary CTA: Connect on LinkedIn */}
          <div className="mt-7">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium
                         bg-neutral-900 text-white dark:bg-white dark:text-neutral-900
                         ring-1 ring-black/10 dark:ring-white/10
                         hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#c0ff72]/50
                         transition-all"
            >
              <Linkedin className="size-4" />
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Affiliated companies */}
        {affiliated?.length > 0 && (
          <div className="mt-12">
            <div className="text-center">
              <p className="text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
                Affiliated companies
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6 items-center max-w-3xl mx-auto">
              {affiliated.slice(0, 3).map((logo, i) => {
                const img = (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width ?? 140}
                    height={80}
                    className="h-10 md:h-20 w-auto mx-auto opacity-80 grayscale contrast-75
                               hover:opacity-100 hover:grayscale-0 hover:contrast-100
                               transition-all duration-300"
                    priority={i === 0}
                  />
                );

                return (
                  <div
                    key={logo.src + i}
                    className="flex items-center justify-center"
                    title={logo.alt}
                  >
                    {logo.href ? (
                      <a
                        href={logo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c0ff72]/60 rounded-md"
                        aria-label={logo.alt}
                      >
                        {img}
                      </a>
                    ) : (
                      img
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* subtle divider */}
        <div className="mt-10 border-t border-neutral-200/70 dark:border-white/10 pt-6 text-center">
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} {brandName}.{" "}
            <span className="text-[#c0ff72]">Impact over noise.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
