import React from "react";
import BlurText from "../texts/BlurText";
import SkewedVideos from "../grids/SkewedVideos";

const Hero = () => {
  return (
    <main className="min-h-screen  w-full  h-full">
      <div className="absolute inset-0 max-w-[1920px] mx-auto overflow-hidden -z-10">
        <SkewedVideos
          angleDeg={18}
          strips={[
            {
              src: "/videos/Video1.mp4",
              poster: "/images/Video1.jpg",
              label: "Showroom",
            },
            {
              src: "/videos/Video2.mp4",
              poster: "/images/Video2.jpg",
              label: "Products",
            },
            {
              src: "/videos/Video3.mp4",
              poster: "/images/Video3.jpg",
              label: "Installations",
            },
          ]}
        />
      </div>

      <section className="absolute inset-0 flex items-center justify-center">
        <BlurText
          text="Digital Disruption Delivered"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-7xl font-extrabold text-[#BFFE72] drop-shadow-[0_0_20px_#488202] p-5"
        />
      </section>
    </main>
  );
};

export default Hero;
