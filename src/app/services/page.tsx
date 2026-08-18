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
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  Layers,
  Cpu,
  BarChart3,
  Terminal,
} from "lucide-react";

/* ─────────────────────────────────────────────
   SERVICES DATA (USING EXACT PUBLIC/SERVICES IMAGES)
   ───────────────────────────────────────────── */

const SERVICES_DATA = [
  {
    id: "ai-automation",
    number: "01",
    title: "AI Agents & Autonomous Automation",
    category: "ARTIFICIAL INTELLIGENCE",
    icon: Bot,
    tagline: "Autonomous conversational bots, LLM agents & workflow pipelines.",
    description:
      "Streamline operations, capture qualified leads 24/7, and eliminate repetitive manual tasks using custom OpenAI/Anthropic agents, n8n workflow automations, and intelligent CRM integrations tailored to your business model.",
    image: "/services/ai-agent.jpg",
    techStack: ["n8n", "OpenAI API", "Python", "LangChain", "Vector DBs", "Webhooks"],
    deliverables: [
      "Custom n8n Workflow Automations",
      "Conversational AI Chatbots & Support Agents",
      "Automated Lead Qualification & Routing",
      "API & Webhook Data Synchronization",
      "Database & CRM Auto-Sync Pipelines",
      "Custom Fine-Tuned AI Prompt Architectures"
    ]
  },
  {
    id: "web-development",
    number: "02",
    title: "High-Performance Web Development",
    category: "ENGINEERING",
    icon: Globe,
    tagline: "Ultra-fast web applications, custom SaaS & enterprise portals.",
    description:
      "Engineered from scratch using Next.js 16, React 19, and Node.js. No slow page builders, bloated themes, or off-the-shelf templates — only clean, scalable, sub-second code optimized for search engines and high conversion.",
    image: "/services/webdev.jpg",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    deliverables: [
      "Custom Web Applications & Enterprise SaaS",
      "Full-Stack Next.js & React Architectures",
      "Headless E-Commerce & Custom Storefronts",
      "Custom WordPress & Shopify Theme Engineering",
      "RESTful API & GraphQL Microservices",
      "Core Web Vitals & Sub-Second Speed Optimization"
    ]
  },
  {
    id: "mobile-development",
    number: "03",
    title: "Cross-Platform Mobile App Development",
    category: "MOBILE PRODUCT",
    icon: Smartphone,
    tagline: "Fluid, native-grade iOS & Android mobile applications.",
    description:
      "Delivering Apple-grade visual polish, sub-second responsiveness, offline data caching, and seamless push notification infrastructure across iOS and Android with React Native and modern mobile backends.",
    image: "/services/mobile-dev.jpg",
    techStack: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "Firebase", "App Store Connect"],
    deliverables: [
      "iOS & Android Native-Feel Applications",
      "React Native Cross-Platform Engineering",
      "Offline Sync & Encrypted Local Storage",
      "Push Notification & Engagement Systems",
      "App Store & Google Play Publishing Support",
      "Secure Mobile API Integration & Biometrics"
    ]
  },
  {
    id: "crm-business-systems",
    number: "04",
    title: "Enterprise CRM & Business Systems",
    category: "ENTERPRISE SOFTWARE",
    icon: LayoutGrid,
    tagline: "Bespoke POS, inventory engines & executive management dashboards.",
    description:
      "Centralize your company's end-to-end operations into a unified, secure dashboard. From multi-branch management to role-based access control (RBAC), real-time revenue analytics, and automated reporting.",
    image: "/services/CRM.jpg",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    deliverables: [
      "Bespoke Lead & Sales Management CRMs",
      "POS & Multi-Branch Management Engines",
      "Real-Time Inventory Tracking Systems",
      "Granular Role-Based Access Control (RBAC)",
      "Real-Time Revenue & Financial Analytics",
      "Custom Enterprise ERP Systems"
    ]
  },
  {
    id: "uiux-design",
    number: "05",
    title: "UI/UX & Digital Product Design",
    category: "DESIGN SYSTEM",
    icon: Palette,
    tagline: "High-conversion user interfaces, prototypes & brand identities.",
    description:
      "User-centric product design built on rigorous art direction, responsive design systems, micro-interactions, and frictionless checkout flows that turn casual visitors into loyal customer accounts.",
    image: "/services/uiux.jpg",
    techStack: ["Figma", "Design Systems", "Prototyping", "Design Tokens", "UI Kits", "Micro-Interactions"],
    deliverables: [
      "Complete Figma Design Systems & UI Kits",
      "Interactive High-Fidelity Prototypes",
      "High-Conversion Landing Page Design",
      "Mobile App UI/UX & Interaction Design",
      "User Journey Mapping & Wireframing",
      "Digital Brand Identity & Guidelines"
    ]
  },
  {
    id: "seo-digital-growth",
    number: "06",
    title: "Technical SEO & Organic Search Growth",
    category: "ORGANIC SCALING",
    icon: Search,
    tagline: "Data-driven search engine authority & technical SEO auditing.",
    description:
      "Command organic search engine authority, rank for competitive industry keywords, and convert high-intent search traffic into recurring revenue through technical audits, structured JSON-LD schema, and speed tuning.",
    image: "/services/seo.png",
    techStack: ["Technical SEO", "JSON-LD Schema", "Google Search Console", "Ahrefs", "Speed Tuning", "CRO"],
    deliverables: [
      "Comprehensive Technical & Structural SEO Audits",
      "On-Page SEO & Rich Snippet Schema Markup",
      "Local SEO & Google Business Profile Optimization",
      "E-Commerce SEO & Product Page Optimization",
      "Content Strategy & Keyword Targeting",
      "Conversion Rate Optimization (CRO)"
    ]
  }
];

