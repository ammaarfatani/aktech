import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/data/solutions";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "See how AKTECH solves business problems across CRM, ERP, schools, restaurants, e-commerce, SaaS, AI automation and dashboards.",
  alternates: { canonical: `${siteConfig.url}/solutions` },
};

export default function SolutionsPage() {
  return (
    <div className="bg-white text-[#111111]">
      <PageHero
        eyebrow="Solutions"
        lines={[{ text: "Complex problems." }, { text: "Powerful solutions.", accent: true }]}
        description="Each area is an operational problem AKTECH already works on — not an invented product launch."
        visual="orbit"
      />

      <section className="px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }]} />
          <div className="grid gap-6 md:grid-cols-2">
            {solutions.map((solution, index) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group rounded-[1.75rem] border border-black/8 bg-[#F8F8F6] p-7 sm:p-8 transition-colors hover:border-[#E0000B]/30 hover:bg-white"
              >
                <p className="font-heading text-sm font-bold text-[#E0000B]">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight group-hover:text-[#E0000B]">
                  {solution.title}
                </h2>
                <p className="mt-3 text-[#4B5563] leading-relaxed">{solution.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#111111]">
                  View solution
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
