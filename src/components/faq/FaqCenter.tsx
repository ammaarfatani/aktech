"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "@/data/faqs";

export function FaqCenter() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof FAQ_CATEGORIES)[number] | "All">("All");
  const [open, setOpen] = useState<string | null>(FAQ_ITEMS[0]?.question ?? null);

  const items = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const inCategory = category === "All" || item.category === category;
      const haystack = `${item.question} ${item.answer}`.toLowerCase();
      return inCategory && haystack.includes(query.trim().toLowerCase());
    });
  }, [category, query]);

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="flex flex-col gap-4 lg:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search questions"
          className="flex-1 rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E0000B]/15"
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {(["All", ...FAQ_CATEGORIES] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] ${
              category === item ? "bg-[#111111] text-white" : "bg-black/5 text-[#4B5563]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-3">
        {items.map((item) => {
          const isOpen = open === item.question;
          return (
            <div key={item.question} className="rounded-[1.5rem] border border-black/8 bg-white">
              <button
                type="button"
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(isOpen ? null : item.question)}
              >
                <span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#E0000B]">{item.category}</span>
                  <span className="mt-1 block font-heading text-lg font-extrabold">{item.question}</span>
                </span>
                <span className="text-xl text-[#6B7280]">{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-[#4B5563]">
                  <p>{item.answer}</p>
                  {item.relatedHref && (
                    <Link href={item.relatedHref} className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.16em] text-[#111111] hover:text-[#E0000B]">
                      {item.relatedLabel}
                    </Link>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-16 rounded-[1.75rem] bg-[#141414] p-8 text-white">
        <h2 className="font-heading text-2xl font-extrabold">Still deciding the next step?</h2>
        <p className="mt-3 max-w-2xl text-white/70">Request a consultation. Preferred times are reviewed before any meeting is confirmed.</p>
        <Link href="/book-consultation" className="mt-6 inline-flex rounded-full bg-[#E0000B] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em]">
          Book a consultation
        </Link>
      </div>
    </div>
  );
}
