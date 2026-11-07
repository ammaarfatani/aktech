import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProcessJourney } from "@/components/process/ProcessJourney";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Our Process",
  description: "How AKTECH takes a brief from discovery through design, engineering, launch and support.",
  alternates: { canonical: `${siteConfig.url}/our-process` },
};

export default function OurProcessPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111111]">
      <PageHero
        eyebrow="How we work"
        lines={[{ text: "From first idea." }, { text: "To final impact.", accent: true }]}
        description="A six-stage delivery method. Each stage has a clear purpose, a set of activities, and a defined output before the next one begins."
      />

      <section className="px-4 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <ProcessJourney />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 rounded-[2rem] border border-black/8 bg-white px-8 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E0000B]">Start a project</p>
            <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight sm:text-4xl">Ready when you are.</h2>
            <p className="mt-3 max-w-xl text-gray-600">
              Tell us the problem you are trying to solve. We will come back with the next useful conversation.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E0000B] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#C00009]"
          >
            Let&apos;s Talk
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
