"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TechPhysicsPlayground } from "@/components/home/TechPhysicsPlayground";

export function StudioIntro() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#F8FAFC] border-t border-black/5 overflow-hidden" id="about-intro">

      {/* ───── 1. CENTERED STATEMENT HEADLINE WITH FLOATING IMAGES ───── */}
      <div className="relative max-w-5xl mx-auto mb-20 sm:mb-28 text-center">

        {/* Floating Image Left */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-8, -4, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute -left-16 top-2 w-28 h-28 rounded-2xl overflow-hidden shadow-2xl border-2 border-white pointer-events-none z-10 rotate-[-8deg] bg-[#111111]"
        >
          <Image
            src="/projects/agency.png"
            alt="AKTECH Digital Engineering Team"
            fill
            sizes="120px"
            className="object-cover"
          />
        </motion.div>

        {/* Floating Image Right */}
        <motion.div
          animate={{ y: [8, -8, 8], rotate: [10, 6, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="hidden lg:block absolute -right-12 top-12 w-24 h-24 rounded-2xl overflow-hidden shadow-2xl border-2 border-white pointer-events-none z-10 rotate-[10deg] bg-[#111111]"
        >
          <Image
            src="/projects/school.png"
            alt="AKTECH Web Development Showcase"
            fill
            sizes="100px"
            className="object-cover"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.06] uppercase"
        >
          WE ARE A CREATIVE <br />
          <span className="text-[#111111]">DIGITAL STUDIO</span> <br />
          THAT BUILDS BOLD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
            IDEAS
          </span>
        </motion.h2>

      </div>

      {/* ───── 2. THREE MAIN CARDS GRID ───── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">

        {/* CARD 1 — EXPERIENCE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between group hover:shadow-[0_20px_40px_rgba(224,0,11,0.08)] hover:border-[#E0000B]/30 transition-all duration-500"
        >
          <div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-6xl sm:text-7xl font-heading font-black text-[#111111] tracking-tight">1</span>
              <span className="text-4xl font-black text-[#E0000B]">+</span>
              <span className="text-sm font-bold uppercase tracking-wider text-gray-800 ml-2">Years Of Experience</span>
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Over 1+ years of delivering digital excellence, from high-growth startups to enterprise brands, building solutions that scale and perform.
            </p>
          </div>

          <div className="relative h-52 sm:h-60 rounded-2xl overflow-hidden border border-black/5 mt-4 bg-[#111111]">
            <Image
              src="/projects/agency.png"
              alt="AKTECH Software Engineering Experience"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* CARD 2 — JOURNEY / CREDENTIALS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between group hover:shadow-[0_20px_40px_rgba(224,0,11,0.08)] hover:border-[#E0000B]/30 transition-all duration-500"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#111111]/5 border border-[#111111]/10 text-[10px] font-bold tracking-[0.2em] uppercase text-[#111111] mb-5">
              1+ EXPERIENCE
            </span>

            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#111111] leading-snug mb-6">
              OUR 1+ YEAR JOURNEY REFLECTS PASSION, PERFORMANCE, AND PROGRESS.
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="relative h-28 rounded-xl overflow-hidden border border-black/5 bg-[#111111]">
                <Image
                  src="/projects/school.png"
                  alt="AKTECH Project Delivery"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-28 rounded-xl overflow-hidden border border-black/5 bg-[#111111]">
                <Image
                  src="/projects/resto-crm.png"
                  alt="AKTECH CRM Software"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#111111] text-white p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
            <span className="text-4xl font-heading font-extrabold text-[#E0000B] tracking-tight">98%</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mt-1">CLIENT SATISFACTION</span>
          </div>
        </motion.div>

        {/* CARD 3 — TECHNOLOGIES WE USE WITH INNER PHYSICS PLAYGROUND */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between select-none group hover:shadow-[0_20px_40px_rgba(224,0,11,0.08)] hover:border-[#E0000B]/30 transition-all duration-500"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-4xl sm:text-5xl font-heading font-extrabold text-[#111111]">80+</span>
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mt-1">Technologies We Use</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full">
                Drag Stack ✋
              </span>
            </div>
          </div>

          {/* Interactive Physics Playground Container strictly within Card 3 */}
          <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mt-6">
            <TechPhysicsPlayground />
          </div>
        </motion.div>

      </div>

    </section>
  );
}
