"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Star, ArrowLeft, ArrowRight, ArrowUpRight, Quote } from "lucide-react";

export type Testimonial = {
  id: string;
  number: string;
  service: string;
  client: string;
  role: string;
  company: string;
  quote: string;
};

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "1",
    number: "01",
    service: "WEBSITE DEVELOPMENT",
    client: "Ahmed Khan",
    role: "Founder & Director",
    company: "International School Network",
    quote: "AKTECH completely transformed our online presence. The new website is fast, modern, and has dramatically improved our admissions inquiries.",
  },
  {
    id: "2",
    number: "02",
    service: "WEB APPLICATIONS & SaaS",
    client: "Muhammad Saad",
    role: "Product Lead",
    company: "Restro Operations",
    quote: "The team understood our workflow immediately and turned complex multi-branch requirements into a sleek SaaS tool our staff uses daily.",
  },
  {
    id: "3",
    number: "03",
    service: "E-COMMERCE PLATFORMS",
    client: "Hassan R.",
    role: "Head of Commerce",
    company: "LYBA Apparel",
    quote: "Our new store gave customers a seamless checkout experience and made managing products and flash sales significantly easier.",
  },
  {
    id: "4",
    number: "04",
    service: "CRM & ERP SYSTEMS",
    client: "Usman A.",
    role: "Operations Lead",
    company: "Enterprise Supply Co.",
    quote: "We finally have a centralized system for operations, inventory, and billing instead of managing fragmented tools across departments.",
  },
  {
    id: "5",
    number: "05",
    service: "MOBILE APP DEVELOPMENT",
    client: "Ahsan M.",
    role: "Managing Director",
    company: "Elite Fitness Gym",
    quote: "The mobile app experience is smooth, fast, and delivered with Apple-level design quality. Our members use it every single day.",
  },
  {
    id: "6",
    number: "06",
    service: "AI AGENTS & AUTOMATION",
    client: "Hamza K.",
    role: "VP of Operations",
    company: "WEBCLONERS Agency",
    quote: "The AI agent and automated lead pipelines completely changed our workflow, saving our team dozens of hours of manual work every week.",
  },
  {
    id: "7",
    number: "07",
    service: "SEO & DIGITAL MARKETING",
    client: "Bilal S.",
    role: "Growth Director",
    company: "Urge Brand Platform",
    quote: "Our search visibility improved dramatically within months, resulting in consistent organic traffic and qualified business inquiries.",
  },
  {
    id: "8",
    number: "08",
    service: "MONTHLY TECHNICAL SUPPORT",
    client: "Fahad M.",
    role: "Chief Information Officer",
    company: "Sized Digital",
    quote: "Knowing that AKTECH is continuously maintaining, security-hardening, and optimizing our web platforms gives us complete peace of mind.",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = TESTIMONIALS_DATA.length;
  const activeItem = TESTIMONIALS_DATA[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay setup with pause on hover
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIsPaused(true);
        handleNext();
      }
      if (e.key === "ArrowLeft") {
        setIsPaused(true);
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mobile Touch Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) {
      setIsPaused(true);
      handleNext();
    }
    if (touchEnd - touchStart > 50) {
      setIsPaused(true);
      handlePrev();
    }
  };

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#F8FAFC] border-t border-black/5 overflow-hidden" id="testimonials">
      <div className="max-w-[1400px] mx-auto">
        
        {/* ───── TOP BAR: BADGE + CONTROLS ───── */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/10 shadow-sm text-xs font-bold uppercase tracking-wider text-[#111111]">
            <span className="w-2 h-2 rounded-full bg-[#E0000B]" />
            Testimonials
          </div>

          {/* Slider Counter & Navigation */}
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold tracking-widest text-[#111111]">
              <span className="text-[#E0000B] font-black">{activeItem.number}</span> / {total.toString().padStart(2, "0")}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsPaused(true);
                  handlePrev();
                }}
                className="w-11 h-11 rounded-full border border-black/10 bg-white text-[#111111] hover:bg-[#111111] hover:text-white transition-all flex items-center justify-center shadow-sm active:scale-95"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsPaused(true);
                  handleNext();
                }}
                className="w-11 h-11 rounded-full border border-black/10 bg-white text-[#111111] hover:bg-[#111111] hover:text-white transition-all flex items-center justify-center shadow-sm active:scale-95"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ───── 2-COLUMN MAIN COMPOSITION ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* LEFT COLUMN (5 COLS): HEADLINE + METRIC + RATING */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-[1.06] uppercase mb-4">
              THE IMPACT OF OUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                DIGITAL SOLUTIONS
              </span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed mb-8 max-w-md">
              Real results from real clients who trusted our process, vision, and technical expertise.
            </p>

            {/* Metric Stat */}
            <div className="mb-6">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-heading font-black text-[#E0000B] tracking-tight block leading-none">
                30+
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mt-2 block">
                PROJECTS DELIVERED & SCALED
              </span>
            </div>

            {/* Stars & Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E0000B] text-[#E0000B]" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-700 tracking-wide">
                (4.9 rating based on reviews)
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN (7 COLS): LARGE LIGHT TESTIMONIAL PANEL */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="lg:col-span-7 relative"
          >
            <div className="bg-white border border-black/10 rounded-[2.5rem] p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden min-h-[380px] flex flex-col justify-between">
              
              {/* Oversized Subtle Quote Watermark */}
              <div className="absolute top-6 right-8 opacity-10 text-[#E0000B] pointer-events-none">
                <Quote className="w-24 h-24" />
              </div>

              {/* Service Tag */}
              <div className="mb-6 z-10">
                <span className="px-3.5 py-1 rounded-full bg-[#E0000B]/10 border border-[#E0000B]/20 text-[#E0000B] text-[10px] font-bold tracking-widest uppercase">
                  {activeItem.service}
                </span>
              </div>

              {/* Quote Content */}
              <div className="z-10 min-h-[160px] flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.blockquote
                    key={activeItem.id}
                    initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-heading font-medium text-xl sm:text-2xl lg:text-3xl text-[#111111] leading-snug tracking-tight mb-8"
                  >
                    &ldquo;{activeItem.quote}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Client Info & Progress Dots */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-black/5 z-10">
                <div>
                  <h4 className="text-lg font-heading font-extrabold text-[#111111]">
                    {activeItem.client}
                  </h4>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {activeItem.role} — <span className="text-[#111111] font-bold">{activeItem.company}</span>
                  </p>
                </div>

                {/* Horizontal Progress Dots */}
                <div className="flex items-center gap-2">
                  {TESTIMONIALS_DATA.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsPaused(true);
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "w-8 bg-[#E0000B]" : "w-2 bg-black/15 hover:bg-black/30"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ───── FINAL HOMEPAGE CTA ───── */}
        <div className="bg-[#111111] text-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B] block mb-2">
              READY TO ELEVATE YOUR BRAND?
            </span>
            <h3 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Ready to build something <br className="hidden sm:block" />
              worth talking about?
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full sm:w-auto">
            <Link
              href="https://wa.me/923713410797"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-[#E0000B] text-white font-heading font-bold text-sm tracking-wider uppercase shadow-[0_10px_30px_rgba(224,0,11,0.4)] hover:bg-white hover:text-[#111111] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <Link
              href="https://wa.me/923713410797"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-full border border-white/20 text-white font-heading font-bold text-sm tracking-wider uppercase hover:bg-white/10 transition-colors"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
