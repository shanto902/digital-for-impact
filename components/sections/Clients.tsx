import React from "react";
import LogoLoop from "../ui/logo-loop";
import { TClient } from "@/types";

const Clients = ({ clientCompanies }: { clientCompanies: TClient[] }) => {
  return (
    <section className="mt-35 mx-auto px-4">
      <h2 className="text-4xl font-bold text-center my-8">
        Industries & Use Cases We Support
      </h2>
      <div
        style={{ height: "150px", position: "relative", overflow: "hidden" }}
      >
        <LogoLoop
          logos={clientCompanies}
          speed={120}
          direction="left"
          logoHeight={60}
          gap={100}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="var(--background)" // ✅ replaced with CSS variable
          ariaLabel="Technology partners"
        />
      </div>
    </section>
  );
};

export default Clients;
