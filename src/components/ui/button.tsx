"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary-glow" | "secondary-glass" | "light-btn" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  magneticRange?: number;
  magneticStrength?: number;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary-glow",
      size = "md",
      magnetic = false,
      magneticRange = 60,
      magneticStrength = 0.38,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-9 px-4 text-xs font-semibold uppercase tracking-wider rounded-xl",
      md: "h-12 px-6 text-sm font-bold uppercase tracking-wider rounded-2xl",
      lg: "h-14 px-8 text-base font-bold uppercase tracking-wider rounded-3xl",
    };

    const variantClasses = {
      "primary-glow":
        "relative text-white border border-transparent shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.4)] active:scale-95",
      "secondary-glass":
        "relative bg-white/[0.03] text-gray-200 border border-white/[0.08] hover:bg-white/[0.06] hover:text-white transition-all duration-300 active:scale-95",
      "light-btn":
        "bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-300 shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_25px_rgba(15,23,42,0.25)] active:scale-95",
      ghost: "text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95",
      link: "text-primary underline-offset-4 hover:underline transition-all duration-300",
    };

    const buttonElement = (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-heading select-none cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {variant === "primary-glow" && (
          <>
            {/* Background color gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 -z-10" />
            {/* Overlay glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-300 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-[2px]" />
          </>
        )}
        {children}
      </button>
    );

    if (magnetic) {
      return (
        <Magnetic range={magneticRange} strength={magneticStrength}>
          {buttonElement}
        </Magnetic>
      );
    }

    return buttonElement;
  }
);

Button.displayName = "Button";
