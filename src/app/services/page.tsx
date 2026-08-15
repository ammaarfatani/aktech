"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  Bot,
  Globe,
  Smartphone,
  LayoutGrid,
  Palette,
  Search,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Code2,
  Clock,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   6 DETAILED EDITORIAL SERVICE BLOCKS
   ───────────────────────────────────────────── */

const DETAILED_SERVICES = [
  {
    id: "ai-automation",
    number: "01",
    title: "AI Agents & Automation",
    category: "ARTIFICIAL INTELLIGENCE",
    icon: Bot,
    tagline: "Autonomous conversational bots & workflow pipelines.",
    description: "Streamline operations, capture qualified leads 24/7, and eliminate repetitive tasks using custom LLM agents and n8n workflow automations tailored to your business model.",
    image: "/projects/agency.png",
    deliverables: [
      "Custom n8n Workflow Automations",
      "Conversational AI Chatbots & Agents",
      "Automated Lead Qualification",
      "API & Webhook Integrations",
      "Database & CRM Data Sync",
      "Custom Fine-Tuned AI Pipelines"
    ]
  },
  {
    id: "web-development",
    number: "02",
    title: "Web Development",
    category: "ENGINEERING",
    icon: Globe,
    tagline: "High-performance websites & custom web applications.",
    description: "Engineered from scratch using Next.js 16, React 19, and Node.js. No slow page builders or off-the-shelf templates — only clean, scalable, sub-second code.",
    image: "/projects/school.png",
    deliverables: [
      "Custom Web Applications & SaaS",
      "Full-Stack Next.js & React Builds",
      "Headless E-Commerce Solutions",
      "WordPress & Shopify Development",
      "RESTful API & GraphQL Development",
      "Performance & Core Web Vitals Optimization"
    ]
  },
  {
    id: "mobile-development",
    number: "03",
    title: "Mobile App Development",
    category: "MOBILE PRODUCT",
    icon: Smartphone,
    tagline: "Fluid cross-platform iOS & Android mobile applications.",
    description: "Delivering Apple-grade visual polish, instant responsiveness, and offline caching across iOS and Android with React Native and native mobile frameworks.",
    image: "/projects/gym.png",
    deliverables: [
      "iOS & Android Mobile Applications",
      "React Native Cross-Platform Engineering",
      "Offline Synchronization & Local Cache",
      "Push Notification Infrastructure",
      "App Store & Google Play Publishing",
      "Mobile Backend API Integration"
    ]
  },
  {
    id: "crm-business-systems",
    number: "04",
    title: "CRM & Business Systems",
    category: "ENTERPRISE SOFTWARE",
    icon: LayoutGrid,
    tagline: "Custom POS, inventory engines & executive dashboards.",
    description: "Centralize your company's operations into a unified platform. From multi-branch management to role-based access control (RBAC) and real-time revenue analytics.",
    image: "/projects/resto-crm.png",
    deliverables: [
      "Bespoke Sales & Lead CRMs",
      "POS & Multi-Branch Management Systems",
      "Inventory Tracking & Order Processing",
      "Role-Based Access Control (RBAC)",
      "Real-Time P&L & Analytics Dashboards",
      "Custom ERP Software Solutions"
    ]
  },
  {
    id: "uiux-design",
    number: "05",
    title: "UI/UX & Product Design",
    category: "DESIGN SYSTEM",
    icon: Palette,
    tagline: "High-conversion user interfaces & iconic branding.",
    description: "User-centric interface design built on deep art direction, responsive design systems, micro-interactions, and frictionless user flows.",
    image: "/projects/perfumes.png",
    deliverables: [
      "Complete Figma Design Systems & UI Kits",
      "Interactive High-Fidelity Prototypes",
      "Conversion-Optimized Landing Pages",
      "Mobile App UI/UX Design",
      "User Journey & Architecture Mapping",
      "Digital Brand Identity & Guidelines"
    ]
  },
  {
    id: "seo-digital-growth",
    number: "06",
    title: "SEO & Digital Growth",
    category: "ORGANIC SCALING",
    icon: Search,
    tagline: "Data-driven organic search authority & technical SEO.",
    description: "Command search engine authority, rank for competitive industry keywords, and convert search traffic into recurring revenue with technical SEO auditing.",
    image: "/projects/urge.png",
    deliverables: [
      "Comprehensive Technical SEO Audits",
      "On-Page & Schema Markup Optimization",
      "Local SEO & Google Business Optimization",
      "E-Commerce SEO & Product Optimization",
      "Content Strategy & Keyword Targeting",
      "Conversion Rate Optimization (CRO)"
    ]
  }
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

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
              SERVICES &amp; CAPABILITIES
            </span>
          </motion.div>

          {/* Headline & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] uppercase">
                SERVICES BUILT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                  AROUND YOUR BUSINESS
                </span> <br />
                GROWTH.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <p className="text-gray-600 text-lg sm:text-xl font-normal leading-relaxed mb-6">
                From full-stack software development and custom web apps to AI autonomous agents and enterprise CRMs — we deliver digital solutions that scale.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(224,0,11,0.3)] hover:bg-[#C00009] transition-all group"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. 6 ASYMMETRIC EDITORIAL SERVICE BLOCKS
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-28 sm:mb-36 space-y-16">
          {DETAILED_SERVICES.map((service, idx) => {
            const IconComponent = service.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white border border-black/10 rounded-[2.5rem] p-8 sm:p-12 lg:p-14 shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  
                  {/* TEXT CONTENT (6 COLS) */}
                  <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    
                    {/* Header bar */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-heading font-black text-[#E0000B]">
                        {service.number}
                      </span>
                      <span className="w-8 h-px bg-black/20" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                        {service.category}
                      </span>
                    </div>

                    <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111111] tracking-tight mb-3">
                      {service.title}
                    </h2>

                    <p className="text-sm font-semibold text-[#E0000B] mb-4">
                      {service.tagline}
                    </p>

                    <p className="text-gray-600 text-base leading-relaxed font-normal mb-8">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="mb-8">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-4">
                        Key Deliverables:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#E0000B] shrink-0" />
                            <span className="text-xs font-medium text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA link */}
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#111111] hover:text-[#E0000B] transition-colors group"
                    >
                      <span>Request This Service</span>
                      <ArrowUpRight className="w-4 h-4 text-[#E0000B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>

                  </div>

                  {/* VISUAL DISPLAY (6 COLS) - FULL UN-CROPPED DISPLAY */}
                  <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-[#0D0D0D] border border-black/10 p-4 sm:p-6 flex items-center justify-center shadow-inner group">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={idx < 2}
                        className="object-contain drop-shadow-2xl rounded-lg group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </section>

        {/* ═════════════════════════════════════════════════════════════
            3. WHY AKTECH SECTION
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          <div className="bg-[#111111] text-white rounded-[3rem] p-8 sm:p-14 lg:p-20 shadow-2xl relative overflow-hidden">
            
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
                THE AKTECH STANDARD
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight uppercase">
                WHY BUSINESSES CHOOSE AKTECH FOR DIGITAL ENGINEERING.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Sub-Second Performance",
                  desc: "We engineer builds for 95+ Core Web Vitals scores and instant global load speeds."
                },
                {
                  icon: ShieldCheck,
                  title: "100% In-House Code",
                  desc: "No outsourced low-quality templates. You get full IP ownership of custom software codebases."
                },
                {
                  icon: Code2,
                  title: "Modern Tech Stack",
                  desc: "Powered by Next.js 16, React 19, TypeScript, Node.js, and cloud-native databases."
                },
                {
                  icon: Bot,
                  title: "AI Automation Ready",
                  desc: "Every system is pre-architected for autonomous AI agent pipelines and n8n workflows."
                },
                {
                  icon: Sparkles,
                  title: "Editorial UI/UX Aesthetics",
                  desc: "Apple-level design hierarchy, smooth micro-interactions, and premium typography."
                },
                {
                  icon: Clock,
                  title: "SLA Support & Retainers",
                  desc: "Dedicated monthly maintenance, security audits, and continuous feature development."
                }
              ].map((reason, rIdx) => {
                const IconComponent = reason.icon;
                return (
                  <div key={rIdx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#E0000B]/50 transition-colors">
                    <IconComponent className="w-7 h-7 text-[#E0000B] mb-4" />
                    <h3 className="font-heading font-bold text-lg text-white mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-normal">
                      {reason.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
