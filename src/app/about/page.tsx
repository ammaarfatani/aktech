"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FEATURED_CASE_STUDIES } from "@/data/caseStudies";
import { PageHero } from "@/components/ui/PageHero";

const VALUES = [
  { title: "Clarity before code", body: "We map the workflow, the people and the source of truth before choosing a stack or drawing an interface." },
  { title: "Software you can operate", body: "A launch is not a demo. Access, documentation and the next support conversation are part of delivery when they are in scope." },
  { title: "Honest claims", body: "We do not publish invented ratings, testimonials or guarantees. Work should be inspectable." },
  { title: "Design with restraint", body: "Visual polish supports the product. It does not hide a template or a process the team cannot run." },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-[#111111]">
      <PageHero
        eyebrow="About AKTECH"
        lines={[
          { text: "We don't just build." },
          { text: "We engineer what's next.", accent: true },
        ]}
        description="AKTECH Digital Solutions combines creative thinking, engineering excellence and intelligent technology to build digital experiences that move businesses forward."
      />

      <section className="px-4 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E0000B]">Our story</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight">A studio that treats software as a business system.</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-[#4B5563] lg:col-span-8">
            <p>
              AKTECH Digital Solutions is a global digital solutions agency. We design and engineer websites, custom applications, SaaS products, CRM and ERP workflows, and AI-assisted automation for teams that need systems they can actually run — collaborating remotely from anywhere.
            </p>
            <p>
              The work is a mix of client projects and our own product development — including Acadivo, Restro ERP and Fitivo, which remain in development until they are publicly launched.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F8F6] px-4 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E0000B]">Mission</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold">Turn messy operational work into clear digital products.</h2>
            <p className="mt-4 leading-relaxed text-[#4B5563]">
              We start with the people, records and decisions involved — then we build the smallest product that can carry that work without inventing a process the team will not use.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E0000B]">Vision</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold">Serious engineering with the presence of a creative studio.</h2>
            <p className="mt-4 leading-relaxed text-[#4B5563]">
              Interfaces should be distinctive. Backends should be maintainable. Neither should be used to hide incomplete thinking.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E0000B]">Engineering philosophy</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold">Problem-solving before presentation.</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {VALUES.map((item) => (
              <article key={item.title} className="border-t border-black/10 pt-5">
                <h3 className="font-heading text-xl font-extrabold">{item.title}</h3>
                <p className="mt-3 text-[#4B5563]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F8F6] px-4 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E0000B]">Selected work</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold">Projects you can inspect.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {FEATURED_CASE_STUDIES.slice(0, 3).map((project) => (
              <Link key={project.slug} href={`/case-studies/${project.slug}`} className="group overflow-hidden rounded-[1.5rem] bg-white">
                <div className="relative aspect-[16/10] bg-[#111111]/5">
                  <Image src={project.mainImage} alt={project.title} fill className="object-contain object-top" sizes="(max-width:768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E0000B]">{project.category}</p>
                  <h3 className="mt-2 font-heading text-lg font-extrabold group-hover:text-[#E0000B]">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/case-studies" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] hover:text-[#E0000B]">
            All case studies <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E0000B]">Collaborate</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight">Work with AKTECH.</h2>
            <p className="mt-4 max-w-xl text-[#4B5563]">Share the problem, the tools you already use, and the outcome you need.</p>
          </div>
          <Link href="/book-consultation" className="inline-flex items-center gap-2 rounded-full bg-[#E0000B] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white">
            Book a consultation <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
