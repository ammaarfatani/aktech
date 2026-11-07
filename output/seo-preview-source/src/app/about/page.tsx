"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  CheckCircle2,
  Users,
  Award,
  Globe2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111111] pt-36 sm:pt-40 pb-20 selection:bg-[#E0000B]/20 selection:text-[#E0000B] overflow-x-hidden">
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">

        {/* ═════════════════════════════════════════════════════════════
            1. HERO INTRO (WITH BREATHING ROOM)
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full bg-white border border-black/10 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#E0000B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111]">
              ABOUT AKTECH
            </span>
          </motion.div>

          {/* Headline & Subtitle Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] uppercase">
                BUILDING DIGITAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                  EXPERIENCES
                </span>{" "}
                &amp; <br />
                INTELLIGENT SYSTEMS.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <p className="text-gray-600 text-lg sm:text-xl font-normal leading-relaxed mb-6">
                We are a full-stack digital engineering studio crafting bespoke web platforms, AI agents, mobile applications, and enterprise software for ambitious global businesses.
              </p>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(224,0,11,0.3)] hover:bg-[#C00009] transition-all group"
              >
                <span>Work With Us</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Featured Editorial Visual Display */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative w-full h-[360px] sm:h-[500px] lg:h-[580px] rounded-[2.5rem] overflow-hidden border border-black/10 shadow-2xl group"
          >
            <Image
              src="/projects/agency.png"
              alt="AKTECH Studio Team"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/20 to-transparent" />
            <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 max-w-xl text-white">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-2 block">
                ENGINEERING EXCELLENCE
              </span>
              <p className="text-xl sm:text-2xl font-heading font-bold leading-snug">
                Architecting modern digital infrastructure with cinematic polish and bulletproof security.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. OUR STORY
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative h-[420px] sm:h-[500px] rounded-[2.5rem] overflow-hidden border border-black/10 shadow-xl">
                <Image
                  src="/projects/school.png"
                  alt="AKTECH Innovation Studio"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#111111] text-white p-6 rounded-3xl shadow-2xl border border-white/10 hidden sm:block max-w-[220px]">
                <span className="text-4xl font-heading font-black text-[#E0000B] block mb-1">30+</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Projects Launched World-Wide
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-4 block">
                01 / OUR STORY
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] tracking-tight mb-6 uppercase leading-tight">
                FROM BOLD IDEAS TO HIGH-PERFORMANCE DIGITAL REALITY.
              </h2>
              
              <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  AKTECH Digital Solutions was founded with a singular mission: to bridge the gap between creative visual artistry and complex backend software engineering.
                </p>
                <p>
                  Where ordinary agencies deliver static templates that slow down under load, AKTECH architects custom platforms engineered from the ground up using React, Next.js, Node.js, and cutting-edge 2D/3D interaction frameworks.
                </p>
                <p>
                  Over our journey, we have partnered with startups, enterprise teams, and visionaries to launch products that convert visitors, automate manual operations, and deliver real business growth.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-black/10">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-[#111111]">100%</h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-1">Custom Codebase Guarantee</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-black text-[#E0000B]">sub-second</h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-1">Global Page Load Speeds</p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            3. WHAT WE BELIEVE
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              02 / OUR PRINCIPLES
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              WHAT WE BELIEVE IN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Business-First Architecture",
                desc: "We don't build software for the sake of hype. Every decision aligns directly with your conversion rates, speed, and revenue goals."
              },
              {
                icon: Zap,
                title: "Uncompromising Speed",
                desc: "Speed is a core feature. We optimize image pipelines, edge caching, and DOM rendering for immediate sub-second loads."
              },
              {
                icon: Cpu,
                title: "AI-First Automation",
                desc: "We integrate intelligent autonomous agents and n8n workflows into daily business operations to save hundreds of operational hours."
              },
              {
                icon: Layers,
                title: "Cinematic Precision",
                desc: "Visual aesthetics inspire trust. We craft fluid animations, clean micro-interactions, and Apple-level layout harmony."
              }
            ].map((principle, idx) => {
              const IconComp = principle.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white border border-black/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-[#E0000B]/40 hover:shadow-[0_15px_30px_rgba(224,0,11,0.06)] transition-all duration-500"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center mb-6 group-hover:bg-[#E0000B] transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#111111] mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-normal">
                      {principle.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            4. HOW WE WORK (METHODOLOGY)
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32 bg-[#111111] text-white rounded-[3rem] p-8 sm:p-14 lg:p-20 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              03 / METHODOLOGY
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight uppercase">
              HOW WE EXECUTE &amp; DELIVER.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Blueprint",
                desc: "We analyze your target market, tech stack requirements, and business goals to map a precise milestone roadmap."
              },
              {
                step: "02",
                title: "UI/UX & Interactive Design",
                desc: "We create interactive Figma prototypes with fluid micro-interactions, responsive layouts, and rich brand identity."
              },
              {
                step: "03",
                title: "Full-Stack Development",
                desc: "Engineered cleanly in Next.js, React, Node.js, and TypeScript, backed by robust database architectures and APIs."
              },
              {
                step: "04",
                title: "Deployment & Growth",
                desc: "Global edge deployment, continuous security monitoring, automated testing, and ongoing performance optimization."
              }
            ].map((method, idx) => (
              <div key={idx} className="border-t border-white/15 pt-6 flex flex-col justify-between">
                <div>
                  <span className="font-heading font-black text-3xl text-[#E0000B] block mb-4">
                    {method.step}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-normal">
                    {method.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            5. WHAT MAKES US DIFFERENT
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
                04 / THE AKTECH ADVANTAGE
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight mb-8">
                WHAT MAKES US DIFFERENT FROM ORDINARY AGENCIES.
              </h2>

              <div className="space-y-4">
                {[
                  "No bloated pre-made templates or slow page builders.",
                  "Direct communication with senior engineers & design leads.",
                  "Native AI Agent & n8n business automation capabilities.",
                  "Full ownership of your source code & cloud infrastructure.",
                  "Transparent fixed-price pricing with milestone delivery guarantees.",
                  "SLA-backed technical support & post-launch retainers."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-black/5">
                    <CheckCircle2 className="w-5 h-5 text-[#E0000B] shrink-0 mt-0.5" />
                    <span className="text-gray-800 text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="bg-white p-8 rounded-3xl border border-black/10 shadow-sm flex flex-col justify-between h-48">
                <Users className="w-8 h-8 text-[#E0000B]" />
                <div>
                  <span className="text-3xl font-heading font-black text-[#111111]">100%</span>
                  <p className="text-xs font-bold uppercase text-gray-500 mt-1">In-House Engineering</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-black/10 shadow-sm flex flex-col justify-between h-48">
                <Award className="w-8 h-8 text-[#111111]" />
                <div>
                  <span className="text-3xl font-heading font-black text-[#111111]">98%</span>
                  <p className="text-xs font-bold uppercase text-gray-500 mt-1">Client Satisfaction</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-black/10 shadow-sm flex flex-col justify-between h-48 col-span-2">
                <Globe2 className="w-8 h-8 text-[#E0000B]" />
                <div>
                  <span className="text-3xl font-heading font-black text-[#111111]">Global</span>
                  <p className="text-xs font-bold uppercase text-gray-500 mt-1">Clients across North America, Europe, &amp; Asia</p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
