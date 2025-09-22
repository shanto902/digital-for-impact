import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Works } from "@/components/sections/Works";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Works />
    </>
  );
};

export default page;
