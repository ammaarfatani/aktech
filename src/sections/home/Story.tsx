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
    <section className="relative py-24 sm:py-32 overflow-hidden" id="about">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.05) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.03) 0%, transparent 50%)",
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
            <div className="flex items-center gap-3 mb-6 px-4 py-2 rounded-full" style={{
              background: "rgba(59,130,246,0.05)",
              border: "1px solid rgba(59,130,246,0.1)",
            }}>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400">
                Our Story
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-8 leading-tight text-white">
              We engineer <br />
              <span style={{
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>digital dominance.</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-lg">
              AKTECH is a premium global digital agency. We don&apos;t just build websites; we architect scalable SaaS platforms, custom CRM systems, and enterprise-grade web applications.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg">
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
                  <h3 className="text-4xl font-heading font-bold text-white mb-2">
                    <Counter value={stat.target} suffix={stat.suffix} />
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Glow Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full" />

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[10%] top-[20%] z-10"
            >
              <GlowCard className="w-64 h-80 p-6 flex flex-col justify-end" maxTilt={10}>
                <div className="w-12 h-12 rounded-full mb-4" style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }} />
                <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                <div className="h-2 w-16 bg-white/10 rounded" />
              </GlowCard>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-[10%] bottom-[10%] z-20"
            >
              <GlowCard className="w-72 h-64 p-6 flex flex-col justify-end" maxTilt={12} glowColor="rgba(139,92,246,0.18)">
                <div className="w-full h-32 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500/40 animate-ping" />
                </div>
                <div className="h-2 w-32 bg-white/30 rounded mb-2" />
                <div className="h-2 w-20 bg-white/10 rounded" />
              </GlowCard>
            </motion.div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
              <motion.path
                d="M 100 200 C 200 200, 300 400, 400 300"
                fill="transparent"
                stroke="#3B82F6"
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
