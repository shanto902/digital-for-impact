import React from "react";
import Grids from "../grids/grids";
import { TActivationsTab } from "@/types";

const ActivationsEvents = ({ items }: { items: TActivationsTab[] }) => {
  return <Grids items={items} />;
};

export default ActivationsEvents;
