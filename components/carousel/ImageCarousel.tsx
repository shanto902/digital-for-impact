"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { aboutImages } from "@/data";
import { TAboutImage } from "@/types";

export function ImageCarousel({ images }: { images: TAboutImage[] }) {
  const cards = images.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white z-20"></div>
      <Carousel items={cards} />
    </div>
  );
}
