import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CareersBoard } from "@/components/careers/CareersBoard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "AKTECH is hiring in Karachi. Apply for open full-time, on-site roles.",
  alternates: { canonical: `${siteConfig.url}/careers` },
};

export default function CareersPage() {
  return (
    <div className="bg-white text-[#111111]">
      <PageHero
        eyebrow="Careers · Karachi"
        lines={[{ text: "Build your future." }, { text: "With AKTECH.", accent: true }]}
        description="Four full-time, on-site roles in Karachi, Pakistan. Apply via email with your CV. Compensation is discussed privately during hiring."
        visual="hire"
      >
        <Link href="#roles" className="inline-flex rounded-full bg-[#111111] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-[#E0000B]">
          View open roles
        </Link>
      </PageHero>

      <section id="roles" className="px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1000px]">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Careers", href: "/careers" }]} />
          <h2 className="mt-10 font-heading text-3xl font-extrabold tracking-tight">Open roles</h2>
          <p className="mt-3 max-w-2xl text-[#4B5563]">
            Department filters and search below. Every listing is actively hiring: Karachi, on-site, full-time.
          </p>
          <div className="mt-8">
            <CareersBoard />
          </div>
        </div>
      </section>
    </div>
  );
}
