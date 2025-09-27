"use client";

import ActivationsEvents from "../tabs/ActivationsEvents";
import BrandIdentity from "../tabs/BrandIdentity";
import { CaseStudies } from "../tabs/CaseStudies";
import DigitalAnimated from "../tabs/DigitalAnimated";
import DigitalStatic from "../tabs/DigitalStatic";
import WebDevelopment from "../tabs/WebDevelopment";
import { Tabs } from "../ui/tabs";

export function Works() {
  const tabs = [
    {
      title: "Static Content",
      value: "dsc",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br from-green-100 to-green-200">
          <DigitalStatic />
        </div>
      ),
    },
    {
      title: "Dynamic Content",
      value: "dac",
      content: (
        <div className="w-full overflow-scroll relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br from-purple-100 to-violet-200">
          <DigitalAnimated />
        </div>
      ),
    },
    {
      title: "Brand Identity",
      value: "bbi",
      content: (
        <div className="w-full overflow-y-scroll overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br from-purple-100 to-violet-200">
          <BrandIdentity />
        </div>
      ),
    },
    {
      title: "Web Development",
      value: "wtd",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br from-teal-100 to-teal-300">
          <WebDevelopment />
        </div>
      ),
    },
    {
      title: "Activations",
      value: "ae",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br from-yellow-100 to-orange-200">
          <ActivationsEvents />
        </div>
      ),
    },
    {
      title: "Productions",
      value: "productions",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Productions</p>
        </div>
      ),
    },
    {
      title: "Case Studies",
      value: "casestudies",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <CaseStudies />
        </div>
      ),
    },
  ];

  return (
    <section className="mt-20">
      <h2 className="text-4xl font-bold text-center my-8">Our Portfolio</h2>
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start mb-20">
        <Tabs tabs={tabs} />
      </div>
    </section>
  );
}
