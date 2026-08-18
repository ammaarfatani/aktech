"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Globe,
  Layers,
  ArrowRight,
  BarChart3,
  ChevronRight,
  ShieldCheck,
  FileCode2,
  LineChart,
  Target,
  Award,
} from "lucide-react";

export default function SEOServicePage() {
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
            <span className="text-[#E0000B] font-bold">SEO &amp; Digital Growth</span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-4xl mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] uppercase mb-4"
            >
              TECHNICAL SEO &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                ORGANIC SEARCH AUTHORITY
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-gray-600 text-lg sm:text-xl leading-relaxed font-normal"
            >
              Command search engine authority, rank for competitive industry keywords, and convert organic traffic into recurring revenue through technical audits, JSON-LD schema, and speed optimization.
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
                AKTECH ORGANIC LABS — LIVE AUDIT
              </span>
            </div>

            {/* Bottom Hero Callout Badge */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto z-20 max-w-lg p-5 sm:p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 hidden sm:block">
              <div className="flex items-center gap-2 text-[#E0000B] text-xs font-bold uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>Search Engine Authority Standard</span>
              </div>
              <p className="text-white text-xs sm:text-sm leading-snug font-normal">
                We optimize site architecture, indexation, structured data, and Core Web Vitals to guarantee search engines index and rank every high-value page.
              </p>
            </div>

            {/* CINEMATIC VIDEO COMPONENT */}
            <video
              ref={videoRef}
              src="/services/seo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain block z-0 rounded-3xl sm:rounded-[2.5rem]"
              aria-label="SEO Service Cinematic Video Showcase"
            />
          </motion.div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. CORE SEO CAPABILITIES & SERVICES
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              ORGANIC GROWTH ENGINE
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              WHAT OUR SEO ENGINEERING PROVIDES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Comprehensive Technical SEO Audits",
                desc: "Identify and resolve crawl errors, canonical mismatches, broken links, XML sitemap defects, and indexing bottlenecks across your website."
              },
              {
                icon: FileCode2,
                title: "JSON-LD Schema & Rich Snippets",
                desc: "Inject structured Schema.org markup for Organization, Products, FAQs, and Breadcrumbs to earn eye-catching Google rich snippets."
              },
              {
                icon: Target,
                title: "High-Intent Keyword Targeting",
                desc: "In-depth competitor analysis and keyword research targeting high-converting commercial intent search terms."
              },
              {
                icon: Globe,
                title: "Local SEO & Google Business Profile",
                desc: "Dominate local map pack rankings, optimize NAP citations, and drive geo-targeted leads directly to your storefront or office."
              },
              {
                icon: LineChart,
                title: "E-Commerce & Product SEO",
                desc: "Structure e-commerce category trees, product meta tags, and internal link equity to maximize organic product revenue."
              },
              {
                icon: Award,
                title: "Conversion Rate Optimization (CRO)",
                desc: "Transform organic impressions into sales leads through user behavior analysis, CTA positioning, and speed tuning."
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
                  DELIVERABLES &amp; SCOPE
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight mb-6">
                  EVERYTHING INCLUDED IN OUR SEO GROWTH SCOPE
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  We don't sell vanity metrics or low-quality backlinks. We engineer technical site architecture and content strategies designed for sustainable top-ranking search positions.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Full Technical & Crawlability Audit Documentation",
                    "Structured JSON-LD Schema Code Generation & Injection",
                    "PageSpeed & Core Web Vitals Performance Tuning",
                    "High-Intent Commercial Keyword Mapping Matrix",
                    "Google Search Console & GA4 Custom Analytics Setup",
                    "Google Business Profile & Local Citation Optimization",
                    "Monthly Executive Rank Tracking & Organic Revenue Reports"
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
                  <span>Request Free SEO Audit</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>

              {/* Right Column: Tech Stack Cards */}
              <div className="lg:col-span-6">
                <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E0000B] mb-4 block">
                    SEO TOOLING &amp; DIAGNOSTICS
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight mb-6">
                    ENTERPRISE SEO INFRASTRUCTURE
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Google Search Console", desc: "Indexing & Performance" },
                      { name: "Ahrefs & SEMrush", desc: "Keyword & Backlink Audits" },
                      { name: "Screaming Frog", desc: "Deep Technical Crawling" },
                      { name: "Schema.org JSON-LD", desc: "Structured Data Engine" },
                      { name: "Google Analytics 4", desc: "Conversion Tracking" },
                      { name: "PageSpeed Insights", desc: "Core Web Vitals" },
                      { name: "Google Business", desc: "Local Map Pack Scale" },
                      { name: "Hotjar / Clarity", desc: "UX & Behavior Mapping" }
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
            4. OUR SEO METHODOLOGY & PROCESS
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              OUR METHODOLOGY
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              THE AKTECH SEO GROWTH PROCESS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Technical & Speed Audit",
                desc: "We perform a deep crawl of your domain to uncover indexing barriers, broken redirects, slow server response, and missing schema."
              },
              {
                step: "02",
                title: "On-Page & Schema Engineering",
                desc: "We restructure headers, meta tags, JSON-LD schema, and internal linking to align with search intent and Google best practices."
              },
              {
                step: "03",
                title: "Content & Keyword Strategy",
                desc: "We publish and optimize high-value content target matrices designed to rank for high-intent revenue keywords."
              },
              {
                step: "04",
                title: "Authority Scaling & Monitoring",
                desc: "We continuously monitor keyword positions, optimize CTRs, and scale domain authority for long-term organic growth."
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
              READY TO SCALE YOUR ORGANIC SEARCH RANKINGS?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Claim your complimentary technical SEO audit or request an organic growth strategy proposal from the AKTECH SEO team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#C00009] transition-all flex items-center gap-2 group"
              >
                <span>Request Free SEO Audit</span>
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
