"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, Sparkles, Phone, ShieldCheck, Globe, Zap } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

// Social SVG Icons
const SOCIALS = [
  { 
    name: "LinkedIn", 
    href: "#",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> 
  },
  { 
    name: "Instagram", 
    href: "#",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> 
  },
  
  { 
    name: "Facebook", 
    href: "#",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm8.411-14.733c-.767-.358-1.89-1.077-3.606-1.637.23-.62.433-1.267.602-1.932 2.385.748 4.293 2.14 5.344 3.731-1.03-1.637-2.34-3.562-2.34-3.562zm-5.064-2.89c-.198.718-.428 1.416-.687 2.091-2.92-1.167-5.918-1.464-7.464-1.564 1.561-2.583 4.195-4.28 7.236-4.55-.41 1.053-.873 2.13-1.353 3.149-1.272 2.697-2.673 4.982-2.673 4.982.012-.008 1.341-2.247 4.941-4.108zm-9.317 1.056c1.696.113 4.887.485 7.915 1.764-1.171 2.334-2.545 4.398-4.047 6.136-3.876-1.121-6.195-3.327-6.868-4.134 1.15-1.927 2.825-3.411 4.81-4.225-.561.12-1.189.284-1.81.459zm-3.626 4.793c.725.85 2.924 3.12 6.839 4.321-1.082 2.766-2.025 5.275-2.554 6.829-3.237-1.107-5.69-3.957-6.386-7.382 1.378-.517 4.137-1.745 6.007-4.838-1.275 1.045-2.669 1.144-3.906 1.07zm9.645 10.362c.493-1.46 1.404-3.869 2.457-6.527 2.66.726 5.344.82 6.643.832-.821 2.859-2.946 5.163-5.631 6.195-.494-1.185-.989-2.34-1.474-3.414-.734 2.195-1.493 4.417-1.995 5.568v-.004zm7.625-7.797c-1.343-.016-4.01-.131-6.666-.867 1.637-2.981 2.955-6.177 3.51-8.083 1.954 1.185 3.328 3.194 3.731 5.519-1.205-.18-2.65-.255-4.21-.059 1.488-.13 2.936.425 3.635 3.49z"/></svg> 
  }
];

