"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function Services() {
  return (
    <section className="mb-10">
      <h2 className="text-4xl font-bold text-center my-8">Our Services</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        {/* Digital Marketing & Content Creation */}
        <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-gradient-to-r from-green-800 to-green-600 min-h-[500px] lg:min-h-[300px]">
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Digital Marketing & Content Creation
            </h2>
            <p className="mt-4 text-left text-lg text-neutral-200">
              From SEO and paid campaigns to engaging social media and blog
              content—we craft strategies that connect with your audience and
              deliver measurable growth.
            </p>
          </div>
          <img
            src="/images/digital-marketing.webp"
            width={500}
            height={500}
            alt="Digital marketing"
            className="absolute -right-4 lg:-right-[20%] -bottom-2 object-contain rounded-2xl"
          />
        </WobbleCard>

        {/* Branding & Creatives */}
        <WobbleCard containerClassName="col-span-1 bg-gradient-to-r from-purple-700 to-pink-500 min-h-[300px]">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Branding & Creatives
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-lg text-neutral-200">
            Build a powerful identity. We design logos, brand guidelines, and
            visuals that make your brand unforgettable across every channel.
          </p>
        </WobbleCard>

        {/* Production & Photography */}
        <WobbleCard containerClassName="col-span-1  bg-gradient-to-r from-amber-600 to-yellow-500 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Production & Photography
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-lg text-neutral-200">
            Capture your story with professional photography and video
            production. High-quality visuals that inspire, engage, and convert.
          </p>
        </WobbleCard>

        {/* Web Design & Development */}
        <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-gradient-to-r from-cyan-600 to-emerald-500 min-h-[400px] lg:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Web Design & Development
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-lg text-neutral-200">
              Modern, responsive, and user-friendly websites tailored to your
              business needs. From eCommerce to corporate sites—we design for
              performance and impact.
            </p>
          </div>
          <img
            src="/images/web-design.jpg"
            width={500}
            height={500}
            alt="Web Design & Development"
            className="absolute -right-4 md:-right-[20%] -bottom-8 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>
    </section>
  );
}
