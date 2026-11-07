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
        "relative bg-[#E0000B] text-white border border-transparent shadow-[0_0_20px_rgba(224,0,11,0.25)] transition-all duration-300 hover:bg-[#C00009] hover:shadow-[0_0_30px_rgba(224,0,11,0.4)] hover:scale-[1.02] active:scale-95",
      "secondary-glass":
        "relative bg-white text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm",
      "light-btn":
        "bg-[#111111] text-white hover:bg-black transition-all duration-300 shadow-[0_8px_20px_rgba(17,17,17,0.15)] hover:shadow-[0_12px_25px_rgba(17,17,17,0.25)] hover:scale-[1.02] active:scale-95",
      ghost: "text-[#4B5563] hover:text-[#111111] hover:bg-black/5 transition-all duration-300 active:scale-95",
      link: "text-[#E0000B] underline-offset-4 hover:underline hover:text-[#C00009] transition-all duration-300",
    };

    const buttonElement = (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-heading select-none cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0000B] disabled:opacity-50 disabled:pointer-events-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {variant === "primary-glow" && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#E0000B] to-[#C00009] opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-[1px]" />
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
