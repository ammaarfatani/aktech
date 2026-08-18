"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Package,
  Layers,
  ArrowRight,
  ChevronRight,
  Database,
  ShieldCheck,
  BarChart3,
  Users2,
  Wallet,
  Truck,
  Workflow,
  Lock,
} from "lucide-react";

export default function ERPSystemServicePage() {
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
            <span className="text-[#E0000B] font-bold">Enterprise Resource Planning (ERP)</span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-4xl mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] uppercase mb-4"
            >
              CENTRALIZED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                ENTERPRISE ERP PLATFORMS
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-gray-600 text-lg sm:text-xl leading-relaxed font-normal"
            >
              Unify finance, inventory, procurement, human resources, supply chain, and sales channels into a single, real-time enterprise management platform engineered specifically for your organization.
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
                AKTECH ERP LABS — ENTERPRISE SUITE
              </span>
            </div>

            {/* Bottom Hero Callout Badge */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto z-20 max-w-lg p-5 sm:p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 hidden sm:block">
              <div className="flex items-center gap-2 text-[#E0000B] text-xs font-bold uppercase tracking-wider mb-1">
                <Building2 className="w-4 h-4" />
                <span>Multi-Department Centralization</span>
              </div>
              <p className="text-white text-xs sm:text-sm leading-snug font-normal">
                Eliminate fragmented spreadsheets and isolated software tools with a single, high-performance database engine tailored to your enterprise.
              </p>
            </div>

            {/* CINEMATIC VIDEO COMPONENT */}
            <video
              ref={videoRef}
              src="/services/erp.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain block z-0 rounded-3xl sm:rounded-[2.5rem]"
              aria-label="ERP System Cinematic Video Showcase"
            />
          </motion.div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. CORE ERP MODULES & CAPABILITIES
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              ENTERPRISE MODULES
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              WHAT OUR CUSTOM ERP SOLUTIONS INCLUDE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "Inventory & Warehouse Control",
                desc: "Real-time stock tracking across multi-location warehouses, SKU management, automated reorder thresholds, and serial barcode scanning."
              },
              {
                icon: Wallet,
                title: "Finance & Accounting Ledger",
                desc: "General ledger accounting, accounts receivable/payable, tax compliance modules, profit margin analytics, and automated invoicing."
              },
              {
                icon: Truck,
                title: "Sales Order & Supply Chain",
                desc: "End-to-end order processing from customer quote generation to fulfillment tracking, vendor purchase orders, and logistics sync."
              },
              {
                icon: Users2,
                title: "HR & Employee Management",
                desc: "Employee profiles, payroll processing, attendance tracking, performance evaluations, and department permission assignment."
              },
              {
                icon: ShieldCheck,
                title: "Granular RBAC Security & Audit Logs",
                desc: "Enterprise-grade role-based access security, multi-factor authentication, and immutable audit logs for every system action."
              },
              {
                icon: BarChart3,
                title: "Executive Business Intelligence",
                desc: "Real-time cross-departmental dashboards, custom KPI reporting, sales forecasting, and automated executive PDF digests."
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
                  TECHNICAL DELIVERABLES
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight mb-6">
                  EVERYTHING INCLUDED IN OUR ERP DEVELOPMENT SCOPE
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  We design and build bespoke ERP solutions tailored 100% to your enterprise operations, backed by full IP ownership and zero recurring user licensing costs.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Multi-Module Custom ERP Software Architecture",
                    "Warehouse, Inventory & Barcode Integration",
                    "Automated General Ledger & Invoicing Modules",
                    "Granular Multi-Role Access Control (RBAC)",
                    "Real-Time Executive Business Intelligence Dashboards",
                    "Custom REST API & External ERP Webhook Connectors",
                    "Full IP Transfer, Source Code & On-Premise/Cloud Deployment"
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
                  <span>Request Custom ERP Proposal</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>

              {/* Right Column: Tech Stack Cards */}
              <div className="lg:col-span-6">
                <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E0000B] mb-4 block">
                    ERP ARCHITECTURE STACK
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight mb-6">
                    ENGINEERED FOR HIGH SPEED &amp; RELIABILITY
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Next.js 16", desc: "Enterprise Dashboard UI" },
                      { name: "Node.js", desc: "Microservices Backend" },
                      { name: "PostgreSQL", desc: "ACID Relational DB" },
                      { name: "GraphQL / REST", desc: "High-Speed Data API" },
                      { name: "Docker", desc: "Containerized Microservices" },
                      { name: "Redis", desc: "In-Memory Caching" },
                      { name: "Tailwind CSS", desc: "Design System UI" },
                      { name: "AWS / On-Prem", desc: "Private Cloud Infrastructure" }
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
            4. OUR ERP DEVELOPMENT PROCESS
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              ERP IMPLEMENTATION PROCESS
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              HOW WE BUILD &amp; DEPLOY CUSTOM ERP SYSTEMS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Enterprise Operations Audit",
                desc: "We analyze multi-departmental workflows, inventory mechanics, financial ledgers, and reporting requirements."
              },
              {
                step: "02",
                title: "Database & Module Architecture",
                desc: "We architect normalized relational database schemas and define core ERP module boundaries and RBAC permissions."
              },
              {
                step: "03",
                title: "Custom Module Engineering",
                desc: "We build custom inventory, finance, order fulfillment, and HR modules with real-time API integrations."
              },
              {
                step: "04",
                title: "Data Migration & Onboarding",
                desc: "We migrate legacy business data, deploy on secure private infrastructure, and provide comprehensive staff training."
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
              READY TO CENTRALIZE YOUR BUSINESS OPERATIONS WITH AN ERP?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Schedule an enterprise consultation or request a custom ERP development roadmap and cost estimate from the AKTECH engineering team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#C00009] transition-all flex items-center gap-2 group"
              >
                <span>Start ERP Project</span>
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
