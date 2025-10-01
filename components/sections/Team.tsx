"use client";
import { teamDescription, teamMembers, teamTitle } from "@/data";
import { Linkedin } from "lucide-react";
import Image from "next/image";

export default function Team() {
  return (
    <section className="relative px-5 md:px-10 mb-20 bg-background transition-colors duration-500">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-center">{teamTitle}</h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {teamDescription}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2  lg:grid-cols-4 md:gap-6 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 hover:bg-[#c0ff72]  bg-background shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image Wrapper */}
              <div className="relative overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={500}
                  height={500}
                  className="h-auto aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* LinkedIn Button */}
                <a
                  href={
                    member.linkedin ||
                    `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(
                      member.name
                    )}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-white/90 dark:bg-black/80 text-green-600 dark:text-green-400 p-2 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={18} />
                </a>
              </div>

              {/* Text Info */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-white/95 via-white/60 to-transparent dark:from-black/80 dark:via-black/20">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
