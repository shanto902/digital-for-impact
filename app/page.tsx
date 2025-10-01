import About from "@/components/sections/About";
import Clients from "@/components/sections/Clients";
import Collaborate from "@/components/sections/Collaborate";
import Hero from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import { Works } from "@/components/sections/Works";
import { clientCompanies } from "@/data";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Works />
      <Clients clientCompanies={clientCompanies} />
      <Team />
      <Collaborate />
    </>
  );
};

export default page;
