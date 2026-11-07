import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the AKTECH Digital Solutions website.",
  alternates: { canonical: `${siteConfig.url}/terms` },
};

export default function TermsPage() {
  return (
    <div className="bg-white text-[#111111]">
      <PageHero eyebrow="Legal" title="Terms of use" description="These terms cover use of this website. Project work is governed by a separate agreement." />
      <article className="px-4 sm:px-8 lg:px-12 py-16">
        <div className="mx-auto max-w-[760px] space-y-6 text-[#4B5563] leading-relaxed">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms", href: "/terms" }]} />
          <p>Last updated: 6 November 2026.</p>
          <p>
            The content on this website describes AKTECH Digital Solutions and the work we offer. It is not a quote, a contract or a guarantee of availability.
          </p>
          <p>
            Submitting a contact, estimate or consultation form is a request for a conversation. It does not create a project, a meeting slot or a hiring relationship until AKTECH confirms that in writing.
          </p>
          <p>
            Product names such as Acadivo, Restro ERP and Fitivo may be shown as coming soon. Upcoming products are not represented as publicly launched.
          </p>
          <p>
            Questions: {siteConfig.email}.
          </p>
        </div>
      </article>
    </div>
  );
}
