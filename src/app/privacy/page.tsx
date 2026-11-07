import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AKTECH Digital Solutions handles inquiry and application information submitted through this website.",
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white text-[#111111]">
      <PageHero eyebrow="Legal" title="Privacy Policy" description="This page describes the information this website currently collects. It is not a substitute for legal advice." />
      <article className="px-4 sm:px-8 lg:px-12 py-16">
        <div className="mx-auto max-w-[760px] space-y-6 text-[#4B5563] leading-relaxed">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }]} />
          <p>Last updated: 6 November 2026.</p>
          <p>
            AKTECH Digital Solutions ({siteConfig.email}) collects information that you choose to send through the contact form, project estimator, consultation request, and — when hiring is open — career applications.
          </p>
          <h2 className="font-heading text-2xl font-extrabold text-[#111111]">What we collect</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Contact details such as name, email, phone or WhatsApp, company and country.</li>
            <li>Project descriptions, preferred contact method, timeline and budget notes.</li>
            <li>Consultation preferences such as topic, timezone and preferred date or time. Preferred times are not confirmed appointments.</li>
            <li>Career application details and CVs only if a role is open and a secure upload path is configured.</li>
          </ul>
          <h2 className="font-heading text-2xl font-extrabold text-[#111111]">How it is used</h2>
          <p>
            Inquiry data is delivered through the existing AKTECH lead workflow, including a Google Apps Script / spreadsheet destination used by the contact form. The purpose is to reply to your request. We do not sell this information.
          </p>
          <h2 className="font-heading text-2xl font-extrabold text-[#111111]">Analytics</h2>
          <p>
            If Google Analytics is configured and you have granted consent, we may record page views and conversion events that do not include form field values.
          </p>
          <h2 className="font-heading text-2xl font-extrabold text-[#111111]">Contact</h2>
          <p>
            To ask about personal data held from a website inquiry, email {siteConfig.email}.
          </p>
        </div>
      </article>
    </div>
  );
}
