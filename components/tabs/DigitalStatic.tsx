import React from "react";
import Grids from "../grids/grids";
import { TStaticContent } from "@/types";

const DigitalStatic = ({ items }: { items: TStaticContent[] }) => {
  return <Grids items={items} />;
};
export default DigitalStatic;
