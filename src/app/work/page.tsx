"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, ArrowUpRight, Filter } from "lucide-react";
import { projects, additionalScreenshots, filterCategories } from "../../../projects";

// Combine all 16 unique projects and extra storefronts into a single portfolio collection
const ALL_WORK_ITEMS = [
  ...projects.map((p) => ({
    id: p.id,
    slug: p.slug,
    number: p.number,
    title: p.title,
    category: p.category,
    filterCategory: p.filterCategory || "WEB",
    description: p.shortDescription,
    image: p.screenshots[0] || p.image || "/projects/school.png",
    video: p.video,
    technologies: p.technologies.length > 0 ? p.technologies : ["Next.js", "React", "Node.js"],
  })),
  ...additionalScreenshots.map((item, idx) => ({
    id: `extra-${idx}`,
    slug: `extra-${idx}`,
    number: (projects.length + idx + 1).toString().padStart(2, "0"),
    title: item.title,
    category: item.category,
    filterCategory: item.category === "E-COMMERCE" ? "E-COMMERCE" : "WEB",
    description: `A custom ${item.category.toLowerCase()} experience engineered for high performance, modern visual aesthetics, and conversion efficiency.`,
    image: item.src,
    video: null,
    technologies: ["Next.js", "Tailwind CSS", "UI/UX Design"],
  })),
];

export default function WorkPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState(0);

  // Filter items based on selected category tab
  const filteredItems = useMemo(() => {
    if (selectedFilter === "ALL") return ALL_WORK_ITEMS;
    return ALL_WORK_ITEMS.filter((item) => item.filterCategory === selectedFilter);
  }, [selectedFilter]);

  // Ensure currentIndex stays within bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilter]);

  const totalItems = filteredItems.length;
  const currentProject = filteredItems[currentIndex] || ALL_WORK_ITEMS[0];

  const nextProject = () => {
    if (totalItems === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevProject = () => {
    if (totalItems === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const selectProject = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") prevProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalItems, currentIndex]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) nextProject();
    if (touchEnd - touchStart > 50) prevProject();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111111] pt-36 sm:pt-40 pb-16 selection:bg-[#E0000B]/20 selection:text-[#E0000B]">
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* ───── Top Navigation Breadcrumb ───── */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-[#E0000B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#E0000B]" />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest text-[#E0000B]">
            {totalItems} Projects Loaded
          </span>
        </div>

        {/* ───── 1. HERO HEADER ───── */}
        <header className="max-w-4xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full w-fit bg-white border border-black/10 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#E0000B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111]">
              PORTFOLIO SHOWCASE
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] mb-6 uppercase">
            EVERY PROJECT TELLS A <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
              STORY OF GROWTH.
            </span>
          </h1>

          <p className="text-gray-600 text-lg sm:text-xl font-normal leading-relaxed">
            Explore our complete portfolio of web applications, custom ERPs, e-commerce storefronts, AI workflows, and bespoke business systems built by AKTECH.
          </p>
        </header>

        {/* ───── 2. CATEGORY FILTER TABS ───── */}
        <div className="mb-12 flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          <div className="flex items-center gap-2 pr-2 text-xs font-bold uppercase tracking-wider text-gray-400 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#E0000B]" />
            <span>Filter:</span>
          </div>

          {["ALL", ...filterCategories.filter((c) => c !== "ALL")].map((category) => {
            const isActive = selectedFilter === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#111111] text-white shadow-md"
                    : "bg-white text-gray-600 border border-black/10 hover:border-[#E0000B]/40 hover:text-[#111111]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* ───── 3. CINEMATIC PROJECT FEATURE SLIDER ───── */}
        {currentProject && (
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="bg-[#111111] rounded-[2.5rem] p-6 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden mb-16 relative"
          >
            {/* Slider Header Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#E0000B] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E0000B]">
                  {currentProject.category}
                </span>
              </div>

              {/* Counter */}
              <div className="text-sm font-bold tracking-widest text-white/80">
                <span className="text-[#E0000B] text-base">
                  {(currentIndex + 1).toString().padStart(2, "0")}
                </span>{" "}
                / {totalItems.toString().padStart(2, "0")}
              </div>
            </div>

            {/* Visual Display: Image or Video */}
            <div className="relative w-full h-[380px] sm:h-[550px] lg:h-[620px] rounded-2xl overflow-hidden bg-[#090909] border border-white/10 flex items-center justify-center mb-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex items-center justify-center p-4 sm:p-8"
                >
                  <Image
                    src={currentProject.image}
                    alt={currentProject.title}
                    fill
                    sizes="1200px"
                    priority
                    className="object-contain drop-shadow-2xl rounded-lg"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Project Info & Controls Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight mb-3">
                  {currentProject.title}
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-6 font-normal">
                  {currentProject.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-4 shrink-0">
                {currentProject.slug && !currentProject.slug.startsWith("extra-") && (
                  <Link
                    href={`/case-studies/${currentProject.slug}`}
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-[#E0000B]" />
                  </Link>
                )}

                <button
                  onClick={prevProject}
                  className="w-12 h-12 rounded-full border border-white/20 bg-white/5 text-white hover:bg-[#E0000B] hover:border-[#E0000B] flex items-center justify-center transition-colors shadow-lg active:scale-95 cursor-pointer"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={nextProject}
                  className="w-12 h-12 rounded-full border border-white/20 bg-white/5 text-white hover:bg-[#E0000B] hover:border-[#E0000B] flex items-center justify-center transition-colors shadow-lg active:scale-95 cursor-pointer"
                  aria-label="Next project"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ───── 4. FULL PROJECT INDEX GRID ───── */}
        <div className="mb-16">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">
            PROJECT INDEX ({totalItems})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => {
              const isActive = idx === currentIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => selectProject(idx)}
                  className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-48 ${
                    isActive
                      ? "bg-[#111111] text-white border-[#111111] shadow-xl scale-[1.02]"
                      : "bg-white text-[#111111] border-black/10 hover:border-[#E0000B]/40 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-heading font-black ${isActive ? "text-[#E0000B]" : "text-gray-400"}`}>
                        {item.number}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                        {item.filterCategory}
                      </span>
                    </div>

                    <h4 className="text-lg font-heading font-bold tracking-tight mb-2 line-clamp-1">
                      {item.title}
                    </h4>

                    <p className={`text-xs line-clamp-2 ${isActive ? "text-gray-300" : "text-gray-500"}`}>
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-current/10">
                    <span className="text-[11px] font-semibold opacity-70">
                      {item.technologies.slice(0, 2).join(" • ")}
                    </span>
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? "text-[#E0000B]" : "text-gray-400"}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
