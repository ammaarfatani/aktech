"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroCubeEcosystem } from "./HeroCubes";
import { HeroShaderBackground } from "@/components/ui/HeroShaderBackground";
import { Button } from "@/components/ui/button";


const BRAND_LOGOS = [
  {
    name: "Google", svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    )
  },
  {
    name: "Amazon", svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M.045 18.02c.071-.116.186-.186.302-.186.186 0 .372.07.558.186 1.674.93 3.535 1.604 5.512 2.023 2.094.49 4.303.676 6.396.395 2.21-.28 4.303-.977 6.164-2.093.186-.116.372-.186.558-.186.186 0 .302.07.372.186.07.116.07.302-.07.488C17.884 21.26 13.697 23 9.39 23c-2.908 0-5.71-.72-8.26-2.14-.186-.116-.256-.302-.186-.488 0-.116.046-.232.1-.352zM22.08 16.116c-.116-.186-.372-.256-.698-.116-.93.42-1.953.769-3.023.977-1.117.21-2.28.21-3.396 0-1.117-.21-2.163-.63-3.14-1.187-.186-.116-.372-.116-.558-.046-.186.07-.256.256-.186.442.07.186.186.372.372.488 1.117.698 2.373 1.163 3.675 1.442.651.14 1.302.21 1.953.21.698 0 1.395-.07 2.046-.256 1.07-.256 2.07-.698 2.978-1.256.302-.186.186-.512-.023-.698z" />
        <path d="M14.59 13.883c-.744-.093-1.395-.163-2.07-.163-.698 0-1.395.07-2.07.21-.186.046-.302.186-.302.372 0 .186.116.302.302.302h.046c.628-.093 1.256-.163 1.907-.163.558 0 1.163.07 1.768.163.186.046.372-.07.418-.256.046-.186-.07-.372-.256-.418l.256-.047zM14.752 11.507c-.698-.093-1.395-.14-2.093-.14-.698 0-1.395.047-2.093.14-.186.023-.302.186-.279.372.023.186.186.302.372.279.651-.093 1.302-.14 1.953-.14s1.302.047 1.953.14c.186.023.349-.093.372-.279.023-.186-.093-.349-.186-.372z" />
      </svg>
    )
  },
  {
    name: "Microsoft", svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M0 0h11.377v11.377H0zM12.623 0H24v11.377H12.623zM0 12.623h11.377V24H0zM12.623 12.623H24V24H12.623z" />
      </svg>
    )
  },
  {
    name: "Dropbox", svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M6 2l6 3.75L6 9.5 0 5.75zM18 2l6 3.75-6 3.75-6-3.75zM0 13.25L6 9.5l6 3.75L6 17zM18 9.5l6 3.75L18 17l-6-3.75zM6 18.25l6-3.75 6 3.75L12 22z" />
      </svg>
    )
  },
  {
    name: "Notion", svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.39 2.33c-.42-.326-.98-.7-2.055-.607L3.01 2.87c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.886c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.933-.234-1.494-.934l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM2.24 1.63L16.063.806c1.68-.14 2.1.093 2.8.607l3.876 2.707c.467.327.607.747.607 1.26v16.063c0 1.027-.373 1.634-1.68 1.727l-15.457.934c-.98.046-1.448-.093-1.960-.747L1.41 19.964c-.56-.747-.793-1.307-.793-1.96V3.59c0-.84.374-1.54 1.634-1.96z" />
      </svg>
    )
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#060816" }}>
      {/* WebGL Interactive Nebula Background */}
      <HeroShaderBackground />

      {/* Full background effects */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)",
      }} />

      {/* Centered hero container with rounded border */}
      <div className="relative w-full max-w-[2000px] mx-auto px-1 sm:px-8 py-10">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Grid texture */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }} />

          {/* Star particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 0.5,
                  height: Math.random() * 2 + 0.5,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Atmospheric glow */}
          <div className="absolute pointer-events-none" style={{
            width: 600, height: 600,
            left: "60%", top: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)",
            filter: "blur(60px)",
          }} />

          {/* Vignette edges */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, transparent 50%, #060816 100%)",
            opacity: 0.6,
          }} />



          {/* ───── HERO CONTENT ───── */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 px-6 sm:px-10 pt-8 sm:pt-12 pb-12 sm:pb-16 items-center mt-10">

            {/* LEFT SIDE */}
            <div className="flex flex-col items-start">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="flex items-center gap-3 mb-8 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(59,130,246,0.06)",
                  border: "1px solid rgba(59,130,246,0.15)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#3B82F6", boxShadow: "0 0 8px #3B82F6" }} />
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: "#9CA3AF" }}>
                  AI Driven <span style={{ color: "rgba(59,130,246,0.4)", margin: "0 6px" }}>|</span> Future Ready
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease }}
                className="font-heading font-bold leading-[1.05] tracking-tight mb-6"
                style={{ color: "#F9FAFB", fontSize: "clamp(2.5rem, 5vw, 4.2rem)" }}
              >
                Building Intelligent<br />
                <span style={{
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Digital Experiences
                </span>
                <br />
                For Global Brands
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease }}
                className="text-base sm:text-lg leading-relaxed max-w-lg mb-10"
                style={{ color: "#9CA3AF" }}
              >
                We combine creativity, technology and data to deliver digital solutions that drive real results.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease }}
                className="flex flex-wrap items-center gap-4 mb-12"
              >
                {/* Primary */}
                <Button variant="primary-glow" magnetic={true}>
                  <Link href="#services" className="flex items-center gap-3">
                    Our Services
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                {/* Secondary */}
                <Button variant="secondary-glass" magnetic={true}>
                  <Link href="#work" className="flex items-center gap-3">
                    View Projects
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              {/* Trusted Brands */}
              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-5" style={{ color: "#64748B" }}>
                  Trusted by leading brands
                </p>
                <div className="flex items-center gap-6 flex-wrap">
                  {BRAND_LOGOS.map((brand) => (
                    <div
                      key={brand.name}
                      className="transition-all duration-300 cursor-pointer"
                      style={{ width: 22, height: 22, color: "#4B5563", opacity: 0.5 }}
                      title={brand.name}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.color = "#9CA3AF";
                        e.currentTarget.style.filter = "drop-shadow(0 0 6px rgba(59,130,246,0.3))";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "0.5";
                        e.currentTarget.style.color = "#4B5563";
                        e.currentTarget.style.filter = "none";
                      }}
                    >
                      {brand.svg}
                    </div>
                  ))}
                </div>
              </motion.div> */}
            </div>

            {/* RIGHT SIDE - Cube Ecosystem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease }}
              className="relative w-full h-[400px] sm:h-[500px] lg:h-[550px]"
            >
              <HeroCubeEcosystem />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
