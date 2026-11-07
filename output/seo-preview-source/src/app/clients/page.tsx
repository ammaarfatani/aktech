"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Quote,
  ChevronLeft,
  ChevronRight,
  Building2,
  Globe2,
  Users,
  Award,
  Clock,
  Code2,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CLIENT TESTIMONIALS DATA
   ───────────────────────────────────────────── */

const TESTIMONIALS = [
  {
    id: 1,
    quote: "AKTECH completely transformed our web operations. Their engineering team delivered our custom platform weeks ahead of schedule with sub-second page performance.",
    name: "Tariq Mahmood",
    role: "Managing Director",
    company: "Apex Global Logistics",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    projectType: "Enterprise Web & ERP Platform"
  },
  {
    id: 2,
    quote: "The RESTRO ERP built by AKTECH streamlined our multi-branch operations, POS ordering, and table management into one intuitive platform. Incredible UX execution.",
    name: "Chef Farhan",
    role: "Founder & Executive Chef",
    company: "Restro Hospitality Group",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    projectType: "Custom ERP & POS Ecosystem"
  },
  {
    id: 3,
    quote: "Integrating n8n workflows and AI Chatbots with AKTECH saved our support team 20+ manual hours every single week. Highly recommend their AI team.",
    name: "Sarah Jenkins",
    role: "Head of Operations",
    company: "WebCloners US Agency",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    projectType: "AI Workflow & Chatbot Integration"
  },
  {
    id: 4,
    quote: "Our fashion e-commerce storefront saw an immediate 35% increase in conversion rate after AKTECH redesigned the product catalog and checkout experience.",
    name: "Syeda Hoorain",
    role: "Creative Director",
    company: "LYBA Fashion Brand",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    projectType: "E-Commerce Architecture & UI/UX"
  }
];

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
    title: "Responsive 24/7 Support",
    desc: "Dedicated support team on WhatsApp, email, and private Slack channels for rapid emergency resolution."
  }
];

export default function ClientsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto slide testimonials every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const testimonial = TESTIMONIALS[currentTestimonial];

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
                From fast-scaling startups and retail chains to international media networks and technology firms — we partner with teams that value technical precision and speed.
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
                MEASURABLE RESULTS
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight">
                OUR IMPACT IN NUMBERS
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { stat: "30+", label: "Projects Delivered Globally", icon: Building2 },
                { stat: "98%", label: "Client Retainer Satisfaction", icon: Award },
                { stat: "100%", label: "On-Time Milestone Rate", icon: Clock },
                { stat: "sub-1s", label: "Average Page Load Speed", icon: Zap },
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

        {/* ═════════════════════════════════════════════════════════════
            5. TESTIMONIALS (WHITE SECTION WITH SLIDER)
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <div className="bg-white border border-black/10 rounded-[2.5rem] p-8 sm:p-12 shadow-xl relative overflow-hidden">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-black/10 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-2 block">
                  CLIENT EXPERIENCE
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111111] tracking-tight uppercase">
                  WHAT OUR CLIENTS SAY
                </h2>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-widest text-gray-500">
                  <span className="text-[#E0000B]">{(currentTestimonial + 1).toString().padStart(2, "0")}</span> / {TESTIMONIALS.length.toString().padStart(2, "0")}
                </span>

                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-black/10 bg-gray-50 hover:bg-[#E0000B] hover:border-[#E0000B] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer text-[#111111]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-black/10 bg-gray-50 hover:bg-[#E0000B] hover:border-[#E0000B] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer text-[#111111]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Testimonial Quote Display */}
            <div className="min-h-[220px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <Quote className="w-8 h-8 text-[#E0000B] mb-4 opacity-80" />
                  
                  <p className="text-lg sm:text-2xl font-heading font-medium leading-relaxed mb-8 text-[#111111]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#E0000B]/50 shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-[#111111]">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs font-medium text-gray-500">
                        {testimonial.role} — <span className="text-[#E0000B] font-bold">{testimonial.company}</span>
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        {testimonial.projectType}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
