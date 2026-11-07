"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalPageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  const isInitial = useRef(true);
  const prevPathname = useRef(pathname);
  const isAnimating = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear timers safely
  const clearTimers = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Run smooth 2.0-second 0% -> 100% progress animation sequence
  const startLoaderAnimation = useCallback(
    (durationMs: number = 2000) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      clearTimers();
      setIsLoading(true);
      setProgress(0);

      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progressRatio = Math.min(elapsed / durationMs, 1);

        // Smooth cubic ease-out curve for natural continuous counter
        const easeProgress = 1 - Math.pow(1 - progressRatio, 2.2);
        const currentPercent = Math.min(Math.round(easeProgress * 100), 100);

        setProgress(currentPercent);

        if (progressRatio < 1) {
          animationFrameRef.current = requestAnimationFrame(step);
        } else {
          // Hold at 100% for 180ms before exit
          timeoutRef.current = setTimeout(() => {
            setIsLoading(false);
            isAnimating.current = false;
          }, 180);
        }
      };

      animationFrameRef.current = requestAnimationFrame(step);
    },
    [clearTimers]
  );

  // Initial Load (2.0s duration)
  useEffect(() => {
    startLoaderAnimation(2000);
    return () => clearTimers();
  }, [startLoaderAnimation, clearTimers]);

  // Route Change Navigation (2.0s duration)
  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      startLoaderAnimation(1800);
    }
    return () => clearTimers();
  }, [pathname, startLoaderAnimation, clearTimers]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="global-page-loader-cinematic"
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.02, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999999] bg-[#141414] flex flex-col items-center justify-center text-white select-none pointer-events-none overflow-hidden"
        >
          {/* Faint Premium Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(224,0,11,0.07),transparent_70%)] pointer-events-none" />

          {/* Top-Left Corner Accent */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, x: -8, y: -8 }}
            animate={{ scale: 1, opacity: 0.85, x: 0, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-6 left-6 sm:top-10 sm:left-10 w-7 h-7 sm:w-10 sm:h-10 border-t-2 border-l-2 border-[#E0000B]"
          />

          {/* Bottom-Right Corner Accent */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, x: 8, y: 8 }}
            animate={{ scale: 1, opacity: 0.85, x: 0, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-7 h-7 sm:w-10 sm:h-10 border-b-2 border-r-2 border-[#E0000B]"
          />

          {/* Center Composition Box */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 w-full max-w-lg">
            
            {/* AKTECH Logo Presentation Badge */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, filter: "blur(6px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-3.5 sm:p-4 bg-white/95 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-white/25 flex items-center justify-center mb-4 sm:mb-5 group"
            >
              {/* Subtle ambient logo glow */}
              <div className="absolute inset-0 rounded-2xl bg-[#E0000B]/10 blur-xl transition-opacity opacity-70" />

              <Image
                src="/logo.png"
                alt="AKTECH Logo"
                width={80}
                height={80}
                priority
                className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
            </motion.div>

            {/* Brand Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 sm:mb-10"
            >
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#E0000B]">
                360° DIGITAL SOLUTIONS
              </span>
            </motion.div>

            {/* Synchronized Progress Line & Percentage Counter */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-[260px] sm:w-[440px] flex items-center gap-3.5"
            >
              {/* Thin Horizontal Progress Line */}
              <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-[#E0000B] rounded-full transition-all duration-75 ease-out shadow-[0_0_8px_rgba(224,0,11,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Monospaced Percentage Number */}
              <span
                className={`text-xs sm:text-sm font-mono font-bold transition-all duration-150 min-w-[42px] text-right ${
                  progress === 100 ? "text-white scale-105" : "text-[#E0000B]"
                }`}
              >
                {progress}%
              </span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
