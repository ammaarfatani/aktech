"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

export type ProcessStageData = {
  number: string;
  stage: string;
  title: string;
  description: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
};

const STAGES: ProcessStageData[] = [
  {
    number: "01",
    stage: "DISCOVER",
    title: "Understanding Business & Goals",
    description: "We analyze your business model, target audience, technical requirements, and core growth objectives before writing a single line of code.",
    deliverables: [
      "Business & requirements analysis",
      "Technical architecture roadmap",
      "User research & competitive strategy",
      "Project milestone & scope planning",
    ],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Business discovery and strategy meeting",
  },
  {
    number: "02",
    stage: "DESIGN",
    title: "UX/UI & Product Design",
    description: "We translate strategy into intuitive, responsive, and visually stunning user interfaces engineered for high conversion and brand authority.",
    deliverables: [
      "Wireframes & UX user journeys",
      "High-fidelity UI design",
      "Custom brand design systems",
      "Interactive clickable prototypes",
    ],
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "UI/UX product design workspace",
  },
  {
    number: "03",
    stage: "DEVELOP",
    title: "Engineering & Architecture",
    description: "We transform approved designs into fast, secure, and production-ready applications with clean code and robust backend systems.",
    deliverables: [
      "Next.js & React frontend engineering",
      "Node.js APIs & database architecture",
      "Performance & Core Web Vitals tuning",
      "Role-based access control (RBAC)",
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Software engineering and development",
  },
  {
    number: "04",
    stage: "DELIVER",
    title: "Launch & Ongoing Support",
    description: "We deploy your digital platform to production environments, conduct thorough QA testing, and provide ongoing maintenance.",
    deliverables: [
      "Production deployment & SSL setup",
      "QA testing & security hardening",
      "Comprehensive handover & documentation",
      "24/7 technical support & maintenance",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Product launch and analytics dashboard",
  },
];

function CardPanel({
  stage,
  index,
  progress,
}: {
  stage: ProcessStageData;
  index: number;
  progress: MotionValue<number>;
}) {
  // Guaranteed strictly monotonic input ranges bounded strictly inside [0, 1]
  // Card 0: starts active at y=0%, scales down when Card 1 covers it
  // Card 1: enters 0.05 -> 0.30, active 0.30 -> 0.60
  // Card 2: enters 0.35 -> 0.60, active 0.60 -> 0.90
  // Card 3: enters 0.65 -> 0.90, active 0.90 -> 1.00 (Card 04 remains fully active at progress=1.0)

  let yRange: number[];
  let yOutput: string[];
  let scaleRange: number[];
  let scaleOutput: number[];

  if (index === 0) {
    yRange = [0, 1];
    yOutput = ["0%", "0%"];
    scaleRange = [0, 0.30, 0.35, 1];
    scaleOutput = [1, 1, 0.95, 0.95];
  } else if (index === 1) {
    yRange = [0, 0.05, 0.30, 1];
    yOutput = ["100%", "100%", "0%", "0%"];
    scaleRange = [0, 0.60, 0.65, 1];
    scaleOutput = [1, 1, 0.95, 0.95];
  } else if (index === 2) {
    yRange = [0, 0.35, 0.60, 1];
    yOutput = ["100%", "100%", "0%", "0%"];
    scaleRange = [0, 0.90, 0.95, 1];
    scaleOutput = [1, 1, 0.95, 0.95];
  } else {
    // index === 3 (Card 04 DELIVER)
    yRange = [0, 0.65, 0.90, 1];
    yOutput = ["100%", "100%", "0%", "0%"];
    scaleRange = [0, 1];
    scaleOutput = [1, 1];
  }

  const y = useTransform(progress, yRange, yOutput);
  const scale = useTransform(progress, scaleRange, scaleOutput);

  return (
    <motion.div
      style={{ y, scale, zIndex: index + 1 }}
      className="absolute inset-0 w-full h-full bg-[#111111] text-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center gap-8 overflow-hidden opacity-100"
    >
      {/* 1. Large Unsplash Editorial Image Container (50% Width) */}
      <div className="relative w-full lg:w-1/2 h-[220px] sm:h-[300px] lg:h-full rounded-2xl overflow-hidden bg-black/50 border border-white/10 shrink-0">
        <Image
          src={stage.image}
          alt={stage.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          priority={index === 0}
          className="object-cover object-center filter brightness-95 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold tracking-[0.2em] uppercase border border-white/20">
          STAGE {stage.number} — {stage.stage}
        </div>
      </div>

      {/* 2. Process Stage Details (50% Width) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between h-full">
        <div>
          {/* Number + Title */}
          <div className="flex items-baseline gap-4 mb-3">
            <span className="text-3xl sm:text-4xl font-heading font-black text-[#E0000B]">
              {stage.number}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight">
              {stage.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            {stage.description}
          </p>

          {/* Deliverables Checklist */}
          <div className="pt-4 border-t border-white/15">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 mb-3">
              KEY DELIVERABLES & ACTIVITIES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {stage.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E0000B] shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-gray-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.30) setActiveStep(0);
    else if (latest < 0.60) setActiveStep(1);
    else if (latest < 0.90) setActiveStep(2);
    else setActiveStep(3);
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#F8FAFC] border-t border-black/5" id="process">
      
      {/* ───── STICKY CONTAINER PINNED IN VIEWPORT ───── */}
      <div className="sticky top-0 h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-8 overflow-hidden max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-8 shrink-0">
          <div className="flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full bg-[#111111]/5 border border-[#111111]/10">
            <Sparkles className="w-4 h-4 text-[#E0000B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111]">
              HOW WE WORK
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-[1.05]">
            YOUR VISION.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
              OUR PROCESS.
            </span>
          </h2>
        </div>

        {/* ───── MAIN DISPLAY (CENTER STACKED PANEL + RIGHT SIDE NAV) ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 max-h-[620px] w-full">
          
          {/* CENTER 10 COLS: STACKED CARD CONTAINER */}
          <div className="lg:col-span-10 relative h-full w-full max-h-[580px]">
            {STAGES.map((stage, idx) => (
              <CardPanel
                key={stage.number}
                stage={stage}
                index={idx}
                progress={scrollYProgress}
              />
            ))}
          </div>

          {/* RIGHT 2 COLS: STICKY SIDE PROGRESS NAV */}
          <div className="hidden lg:flex lg:col-span-2 flex-col justify-center gap-4 pl-6 border-l border-black/10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
              STAGES
            </span>

            {STAGES.map((stage, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={stage.number}
                  className="flex items-center gap-3"
                >
                  <span
                    className={`text-xs font-heading font-black transition-colors duration-300 ${
                      isActive ? "text-[#E0000B]" : "text-gray-400"
                    }`}
                  >
                    {stage.number}
                  </span>

                  <div className="flex flex-col">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                        isActive ? "text-[#111111]" : "text-gray-400"
                      }`}
                    >
                      {stage.stage}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
