"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Building2,
  Globe2,
  Users,
  Award,
  Clock,
  Code2,
} from "lucide-react";

/* ─────────────────────────────────────────────
   12 TRUST & REASON POINTS
   ───────────────────────────────────────────── */

const TRUST_REASONS = [
  {
    title: "Business-First Development",
    desc: "Every line of code and UI component is engineered to maximize conversion rates, load speeds, and measurable business growth."
  },
  {
    title: "Modern Technology Stack",
    desc: "Built on Next.js 16, React 19, TypeScript, Node.js, and cloud-native databases — zero outdated legacy bloat."
  },
  {
    title: "Transparent Communication",
    desc: "Direct communication with senior engineering leads, clear weekly sprint updates, and milestone tracking."
  },
  {
    title: "Scalable Cloud Architecture",
    desc: "Engineered for high traffic spikes with edge caching, global CDN delivery, and automatic load balancing."
  },
  {
    title: "Premium Editorial UI/UX",
    desc: "Sophisticated typography, Apple-grade spacing harmony, and fluid micro-interactions that inspire instant trust."
  },
  {
    title: "Fast Milestone Execution",
    desc: "Rigorous agile execution so your web application or digital product launches on time without missing deadlines."
  },
  {
    title: "Custom Tailored Solutions",
    desc: "No static templates or slow page builders — 100% custom codebase tailored specifically to your operational model."
  },
  {
    title: "Long-Term Retainers & SLA",
    desc: "SLA-backed monthly support, security patch management, performance audits, and continuous optimization."
  },
  {
    title: "AI-Ready Systems",
    desc: "Pre-architected for autonomous AI agents, n8n automations, LLM integration, and real-time data pipelines."
  },
  {
    title: "Reliable Engineering Standards",
    desc: "Strict type safety, automated integration testing, and zero-downtime deployment pipelines."
  },
  {
    title: "Performance-Focused Builds",
    desc: "Optimized for 95+ Google Core Web Vitals scores to ensure instant sub-second page loads globally."
  },
  {
    title: "Reachable after launch",
    desc: "WhatsApp and email remain available. Ongoing support is provided when it is part of the agreed engagement."
  }
];

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111111] pt-36 sm:pt-40 pb-20 selection:bg-[#E0000B]/20 selection:text-[#E0000B] overflow-x-hidden">
      
      {/* ── MAX-WIDTH CONTAINER FOR DESIGNED PAGE PROPORTIONS ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ═════════════════════════════════════════════════════════════
            1. HERO INTRO (WHITE / LIGHT SECTION)
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-20 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full bg-white border border-black/10 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#E0000B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111]">
              CLIENTS &amp; TRUST
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] uppercase">
                TRUSTED BY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                  AMBITIOUS BUSINESSES
                </span> <br />
                &amp; GROWING BRANDS.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed mb-6">
                AKTECH works with schools, restaurants, retailers and product teams that need software they can operate. We do not publish invented testimonials or unverified results.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(224,0,11,0.3)] hover:bg-[#C00009] transition-all group"
              >
                <span>Become Our Next Client</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. TRUST / INDUSTRY VERTICALS (BLACK CONTRAST SECTION)
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-20 sm:mb-24">
          <div className="bg-[#111111] text-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-2 block">
                  GLOBAL CLIENT ECOSYSTEM
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                  INDUSTRIES WE POWER
                </h2>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md">
                We design and build custom software architectures tailored specifically to the operational mechanics of your industry.
              </p>
            </div>

            {/* Vertical Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "E-Commerce", label: "Storefronts & Apps" },
                { name: "Hospitality", label: "POS & ERP Systems" },
                { name: "SaaS & Cloud", label: "Web Applications" },
                { name: "Education", label: "Portals & Websites" },
                { name: "Media & News", label: "Publishing Platforms" },
                { name: "FinTech", label: "Calculators & Tools" },
              ].map((vert, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <span className="text-[#E0000B] font-heading font-black text-xs block mb-1">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="text-xs font-bold text-white uppercase mb-1">
                    {vert.name}
                  </h3>
                  <p className="text-[10px] text-gray-400">
                    {vert.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            3. WHY CLIENTS CHOOSE AKTECH (WHITE SECTION)
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-20 sm:mb-24">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              THE AKTECH COMMITMENT
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight">
              12 REASONS WHY BRANDS TRUST AKTECH
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRUST_REASONS.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                className="bg-white border border-black/10 rounded-2xl p-6 hover:border-[#E0000B]/40 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-heading font-black text-[#E0000B]">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-gray-300 group-hover:text-[#E0000B] transition-colors" />
                  </div>
                  
                  <h3 className="font-heading font-bold text-base text-[#111111] mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed font-normal">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            4. RESULTS & IMPACT (BLACK CONTRAST SECTION WITH RED ACCENT)
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-20 sm:mb-24">
          <div className="bg-[#111111] text-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="max-w-xl mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-2 block">
                HOW WE WORK
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight">
                WHAT YOU CAN RELY ON
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { stat: "Work", label: "Websites, stores and business systems", icon: Building2 },
                { stat: "Scope", label: "Discovery before a quote", icon: Award },
                { stat: "Handover", label: "Access and notes at launch", icon: Clock },
                { stat: "Support", label: "When it is part of the agreement", icon: Zap },
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-40"
                  >
                    <IconComp className="w-5 h-5 text-[#E0000B]" />
                    <div>
                      <span className="font-heading font-black text-3xl text-white block mb-1">
                        {item.stat}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="rounded-[2.5rem] border border-black/10 bg-white p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B]">Selected work</p>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
              Projects you can inspect
            </h2>
            <p className="mt-4 max-w-2xl text-[#4B5563]">
              Reviews and conversion claims are not published here. Look at the case studies and portfolio instead.
            </p>
            <Link href="/case-studies" className="mt-6 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-[#111111] hover:text-[#E0000B]">
              View case studies
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
