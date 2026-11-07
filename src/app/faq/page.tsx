import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqCenter } from "@/components/faq/FaqCenter";
import { FAQJsonLd } from "@/components/shared/JsonLd";
import { FAQ_ITEMS } from "@/data/faqs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about AKTECH services, international collaboration, process, careers and how to start a project from anywhere.",
  alternates: { canonical: `${siteConfig.url}/faq` },
};

export default function FaqPage() {
  return (
    <div className="bg-white">
      <FAQJsonLd faqs={FAQ_ITEMS.map((item) => ({ question: item.question, answer: item.answer }))} />
      <PageHero
        eyebrow="FAQ"
        lines={[{ text: "Questions?" }, { text: "We've got answers.", accent: true }]}
        description="Search by topic. If a policy is not written here, ask us directly."
        visual="knowledge"
      />
      <div className="px-4 sm:px-8 lg:px-12 py-16">
        <div className="mx-auto max-w-[1100px]">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]} />
          <div className="mt-10">
            <FaqCenter />
          </div>
        </div>
      </div>
    </div>
  );
}
