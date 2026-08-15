"use client";

import React from "react";
import { Plus } from "lucide-react";

const SERVICES_ROW_1 = [
  "Website Development",
  "Web Applications",
  "Mobile Apps",
  "CRM Systems",
  "ERP Systems",
  "AI Agents",
  "AI Automation",
  "Business Automation",
];

const SERVICES_ROW_2 = [
  "SEO & Growth",
  "UI/UX Design",
  "E-Commerce Platforms",
  "Custom Software",
  "Cloud Solutions",
  "API Architecture",
  "Enterprise Support",
  "WebGL & 3D Web",
];

export function ServicesMarquee() {
  // Duplicate array 3 times for seamless infinite loop
  const row1Items = [...SERVICES_ROW_1, ...SERVICES_ROW_1, ...SERVICES_ROW_1];
  const row2Items = [...SERVICES_ROW_2, ...SERVICES_ROW_2, ...SERVICES_ROW_2];

  return (
    <section className="relative w-full bg-[#111111] py-16 sm:py-24 border-y border-white/10 overflow-hidden select-none z-20">
      
      {/* Background Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(224,0,11,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Side Fade Vignette Masks */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#111111] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#111111] to-transparent z-20 pointer-events-none" />

      <div className="flex flex-col gap-6 sm:gap-10">
        
        {/* ───── ROW 1: RIGHT TO LEFT ───── */}
        <div className="flex w-full overflow-hidden">
          <div className="flex w-max gap-8 sm:gap-12 items-center animate-[marqueeLeft_35s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap py-2">
            {row1Items.map((service, idx) => (
              <div key={idx} className="flex items-center gap-8 sm:gap-12 group cursor-pointer">
                <span className="font-heading font-black text-2xl sm:text-4xl text-white group-hover:text-[#E0000B] tracking-tight uppercase transition-all duration-300 group-hover:scale-105 inline-block drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  {service}
                </span>

                {/* Separator Accent */}
                <div className="flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E0000B] shadow-[0_0_12px_#E0000B] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ───── ROW 2: LEFT TO RIGHT ───── */}
        <div className="flex w-full overflow-hidden">
          <div className="flex w-max gap-8 sm:gap-12 items-center animate-[marqueeRight_40s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap py-2">
            {row2Items.map((service, idx) => (
              <div key={idx} className="flex items-center gap-8 sm:gap-12 group cursor-pointer">
                <span className="font-heading font-black text-2xl sm:text-4xl text-white/90 group-hover:text-[#E0000B] tracking-tight uppercase transition-all duration-300 group-hover:scale-105 inline-block drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  {service}
                </span>

                {/* Separator Plus Icon Accent */}
                <div className="flex items-center justify-center">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#E0000B] group-hover:rotate-90 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