const CATEGORY_TABS = [
  { id: "all", label: "All Services" },
  { id: "ai-automation", label: "AI & Automation" },
  { id: "web-development", label: "Web Engineering" },
  { id: "mobile-development", label: "Mobile Apps" },
  { id: "crm-business-systems", label: "CRM & Systems" },
  { id: "uiux-design", label: "UI/UX Design" },
  { id: "seo-digital-growth", label: "SEO & Growth" },
];

export default function ServicesPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredServices =
    selectedFilter === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.id === selectedFilter);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111111] pt-32 sm:pt-40 pb-24 selection:bg-[#E0000B]/20 selection:text-[#E0000B] overflow-x-hidden">

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ═════════════════════════════════════════════════════════════
            1. HERO INTRO & METRICS BANNER
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-20 sm:mb-28">

          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full bg-white border border-black/10 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#E0000B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111]">
              FULL-STACK CAPABILITIES
            </span>
          </motion.div>

          {/* Headline & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] uppercase">
                ENGINEERING DIGITAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                  PRODUCTS THAT SCALE
                </span> <br />
                YOUR BUSINESS.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed mb-6">
                From full-stack custom web apps and mobile solutions to AI autonomous agents and enterprise CRM engines — we build secure, sub-second software for ambitious companies.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111111] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#E0000B] transition-all group"
              >
                <span>Schedule a Discovery Call</span>
                <ArrowUpRight className="w-4 h-4 text-[#E0000B] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Key Engineering Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-black/10 rounded-3xl shadow-sm"
          >
            {[
              { label: "Core Web Vitals Score", value: "98/100", sub: "Optimized Speed" },
              { label: "Enterprise Projects", value: "50+", sub: "Delivered Globally" },
              { label: "Code Quality Standard", value: "100%", sub: "Bespoke In-House Code" },
              { label: "Client SLA Retainers", value: "99.2%", sub: "Satisfaction & Support" },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 border-r last:border-r-0 border-black/5 text-center sm:text-left">
                <span className="text-2xl sm:text-3xl font-heading font-black text-[#111111] block mb-1">
                  {stat.value}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E0000B] block mb-0.5">
                  {stat.label}
                </span>
                <span className="text-[11px] text-gray-500 font-normal">
                  {stat.sub}
                </span>
              </div>
            ))}
          </motion.div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. INTERACTIVE CATEGORY FILTER TABS
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-14">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 pt-1">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-2 shrink-0 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#E0000B]" />
              <span>Filter:</span>
            </span>
            {CATEGORY_TABS.map((tab) => {
              const active = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-heading font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${active
                      ? "bg-[#111111] text-white shadow-md scale-105"
                      : "bg-white text-gray-600 border border-black/10 hover:border-[#E0000B] hover:text-[#111111]"
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            3. DYNAMIC SHOWCASE SERVICE CARDS
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-28 sm:mb-36 space-y-16 sm:space-y-20">
          <AnimatePresence mode="wait">
            {filteredServices.map((service, idx) => {
              const IconComponent = service.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  className="group bg-white border border-black/10 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
                >
                  {/* Subtle Accent Glow Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#E0000B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* TEXT CONTENT (6 COLS) */}
                    <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>

                      {/* Header bar */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl sm:text-4xl font-heading font-black text-[#E0000B]">
                          {service.number}
                        </span>
                        <span className="w-8 h-px bg-black/20" />
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 border border-black/5">
                          <IconComponent className="w-3.5 h-3.5 text-[#E0000B]" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]">
                            {service.category}
                          </span>
                        </div>
                      </div>

                      <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#111111] tracking-tight mb-3">
                        {service.title}
                      </h2>

                      <p className="text-sm font-bold text-[#E0000B] mb-4 leading-snug">
                        {service.tagline}
                      </p>

                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal mb-6">
                        {service.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="mb-6">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 block">
                          Core Technologies:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {service.techStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-3 py-1 rounded-md bg-gray-100 border border-black/5 text-[11px] font-semibold text-gray-700 hover:bg-black/5 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables Checklist */}
                      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-black/5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3 flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-[#E0000B]" />
                          <span>Key Deliverables &amp; Scope:</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#E0000B] shrink-0 mt-0.5" />
                              <span className="text-xs font-medium text-gray-700 leading-tight">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA link */}
                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#111111] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#E0000B] transition-colors shadow-sm group/btn"
                        >
                          <span>Get Service Proposal</span>
                          <ArrowUpRight className="w-4 h-4 text-[#E0000B] group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                        </Link>

                        {service.id === "web-development" ? (
                          <Link
                            href="/services/web-development"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E0000B] hover:text-[#111111] transition-colors"
                          >
                            <span>Explore Web Dev Page</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#E0000B]" />
                          </Link>
                        ) : service.id === "ai-automation" ? (
                          <Link
                            href="/services/ai-agent"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E0000B] hover:text-[#111111] transition-colors"
                          >
                            <span>Explore AI Agent Page</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#E0000B]" />
                          </Link>
                        ) : service.id === "mobile-development" ? (
                          <Link
                            href="/services/mobile-app-development"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E0000B] hover:text-[#111111] transition-colors"
                          >
                            <span>Explore Mobile App Page</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#E0000B]" />
                          </Link>
                        ) : service.id === "seo-digital-growth" ? (
                          <Link
                            href="/services/seo"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E0000B] hover:text-[#111111] transition-colors"
                          >
                            <span>Explore SEO Growth Page</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#E0000B]" />
                          </Link>
                        ) : service.id === "crm-business-systems" ? (
                          <Link
                            href="/services/crm-business-systems"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E0000B] hover:text-[#111111] transition-colors"
                          >
                            <span>Explore CRM Systems Page</span>
                            <ChevronRight className="w-[#E0000B] w-3.5 h-3.5" />
                          </Link>
                        ) : service.id === "uiux-design" ? (
                          <Link
                            href="/services/uiux-design"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E0000B] hover:text-[#111111] transition-colors"
                          >
                            <span>Explore UI/UX Design Page</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#E0000B]" />
                          </Link>
                        ) : (
                          <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-[#111111] transition-colors"
                          >
                            <span>View Related Works</span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                          </Link>
                        )}
                      </div>

                    </div>

                    {/* VISUAL DISPLAY (6 COLS) WITH CLEAN EDGE-TO-EDGE DISPLAY */}
                    <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[400px] rounded-3xl overflow-hidden bg-gray-900 border border-black/10 shadow-lg group/img">

                        {/* Service Image with Pristine Aspect & Alignment */}
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={idx < 2}
                          className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                        />

                        {/* Soft Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                        {/* Top-Right Status Badge */}
                        <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#E0000B] animate-pulse" />
                          <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                            PRODUCTION READY
                          </span>
                        </div>

                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            4. THE AKTECH ENGINEERING STANDARD (VALUE PROPS)
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          <div className="bg-[#111111] text-white rounded-[3rem] p-8 sm:p-14 lg:p-20 shadow-2xl relative overflow-hidden">

            {/* Ambient Red Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E0000B]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mb-16 relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
                THE AKTECH STANDARD
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight uppercase leading-tight">
                WHY ENTERPRISES CHOOSE AKTECH FOR CRITICAL DIGITAL ENGINEERING.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
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
                  icon: Cpu,
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
                  <div
                    key={rIdx}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#E0000B]/50 transition-colors duration-300 group"
                  >
                    <IconComponent className="w-7 h-7 text-[#E0000B] mb-4 group-hover:scale-110 transition-transform" />
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

        {/* ═════════════════════════════════════════════════════════════
            5. FINAL CALL TO ACTION (CTA)
           ═════════════════════════════════════════════════════════════ */}
        <section className="text-center max-w-4xl mx-auto py-8">
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white border border-black/10 shadow-lg">
            <Sparkles className="w-8 h-8 text-[#E0000B] mx-auto mb-4" />
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight mb-4">
              READY TO BUILD YOUR NEXT DIGITAL SOLUTION?
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Tell us about your project requirements, timeline, and goals. Our engineering team will review your request and provide a detailed roadmap and estimate within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#C00009] transition-all flex items-center gap-2 group"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 rounded-full bg-gray-100 text-[#111111] font-heading font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                Explore Portfolio
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
