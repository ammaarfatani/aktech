"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useInView,
} from "framer-motion";
import { Star, Sparkles, Quote } from "lucide-react";
import React from "react";

/* ═══════════════════════════════════════════════
   TESTIMONIALS DATA — Covering all AKTECH services
   ═══════════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    name: "Ahmed Raza",
    company: "AR Traders",
    service: "Corporate Website",
    testimonial:
      "AKTECH completely transformed our online presence. The website looks premium, loads incredibly fast, and has already helped us generate more business inquiries. Their attention to detail is unmatched.",
    color: "#3B82F6",
  },
  {
    name: "Ayesha Malik",
    company: "Bloom Fashion",
    service: "E-commerce Website",
    testimonial:
      "Our online store is fast, responsive, and easy to manage. Customers frequently compliment the clean and professional design. Sales have increased significantly since the launch.",
    color: "#EC4899",
  },
  {
    name: "Tariq Mehmood",
    company: "FreshMart Stores",
    service: "POS System",
    testimonial:
      "The POS system AKTECH built for our retail chain has streamlined our entire operation. Real-time inventory tracking, seamless billing, and the reporting dashboard alone saved us hours every week.",
    color: "#10B981",
  },
  {
    name: "Sana Javed",
    company: "Skyline Properties",
    service: "CRM Development",
    testimonial:
      "Our custom CRM handles leads, follow-ups, and client communication effortlessly. The team understood our real estate workflow and delivered a system that genuinely makes our team more productive.",
    color: "#8B5CF6",
  },
  {
    name: "Bilal Ahmed",
    company: "BA Solutions",
    service: "Custom Web App",
    testimonial:
      "Working with AKTECH was effortless. They built a project management tool tailored to our exact internal processes. The real-time collaboration features exceeded what we imagined possible.",
    color: "#06B6D4",
  },
  {
    name: "Fatima Khan",
    company: "NovaPay Fintech",
    service: "UI/UX Design",
    testimonial:
      "The redesign of our fintech dashboard was exceptional. User engagement jumped 40% after launch. Every interaction feels intuitive—AKTECH clearly understands modern product design at a deep level.",
    color: "#F59E0B",
  },
  {
    name: "Hassan Ali",
    company: "CloudEdge Tech",
    service: "Landing Page",
    testimonial:
      "Our SaaS landing page went from a 2% to a 7% conversion rate. The copy, layout, and micro-interactions AKTECH delivered are genuinely world-class. Best investment we made this year.",
    color: "#EF4444",
  },
  {
    name: "Muhammad Usman",
    company: "Usman Enterprises",
    service: "Business Automation",
    testimonial:
      "AKTECH automated our invoicing, inventory alerts, and reporting. What used to take our team an entire day now runs on autopilot. The efficiency gains have been transformational for us.",
    color: "#14B8A6",
  },
  {
    name: "Zara Sheikh",
    company: "Pearl Boutique",
    service: "Website Maintenance",
    testimonial:
      "We never worry about our website anymore. AKTECH handles updates, security, backups—everything. Their response time is impressive, and the monthly performance reports give us complete peace of mind.",
    color: "#A855F7",
  },
  {
    name: "Kamran Nawaz",
    company: "GreenTech Solutions",
    service: "SEO & Performance",
    testimonial:
      "After AKTECH optimized our site, we went from page 4 to the top 3 results on Google for our key terms. Page load time dropped below one second. The organic traffic growth has been remarkable.",
    color: "#22D3EE",
  },
];

/* ═══════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const;

/* Orchestration variants for staggered card reveals */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease,
    },
  },
};

/* ═══════════════════════════════════════════════
   HELPER
   ═══════════════════════════════════════════════ */

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/* ═══════════════════════════════════════════════
   TESTIMONIAL CARD
   ═══════════════════════════════════════════════ */

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  /* Staggered idle float — very subtle, different per card */
  const floatDuration = 6 + (index % 3) * 1.5;
  const floatDelay = (index % 5) * 0.7;

  return (
    <motion.div variants={cardVariants} className="group relative">
      {/* ── Idle floating wrapper ── */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        {/* ── Outer border wrapper ── */}
        <div
          onMouseMove={handleMouseMove}
          className="relative rounded-3xl p-[1px] overflow-hidden"
        >
          {/* Default subtle border */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-200/80 to-transparent rounded-3xl transition-opacity duration-500 group-hover:opacity-0" />

          {/* Hover animated border gradient */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${testimonial.color}30, transparent 40%, ${testimonial.color}15)`,
            }}
          />

          {/* Mouse tracking radial glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
            style={{
              background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${testimonial.color}08, transparent 80%)`,
            }}
          />

          {/* ── Card inner ── */}
          <div className="relative h-full bg-white border border-slate-100 rounded-[23px] p-8 sm:p-10 flex flex-col overflow-hidden transition-all duration-500 group-hover:-translate-y-1 shadow-[0_15px_30px_rgba(15,23,42,0.04)] group-hover:shadow-[0_25px_50px_rgba(15,23,42,0.1)]">
            {/* Floating corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top edge animated highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* ── Quote Icon ── */}
            <div className="relative mb-6 z-10">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${testimonial.color}12, ${testimonial.color}03)`,
                  border: `1px solid ${testimonial.color}18`,
                }}
              >
                {/* Icon glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 pointer-events-none"
                  style={{ background: testimonial.color }}
                />
                <Quote
                  className="w-6 h-6 transition-all duration-500 group-hover:scale-110"
                  style={{ color: testimonial.color }}
                />
              </div>
            </div>

            {/* ── 5 Stars ── */}
            <div className="flex items-center gap-1.5 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-[14px] h-[14px] fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]"
                />
              ))}
              <span className="ml-2 text-[10px] font-bold tracking-widest uppercase text-amber-500/80">
                5.0
              </span>
            </div>

            {/* ── Testimonial text ── */}
            <blockquote className="text-slate-700 text-[15px] sm:text-base leading-relaxed mb-8 flex-grow font-light">
              &ldquo;{testimonial.testimonial}&rdquo;
            </blockquote>

            {/* ── Divider ── */}
            <div
              className="w-full h-px mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(to right, ${testimonial.color}20, transparent 70%)`,
              }}
            />

            {/* ── Author Row ── */}
            <div className="flex items-center gap-4">
              {/* Gradient initials avatar */}
              <div
                className="relative w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold text-white tracking-wider shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}90)`,
                  boxShadow: `0 4px 10px ${testimonial.color}20`,
                }}
              >
                {getInitials(testimonial.name)}
              </div>

              {/* Name + Company */}
              <div className="flex flex-col min-w-0">
                <span className="text-slate-950 text-sm font-semibold truncate leading-tight">
                  {testimonial.name}
                </span>
                <span className="text-slate-500 text-xs font-medium truncate">
                  {testimonial.company}
                </span>
              </div>

              {/* Right badges */}
              <div className="ml-auto flex flex-col items-end gap-1.5 shrink-0">
                {/* Service badge */}
                <span
                  className="px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border whitespace-nowrap"
                  style={{
                    background: `${testimonial.color}08`,
                    borderColor: `${testimonial.color}15`,
                    color: testimonial.color,
                  }}
                >
                  {testimonial.service}
                </span>

                {/* Pakistan badge */}
                <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-green-600/5 border border-green-600/10 text-green-700/80 flex items-center gap-1">
                  <span className="text-[10px] leading-none">🇵🇰</span>
                  Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN SECTION — TESTIMONIALS
   ═══════════════════════════════════════════════ */