const STAT_CARDS = [
  { icon: <Globe className="w-5 h-5 text-blue-400" />, label: "Global Reach", value: "24+", sub: "Countries" },
  { icon: <Zap className="w-5 h-5 text-cyan-400" />, label: "Performance", value: "99.9%", sub: "Uptime SLA" },
  { icon: <ShieldCheck className="w-5 h-5 text-purple-400" />, label: "Enterprise Security", value: "SOC 2", sub: "Certified" },
];

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <footer ref={containerRef} className="relative bg-[#060816] pt-40 pb-12 overflow-hidden border-t border-white/5" style={{ zIndex: 10 }}>
      {/* --- CINEMATIC ATMOSPHERE --- */}
      
      {/* Animated Mesh / Aurora */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[800px] pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.15), transparent 70%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.1), transparent 50%), radial-gradient(ellipse at 20% 30%, rgba(6,182,212,0.1), transparent 50%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* Glowing Edge Lighting (Top) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] pointer-events-none" />

      {/* Floating Light Beams */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1], 
          scale: [1, 1.2, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] right-0 w-[800px] h-[800px] rounded-full pointer-events-none mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%)", filter: "blur(80px)" }}
      />
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.4, 0.1], 
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-[1000px] h-[600px] rounded-full pointer-events-none mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(120px)" }}
      />

      {/* Animated Futuristic Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse at 50% 50%, black 10%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 10%, transparent 80%)",
        transform: "perspective(1000px) rotateX(60deg) scale(2.5) translateY(-20%)",
        transformOrigin: "top"
      }} />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* =========================================
            1. MASSIVE PREMIUM CTA SECTION
        ========================================= */}
        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="relative rounded-[2.5rem] overflow-hidden mb-32 group flex flex-col items-center text-center px-6 py-28 sm:py-32"
        >
          {/* Glass background layers */}
          <div className="absolute inset-0 bg-[#0D1323]/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem]" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-50 rounded-[2.5rem]" />
          
          {/* Animated gradient borders */}
          <div className="absolute inset-0 rounded-[2.5rem] p-[1px] pointer-events-none" style={{ maskImage: "linear-gradient(black, black)", WebkitMaskImage: "linear-gradient(black, black)", WebkitMaskComposite: "xor" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 via-purple-500/10 to-cyan-500/40 opacity-50 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2.5rem]" />
          </div>

          {/* Glowing Orb inside CTA */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Holographic Badge */}
            <div className="flex items-center gap-3 mb-10 px-6 py-2.5 rounded-full relative overflow-hidden group/badge border border-blue-500/20">
              <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-md rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000 ease-in-out" />
              <Sparkles className="relative z-10 w-3.5 h-3.5 text-blue-400" />
              <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold text-blue-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]">
                Let’s Build The Future
              </span>
            </div>

            <h2 className="font-heading font-black text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight mb-8" style={{ color: "#F9FAFB" }}>
              Creating Digital Experiences<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                That Define Modern Brands
              </span>
            </h2>

            <p className="text-[#9CA3AF] max-w-2xl text-lg sm:text-xl leading-relaxed mb-14 font-medium">
              We are an elite digital product studio blending cinema-quality aesthetics with robust enterprise engineering. Elevate your brand beyond the template.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Primary Button */}
              <Link
                href="#"
                className="relative group flex items-center justify-center gap-4 px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:scale-[1.02] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                  color: "#FFFFFF",
                  boxShadow: "0 15px 40px rgba(59,130,246,0.4), 0 0 20px rgba(59,130,246,0.4) inset",
                }}
              >
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[100%] group-hover:translate-x-[50%] transition-transform duration-[1.5s] ease-in-out" />
                <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Start Your Project</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
              </Link>
              
              {/* Secondary Button */}
              <Link
                href="#"
                className="group relative flex items-center justify-center px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden"
                style={{ color: "#F9FAFB" }}
              >
                <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-full group-hover:bg-white/10 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10 group-hover:text-blue-200 transition-colors duration-300">Schedule a Call</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* =========================================
            2. INTERACTIVE CENTER AREA
        ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32"
        >
          {STAT_CARDS.map((stat, i) => (
            <div key={i} className="relative group overflow-hidden rounded-2xl p-8 bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                  {stat.icon}
                </div>
                <h3 className="text-white font-heading font-bold text-3xl tracking-tight mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm font-medium tracking-wide">
                  <span className="text-blue-400 mr-1">{stat.label}</span> {stat.sub}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* =========================================
            3. ELEGANT FOOTER LINKS AREA
        ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-32 relative z-10">
          
          {/* Brand Presentation */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-12"
          >
            <Link href="/" className="flex items-center gap-5 group mb-8 relative">
  <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

  <div className="relative">
    <Image
      src="/logo.png"
      alt="AKTECH Logo"
      width={90}
      height={90}
      className="object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-500 group-hover:scale-105"
    />
  </div>

  <div className="flex flex-col">
    <h3 className="font-heading font-black text-3xl text-white tracking-tight">
      AKTECH
    </h3>

    <span className="text-[11px] uppercase tracking-[0.35em] font-semibold bg-gradient-to-r from-[#38BDF8] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
      Digital Solutions
    </span>
  </div>
</Link>

            <p className="text-gray-400/80 text-sm sm:text-base leading-loose mb-10 font-medium">
              Architecting the digital future. We build luxury web experiences, scalable SaaS products, and intelligent enterprise platforms.
            </p>

            <div className="flex flex-col gap-5 w-full">
              <a href="mailto:hello@aktech.agency" className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-500 text-sm text-gray-400 hover:text-white w-full max-w-sm">
                <span className="flex items-center gap-4">
                  <Mail className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  hello@aktech.agency
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-blue-400" />
              </a>
              <div className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-500 text-sm text-gray-400 hover:text-white w-full max-w-sm cursor-pointer">
                <a
  href="tel:+923713410797"
  className="group flex items-center justify-between p-4  bg-white/[0.02]  transition-all duration-500 text-sm text-gray-400 hover:text-white w-full max-w-sm"
>
  <span className="flex items-center gap-4">
    <Phone className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
    +92 3713410797
  </span>

</a>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-purple-400" />
              </div>
            </div>
          </motion.div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {/* Column 1 */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }}>
              <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.25em] mb-8 opacity-60">Services</h4>
              <ul className="flex flex-col gap-5">
                {["SaaS Platforms", "Web Engineering", "UI/UX Architecture", "CRM Systems", "Brand Identity"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="group inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors relative py-1">
                      <span className="relative z-10">{link}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 2 */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
              <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.25em] mb-8 opacity-60">Company</h4>
              <ul className="flex flex-col gap-5">
                {["Our Story", "Case Studies", "Careers", "News & Insights", "Contact"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="group inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors relative py-1">
                      <span className="relative z-10">{link}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Socials / Dock */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="col-span-2 sm:col-span-1">
              <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.25em] mb-8 opacity-60">Connect</h4>
              <div className="flex flex-col gap-4">
                {SOCIALS.map((social) => (
                  <a 
                    key={social.name}
                    href={social.href}
                    className="group relative flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 transition-all duration-500 hover:border-blue-500/40 hover:bg-blue-500/10 hover:translate-x-2"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0D1323] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      {social.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{social.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

        {/* =========================================
            4. MINIMAL LUXURY BOTTOM BAR
        ========================================= */}
        <div className="relative mt-12 pt-8 pb-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
          {/* Animated Glowing Divider Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
            />
          </div>

          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
            &copy; {new Date().getFullYear()} AKTECH Agency. 
            <span className="hidden sm:inline">All rights reserved.</span>
          </p>

          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.2em] font-semibold flex items-center gap-2 group cursor-pointer">
            Crafted by <span className="text-white group-hover:text-blue-400 transition-colors">AKTECH</span>
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)]"></span>
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
}
