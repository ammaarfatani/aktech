"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export type ServiceItem = {
  number: string;
  title: string;
  category: string;
  description: string;
  capabilities: string[];
  image: string;
};

const SERVICES_DATA: ServiceItem[] = [
  {
    number: "01",
    title: "Website Development",
    category: "WEB & DIGITAL",
    description: "High-performance enterprise websites engineered for global scale, maximum search visibility, and award-winning agency aesthetics.",
    capabilities: ["Next.js & React Ecosystem", "WebGL & Micro-Interactions", "Headless CMS Architecture", "Speed & SEO Optimization"],
    image: "/projects/school.png",
  },
  {
    number: "02",
    title: "Web Applications & SaaS",
    category: "CLOUD & FULL-STACK",
    description: "Scalable cloud-native web applications with real-time data pipelines, API integrations, and robust backend architectures.",
    capabilities: ["Full-Stack System Design", "Node.js & PostgreSQL", "Real-Time Data Streams", "High Concurrency Support"],
    image: "/projects/web.png",
  },
  {
    number: "03",
    title: "E-Commerce Platforms",
    category: "COMMERCE",
    description: "Bespoke digital storefronts and full-stack shopping platforms engineered for ultra-fast page speed and frictionless checkout.",
    capabilities: ["Custom Shopping Cart Flow", "Secure Payment Gateways", "Inventory & Order Sync", "Checkout Optimization"],
    image: "/projects/onlineShop.png",
  },
  {
    number: "04",
    title: "Custom Software Development",
    category: "ENTERPRISE",
    description: "Tailor-made software applications designed around your unique operational workflows, data logic, and business goals.",
    capabilities: ["Bespoke Business Logic", "Database Architecture", "Third-Party API Integration", "Scalable System Engine"],
    image: "/projects/laiba.png",
  },
  {
    number: "05",
    title: "CRM & ERP Systems",
    category: "BUSINESS AUTOMATION",
    description: "Centralized operational platforms for branch management, POS terminals, inventory control, user roles, and executive dashboards.",
    capabilities: ["Multi-Branch Management", "Real-Time POS Workflows", "Role-Based Access (RBAC)", "Revenue & P&L Dashboards"],
    image: "/projects/resto-crm.png",
  },
  {
    number: "06",
    title: "Mobile App Development",
    category: "MOBILE",
    description: "Fluid cross-platform and native mobile applications delivering Apple-level polish and performance across iOS and Android.",
    capabilities: ["iOS & Android Engineering", "Offline Sync & Caching", "Push Notification Pipelines", "App Store Deployment"],
    image: "/projects/gym.png",
  },
  {
    number: "07",
    title: "AI Agents & Automation",
    category: "ARTIFICIAL INTELLIGENCE",
    description: "Intelligent conversational AI agents and workflow automations that streamline lead qualification and operational efficiency.",
    capabilities: ["n8n Workflow Automation", "AI Conversational Bots", "Lead Processing Pipelines", "Intelligent Data Parsing"],
    image: "/projects/agency.png",
  },
  {
    number: "08",
    title: "SEO & Digital Marketing",
    category: "GROWTH & MARKETING",
    description: "Data-driven search engine optimization, content strategy, and digital marketing campaigns engineered to command organic authority and drive revenue.",
    capabilities: ["Technical SEO Audits", "Keyword Strategy & Content", "Conversion Rate Optimization (CRO)", "Search Rankings & Analytics"],
    image: "/projects/urge.png",
  },
  {
    number: "09",
    title: "Website Maintenance & Support",
    category: "CARE & MAINTENANCE",
    description: "Proactive ongoing website maintenance, bug fixes, content management, and uptime monitoring ensuring your digital platform operates flawlessly 24/7.",
    capabilities: ["24/7 Uptime & Health Checks", "Bug Fixes & Patching", "Content & Asset Updates", "Backup & Recovery Infrastructure"],
    image: "/projects/sized.png",
  },
  {
    number: "10",
    title: "Monthly Technical Support",
    category: "RETAINER SUPPORT",
    description: "Dedicated monthly engineering support providing on-demand technical assistance, server troubleshooting, API management, and architecture consultation.",
    capabilities: ["Dedicated Support Engineers", "API & Server Monitoring", "Priority Issue Resolution", "Monthly Health Audits"],
    image: "/projects/houseofmusab.png",
  },
  {
    number: "11",
    title: "Performance Optimization",
    category: "SPEED & SCALING",
    description: "Deep code optimization, Core Web Vitals enhancement, database query tuning, and asset compression for lightning-fast page loading speeds.",
    capabilities: ["Core Web Vitals Optimization", "Database & Query Tuning", "Asset & Bundle Compression", "CDN & Caching Strategy"],
    image: "/projects/inventory-crm .png",
  },
  {
    number: "12",
    title: "Security & System Updates",
    category: "CYBERSECURITY",
    description: "Comprehensive vulnerability patching, dependency upgrades, SSL/TLS hardening, and proactive security monitoring against digital threats.",
    capabilities: ["Security Vulnerability Audits", "Dependency & Framework Upgrades", "SSL & Encryption Hardening", "Malware & Threat Protection"],
    image: "/projects/houseofwasila.png",
  },
  {
    number: "13",
    title: "UI/UX Design & Branding",
    category: "DESIGN SYSTEM",
    description: "Frictionless product design, high-conversion user flows, and iconic visual identities crafted with deep art direction.",
    capabilities: ["Design Systems & UI Kits", "Interactive Prototypes", "User Journey Research", "Digital Brand Guidelines"],
    image: "/projects/perfumes.png",
  },
];

