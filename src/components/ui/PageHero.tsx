"use client";

import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { DisplayHeadline, type HeadlineLine } from "@/components/ui/DisplayHeadline";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title?: string;
  lines?: HeadlineLine[];
  description?: string;
  tone?: "light" | "dark";
  visual?: "editorial" | "timeline" | "grid" | "orbit" | "magazine" | "planner" | "meeting" | "knowledge" | "hire" | "map" | "nodes";
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  lines,
  description,
  tone = "light",
  visual = "editorial",
  children,
}: PageHeroProps) {
  const dark = tone === "dark";
  return (
    <header
      className={cn(
        "relative overflow-hidden px-4 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40 lg:px-12",
        dark ? "bg-[#111111] text-white" : "bg-[#F8FAFC] text-[#111111]"
      )}
    >
      <HeroArt visual={visual} dark={dark} />
      <div className="relative mx-auto max-w-[1280px]">
        {eyebrow && (
          <span
            className={cn(
              "mb-6 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] shadow-sm",
              dark ? "border-white/15 bg-white/10 text-white" : "border-black/10 bg-white text-[#111111]"
            )}
          >
            <Sparkles className="h-4 w-4 text-[#E0000B]" />
            {eyebrow}
          </span>
        )}
        {lines && lines.length > 0 ? (
          <DisplayHeadline lines={lines} dark={dark} />
        ) : title ? (
          <h1 className="max-w-4xl font-sans text-5xl font-black uppercase tracking-tight leading-[1.02] sm:text-7xl lg:text-8xl">
            {title}
          </h1>
        ) : null}
        {description && (
          <p className={cn("mt-6 max-w-2xl text-lg font-normal leading-relaxed sm:text-2xl", dark ? "text-white/70" : "text-gray-600")}>
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

function HeroArt({ visual, dark }: { visual: NonNullable<PageHeroProps["visual"]>; dark: boolean }) {
  const stroke = dark ? "rgba(255,255,255,0.12)" : "rgba(17,17,17,0.08)";
  if (visual === "nodes") {
    return (
      <svg className="pointer-events-none absolute right-[-4%] top-16 h-[22rem] w-[22rem] opacity-80" viewBox="0 0 320 320" aria-hidden>
        <circle cx="160" cy="160" r="90" fill="none" stroke={stroke} />
        <circle cx="160" cy="160" r="130" fill="none" stroke="rgba(224,0,11,0.18)" />
        <circle cx="160" cy="40" r="7" fill="#E0000B" />
      </svg>
    );
  }
  if (visual === "map") {
    return (
      <svg className="pointer-events-none absolute inset-y-8 right-0 w-[55%] opacity-40" viewBox="0 0 600 360" aria-hidden>
        <path d="M40 180 C160 40, 280 40, 400 120" stroke="#E0000B" strokeWidth="1.4" fill="none" />
        <circle cx="120" cy="150" r="6" fill="#E0000B" />
      </svg>
    );
  }
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", dark && "bg-[radial-gradient(ellipse_at_top_right,rgba(224,0,11,0.18),transparent_46%)]")}
      aria-hidden
    />
  );
}
