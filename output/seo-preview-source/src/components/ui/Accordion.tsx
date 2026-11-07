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
        isOpen ? "bg-white border-[#E0000B]/30 shadow-[0_10px_30px_rgba(224,0,11,0.08)]" : "bg-slate-50/70 border-black/5 hover:border-black/15 hover:bg-white"
      )}
    >
      {/* Top Edge Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E0000B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <button
        onClick={onToggle}
        className="relative z-10 w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none cursor-pointer"
      >
        <span className={cn(
          "text-base sm:text-lg font-heading font-bold tracking-wide transition-colors duration-300 pr-8",
          isOpen ? "text-[#111111]" : "text-gray-700 group-hover:text-[#111111]"
        )}>
          {title}
        </span>
        <div
          className={cn(
            "relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border",
            isOpen
              ? "bg-[#E0000B] text-white border-[#E0000B] shadow-[0_0_15px_rgba(224,0,11,0.3)]"
              : "bg-black/5 text-[#111111] border-transparent group-hover:bg-[#111111] group-hover:text-white"
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
            <div className="relative z-10 px-6 sm:px-8 pb-8 text-gray-600 text-sm sm:text-base font-normal leading-relaxed">
              <div className="w-full h-px bg-gradient-to-r from-[#E0000B]/30 to-transparent mb-6" />
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
