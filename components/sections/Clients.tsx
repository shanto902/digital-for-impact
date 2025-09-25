import React from "react";

import LogoLoop from "../ui/logo-loop";
// Alternative with image sources
const imageLogos = [
  {
    src: "/images/client-01.png",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "/images/client-02.png",
    alt: "Company 2",
    href: "https://company2.com",
  },
  {
    src: "/images/client-03.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-04.png",
    alt: "Company 4",
    href: "https://company4.com",
  },
  {
    src: "/images/client-05.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-06.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-07.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-08.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-09.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-10.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-11.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-12.jpg",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-13.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-14.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
];

const Clients = () => {
  return (
    <section className="mt-20 mb-20  mx-auto  px-4">
      <h2 className="text-4xl font-bold text-center my-8">Our Clients</h2>
      <div
        style={{ height: "200px", position: "relative", overflow: "hidden" }}
      >
        <LogoLoop
          logos={imageLogos}
          speed={120}
          direction="left"
          logoHeight={60}
          gap={100}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
      </div>
    </section>
  );
};

export default Clients;
