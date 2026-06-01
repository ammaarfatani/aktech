"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for immediate, un-lagged tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for the trailing/smooth effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.hasAttribute("data-cursor-hover")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null; // Don't render on mobile
  }

  return (
    <>
      {/* Tiny precise dot (instant follow) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-difference pointer-events-none z-[100]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 0 : 1, // Hide dot when hovering to let outer ring shine
        }}
      />
      
      {/* Smooth trailing glow ring - Simplified for performance */}
      <motion.div
        className="fixed top-0 left-0 border border-white/30 rounded-full mix-blend-difference pointer-events-none z-[99]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          width: 32,
          height: 32,
        }}
        animate={{
          scale: isClicking ? 0.9 : isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          borderWidth: isHovered ? "0px" : "1px",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  );
}

