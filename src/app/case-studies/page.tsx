import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_CASE_STUDIES } from "@/data/caseStudies";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "A closer look at websites, stores and systems designed and engineered by AKTECH.",
  alternates: { canonical: `${siteConfig.url}/case-studies` },
};

export default function CaseStudiesPage() {
  return (
    <div className="bg-white text-[#111111]">
      <PageHero
        eyebrow="Case studies"
        lines={[{ text: "Work that" }, { text: "speaks for itself.", accent: true }]}
        description="Each study describes the visible product and how it was built. Metrics appear only when they have been verified."
        visual="grid"
      />
      <section className="px-4 sm:px-8 lg:px-12 pb-24">
        <div className="mx-auto max-w-[1200px]">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Case Studies", href: "/case-studies" }]} />
          <div className="grid gap-8 md:grid-cols-2">
            {FEATURED_CASE_STUDIES.map((project, index) => (
              <article key={project.slug} className="group overflow-hidden rounded-[1.75rem] border border-black/8 bg-[#F8F8F6]">
                <Link href={`/case-studies/${project.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-white">
                    <Image
                      src={project.mainImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-7">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E0000B]">
                      {String(index + 1).padStart(2, "0")} · {project.category}
                    </p>
                    <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight group-hover:text-[#E0000B]">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-[#4B5563] leading-relaxed">{project.shortDescription}</p>
                    <span className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.18em]">Read the study</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
