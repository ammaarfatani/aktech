import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ConsultationRequest } from "@/components/consultation/ConsultationRequest";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Tell us about your project, and our team will get back to you to arrange the next steps.",
  alternates: { canonical: `${siteConfig.url}/book-consultation` },
};

export default function BookConsultationPage() {
  return (
    <div className="bg-white text-[#111111]">
      <PageHero
        eyebrow="Consultation"
        lines={[{ text: "Let's talk." }, { text: "Let's build.", accent: true }]}
        description="Tell us about your project, and our team will get back to you to arrange the next steps."
        visual="meeting"
      />
      <section className="px-4 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Book a Consultation", href: "/book-consultation" }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-3xl font-extrabold tracking-tight">A focused conversation about the work.</h2>
              <p className="mt-4 leading-relaxed text-[#4B5563]">
                Share the problem, the tools you already use, and when you prefer to talk. We will reply to agree the next useful step.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-[#4B5563]">
                <li className="rounded-2xl bg-[#F8F8F6] p-4">Clarify scope before anyone estimates.</li>
                <li className="rounded-2xl bg-[#F8F8F6] p-4">See whether the work fits how AKTECH delivers.</li>
                <li className="rounded-2xl bg-[#F8F8F6] p-4">Leave with a next action, not a brochure.</li>
              </ul>
              <div className="mt-10 overflow-hidden rounded-[2rem] border border-black/8 bg-[#F8F8F6] p-8">
                <div className="flex items-center gap-3">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white p-1.5 ring-1 ring-black/5">
                    <Image src="/logo.png" alt={siteConfig.legalName} fill className="object-contain" />
                  </span>
                  <div>
                    <p className="font-heading text-base font-extrabold tracking-tight text-[#111111]">{siteConfig.legalName}</p>
                    <p className="mt-0.5 text-sm text-[#4B5563]">Remote collaboration worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 rounded-[1.75rem] border border-black/8 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:p-8">
              <ConsultationRequest />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
