"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const POINTS = [
  {
    number: "01",
    title: "Engineering you can operate",
    body: "We build software around the workflow your team actually runs — with access, documentation and a handover you can keep using after launch.",
  },
  {
    number: "02",
    title: "Design with restraint",
    body: "Visual polish is part of the product, not decoration piled on top of a template. Interfaces stay readable, fast and consistent across devices.",
  },
  {
    number: "03",
    title: "Honest scope",
    body: "Timelines, features and support are agreed in writing. We do not publish ratings, invented testimonials or guarantees we cannot demonstrate.",
  },
  {
    number: "04",
    title: "Products we also use",
    body: "Client systems and our own product work — Acadivo, Restro ERP and Fitivo — share the same engineering standard. Upcoming products stay labelled as coming soon.",
  },
];

export function WhyAKTECH() {
  return (
    <section className="relative border-t border-black/5 bg-[#F8F8F6] py-24 sm:py-32 px-4 sm:px-8 lg:px-12" id="why-aktech">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#E0000B]">Why work with AKTECH</p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            A studio that treats software as a business system, not a brochure.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {POINTS.map((point, index) => (
            <motion.article
              key={point.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-black/8 bg-white p-8"
            >
              <p className="font-heading text-sm font-bold text-[#E0000B]">{point.number}</p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-tight">{point.title}</h3>
              <p className="mt-3 text-[#4B5563] leading-relaxed">{point.body}</p>
            </motion.article>
          ))}
        </div>
        <Link
          href="/contact"
          className="mt-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] hover:text-[#E0000B]"
        >
          Start a project conversation
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