export function Testimonials() {
  /* ── Mouse parallax for ambient background blobs ── */
  const sectionRef = useRef<HTMLDivElement>(null);
  const rawPX = useMotionValue(0);
  const rawPY = useMotionValue(0);
  const px = useSpring(rawPX, { stiffness: 30, damping: 25 });
  const py = useSpring(rawPY, { stiffness: 30, damping: 25 });
  const px2 = useSpring(rawPX, { stiffness: 20, damping: 30 });
  const py2 = useSpring(rawPY, { stiffness: 20, damping: 30 });
  const px3 = useSpring(rawPX, { stiffness: 15, damping: 35 });
  const py3 = useSpring(rawPY, { stiffness: 15, damping: 35 });

  const handleMouse = useCallback(
    (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const { left, top, width, height } =
        sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      rawPX.set(x * 35);
      rawPY.set(y * 35);
    },
    [rawPX, rawPY]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouse);
    return () => el.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  /* ── Grid in-view for orchestrated stagger ── */
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 sm:py-40 overflow-hidden bg-[#F8FAFC]"
      id="testimonials"
    >
      {/* ── INLINE KEYFRAMES ── */}
      <style>{`
        @keyframes testimonialGridPan {
          0% { background-position: 0px 0px; }
          100% { background-position: 4rem 4rem; }
        }
        .animate-testimonial-grid {
          animation: testimonialGridPan 25s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* ══════════════════════════════════════
          BACKGROUND EFFECTS
          ══════════════════════════════════════ */}

      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-[0.8] animate-testimonial-grid pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 50%, #000 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 50%, #000 20%, transparent 100%)",
        }}
      />

      {/* Parallax Radial Atmospheric Glows */}
      <motion.div
        style={{ x: px, y: py }}
        className="absolute top-[-15%] left-[-8%] w-[650px] h-[650px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none mix-blend-multiply"
      />
      <motion.div
        style={{ x: px2, y: py2 }}
        className="absolute bottom-[-10%] right-[-8%] w-[700px] h-[700px] bg-purple-500/4 blur-[120px] rounded-full pointer-events-none mix-blend-multiply"
      />
      <motion.div
        style={{ x: px3, y: py3 }}
        className="absolute top-[35%] left-[45%] w-[500px] h-[500px] bg-cyan-500/3 blur-[120px] rounded-full pointer-events-none mix-blend-multiply"
      />

      {/* Noise Texture — matching all sections */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none mix-blend-overlay">
        <filter id="testimonialNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#testimonialNoise)" />
      </svg>

      {/* Floating ambient blur elements */}
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[12%] right-[12%] w-28 h-28 rounded-full bg-blue-500/4 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-[18%] left-[6%] w-36 h-36 rounded-full bg-purple-500/4 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
        className="absolute top-[55%] left-[55%] w-20 h-20 rounded-full bg-cyan-500/4 blur-2xl pointer-events-none"
      />

      {/* ══════════════════════════════════════
          CONTENT
          ══════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="flex flex-col items-center text-center mb-20 sm:mb-28"
        >
          {/* Glowing Badge */}
          <div className="group relative inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08] backdrop-blur-md overflow-hidden hover:bg-slate-900/[0.06] transition-colors duration-500">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-slate-700">
              Our Clients Love Working With Us
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold mb-8 text-slate-900 tracking-tight leading-[1.1]">
            Trusted by Businesses{" "}
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600">
                Across Pakistan
              </span>
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
            From startups to established businesses, we help our clients build
            modern, high-performing digital experiences that drive real business
            growth.
          </p>
        </motion.div>

        {/* ── TESTIMONIALS GRID — Orchestrated stagger via variants ── */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
