"use client";

import React from "react";
import { motion } from "motion/react";
import { services } from "@/data";
import { cn } from "@/lib/utils";
import {
  Megaphone,
  Palette,
  Camera,
  Layout,
  ArrowUpRight,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Megaphone: <Megaphone className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Camera: <Camera className="w-6 h-6" />,
  Layout: <Layout className="w-6 h-6" />,
};

export function Services() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-background" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
         
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-6"
            >
              Services that 
              <span className="text-primary"> Scale Impact</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground opacity-65 text-xl  leading-relaxed"
            >
              We craft digital experiences that don't just look pretty—they 
              perform. Our goal is to make your brand impossible to ignore.
            </motion.p>
        
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-background hover:border-white/10 transition-all duration-500",
                service.gridSpan ?? "md:col-span-12"
              )}
            >
              {/* Image Layer */}
              {service.image && (
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              )}

              {/* Content Layer */}
              <div className="relative z-20 p-8 md:p-12 h-full flex flex-col justify-between min-h-[400px]">
                <div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500"
                    style={{ 
                      backgroundColor: `${service.accentColor}15`,
                      color: service.accentColor,
                      border: `1px solid ${service.accentColor}30`
                    }}
                  >
                    {service.icon && iconMap[service.icon]}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-neutral-foreground text-base md:text-lg max-w-md leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  {/* Subtle Glow Accent */}
                  <div 
                    className="h-1 w-12 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ backgroundColor: service.accentColor }}
                  />
                  
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Hover Overlay Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500"
                style={{ 
                  background: `radial-gradient(circle at 100% 0%, ${service.accentColor}, transparent 50%)`
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
