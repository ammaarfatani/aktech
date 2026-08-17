"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";

const SERVICE_TAGS = [
  "Web Development",
  "Mobile Apps",
  "AI Agents",
  "UI/UX Architecture",
  "SaaS & CRM",
];

const STATS = [
  { value: "30", suffix: "+", label: "Projects Launched" },
  { value: "1", suffix: "+", label: "Years Excellence" },
  { value: "20", suffix: "+", label: "Global Clients" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-3 sm:pt-4 pb-6 px-3 sm:px-6 lg:px-8 bg-[#ffffff] overflow-hidden">
      {/* ───── ROUNDED HERO CONTAINER (VIDEO CLIPPED INSIDE ROUNDED CORNERS) ───── */}
      <div className="relative flex-1 w-full max-w-[1440px] mx-auto rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-between">

        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-105"
        >
          <source src="/hero/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Subtle Cinematic Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/75 pointer-events-none" />

        {/* Ambient Subtle Red Accent Glow */}
        <div
          className="absolute inset-0 z-10 opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 20% 30%, rgba(224,0,11,0.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(0,0,0,0.5) 0%, transparent 70%)",
          }}
        />

        {/* ───── HERO CONTENT WRAPPER OVER VIDEO ───── */}
        <div className="relative z-20 w-full px-6 sm:px-10 lg:px-14 pt-28 sm:pt-36 pb-12 flex-1 flex flex-col justify-center my-auto">

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">

            {/* LEFT COLUMN: BADGE, HEADLINE, DESCRIPTION & CTAS */}
            <div className="lg:col-span-7 flex flex-col items-start">

              {/* Location / Brand Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                className="flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-[#E0000B] animate-pulse shadow-[0_0_10px_#E0000B]" />
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white">
                  Karachi, PK | AKTECH DIGITAL SOLUTIONS
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease }}
                className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              >
                Architecting <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#E0000B]">
                  Digital Experiences
                </span>
                <br />
                For Global Brands
              </motion.h1>

              {/* Short Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease }}
                className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl mb-10 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              >
                We combine cinematic visual design, modern AI engineering, and cloud-native architecture to build high-converting platforms that scale effortlessly.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease }}
                className="flex flex-wrap items-center gap-4"
              >
                {/* Primary CTA */}
                <Link
                  href="#contact"
                  className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                  style={{
                    background: "#E0000B",
                    boxShadow: "0 10px 30px rgba(224, 0, 11, 0.45)",
                  }}
                >
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[100%] group-hover:translate-x-[50%] transition-transform duration-[1.2s] ease-in-out" />
                  <span className="relative z-10">Let’s Talk</span>
                  <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/work"
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white bg-black/40 hover:bg-black/60 border border-white/25 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>View Portfolio</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-gray-300 group-hover:text-white" />
                </Link>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: SUPPORTING TEXT, SERVICE PILLS & STATISTICS */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-10 lg:border-l lg:border-white/15 lg:pl-10">

              {/* Supporting Paragraph */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease }}
              >
                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-[#E0000B]">
                  <Sparkles className="w-4 h-4 text-[#E0000B]" />
                  <span>Next-Gen Engineering</span>
                </div>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                  Empowering ambitious startups and enterprises with modern tech stacks, bespoke design systems, and enterprise reliability.
                </p>
              </motion.div>

              {/* Service Pills */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease }}
                className="flex flex-wrap gap-2.5"
              >
                {SERVICE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-100 bg-black/50 border border-white/20 backdrop-blur-md hover:border-[#E0000B] hover:text-white transition-colors cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E0000B]" />
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Key Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease }}
                className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15"
              >
                {STATS.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight flex items-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                      {stat.value}
                      <span className="text-[#E0000B]">{stat.suffix}</span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-gray-300 mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>

            </div>

          </div>

        </div>

        {/* ───── BOTTOM SCROLL STRIP ───── */}
        <div className="relative z-20 w-full px-6 sm:px-10 py-4 border-t border-white/15 bg-black/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
          <div className="flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-[#E0000B] animate-pulse" />
            <span>GLOBAL DELIVERY • PK • UK • UAE</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-gray-300">
            <span>WEB</span>
            <span className="text-[#E0000B]">•</span>
            <span>APP</span>
            <span className="text-[#E0000B]">•</span>
            <span>AI</span>
            <span className="text-[#E0000B]">•</span>
            <span>SEO</span>
            <span className="text-[#E0000B]">•</span>
            <span>DESIGN</span>
          </div>

          <Link
            href="#services"
            className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors cursor-pointer group"
          >
            <span>SCROLL DOWN</span>
            <ArrowDown className="w-4 h-4 text-[#E0000B] animate-bounce" />
          </Link>
        </div>

      </div>
    </section>
  );
}
