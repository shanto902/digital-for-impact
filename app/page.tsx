import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <About />
      <div className="h-screen"></div>
    </>
  );
};

export default page;
