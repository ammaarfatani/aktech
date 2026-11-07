"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutGrid,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Users,
  Layers,
  ArrowRight,
  ChevronRight,
  Database,
  ShieldCheck,
  BarChart3,
  Calendar,
  Lock,
  Workflow,
  Receipt,
  FileSpreadsheet,
} from "lucide-react";

export default function CRMServicePage() {
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
            <span className="text-[#E0000B] font-bold">CRM &amp; Business Systems</span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-4xl mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] uppercase mb-4"
            >
              CUSTOM CRM &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                BUSINESS WORKFLOW ENGINES
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-gray-600 text-lg sm:text-xl leading-relaxed font-normal"
            >
              Custom-engineered CRM platforms, sales pipeline trackers, inventory control systems, and executive dashboards tailored 100% to your specific company workflow.
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
                AKTECH CRM SYSTEMS — LIVE PREVIEW
              </span>
            </div>

            {/* Bottom Hero Callout Badge */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto z-20 max-w-lg p-5 sm:p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 hidden sm:block">
              <div className="flex items-center gap-2 text-[#E0000B] text-xs font-bold uppercase tracking-wider mb-1">
                <LayoutGrid className="w-4 h-4" />
                <span>Tailored Enterprise Operations</span>
              </div>
              <p className="text-white text-xs sm:text-sm leading-snug font-normal">
                No monthly per-user software fees or rigid templates. We build custom CRM software adapted to your exact operational requirements.
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
              aria-label="CRM Business Systems Cinematic Video Showcase"
            />
          </motion.div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. CORE CRM CAPABILITIES & FEATURES
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              ENTERPRISE CRM MODULES
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              WHAT OUR CUSTOM CRM PLATFORMS INCLUDE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Lead & Sales Pipeline Management",
                desc: "Track leads across custom deal stages (New, Qualified, Proposal Sent, Won/Lost) with Kanban boards, automated lead scoring, and owner assignments."
              },
              {
                icon: FileSpreadsheet,
                title: "Customer 360° Profiles",
                desc: "Centralize customer contact details, communication history, invoices, notes, document attachments, and deal values in unified profile hubs."
              },
              {
                icon: Calendar,
                title: "Tasks, Reminders & Communication",
                desc: "Automate sales team follow-up reminders, email logs, WhatsApp messaging triggers, and calendar meeting schedules."
              },
              {
                icon: Receipt,
                title: "POS & Multi-Branch Inventory",
                desc: "Track stock levels across multiple branch warehouses, process point-of-sale transactions, and generate automated purchase orders."
              },
              {
                icon: Lock,
                title: "Role-Based Access Control (RBAC)",
                desc: "Granular permission security enabling Admins, Sales Managers, Field Agents, and Accounting staff to access only authorized data views."
              },
              {
                icon: BarChart3,
                title: "Real-Time P&L & Executive Dashboards",
                desc: "Visual revenue charts, monthly sales velocity metrics, team activity leaderboards, and downloadable PDF financial reports."
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
                  DELIVERABLES &amp; IMPLEMENTATION
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight mb-6">
                  EVERYTHING INCLUDED IN OUR CRM SCOPE
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  We engineer fully custom CRM software with zero per-user licensing fees, complete IP transfer, and dedicated database hosting tailored to your business structure.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Custom Lead Pipeline & Kanban Stage Customization",
                    "Granular Role-Based Access Control (RBAC) Architecture",
                    "Automated Email, SMS & WhatsApp Notification Triggers",
                    "Interactive Executive Analytics & Financial P&L Dashboards",
                    "Multi-Branch Stock & POS Inventory Data Model",
                    "REST API & Third-Party Webhook Data Synchronization",
                    "Full IP Transfer, Source Code & Self-Hosted Deployment"
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
                  <span>Request Custom CRM Proposal</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>

              {/* Right Column: Tech Stack Cards */}
              <div className="lg:col-span-6">
                <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E0000B] mb-4 block">
                    CRM ENGINE TECH STACK
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight mb-6">
                    BUILT FOR ENTERPRISE SCALABILITY
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Next.js 16", desc: "React Dashboard UI" },
                      { name: "Node.js", desc: "Backend Execution" },
                      { name: "PostgreSQL", desc: "Relational Database" },
                      { name: "Prisma ORM", desc: "Database Schema" },
                      { name: "Redis", desc: "Real-Time Cache" },
                      { name: "Tailwind CSS", desc: "Custom Admin UI" },
                      { name: "REST APIs", desc: "System Integration" },
                      { name: "Docker / AWS", desc: "Enterprise Hosting" }
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
            4. OUR CRM DEVELOPMENT PROCESS
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              OUR CRM METHODOLOGY
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              HOW WE BUILD CUSTOM CRM SYSTEMS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Business Workflow Audit",
                desc: "We analyze your current sales pipeline, customer communication channels, team roles, and data tracking requirements."
              },
              {
                step: "02",
                title: "Data Architecture & UX Wireframes",
                desc: "We design custom relational database schemas and interactive admin dashboard wireframes tailored to your team."
              },
              {
                step: "03",
                title: "System Engineering & API Wiring",
                desc: "We write full-stack application code, configure RBAC security matrices, and wire automated messaging triggers."
              },
              {
                step: "04",
                title: "Deployment & Staff Onboarding",
                desc: "We launch the CRM on your private server infrastructure, migrate legacy customer data, and train your team."
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
              READY TO BUILD A CUSTOM CRM FOR YOUR BUSINESS?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Schedule a workflow consultation or request a custom CRM development scope and cost estimate from the AKTECH engineering team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#C00009] transition-all flex items-center gap-2 group"
              >
                <span>Start CRM Project</span>
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
