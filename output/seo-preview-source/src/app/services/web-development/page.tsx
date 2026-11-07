"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Code2,
  ShieldCheck,
  Layers,
  ArrowRight,
  LayoutGrid,
  Database,
  ChevronRight,
  ShoppingBag,
  Store,
  Layout,
  Cpu,
  CheckSquare,
  Lock,
} from "lucide-react";

export default function WebDevelopmentServicePage() {
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
            <span className="text-[#E0000B] font-bold">Web Development</span>
          </motion.div>

          {/* Headline & Value Proposition */}
          <div className="max-w-4xl mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] uppercase mb-4"
            >
              WORDPRESS, SHOPIFY &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                CUSTOM WEB DEVELOPMENT
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-gray-600 text-lg sm:text-xl leading-relaxed font-normal"
            >
              We build websites and web solutions using the right technology for your business — from high-converting WordPress and Shopify platforms to fully customized web applications and SaaS platforms.
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
                AKTECH WEB STUDIO — LIVE PREVIEW
              </span>
            </div>

            {/* Bottom Hero Callout Badge */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto z-20 max-w-lg p-5 sm:p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 hidden sm:block">
              <div className="flex items-center gap-2 text-[#E0000B] text-xs font-bold uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4" />
                <span>Tailored Tech Architecture</span>
              </div>
              <p className="text-white text-xs sm:text-sm leading-snug font-normal">
                Whether you need a content-managed WordPress site, a scalable Shopify store, or a bespoke Next.js web application, every build is optimized for speed, security, and sales conversions.
              </p>
            </div>

            {/* CINEMATIC VIDEO COMPONENT */}
            <video
              ref={videoRef}
              src="/services/web-dev.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain block z-0 rounded-3xl sm:rounded-[2.5rem]"
              aria-label="Web Development Cinematic Video Showcase"
            />
          </motion.div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. THREE CORE WEB SOLUTIONS (WORDPRESS, SHOPIFY, CUSTOM)
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
              OUR THREE WEB PILLARS
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
              CHOOSE THE RIGHT PLATFORM FOR YOUR BUSINESS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 1. WORDPRESS DEVELOPMENT */}
            <div className="bg-white border border-black/10 rounded-[2.5rem] p-8 sm:p-10 hover:border-[#E0000B] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gray-100 border border-black/5 flex items-center justify-center mb-6 group-hover:bg-[#E0000B] transition-colors">
                  <Globe className="w-7 h-7 text-[#111111] group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-mono font-bold text-[#E0000B] uppercase tracking-widest block mb-2">
                  CONTENT &amp; CORPORATE
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-[#111111] uppercase tracking-tight mb-4">
                  WordPress Development
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
                  Ideal for businesses needing easy content management, corporate blogging, and fast editorial publishing without complex coding.
                </p>

                <div className="space-y-2.5 mb-8 border-t border-black/5 pt-6">
                  {[
                    "Business & Corporate Websites",
                    "Custom Theme & Plugin Customization",
                    "WooCommerce Store Setup",
                    "High-Converting Landing Pages",
                    "Speed, SEO & Security Tuning"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E0000B] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gray-100 text-[#111111] font-heading font-bold text-xs uppercase tracking-wider group-hover:bg-[#E0000B] group-hover:text-white transition-all"
              >
                <span>Build WordPress Site</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 2. SHOPIFY DEVELOPMENT */}
            <div className="bg-white border border-black/10 rounded-[2.5rem] p-8 sm:p-10 hover:border-[#E0000B] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gray-100 border border-black/5 flex items-center justify-center mb-6 group-hover:bg-[#E0000B] transition-colors">
                  <ShoppingBag className="w-7 h-7 text-[#111111] group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-mono font-bold text-[#E0000B] uppercase tracking-widest block mb-2">
                  E-COMMERCE &amp; RETAIL
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-[#111111] uppercase tracking-tight mb-4">
                  Shopify Development
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
                  Turn online visitors into repeat buyers with high-converting custom Shopify storefronts, product catalogs, and payment gateways.
                </p>

                <div className="space-y-2.5 mb-8 border-t border-black/5 pt-6">
                  {[
                    "Custom Shopify Storefronts & Liquid Themes",
                    "Product & Collection Architecture",
                    "Payment & Shipping Integration",
                    "Shopify App Ecosystem Setup",
                    "Store Conversion & Speed Optimization"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E0000B] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gray-100 text-[#111111] font-heading font-bold text-xs uppercase tracking-wider group-hover:bg-[#E0000B] group-hover:text-white transition-all"
              >
                <span>Launch Shopify Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3. CUSTOM WEB DEVELOPMENT */}
            <div className="bg-white border border-black/10 rounded-[2.5rem] p-8 sm:p-10 hover:border-[#E0000B] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gray-100 border border-black/5 flex items-center justify-center mb-6 group-hover:bg-[#E0000B] transition-colors">
                  <Code2 className="w-7 h-7 text-[#111111] group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-mono font-bold text-[#E0000B] uppercase tracking-widest block mb-2">
                  TAILORED &amp; SCALABLE
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-[#111111] uppercase tracking-tight mb-4">
                  Custom Web Engineering
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
                  Built from scratch for businesses requiring complex web applications, enterprise SaaS platforms, and sub-second performance.
                </p>

                <div className="space-y-2.5 mb-8 border-t border-black/5 pt-6">
                  {[
                    "Next.js 16 & React 19 Architectures",
                    "Custom SaaS & Web Application Builds",
                    "RESTful & GraphQL API Microservices",
                    "Headless CMS & Custom Admin Dashboards",
                    "Sub-Second Core Web Vitals Performance"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E0000B] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#111111] text-white font-heading font-bold text-xs uppercase tracking-wider group-hover:bg-[#E0000B] transition-all"
              >
                <span>Build Custom Application</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            3. TECH CAPABILITIES & INFRASTRUCTURE
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-24 sm:mb-32">
          <div className="bg-white border border-black/10 rounded-[2.5rem] p-8 sm:p-14 lg:p-16 shadow-lg">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
                  TECHNICAL DELIVERABLES &amp; SUPPORT
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight mb-6">
                  END-TO-END WEB DEVELOPMENT SCOPE
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  From selecting the ideal CMS or framework to ongoing maintenance and security audits — we manage every stage of your web development lifecycle.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Fully Responsive Mobile, Tablet & Desktop Layouts",
                    "WordPress, Shopify or Custom Next.js Platform Architecture",
                    "SEO Schema JSON-LD & OpenGraph Meta Tag Setup",
                    "Payment Gateway Integration (Stripe, PayPal, Local Gateways)",
                    "Google Analytics 4 & Conversion Tracking Diagnostics",
                    "Core Web Vitals & Speed Performance Tuning",
                    "Full Code IP Transfer & Admin Dashboard Handoff"
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
                  <span>Request Custom Web Proposal</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>

              {/* Right Column: Platform & Tool Stack Cards */}
              <div className="lg:col-span-6">
                <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E0000B] mb-4 block">
                    PLATFORM &amp; TECH ECOSYSTEM
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight mb-6">
                    POWERED BY TRUSTED TECHNOLOGIES
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "WordPress", desc: "CMS & Corporate Sites" },
                      { name: "Shopify & Liquid", desc: "E-Commerce Stores" },
                      { name: "WooCommerce", desc: "WordPress E-Commerce" },
                      { name: "Next.js 16", desc: "Custom React Apps" },
                      { name: "React 19", desc: "UI Components" },
                      { name: "Node.js & APIs", desc: "Backend Services" },
                      { name: "Tailwind CSS", desc: "Custom Styling" },
                      { name: "PostgreSQL / SQL", desc: "Database Storage" }
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
            4. CALL TO ACTION (CTA)
           ═════════════════════════════════════════════════════════════ */}
        <section className="text-center max-w-4xl mx-auto py-8">
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#111111] text-white shadow-2xl relative overflow-hidden">
            <Sparkles className="w-8 h-8 text-[#E0000B] mx-auto mb-4" />
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl uppercase tracking-tight mb-4">
              READY TO BUILD YOUR NEXT WEBSITE OR WEB APP?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Schedule a consultation or request a detailed scope and cost estimate for WordPress, Shopify, or Custom Web Development from AKTECH.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#C00009] transition-all flex items-center gap-2 group"
              >
                <span>Start Web Project</span>
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
