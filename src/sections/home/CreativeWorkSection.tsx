"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

type WorkCardItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  aspectRatio: string;
};

// 19 Unique Project Visuals distributed into 3 distinct rows
const ROW_1: WorkCardItem[] = [
  { id: "1", title: "International School", category: "WEB", image: "/projects/school.png", aspectRatio: "w-[380px] sm:w-[460px] h-[240px] sm:h-[290px]" },
  { id: "2", title: "Custom E-Commerce", category: "E-COMMERCE", image: "/projects/onlineShop.png", aspectRatio: "w-[320px] sm:w-[380px] h-[240px] sm:h-[290px]" },
  { id: "3", title: "LYBA Apparel", category: "FASHION", image: "/projects/laiba.png", aspectRatio: "w-[360px] sm:w-[420px] h-[240px] sm:h-[290px]" },
  { id: "4", title: "Elite Gym", category: "FITNESS", image: "/projects/gym.png", aspectRatio: "w-[300px] sm:w-[360px] h-[240px] sm:h-[290px]" },
  { id: "5", title: "WEBCLONERS Agency", category: "AGENCY", image: "/projects/agency.png", aspectRatio: "w-[400px] sm:w-[480px] h-[240px] sm:h-[290px]" },
  { id: "6", title: "Fashion Diva", category: "E-COMMERCE", image: "/projects/fashion diva.png", aspectRatio: "w-[340px] sm:w-[400px] h-[240px] sm:h-[290px]" },
];

const ROW_2: WorkCardItem[] = [
  { id: "7", title: "Restro POS & ERP", category: "ERP / POS", image: "/projects/resto-crm.png", aspectRatio: "w-[420px] sm:w-[500px] h-[240px] sm:h-[290px]" },
  { id: "8", title: "House of Wasila", category: "MEDIA", image: "/projects/houseofwasila.png", aspectRatio: "w-[340px] sm:w-[400px] h-[240px] sm:h-[290px]" },
  { id: "9", title: "Retail Inventory CRM", category: "CRM", image: "/projects/inventory-crm .png", aspectRatio: "w-[380px] sm:w-[440px] h-[240px] sm:h-[290px]" },
  { id: "10", title: "Bawarchi Restaurant", category: "FOOD", image: "/projects/bawarchi.png", aspectRatio: "w-[320px] sm:w-[380px] h-[240px] sm:h-[290px]" },
  { id: "11", title: "Perfumes Luxury", category: "E-COMMERCE", image: "/projects/perfumes.png", aspectRatio: "w-[360px] sm:w-[420px] h-[240px] sm:h-[290px]" },
  { id: "12", title: "SH Hoorain", category: "FASHION", image: "/projects/syed.png", aspectRatio: "w-[300px] sm:w-[360px] h-[240px] sm:h-[290px]" },
];

const ROW_3: WorkCardItem[] = [
  { id: "13", title: "House of Musab", category: "MEDIA", image: "/projects/houseofmusab.png", aspectRatio: "w-[360px] sm:w-[420px] h-[240px] sm:h-[290px]" },
  { id: "14", title: "Lahori Restaurant", category: "RESTAURANT", image: "/projects/lahori.png", aspectRatio: "w-[340px] sm:w-[400px] h-[240px] sm:h-[290px]" },
  { id: "15", title: "Cafe POS", category: "POS", image: "/projects/cafe.png", aspectRatio: "w-[300px] sm:w-[360px] h-[240px] sm:h-[290px]" },
  { id: "16", title: "Zivora Label", category: "E-COMMERCE", image: "/projects/zivora.png", aspectRatio: "w-[380px] sm:w-[440px] h-[240px] sm:h-[290px]" },
  { id: "17", title: "Sized Digital", category: "WEB", image: "/projects/sized.png", aspectRatio: "w-[320px] sm:w-[380px] h-[240px] sm:h-[290px]" },
  { id: "18", title: "Urge Apparel", category: "WEB", image: "/projects/urge.png", aspectRatio: "w-[400px] sm:w-[460px] h-[240px] sm:h-[290px]" },
  { id: "19", title: "Web Agency", category: "AGENCY", image: "/projects/web.png", aspectRatio: "w-[340px] sm:w-[400px] h-[240px] sm:h-[290px]" },
];

function WorkRow({ items, direction, speed }: { items: WorkCardItem[]; direction: "left" | "right"; speed: string }) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden group py-2">
      <div
        className={`flex items-center gap-6 w-max ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: speed }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className={`relative ${item.aspectRatio} shrink-0 rounded-2xl overflow-hidden bg-gray-100 border border-black/10 shadow-sm transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:border-[#E0000B]/40 select-none pointer-events-auto`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="500px"
              className="object-cover object-top"
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-4">
              <span className="text-[10px] font-bold tracking-widest text-[#E0000B] uppercase">
                {item.category}
              </span>
              <h4 className="text-sm font-heading font-extrabold text-white">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CreativeWorkSection() {
  return (
    <section className="relative py-24 sm:py-36 bg-white border-t border-black/5 overflow-hidden" id="works">
      
      {/* ───── CSS KEYFRAMES FOR INFINITE SEAMLESS MARQUEE ───── */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft linear infinite;
          will-change: transform;
        }
        .animate-marquee-right {
          animation: marqueeRight linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* ───── SECTION HEADER ───── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mb-16 sm:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-full w-fit bg-[#111111]/5 border border-[#111111]/10">
              <Sparkles className="w-4 h-4 text-[#E0000B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111]">
                CREATIVE WORK
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05]">
              Work That Speaks <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                For Itself.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="text-gray-600 text-base sm:text-lg max-w-md font-normal leading-relaxed">
              A curated selection of websites, applications, digital products and enterprise platforms we&apos;ve engineered.
            </p>

            {/* ONLY INTERACTIVE NAVIGATION ELEMENT IN THIS SECTION */}
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#E0000B] transition-colors duration-300 shadow-md shrink-0 group"
            >
              <span>View All Work</span>
              <ArrowUpRight className="w-4 h-4 text-[#E0000B] group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* ───── 3-ROW INFINITE MOVING PROJECT WALL (WITH EDGE MASKING) ───── */}
      <div className="relative w-full space-y-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <WorkRow items={ROW_1} direction="left" speed="40s" />
        <WorkRow items={ROW_2} direction="right" speed="50s" />
        <WorkRow items={ROW_3} direction="left" speed="35s" />
      </div>

    </section>
  );
}
