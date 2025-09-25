import React from "react";
import Masonry from "../grids/Masonry";

const items = [
  {
    id: "1",
    img: "/images/ae-01.jpg",
    url: "https://example.com/one",
    height: 400,
  },

  {
    id: "2",
    img: "/images/ae-02.jpg",
    url: "https://example.com/two",
    height: 400,
  },

  {
    id: "3",
    img: "/images/ae-03.jpg",
    url: "https://example.com/three",
    height: 400,
  },

  {
    id: "4",
    img: "/images/ae-04.jpg",
    url: "https://example.com/four",
    height: 400,
  },
];
const ActivationsEvents = () => {
  return (
    <Masonry
      items={items}
      ease="power3.out"
      duration={0.6}
      stagger={0.05}
      animateFrom="bottom"
      scaleOnHover={true}
      hoverScale={0.95}
      blurToFocus={true}
      colorShiftOnHover={false}
    />
  );
};

export default ActivationsEvents;
