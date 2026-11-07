"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Palette,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Layout,
  Layers,
  ArrowRight,
  ChevronRight,
  PenTool,
  Eye,
  Smartphone,
  CheckSquare,
  Compass,
} from "lucide-react";

export default function UIUXDesignServicePage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set video playback rate to 0.6x for smooth cinematic slow motion
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111111] pt-32 sm:pt-36 pb-24 selection:bg-[#E0000B]/20 selection:text-[#E0000B] overflow-x-hidden">

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ═════════════════════════════════════════════════════════════
            1. CINEMATIC VIDEO HERO SECTION
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-20 sm:mb-28">

          {/* Breadcrumb & Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 mb-6 text-xs font-semibold text-gray-500 uppercase tracking-widest"
          >
            <Link href="/" className="hover:text-[#111111] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/services" className="hover:text-[#111111] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#E0000B] font-bold">UI/UX &amp; Product Design</span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-4xl mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] uppercase mb-4"
            >
              HUMAN-CENTRIC <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                UI/UX &amp; DESIGN SYSTEMS
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-gray-600 text-lg sm:text-xl leading-relaxed font-normal"
            >
              Crafting high-converting digital products, interactive Figma prototypes, scalable design systems, and delightful user experiences for web, mobile, and SaaS platforms.
            </motion.p>
          </div>

          {/* FULL-WIDTH CINEMATIC VIDEO CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-[#0D0D0D] border border-black/10 shadow-2xl group"
          >
            {/* Subtle Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-[#0D0D0D]/30 z-10 pointer-events-none" />

            {/* Top Badge Overlay */}
            <div className="absolute top-5 left-5 sm:top-8 sm:left-8 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E0000B] animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                AKTECH DESIGN LABS — LIVE PROTOTYPE
              </span>
            </div>

            {/* Bottom Hero Callout Badge */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto z-20 max-w-lg p-5 sm:p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 hidden sm:block">
              <div className="flex items-center gap-2 text-[#E0000B] text-xs font-bold uppercase tracking-wider mb-1">
                <Palette className="w-4 h-4" />
                <span>Pixel-Perfect Design Standards</span>
              </div>
              <p className="text-white text-xs sm:text-sm leading-snug font-normal">
                Every screen, button state, and animation micro-interaction is mapped in Figma before developer handoff for seamless web and mobile implementation.
              </p>
            </div>

            {/* CINEMATIC VIDEO COMPONENT */}
            <video
              ref={videoRef}
              src="/services/uiux.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain block z-0 rounded-3xl sm:rounded-[2.5rem]"
              aria-label="UI/UX Design Cinematic Video Showcase"
            />
          </motion.div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. CORE UI/UX CAPABILITIES
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              USER EXPERIENCE SPECIALIZATIONS
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              WHAT OUR PRODUCT DESIGN STUDIO DELIVERS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Compass,
                title: "UX Research & User Personas",
                desc: "In-depth customer interviews, user journey mapping, information architecture, and competitive UX audits to guide design decisions."
              },
              {
                icon: Layout,
                title: "Interactive Figma Wireframes",
                desc: "Rapid low-fidelity and high-fidelity wireframing of screen layouts, navigation flows, and user action funnels."
              },
              {
                icon: Layers,
                title: "Enterprise Design Systems",
                desc: "Scalable component libraries, typography tokens, color palettes, and component documentation for consistent cross-platform products."
              },
              {
                icon: Smartphone,
                title: "Web & Mobile App UI Design",
                desc: "Editorial visual design crafted for Next.js web applications, iOS native apps, and Android mobile interfaces."
              },
              {
                icon: Eye,
                title: "Usability Testing & Iteration",
                desc: "Click-through prototype testing with real users to identify friction points, validate user flows, and optimize conversion rates."
              },
              {
                icon: PenTool,
                title: "Developer-Ready Handoff Specs",
                desc: "Pixel-perfect Figma inspection files, CSS variable tokens, SVG icon assets, and interactive component state guides."
              }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-black/10 rounded-3xl p-8 hover:border-[#E0000B] hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-black/5 flex items-center justify-center mb-6 group-hover:bg-[#E0000B] transition-colors">
                    <IconComp className="w-6 h-6 text-[#111111] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#111111] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            3. TECH STACK & DELIVERABLES DETAILED SCOPE
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          <div className="bg-white border border-black/10 rounded-[2.5rem] p-8 sm:p-14 lg:p-16 shadow-lg">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column */}
              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
                  DESIGN DELIVERABLES
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight mb-6">
                  EVERYTHING INCLUDED IN OUR UI/UX SCOPE
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  We don't just send static images — we deliver complete, interactive Figma design systems with component variants, auto-layout tokens, and developer specs.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Complete Interactive Figma Prototypes & Source Files",
                    "Design System & Component Token Documentation",
                    "Desktop, Tablet & Mobile Responsive Screen Layouts",
                    "User Flow Diagrams & Information Architecture Maps",
                    "Dark & Light Mode UI Color Systems",
                    "Micro-Interaction Motion Specs & Asset Export",
                    "Developer Handoff Support & Design QA Audit"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#E0000B] shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#C00009] transition-all group"
                >
                  <span>Request UI/UX Proposal</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>

              {/* Right Column: Tech Stack Cards */}
              <div className="lg:col-span-6">
                <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E0000B] mb-4 block">
                    DESIGN TOOLING &amp; ECOSYSTEM
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight mb-6">
                    POWERED BY MODERN DESIGN TOOLS
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Figma", desc: "Interactive UI & Systems" },
                      { name: "Framer", desc: "Interactive Prototypes" },
                      { name: "Adobe CC", desc: "Visual Asset Creation" },
                      { name: "Principle", desc: "Micro-Interaction Motion" },
                      { name: "Storybook", desc: "Component Specs" },
                      { name: "Tailwind Tokens", desc: "CSS Design System" },
                      { name: "Maze / UserTesting", desc: "Usability Research" },
                      { name: "Lottie Files", desc: "Vector Animations" }
                    ].map((tech, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-sm font-bold text-white block">{tech.name}</span>
                        <span className="text-[11px] text-gray-400 font-normal">{tech.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            4. OUR UI/UX DESIGN PROCESS
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              DESIGN METHODOLOGY
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              HOW WE DESIGN DIGITAL PRODUCTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Research & Journey Mapping",
                desc: "We analyze target user behavior, establish user personas, map navigation journeys, and outline core product requirements."
              },
              {
                step: "02",
                title: "Wireframing & Information Flow",
                desc: "We create low-fidelity wireframes to iterate rapidly on layout hierarchy, user funnels, and component placement."
              },
              {
                step: "03",
                title: "High-Fidelity UI & Design Systems",
                desc: "We craft visual screens, establish typography scales, build reusable Figma components, and fine-tune micro-interactions."
              },
              {
                step: "04",
                title: "Prototype Testing & Handoff",
                desc: "We test interactive click-through prototypes, perform design QA, and deliver complete developer inspection specs."
              }
            ].map((proc, pIdx) => (
              <div key={pIdx} className="bg-white border border-black/10 rounded-3xl p-6 sm:p-8 shadow-sm relative">
                <span className="text-4xl font-heading font-black text-[#E0000B] block mb-3">
                  {proc.step}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#111111] mb-2">
                  {proc.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed font-normal">
                  {proc.desc}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            5. CALL TO ACTION (CTA)
           ═════════════════════════════════════════════════════════════ */}
        <section className="text-center max-w-4xl mx-auto py-8">
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#111111] text-white shadow-2xl relative overflow-hidden">
            <Sparkles className="w-8 h-8 text-[#E0000B] mx-auto mb-4" />
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl uppercase tracking-tight mb-4">
              READY TO REDESIGN YOUR PRODUCT EXPERIENCE?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Schedule a design consultation or request a custom UI/UX proposal and Figma prototype roadmap from the AKTECH design studio.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#C00009] transition-all flex items-center gap-2 group"
              >
                <span>Start UI/UX Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 rounded-full bg-white/10 text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
