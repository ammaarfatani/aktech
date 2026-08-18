"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Cpu,
  Layers,
  ArrowRight,
  LayoutGrid,
  Database,
  ChevronRight,
  ShieldCheck,
  BrainCircuit,
  MessageSquare,
  Workflow,
  Network,
  Activity,
  Terminal,
} from "lucide-react";

export default function AIAgentServicePage() {
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
            <span className="text-[#E0000B] font-bold">AI Agents &amp; Autonomous Automation</span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-4xl mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] uppercase mb-4"
            >
              AUTONOMOUS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                AI AGENTS &amp; WORKFLOW PIPELINES
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-gray-600 text-lg sm:text-xl leading-relaxed font-normal"
            >
              Streamline operations, capture qualified leads 24/7, and eliminate manual tasks with custom OpenAI/Anthropic agents, RAG knowledge engines, and n8n autonomous workflow pipelines.
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
                AKTECH AI LABS — LIVE DEMO
              </span>
            </div>

            {/* Bottom Hero Callout Badge */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto z-20 max-w-lg p-5 sm:p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 hidden sm:block">
              <div className="flex items-center gap-2 text-[#E0000B] text-xs font-bold uppercase tracking-wider mb-1">
                <BrainCircuit className="w-4 h-4" />
                <span>24/7 Autonomous Execution</span>
              </div>
              <p className="text-white text-xs sm:text-sm leading-snug font-normal">
                AI Agents process incoming requests, query vector databases, execute complex multi-step API calls, and automatically sync data into your CRM.
              </p>
            </div>

            {/* CINEMATIC VIDEO COMPONENT */}
            <video
              ref={videoRef}
              src="/services/ai-agent.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain block z-0 rounded-3xl sm:rounded-[2.5rem]"
              aria-label="AI Agent Cinematic Video Showcase"
            />
          </motion.div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. WHAT IS AN AI AGENT & CAPABILITIES
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              ENTERPRISE INTELLIGENCE
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              WHAT OUR AI AGENTS DO FOR YOUR BUSINESS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: "Autonomous Conversational Bots",
                desc: "Capture qualified leads 24/7, answer technical questions using proprietary knowledge bases, and book strategy meetings directly into calendar schedules."
              },
              {
                icon: Workflow,
                title: "n8n & Workflow Pipelines",
                desc: "Automate complex multi-app data workflows connecting Slack, email, CRMs, payment gateways, and databases with zero human intervention."
              },
              {
                icon: BrainCircuit,
                title: "RAG & Vector Knowledge Bases",
                desc: "Connect LLMs to internal company documents, PDFs, and API documentation for hallucination-free, context-aware AI answers."
              },
              {
                icon: Network,
                title: "Multi-Agent Orchestration",
                desc: "Deploy specialized agent swarms where researcher, copywriter, and reviewer agents collaborate to execute end-to-end tasks."
              },
              {
                icon: Database,
                title: "CRM & ERP Auto-Sync",
                desc: "Automatically extract structured JSON data from conversations, emails, or documents and inject clean records into your CRM."
              },
              {
                icon: ShieldCheck,
                title: "Human-in-the-Loop Safeguards",
                desc: "Enterprise guardrails ensuring agents strictly follow guidelines, escalate sensitive edge cases, and maintain complete audit logs."
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
                  DELIVERABLES &amp; IMPLEMENTATION SCOPE
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight mb-6">
                  EVERYTHING INCLUDED IN OUR AI AGENT BUILD SCOPE
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  We design, test, fine-tune, and deploy custom AI agents tailored precisely to your operational workflow, complete with full security controls and documentation.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Custom Conversational AI Agents & Web Widgets",
                    "n8n Self-Hosted or Cloud Workflow Pipeline Architecture",
                    "Vector DB Knowledge Base Ingestion & Embedding Setup",
                    "Webhook & REST API Integration with Internal Systems",
                    "Structured Lead Qualification & CRM Auto-Routing",
                    "Automated Fallback & Human Escalation Triggers",
                    "Full IP Ownership, System Prompts & Deployment Source Code"
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
                  <span>Request AI Strategy Proposal</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>

              {/* Right Column: Tech Stack Cards */}
              <div className="lg:col-span-6">
                <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E0000B] mb-4 block">
                    AI AGENT TECH STACK
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight mb-6">
                    POWERED BY LEADING AI FRAMEWORKS
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "OpenAI GPT-4o", desc: "Frontier LLM Engine" },
                      { name: "Anthropic Claude 3.5", desc: "Advanced Reasoning" },
                      { name: "n8n Automation", desc: "Workflow Orchestration" },
                      { name: "LangChain / LlamaIndex", desc: "Agent Framework" },
                      { name: "Pinecone / Qdrant", desc: "Vector Database" },
                      { name: "Python / Node.js", desc: "Backend Execution" },
                      { name: "Webhooks & REST APIs", desc: "System Integration" },
                      { name: "PostgreSQL", desc: "State & Analytics DB" }
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
            4. HOW WE BUILD IT (PROCESS)
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              OUR DEPLOYMENT PROCESS
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              HOW WE BUILD &amp; DEPLOY AI AGENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery & Knowledge Ingestion",
                desc: "We analyze your operational workflows, audit your documentation, and index proprietary data into vector databases."
              },
              {
                step: "02",
                title: "Prompt & Guardrail Engineering",
                desc: "We craft custom system prompt architectures, define precise agent personas, and set strict security guardrails."
              },
              {
                step: "03",
                title: "n8n Workflow Wiring",
                desc: "We wire the agent to your internal tools, CRMs, email servers, and APIs for automated execution."
              },
              {
                step: "04",
                title: "Testing, Fine-Tuning & Go-Live",
                desc: "We run edge-case simulations, refine response quality, and launch the agent live with 24/7 monitoring."
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
              READY TO AUTOMATE YOUR BUSINESS WITH AI AGENTS?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Schedule an AI strategy consultation or request a custom automation roadmap and cost estimate from the AKTECH AI engineering team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#C00009] transition-all flex items-center gap-2 group"
              >
                <span>Start AI Agent Project</span>
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
