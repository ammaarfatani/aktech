import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "glow-blue" | "glow-purple" | "glow-cyan" | "glow-green" | "slate-light";
}

export function Badge({ children, variant = "glow-blue", className, ...props }: BadgeProps) {
  const variantClasses = {
    "glow-blue": "bg-blue-500/8 border border-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.1)]",
    "glow-purple": "bg-purple-500/8 border border-purple-500/20 text-purple-400 shadow-[0_0_12px_rgba(139,92,246,0.1)]",
    "glow-cyan": "bg-cyan-500/8 border border-cyan-500/20 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.1)]",
    "glow-green": "bg-green-500/8 border border-green-500/20 text-green-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]",
    "slate-light": "bg-slate-900/[0.04] border border-slate-900/[0.08] text-slate-700 font-semibold",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase font-heading select-none inline-flex items-center gap-1.5 leading-none whitespace-nowrap",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
