"use client";

import React from "react";

const LOGOS = [
  { name: "Next.js", url: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
  { name: "React", url: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
  { name: "Tailwind CSS", url: "https://cdn.worldvectorlogo.com/logos/tailwindcss-3.svg" },
  { name: "TypeScript", url: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
  { name: "Node.js", url: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
  { name: "Figma", url: "https://cdn.worldvectorlogo.com/logos/figma-5.svg" },
  { name: "Shopify", url: "https://cdn.worldvectorlogo.com/logos/shopify.svg" },
  { name: "PostgreSQL", url: "https://cdn.worldvectorlogo.com/logos/postgresql.svg" },
];

export function Marquee() {
  const marqueeItems = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div className="relative w-full overflow-hidden bg-white py-10 border-y border-black/5 z-10">
      {/* Side Vignette Fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-[200%] gap-12 sm:gap-20 items-center animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap">
        {marqueeItems.map((logo, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-500 cursor-pointer group"
          >
            <img
              src={logo.url}
              alt={logo.name}
              className="h-7 sm:h-9 w-auto object-contain pointer-events-none select-none grayscale group-hover:grayscale-0 transition-all duration-500"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-xs sm:text-sm font-heading font-bold text-[#111111] group-hover:text-[#E0000B] tracking-widest uppercase transition-colors duration-300">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
