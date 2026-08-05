"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div
      className={cn(
        "group relative rounded-3xl overflow-hidden transition-all duration-500 border",
        isOpen ? "bg-[#0B1020]/90 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.06)]" : "bg-white/[0.01] border-white/[0.04]"
      )}
    >
      {/* Top Edge Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <button
        onClick={onToggle}
        className="relative z-10 w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none cursor-pointer"
      >
        <span className={cn(
          "text-base sm:text-lg font-heading font-semibold tracking-wide transition-colors duration-300 pr-8",
          isOpen ? "text-white" : "text-gray-400 group-hover:text-white"
        )}>
          {title}
        </span>
        <div
          className={cn(
            "relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border",
            isOpen
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              : "bg-white/5 text-gray-500 border-transparent group-hover:bg-white/10 group-hover:text-gray-300 group-hover:border-white/10"
          )}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative z-10 px-6 sm:px-8 pb-8 text-gray-450 text-sm sm:text-base font-light leading-relaxed">
              <div className="w-full h-px bg-gradient-to-r from-blue-500/20 to-transparent mb-6" />
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: { title: string; content: React.ReactNode }[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("flex flex-col gap-4 sm:gap-6", className)}>
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
