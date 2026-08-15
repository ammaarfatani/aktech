"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Mail } from "lucide-react";

export function Footer() {
  return (
    <>
      {/* ═════════════════════════════════════════════════════════════
          SECTION 1: STANDALONE FINAL CTA BLOCK (BLACK / DEEP CHARCOAL)
         ═════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#111111] text-white py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/10" id="contact-cta">
        
        {/* Subtle Brand Ambient Lighting (AKTECH Red Glow on Dark Canvas) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[350px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E0000B]/18 via-[#E0000B]/4 to-transparent pointer-events-none blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E0000B]/40 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          {/* Small Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md w-fit"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E0000B]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-white/90">
              START A CONVERSATION
            </span>
          </motion.div>

          {/* Main Headline & Supporting Copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <h2 className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.02] uppercase mb-6">
                <span className="text-white">LET&apos;S BUILD</span> <br />
                <span className="text-[#E0000B]">
                  SOMETHING GREAT.
                </span>
              </h2>

              <p className="text-[#D1D1D1] text-base sm:text-xl max-w-xl font-normal leading-relaxed">
                Have an idea, a product, or a business problem? Let&apos;s turn it into something that works.
              </p>
            </motion.div>

            {/* CTA Buttons (Mailto & Contact Page / WhatsApp) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-4"
            >
              {/* Direct Official Email Link */}
              <a
                href="mailto:hello@aktech.tech"
                className="group relative px-7 py-5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-heading font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <Mail className="w-4 h-4 text-[#E0000B] group-hover:scale-110 transition-transform" />
                <span className="lowercase font-bold">hello@aktech.tech</span>
              </a>

              {/* Direct Contact Button */}
              <Link
                href="/contact"
                className="group relative px-8 py-5 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_10px_35px_rgba(224,0,11,0.4)] hover:bg-[#C00009] transition-all duration-300"
              >
                <span className="text-white">LET&apos;S TALK</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 2: ACTUAL FOOTER (WHITE CANVAS)
         ═════════════════════════════════════════════════════════════ */}
      <footer className="relative bg-white text-[#111111] pt-20 pb-12 border-t border-gray-200 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          {/* Main 3-Column Bespoke Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-gray-200">
            
            {/* LEFT: BRAND COLUMN */}
            <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
              <Link href="/" className="flex items-center gap-3.5 mb-6 group">
                <div className="relative w-11 h-11">
                  <Image
                    src="/logo.png"
                    alt="AKTECH Logo"
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="font-heading font-black text-2xl tracking-tight text-[#111111]">
                    AKTECH
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E0000B]">
                    Digital Solutions
                  </span>
                </div>
              </Link>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 max-w-sm font-normal">
                Architecting the digital future through modern web experiences, intelligent systems and scalable digital products.
              </p>

              {/* Direct Email & WhatsApp Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="mailto:hello@aktech.tech"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111111] text-white border border-[#111111] text-xs font-bold tracking-wider hover:bg-[#E0000B] hover:border-[#E0000B] transition-all group shadow-md"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E0000B] group-hover:text-white transition-colors" />
                  <span className="lowercase">hello@aktech.tech</span>
                </a>

                <a
                  href="https://wa.me/923713410797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-bold uppercase tracking-wider text-[#111111] hover:bg-[#E0000B] hover:border-[#E0000B] hover:text-white transition-all group"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E0000B] group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* MIDDLE: SERVICES (4 COLS) */}
            <div className="lg:col-span-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-6">
                SERVICES
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Web Development", href: "/services" },
                  { label: "Mobile Apps", href: "/services" },
                  { label: "AI Agents & Automation", href: "/services" },
                  { label: "CRM & Business Systems", href: "/services" },
                  { label: "UI/UX Design", href: "/services" },
                  { label: "SEO & Digital Growth", href: "/services" },
                ].map((service, idx) => (
                  <li key={idx}>
                    <Link
                      href={service.href}
                      className="text-gray-600 hover:text-[#E0000B] transition-colors duration-200 block py-1 font-medium text-xs sm:text-sm"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: NAVIGATION & CONTACT (3 COLS) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-6">
                NAVIGATION
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Services", href: "/services" },
                  { label: "Portfolio", href: "/portfolio" },
                  { label: "Clients", href: "/clients" },
                  { label: "Contact", href: "/contact" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-[#E0000B] transition-colors duration-200 block py-1 font-medium text-xs sm:text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* BOTTOM BAR: COPYRIGHT & SOCIAL LINKS */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} AKTECH Digital Solutions. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="mailto:hello@aktech.tech"
                className="hover:text-[#111111] transition-colors flex items-center gap-1 group font-bold text-[#111111]"
              >
                <span>hello@aktech.tech</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E0000B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://www.instagram.com/aktech_digital_solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111111] transition-colors flex items-center gap-1 group"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E0000B] transition-all" />
              </a>

              <a
                href="https://www.linkedin.com/in/aktech-digital-solutions-bbb848418"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111111] transition-colors flex items-center gap-1 group"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E0000B] transition-all" />
              </a>

              <a
                href="https://wa.me/923713410797"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111111] transition-colors flex items-center gap-1 group"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E0000B] transition-all" />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
