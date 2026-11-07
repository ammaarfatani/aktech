import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  error,
  select,
  children,
}: {
  label: string;
  error?: string;
  select?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#111111]">{label}</span>
      <span className="relative block">
        {children}
        {select && <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />}
      </span>
      {error && <span className="mt-1.5 block text-sm text-[#E0000B]">{error}</span>}
    </label>
  );
}

export const inputClass = cn(
  "w-full rounded-2xl border border-black/10 bg-gray-50 px-4 py-3.5 text-sm font-medium text-[#111111] outline-none transition-all",
  "placeholder:text-gray-400 focus:border-[#111111] focus:bg-white"
);

export const selectClass = cn(inputClass, "appearance-none cursor-pointer pr-11");
