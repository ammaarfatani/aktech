"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  glowColor?: string;
  maxTilt?: number;
  className?: string;
}

export function GlowCard({
  children,
  glowColor = "rgba(56, 189, 248, 0.12)",
  maxTilt = 8,
  className,
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for 3D rotations
  const rotateX = useSpring(0, { stiffness: 100, damping: 18, mass: 0.5 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 18, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setCoords({ x, y });

    // Compute center and percentage offset
    const centerX = width / 2;
    const centerY = height / 2;
    const offsetX = (x - centerX) / centerX;
    const offsetY = (y - centerY) / centerY;

    rotateX.set(-offsetY * maxTilt);
    rotateY.set(offsetX * maxTilt);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={cn(
        "relative rounded-3xl overflow-hidden bg-surface-card/30 backdrop-blur-xl border border-white/5 transition-all duration-500",
        className
      )}
      {...props}
    >
      {/* Cursor Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 85%)`,
        }}
      />

      {/* Outer border highlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-500 border border-transparent"
        style={{
          opacity: isHovered ? 0.3 : 0,
          background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.4), transparent 75%)`,
          maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "source-out",
        }}
      />

      {/* Internal Translation Layer */}
      <div
        style={{
          transform: "translateZ(25px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
