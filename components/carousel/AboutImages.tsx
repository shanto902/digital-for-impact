"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AboutImages() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white z-20"></div>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    src: "/images/about-1.jpg",
  },
  {
    src: "/images/about-2.jpg",
  },
  {
    src: "/images/about-3.jpg",
  },
  {
    src: "/images/about-4.jpg",
  },
];
