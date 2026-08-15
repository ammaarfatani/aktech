import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "glow-red" | "glow-black" | "glow-blue" | "glow-purple" | "glow-cyan" | "glow-green" | "slate-light";
}

export function Badge({ children, variant = "glow-red", className, ...props }: BadgeProps) {
  const variantClasses = {
    "glow-red": "bg-[#E0000B]/10 border border-[#E0000B]/25 text-[#E0000B] shadow-[0_0_12px_rgba(224,0,11,0.15)]",
    "glow-black": "bg-[#111111]/10 border border-[#111111]/20 text-[#111111]",
    "glow-blue": "bg-[#E0000B]/10 border border-[#E0000B]/25 text-[#E0000B] shadow-[0_0_12px_rgba(224,0,11,0.15)]",
    "glow-purple": "bg-[#111111]/10 border border-[#111111]/20 text-[#111111]",
    "glow-cyan": "bg-[#E0000B]/10 border border-[#E0000B]/25 text-[#E0000B] shadow-[0_0_12px_rgba(224,0,11,0.15)]",
    "glow-green": "bg-[#E0000B]/10 border border-[#E0000B]/25 text-[#E0000B]",
    "slate-light": "bg-[#111111]/[0.05] border border-[#111111]/[0.1] text-[#111111] font-semibold",
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
