"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

const STATS = [
  { label: "Years Experience", target: 8, suffix: "+" },
  { label: "Projects Delivered", target: 250, suffix: "+" },
  { label: "Client Satisfaction", target: 99, suffix: "%" },
  { label: "Countries Served", target: 15, suffix: "+" },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const duration = 2000; // 2 seconds

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * value);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Story() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-white" id="about">
      {/* Ambient Light background elements */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 80% 20%, rgba(224,0,11,0.03) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(17,17,17,0.02) 0%, transparent 50%)",
      }} />

      <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-[#111111]/[0.04] border border-[#111111]/[0.08]">
              <div className="w-2 h-2 rounded-full bg-[#E0000B]" style={{ boxShadow: "0 0 10px #E0000B" }} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#111111]">
                Our Story
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold mb-8 leading-tight text-[#111111]">
              We engineer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E0000B] via-[#C00009] to-[#111111]">
                digital dominance.
              </span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-lg font-medium">
              AKTECH is a premium global digital agency. We don&apos;t just build websites; we architect scalable SaaS platforms, custom CRM systems, and enterprise-grade web applications.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-lg font-medium">
              From breathtaking branding and graphic design to cinematic video editing, we deliver end-to-end digital experiences that command attention and drive conversion.
            </p>

            <div className="grid grid-cols-2 gap-8 w-full max-w-lg">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-4xl font-heading font-extrabold text-[#111111] mb-2">
                    <Counter value={stat.target} suffix={stat.suffix} />
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#E0000B] font-bold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Glow Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E0000B]/10 blur-[80px] rounded-full" />

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[10%] top-[20%] z-10"
            >
              <GlowCard className="w-64 h-80 p-6 flex flex-col justify-end bg-white/90 border-black/10 shadow-lg" maxTilt={10} glowColor="rgba(224,0,11,0.15)">
                <div className="w-12 h-12 rounded-full mb-4" style={{ background: "linear-gradient(135deg, #E0000B, #111111)" }} />
                <div className="h-2 w-24 bg-[#111111]/20 rounded mb-2" />
                <div className="h-2 w-16 bg-[#111111]/10 rounded" />
              </GlowCard>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-[10%] bottom-[10%] z-20"
            >
              <GlowCard className="w-72 h-64 p-6 flex flex-col justify-end bg-white/90 border-black/10 shadow-lg" maxTilt={12} glowColor="rgba(224,0,11,0.18)">
                <div className="w-full h-32 rounded-lg bg-[#E0000B]/10 border border-[#E0000B]/20 mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#E0000B]/40 animate-ping" />
                </div>
                <div className="h-2 w-32 bg-[#111111]/30 rounded mb-2" />
                <div className="h-2 w-20 bg-[#111111]/10 rounded" />
              </GlowCard>
            </motion.div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
              <motion.path
                d="M 100 200 C 200 200, 300 400, 400 300"
                fill="transparent"
                stroke="#E0000B"
                strokeWidth="1"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, 100] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
