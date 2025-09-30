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
  linkedinUrl?: string;
  affiliated?: Logo[];
};

export default function Footer({
  brandName = "Digital For Impact",
  tagline = "Building meaningful products that move the needle.",
  linkedinUrl = "https://www.linkedin.com/company/digitalforimpact/",
  affiliated = [
    {
      src: "/logos/1.png",
      alt: "Alpha Labs",
      href: "https://madmen.online/",
    },
    {
      src: "/logos/2.png",
      alt: "Hypescout Co",
      href: "https://www.hypescout.co/",
    },
    {
      src: "/logos/3.png",
      alt: "Madman Digital",
      href: "https://madmen.online/",
    },
  ],
}: Props) {
  return (
    <footer className="relative mt-20 bg-white dark:bg-neutral-950 border-t border-neutral-200/70 dark:border-white/10 transition-colors">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[36rem] rounded-full blur-3xl
                   bg-gradient-to-r from-[#c0ff72]/20 via-[#c0ff72]/20 to-[#c0ff72]/20 dark:from-[#c0ff72]/10 dark:via-[#c0ff72]/10 dark:to-[#c0ff72]/10"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-14">
        {/* Brand block */}
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            {brandName}
          </h3>
          <p className="mt-3 text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            {tagline}
          </p>

          {/* Contact links */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            <a
              href="tel:+66806320811"
              className="hover:text-[#c0ff72] transition-colors"
            >
              📞 +66806320811
            </a>
            <span className="hidden sm:block text-neutral-400">|</span>
            <a
              href="mailto:connect@digitalforimpact.net"
              className="hover:text-[#c0ff72] transition-colors"
            >
              ✉️ connect@digitalforimpact.net
            </a>
          </div>

          {/* LinkedIn */}
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

        {/* Affiliated logos */}
        {affiliated?.length > 0 && (
          <div className="mt-12">
            <p className="text-xs tracking-widest uppercase text-center text-neutral-500 dark:text-neutral-400">
              Affiliated companies
            </p>
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
                  <div key={logo.src + i} className="flex justify-center">
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

        {/* Divider */}
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
