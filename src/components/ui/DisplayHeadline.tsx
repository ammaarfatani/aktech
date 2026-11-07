"use client";

import { motion } from "framer-motion";
import { fontSans } from "@/styles/fonts";
import { cn } from "@/lib/utils";

export type HeadlineLine = {
  text: string;
  accent?: boolean;
};

const accentClass =
  "bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]";
const accentClassDark =
  "bg-gradient-to-r from-white via-[#E0000B] to-white bg-clip-text text-transparent [-webkit-text-fill-color:transparent]";

export function DisplayHeadline({
  lines,
  className,
  dark = false,
}: {
  lines: HeadlineLine[];
  className?: string;
  dark?: boolean;
}) {
  return (
    <h1
      className={cn(
        fontSans.className,
        "max-w-4xl text-5xl font-black uppercase tracking-tight text-[#111111] sm:text-7xl lg:text-8xl",
        "leading-[1.02]",
        dark && "text-white",
        className
      )}
    >
      {lines.map((line, index) => (
        <motion.span
          key={`${line.text}-${index}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
          className={cn("block", line.accent && (dark ? accentClassDark : accentClass))}
        >
          {line.text}
        </motion.span>
      ))}
    </h1>
  );
}