export function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeService = SERVICES_DATA[activeIndex];

  const scrollNav = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#F8FAFC] border-t border-black/5 overflow-hidden" id="services">
      <div className="max-w-[1300px] mx-auto">
        
        {/* ───── 1. EDITORIAL HEADER ───── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[#111111]/5 border border-[#111111]/10">
            <Sparkles className="w-4 h-4 text-[#E0000B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111]">
              WHAT WE DO
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05]">
            Digital Solutions, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
              Built Around Your Business.
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed mt-4">
            Explore our full suite of engineering, digital product, AI automation, and technical support capabilities.
          </p>
        </div>

        {/* ───── 2. LARGE FEATURED SERVICE DISPLAY ───── */}
        <div className="bg-white border border-black/10 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] mb-12">
          
          {/* A. Subdued Desktop Browser Frame (UN-CROPPED FULL READABLE DISPLAY) */}
          <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[580px] rounded-2xl overflow-hidden border border-black/10 bg-[#0D0D0D] flex flex-col justify-between mb-8 shadow-inner">
            
            {/* Browser Header Bar */}
            <div className="h-10 bg-[#161616] border-b border-white/10 px-4 flex items-center justify-between shrink-0 z-20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="px-4 py-1 rounded-md bg-white/10 text-white/70 text-[11px] font-mono tracking-wide hidden sm:block">
                aktech.digital/{activeService.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#E0000B] uppercase">
                {activeService.category}
              </span>
            </div>

            {/* Uncropped Project Visual Area (Object-Contain Preserved Aspect Ratio) */}
            <div className="relative flex-1 w-full h-full p-4 sm:p-8 flex items-center justify-center bg-[#090909]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.number}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    sizes="1200px"
                    priority
                    className="object-contain drop-shadow-2xl rounded-lg"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* B. Active Service Details Bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4"
            >
              <div className="max-w-2xl">
                {/* Number & Title */}
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-3xl sm:text-4xl font-heading font-black text-[#E0000B]">
                    {activeService.number}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#111111] tracking-tight">
                    {activeService.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal mb-6">
                  {activeService.description}
                </p>

                {/* Capabilities Pills */}
                <div className="flex flex-wrap gap-2">
                  {activeService.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111]/5 border border-black/10 text-xs font-semibold text-[#111111]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E0000B]" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Project Link */}
              <Link
                href="https://wa.me/923713410797"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#111111] text-white font-heading font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#E0000B] transition-colors duration-300 shadow-md shrink-0"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </Link>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* ───── 3. HORIZONTAL SERVICE NAVIGATION BAR ───── */}
        <div className="relative pt-4">
          
          {/* Section Sub-heading & Scroll Buttons */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              SELECT SERVICE TO EXPLORE ({SERVICES_DATA.length})
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollNav("left")}
                className="w-9 h-9 rounded-full border border-black/10 bg-white flex items-center justify-center text-[#111111] hover:border-[#E0000B] hover:bg-[#E0000B] hover:text-white transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollNav("right")}
                className="w-9 h-9 rounded-full border border-black/10 bg-white flex items-center justify-center text-[#111111] hover:border-[#E0000B] hover:bg-[#E0000B] hover:text-white transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontally Scrollable Bar */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-3 overflow-x-auto py-3 px-1 scrollbar-none no-scrollbar scroll-smooth w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {SERVICES_DATA.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={service.number}
                  onClick={() => setActiveIndex(index)}
                  className={`group shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all duration-300 text-left ${
                    isActive
                      ? "bg-[#111111] text-white border-[#111111] shadow-lg scale-105"
                      : "bg-white text-[#111111] border-black/10 hover:border-[#E0000B]/40 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`text-xs font-heading font-black tracking-wider ${
                      isActive ? "text-[#E0000B]" : "text-gray-400 group-hover:text-[#E0000B]"
                    }`}
                  >
                    {service.number}
                  </span>
                  <span className="text-sm font-heading font-bold whitespace-nowrap">
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
