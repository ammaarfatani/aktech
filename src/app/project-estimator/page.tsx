import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProjectEstimator } from "@/components/estimator/ProjectEstimator";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Project Estimator",
  description: "Share your project type, country, timezone and constraints so AKTECH can prepare a tailored estimate. International inquiries are welcome.",
  alternates: { canonical: `${siteConfig.url}/project-estimator` },
};

export default function ProjectEstimatorPage() {
  return (
    <div className="bg-white text-[#111111]">
      <PageHero
        eyebrow="Project estimator"
        lines={[{ text: "Big ideas." }, { text: "Smarter estimates.", accent: true }]}
        description="Walk through six steps. We use your brief to prepare a tailored estimate — this page does not generate a price."
        visual="nodes"
      />
      <section className="px-4 sm:px-8 lg:px-12 py-16">
        <div className="mx-auto max-w-[800px]">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Project Estimator", href: "/project-estimator" }]} />
          <div className="mb-10 flex flex-col gap-4 rounded-2xl bg-[#F8F8F6] px-5 py-4 sm:flex-row sm:items-center sm:gap-5">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white p-1.5 ring-1 ring-black/5">
              <Image src="/logo.png" alt={siteConfig.legalName} fill className="object-contain" />
            </span>
            <div>
              <p className="font-heading text-sm font-extrabold tracking-tight text-[#111111]">{siteConfig.legalName}</p>
              <p className="mt-1 text-sm text-[#4B5563]">
                Your project scope is ready for review after you submit. Our team will prepare a tailored estimate. No fixed package prices are shown here because they would not be accurate.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-black/8 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.05)] sm:p-8">
            <ProjectEstimator />
          </div>
        </div>
      </section>
    </div>
  );
}
