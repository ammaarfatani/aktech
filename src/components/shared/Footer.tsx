"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-3.5 h-3.5 fill-current"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-4 h-4 fill-current"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-3.5 h-3.5 fill-current"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-3.5 h-3.5 fill-current"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Footer() {
  return (
    <>
      {/* ═════════════════════════════════════════════════════════════
          SECTION 1: STANDALONE FINAL CTA BLOCK (BLACK / DEEP CHARCOAL)
         ═════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#111111] text-white py-20 sm:py-32 px-4 sm:px-10 lg:px-16 overflow-hidden border-t border-white/10" id="contact-cta">
        
        {/* Subtle Brand Ambient Lighting (AKTECH Red Glow on Dark Canvas) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[350px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E0000B]/18 via-[#E0000B]/4 to-transparent pointer-events-none blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E0000B]/40 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative z-10 w-full min-w-0">
          
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between w-full min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 min-w-0"
            >
              <h2 className="font-heading font-extrabold text-4xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.02] uppercase mb-6 break-words">
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
              className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3.5 sm:gap-4 w-full min-w-0"
            >
              {/* Direct Official Email Link */}
              <a
                href="mailto:hello@aktech.tech"
                className="group relative px-6 sm:px-7 py-4 sm:py-5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-heading font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-md shadow-lg max-w-full min-w-0 break-all"
              >
                <Mail className="w-4 h-4 text-[#E0000B] group-hover:scale-110 transition-transform shrink-0" />
                <span className="lowercase font-bold truncate sm:whitespace-normal">hello@aktech.tech</span>
              </a>

              {/* Direct Contact Button */}
              <Link
                href="/contact"
                className="group relative px-8 py-4 sm:py-5 rounded-full bg-[#E0000B] text-white font-heading font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_10px_35px_rgba(224,0,11,0.4)] hover:bg-[#C00009] transition-all duration-300 shrink-0"
              >
                <span className="text-white">LET&apos;S TALK</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </Link>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          SECTION 2: ACTUAL FOOTER (WHITE CANVAS)
         ═════════════════════════════════════════════════════════════ */}
      <footer className="relative bg-white text-[#111111] pt-16 sm:pt-20 pb-12 border-t border-gray-200 overflow-hidden w-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-16 relative z-10 w-full min-w-0">
          
          {/* Main 3-Column Bespoke Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-12 sm:pb-16 border-b border-gray-200 w-full min-w-0">
            
            {/* LEFT: BRAND COLUMN */}
            <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8 min-w-0 w-full">
              <Link href="/" className="flex items-center gap-3.5 mb-6 group min-w-0">
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0">
                  <Image
                    src="/logo.png"
                    alt="AKTECH Logo"
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-[#111111]">
                    AKTECH
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.28em] text-[#E0000B]">
                    Digital Solutions
                  </span>
                </div>
              </Link>

              <p className="text-gray-600 text-xs sm:text-base leading-relaxed mb-6 max-w-sm font-normal">
                Architecting the digital future through modern web experiences, intelligent systems and scalable digital products.
              </p>

              {/* Direct Email & WhatsApp Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full min-w-0">
                <a
                  href="mailto:hello@aktech.tech"
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-[#111111] text-white border border-[#111111] text-xs font-bold tracking-wider hover:bg-[#E0000B] hover:border-[#E0000B] transition-all group shadow-md max-w-full min-w-0 break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E0000B] group-hover:text-white transition-colors shrink-0" />
                  <span className="lowercase truncate sm:whitespace-normal">hello@aktech.tech</span>
                </a>

                <a
                  href="https://wa.me/923713410797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-bold uppercase tracking-wider text-[#111111] hover:bg-[#E0000B] hover:border-[#E0000B] hover:text-white transition-all group shrink-0"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#E0000B] group-hover:text-white transition-colors shrink-0" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors shrink-0" />
                </a>
              </div>
            </div>

            {/* MIDDLE: SERVICES (4 COLS) */}
            <div className="lg:col-span-4 min-w-0 w-full">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-5 sm:mb-6">
                SERVICES
              </h4>
              <ul className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm">
                {[
                  { label: "Web Development", href: "/services" },
                  { label: "Mobile Apps", href: "/services" },
                  { label: "AI Agents & Automation", href: "/services" },
                  { label: "CRM & Business Systems", href: "/services" },
                  { label: "UI/UX Design", href: "/services" },
                  { label: "SEO & Digital Growth", href: "/services" },
                ].map((service, idx) => (
                  <li key={idx} className="min-w-0">
                    <Link
                      href={service.href}
                      className="text-gray-600 hover:text-[#E0000B] transition-colors duration-200 block py-0.5 font-medium truncate"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: NAVIGATION & CONTACT (3 COLS) */}
            <div className="lg:col-span-3 min-w-0 w-full">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-5 sm:mb-6">
                NAVIGATION
              </h4>
              <ul className="grid grid-cols-2 sm:flex sm:flex-col gap-2.5 text-xs sm:text-sm">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Services", href: "/services" },
                  { label: "Portfolio", href: "/portfolio" },
                  { label: "Clients", href: "/clients" },
                  { label: "Contact", href: "/contact" },
                ].map((item, idx) => (
                  <li key={idx} className="min-w-0">
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-[#E0000B] transition-colors duration-200 block py-0.5 font-medium truncate"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* BOTTOM BAR: COPYRIGHT & SOCIAL LINKS */}
          <div className="pt-6 sm:pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-xs font-medium text-gray-500 w-full min-w-0">
            
            {/* Copyright Notice & Email Link */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full lg:w-auto min-w-0">
              <p className="text-gray-500 min-w-0 break-words">
                &copy; {new Date().getFullYear()} AKTECH Digital Solutions. All rights reserved.
              </p>

              <a
                href="mailto:hello@aktech.tech"
                className="inline-flex items-center gap-1.5 text-[#111111] hover:text-[#E0000B] font-bold transition-colors group min-w-0 break-all py-0.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#E0000B] shrink-0" />
                <span>hello@aktech.tech</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E0000B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            </div>

            {/* Social Media Links with Platform Icons */}
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-3 w-full lg:w-auto min-w-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#111111] transition-colors group py-1"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1877F2] transition-colors shrink-0" />
                <span className="font-semibold text-gray-700 group-hover:text-[#111111]">Facebook</span>
                <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-[#E0000B] transition-all shrink-0" />
              </a>

              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#111111] transition-colors group py-1"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E4405F] transition-colors shrink-0" />
                <span className="font-semibold text-gray-700 group-hover:text-[#111111]">Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-[#E0000B] transition-all shrink-0" />
              </a>

              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#111111] transition-colors group py-1"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0A66C2] transition-colors shrink-0" />
                <span className="font-semibold text-gray-700 group-hover:text-[#111111]">LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-[#E0000B] transition-all shrink-0" />
              </a>

              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#111111] transition-colors group py-1"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#25D366] transition-colors shrink-0" />
                <span className="font-semibold text-gray-700 group-hover:text-[#111111]">WhatsApp</span>
                <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-[#E0000B] transition-all shrink-0" />
              </a>
            </div>

          </div>

        </div>
      </footer>
    </>
  );
}
