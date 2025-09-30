import React from "react";
import Grids from "../grids/grids";

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
  return <Grids items={items} />;
};

export default ActivationsEvents;
