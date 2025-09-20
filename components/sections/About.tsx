"use client";
import React from "react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";
import { AboutImages } from "../carousel/AboutImages";
import { Button } from "../buttons/Button";

const About = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-5">
      <div className="grid gap-8 md:gap-10 md:grid-cols-2 mt-10">
        <div className="md:sticky relative md:top-35 md:h-[calc(100vh-5rem)] rounded-2xl overflow-hidden">
          <AboutImages />
        </div>

        <div className="relative">
          <div className=" bg-white/60 dark:bg-neutral-950/60 backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm ">
            <motion.div
              className=" pb-2 flex flex-col items-center justify-start gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <LayoutTextFlip
                text="Digital for "
                words={[
                  "Impact",
                  "Tourism",
                  "Hospitality",
                  "Food & Beverage",
                  " Social Enterprise",
                  "Activations",
                  "Events",
                  "Technology",
                  "Consumer Goods",
                  "Financial Services",
                  "Retail Services",
                  "Education",
                ]}
              />
            </motion.div>
            {/* optional subtle divider under the sticky header */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
          </div>

          {/* Long content: no inner scroll — uses main page scroll */}
          <div className="pt-4">
            <article className="text-left md:text-justify text-lg leading-normal text-neutral-700 dark:text-neutral-300 space-y-5">
              <p>
                We all know the punchline: "A digital marketing specialist, a
                client services professional, a visual storyteller, and a
                jack-of-all-trades walk into a bar..."
              </p>
              <p>
                Except for us, that wasn't the punchline—it was the beginning of
                our journey. What we thought was going to be just a night out
                turned into a brainstorming session on a better way to do
                digital. We had all seen the same thing: agencies that talked a
                big game but delivered cookie-cutter campaigns, left clients in
                the dark, and treated their work like a checklist instead of a
                craft.
              </p>
              <p>
                So, fueled by mutual respect, shared frustration, and probably a
                few rounds of coffee, we decided to do things differently. We
                pooled our decades of experience, our diverse skill sets, and
                our little black books of contacts to create something more
                agile, more personal, and a lot more effective. That's how
                Digital for Impact was born.
              </p>
              <strong>We're Not a Digital Agency. </strong>
              <p>
                We're a boutique 360° creative and digital service provider that
                specializes in content, strategy, and web development. But what
                does that really mean?
              </p>
              <p>
                It means we don't just "do digital marketing." We get into the
                trenches with you, dig deep into your business goals, and figure
                out the smartest, most creative ways to get you where you need
                to be. We're the problem-solvers who see a challenge and get
                genuinely excited about finding a clever solution.
              </p>
              <p>
                Tired of working with agencies that feel like black boxes? We
                get it. We pride ourselves on being completely transparent and
                making sure you're in the loop every step of the way. We're a
                team that truly gets behind your vision because your win is our
                win.
              </p>
              <p>
                We’ve seen what works and what’s just a waste of time and money,
                and we’re here to help you skip the latter. We build impactful
                strategies, craft compelling visuals, and develop websites that
                don't just look pretty but actually perform.
              </p>
              <strong>
                What Makes Us Different? (Besides Our Sense of Humor)
              </strong>
              <p>
                {" "}
                <em>A Brain Trust, Not a Bureaucracy: </em> We’re a lean, mean,
                results-driven machine. You don't get handed off to a junior
                team. You work directly with the experts who have the skills and
                experience to get the job done right.
              </p>
              <p>
                <em>APAC Expertise, Global Standards:</em> We're registered in
                the US, based right here in Bangladesh, but our work has helped
                clients across the entire APAC region. We combine our deep
                regional market knowledge with world-class digital standards to
                deliver work that drives real growth and makes an impact.
              </p>
              <p>
                <em>No-Nonsense Pricing: </em> We believe top-tier creative and
                digital services shouldn't break the bank. We offer
                industry-standard quality at rates that are reasonable and
                competitive, so you can focus on your business, not your budget.
              </p>
              <strong>Ready to Tell a Better Story?</strong>
              <p>
                Your business deserves more than just a marketing plan; it
                deserves a partner. If you're looking for a team that's as
                passionate about your success as you are, let's chat.
              </p>
              <Button
                className="mx-auto hover:bg-black hover:text-white text-lg mt-4"
                href="#contact"
                variant="primary"
              >
                Schedule a call with us today!
              </Button>
            </article>
            <div className="bg-gradient-to-b from-transparent via-white to-white h-[15vh] sticky w-full bottom-0 z-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
