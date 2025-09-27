import React from "react";
import Masonry from "../grids/Masonry";

const items = [
  {
    id: "1",
    img: "/images/dsc-1.png",
    url: "https://example.com/one",
    height: 400,
  },

  {
    id: "2",
    img: "/images/dsc-2.png",
    url: "https://example.com/two",
    height: 250,
  },

  {
    id: "3",
    img: "/images/dsc-3.jpg",
    url: "https://example.com/three",
    height: 500,
  },

  {
    id: "4",
    img: "/images/dsc-4.jpg",
    url: "https://example.com/four",
    height: 650,
  },

  {
    id: "5",
    img: "/images/dsc-5.jpg",
    url: "https://example.com/five",
    height: 500,
  },

  {
    id: "6",
    img: "/images/dsc-6.jpg",
    url: "https://example.com/six",
    height: 540,
  },

  {
    id: "7",
    img: "/images/dsc-7.jpg",
    url: "https://example.com/seven",
    height: 300,
  },
];
const DigitalStatic = () => {
  return <Masonry items={items} />;
};

export default DigitalStatic;
