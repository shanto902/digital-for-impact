"use client";
import React from "react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";
import { Button } from "../buttons/Button";
import { ImageCarousel } from "../carousel/ImageCarousel";
import {
  aboutButtonText,
  aboutImages,
  aboutShuffleWords,
  aboutTitle,
} from "@/data";
import { aboutDescriptionHtml } from "@/data";
import parse from "html-react-parser";
const About = () => {
  return (
    <div id="about" className=" min-h-screen max-w-7xl mx-auto px-5">
      <div className="grid gap-8 md:gap-10 md:grid-cols-2 mt-10">
        <div className="md:sticky relative md:top-35 md:h-[calc(100vh-5rem)] rounded-2xl overflow-hidden">
          <ImageCarousel images={aboutImages} />
        </div>

        <div className="relative">
          <div className=" bg-background backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm ">
            <motion.div
              className=" pb-2 flex flex-col items-center justify-start gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <LayoutTextFlip text={aboutTitle} words={aboutShuffleWords} />
            </motion.div>
          </div>
          {/* sticky content */}
          <div className="pt-4">
            <article className="text-left md:text-justify text-lg leading-normal text-neutral-700 dark:text-neutral-300 space-y-5">
              {parse(aboutDescriptionHtml)}
              <Button
                className="mx-auto hover:bg-foreground hover:text-background border bg-background text-foreground text-lg mt-4"
                href="#contact"
                variant="primary"
              >
                {aboutButtonText}
              </Button>
            </article>
            <div className="hidden md:block bg-gradient-to-b from-transparent via-background to-background h-[15vh] sticky w-full bottom-0 z-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
