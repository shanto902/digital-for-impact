"use client";

import {
  activationsData,
  brandImages,
  caseStudiesData,
  dynamicVideos,
  staticContents,
  websitesData,
} from "@/data";
import ActivationsEvents from "../tabs/ActivationsEvents";
import BrandIdentity from "../tabs/BrandIdentity";
import { CaseStudies } from "../tabs/CaseStudies";
import DigitalAnimated from "../tabs/DigitalAnimated";
import DigitalStatic from "../tabs/DigitalStatic";
import WebDevelopment from "../tabs/WebDevelopment";
import { Tabs } from "../ui/tabs";
import { Noise } from "../ui/wobble-card";

export function Works() {
  const tabs = [
    {
      title: "Brand Identity",
      value: "bbi",
      content: (
        <div className="w-full overflow-x-hidden overflow-y-auto relative h-full rounded-2xl p-5 md:p-10 text-xl md:text-4xl font-bold text-black dark:text-white bg-gradient-to-br from-purple-100 to-violet-200 dark:from-purple-700 dark:to-violet-700">
          <Noise />
          <BrandIdentity items={brandImages} />
        </div>
      ),
    },
    {
      title: "Static Content",
      value: "dsc",
      content: (
        <div className="w-full overflow-x-hidden overflow-y-auto relative h-full rounded-2xl p-5 md:p-10 text-xl md:text-4xl font-bold text-black dark:text-white bg-gradient-to-br from-green-100 to-green-200 dark:from-green-700 dark:to-green-700">
          <Noise />
          <DigitalStatic items={staticContents} />
        </div>
      ),
    },
    {
      title: "Dynamic Content",
      value: "dac",
      content: (
        <div className="w-full overflow-x-hidden overflow-y-auto relative h-full rounded-2xl p-5 md:p-10 text-xl md:text-4xl font-bold text-black dark:text-white bg-gradient-to-br from-purple-100 to-violet-200 dark:from-purple-700 dark:to-violet-700">
          <Noise />
          <DigitalAnimated videos={dynamicVideos} />
        </div>
      ),
    },
    {
      title: "Web Development",
      value: "wtd",
      content: (
        <div className="w-full overflow-x-hidden overflow-y-auto relative h-full rounded-2xl p-5 md:p-10 text-xl md:text-4xl font-bold text-black dark:text-white bg-gradient-to-br from-teal-100 to-teal-300 dark:from-teal-700 dark:to-teal-700">
          <Noise />
          <WebDevelopment items={websitesData} />
        </div>
      ),
    },
    {
      title: "Activations",
      value: "ae",
      content: (
        <div className="w-full overflow-x-hidden overflow-y-auto relative h-full rounded-2xl p-5 md:p-10 text-xl md:text-4xl font-bold text-black dark:text-white bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-700 dark:to-orange-700">
          <Noise />
          <ActivationsEvents items={activationsData} />
        </div>
      ),
    },
    // {
    //   title: "Productions",
    //   value: "productions",
    //   content: (
    //     <div className="w-full overflow-x-hidden overflow-y-auto relative h-full rounded-2xl p-5 md:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900 dark:from-purple-800 dark:to-violet-900">
    //       <p>Productions</p>
    //     </div>
    //   ),
    // },
    {
      title: "Case Studies",
      value: "casestudies",
      content: (
        <div className="w-full overflow-x-hidden overflow-y-auto relative h-full rounded-2xl p-5 md:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-700 dark:to-orange-700">
          <Noise />
          <CaseStudies items={caseStudiesData} />
        </div>
      ),
    },
  ];

  return (
    <section id="portfolio" className="mt-20">
      <h2 className="text-4xl font-bold text-center my-8">Our Portfolio</h2>
      <div className="h-screen px-2 md:px-0 md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start mb-20">
        <Tabs tabs={tabs} />
      </div>
    </section>
  );
}
