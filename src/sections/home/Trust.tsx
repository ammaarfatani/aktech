"use client";

import { motion } from "framer-motion";
import { Check, Shield, Sparkles } from "lucide-react";

const TRUST_CHIPS = [
  "Fast Delivery",
  "Unlimited Revisions",
  "Dedicated Support",
  "Scalable Solutions",
  "Performance Optimized",
  "Future Ready"
];

export function Trust() {
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden bg-[#02040f]">
      {/* --- BACKGROUND EFFECTS --- */}

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 20%, transparent 100%)',
        }}
      />

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Subtle Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none mix-blend-overlay">
        <filter id="trustNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#trustNoise)" />
      </svg>

      {/* Star Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full">
          <pattern id="trust-stars" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle fill="#ffffff" cx="20" cy="20" r="1" opacity="0.5" />
            <circle fill="#ffffff" cx="70" cy="60" r="0.5" opacity="0.3" />
            <circle fill="#ffffff" cx="90" cy="10" r="1" opacity="0.8" />
            <circle fill="#ffffff" cx="40" cy="80" r="0.5" opacity="0.4" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#trust-stars)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* --- LEFT: CONTENT --- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            {/* Glowing Badge */}
            <div className="flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md w-fit">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-cyan-200/80">
                Agency Guarantee
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-6 text-white tracking-tight leading-[1.1]">
              100% Satisfaction <br className="hidden sm:block" />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                  Guarantee
                </span>
                {/* Text Glow */}
                <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-purple-500/20 blur-2xl -z-10 opacity-60" />
              </span>
            </h2>

            <p className="text-gray-400/90 text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-xl">
              Love your website or we revise it free. We are an elite digital agency focused on delivering uncompromised quality, scalable architectures, and long-term partnerships. Your success is our baseline.
            </p>

            {/* Trust Chips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRUST_CHIPS.map((chip, i) => (
                <motion.div
                  key={chip}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors duration-500"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                    <Check className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-300">{chip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>


          {/* --- RIGHT: HOLOGRAPHIC TRUST VISUAL --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center w-full aspect-square max-w-[550px] mx-auto lg:ml-auto mt-10 lg:mt-0"
          >
            {/* Center Glow */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Animated Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[90%] h-[90%] rounded-full border border-blue-500/20 border-l-blue-400/50 pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[70%] h-[70%] rounded-full border border-dashed border-purple-500/30 pointer-events-none"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute w-[110%] h-[110%] rounded-full border border-white/[0.05] border-t-cyan-400/30 pointer-events-none"
            />

            {/* Orbiting Particles */}
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ rotate: i * 90 }}
                animate={{ rotate: i * 90 + 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[90%] h-[90%] pointer-events-none flex items-start justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] -mt-[3px]" />
              </motion.div>
            ))}

            {/* Core Hologram */}
            <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center backdrop-blur-2xl bg-[#050914]/80 border border-white/[0.08] shadow-[0_0_60px_rgba(59,130,246,0.15)]">
              {/* Inner rings */}
              <div className="absolute inset-2 rounded-full border border-blue-500/20" />
              <div className="absolute inset-6 rounded-full border border-dashed border-purple-500/20" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 mix-blend-overlay" />

              {/* Custom Hologram Graphic */}
              <div className="relative flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full" />

                {/* Bespoke Holographic Shield Icon */}
                <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 sm:w-20 sm:h-20 text-blue-300 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)] z-10 relative">
                  {/* Outer Shield Outline */}
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Subtle Fill */}
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.05" />
                  {/* Bold Checkmark */}
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Tech Accents */}
                  <circle cx="12" cy="5" r="1" fill="currentColor" />
                  <circle cx="12" cy="22" r="1" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Floating Panel 1: Encrypted */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] right-[-5%] sm:right-[0%] z-20 px-4 py-2.5 rounded-xl backdrop-blur-xl bg-[#050914]/90 border border-white/[0.08] shadow-2xl flex items-center gap-3"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_12px_#4ade80]" />
              <span className="text-[11px] font-bold tracking-widest text-white uppercase">Encrypted</span>
            </motion.div>

            {/* Floating Panel 2: Secure Status */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[15%] left-[-5%] sm:left-[0%] z-20 px-5 py-3 rounded-xl backdrop-blur-xl bg-[#050914]/90 border border-white/[0.08] shadow-2xl flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Shield className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Status</span>
                <span className="text-xs font-bold text-white uppercase">Secure</span>
              </div>
            </motion.div>

            {/* Floating Panel 3: Premium */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-[45%] left-[-15%] sm:left-[-10%] z-20 px-4 py-2 rounded-lg backdrop-blur-xl bg-[#050914]/90 border border-white/[0.05] shadow-2xl flex items-center gap-2"
            >
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] font-bold tracking-widest text-purple-300 uppercase">Premium</span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
