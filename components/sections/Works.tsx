"use client";

import DigitalAnimated from "../tabs/DigitalAnimated";
import DigitalStatic from "../tabs/DigitalStatic";
import { Tabs } from "../ui/tabs";

export function Works() {
  const tabs = [
    {
      title: "Digital Static Content",
      value: "dsc",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br from-green-100 to-green-200">
          <DigitalStatic />
        </div>
      ),
    },
    {
      title: "Digital Animated Content",
      value: "dac",
      content: (
        <div className="w-full overflow-scroll relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br from-purple-100 to-violet-200">
          <DigitalAnimated />
        </div>
      ),
    },
    {
      title: "Building Brand Identity",
      value: "bbi",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Building Brand Identity</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Web Development",
      value: "wtd",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Web & Tech Development</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Activations & Events",
      value: "ae",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Activations & Events</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Productions",
      value: "productions",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Productions</p>
          <DummyContent />
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

const DummyContent = () => {
  return (
    <img
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
