import React from "react";
import BlurText from "../texts/BlurText";
import SkewedVideos from "../grids/SkewedVideos";
import { THomeVideo } from "@/types";
import { heroText, homeVideos } from "@/data";

const Hero = () => {
  return (
    <main id="home" className="min-h-screen  w-full  h-full">
      <div className="absolute inset-0 max-w-[1920px] mx-auto overflow-hidden -z-10">
        <SkewedVideos strips={homeVideos} />
      </div>

      <section className="absolute inset-0 flex items-center justify-center">
        <BlurText
          text={heroText}
          delay={150}
          animateBy="words"
          direction="top"
          className="md:text-7xl  text-4xl  font-extrabold text-[#bffe72] drop-shadow-[0_0_20px_#488202] p-5 md:flex md:justify-center"
        />
      </section>
    </main>
  );
};

export default Hero;
