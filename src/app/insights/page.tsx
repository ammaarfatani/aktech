import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical writing from AKTECH on software, websites, automation, CRM and design.",
  alternates: { canonical: `${siteConfig.url}/insights` },
};

export default function InsightsPage() {
  return (
    <div className="bg-white text-[#111111]">
      <PageHero
        eyebrow="Insights"
        lines={[{ text: "Ideas that" }, { text: "move us forward.", accent: true }]}
        description="Original articles on websites, software, automation and operations."
        visual="magazine"
      />
      <section className="px-4 sm:px-8 lg:px-12 py-16">
        <div className="mx-auto max-w-[1100px]">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Insights", href: "/insights" }]} />
          <InsightsIndex />
        </div>
      </section>
    </div>
  );
}
