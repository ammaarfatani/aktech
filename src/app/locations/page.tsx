import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { GlobalNetwork } from "@/components/locations/GlobalNetwork";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Global Collaboration",
  description:
    "Great digital products aren't limited by geography. AKTECH collaborates remotely with businesses worldwide through timezone-aware communication, online consultations, and digital delivery.",
  alternates: { canonical: `${siteConfig.url}/locations` },
};

const MARKETS = [
  { title: "Karachi", body: "Business websites for local teams. Digital collaboration. No published street address." },
  { title: "Lahore", body: "Custom software discussed remotely. No Lahore office and no promised site visits." },
  { title: "UAE", body: "Remote delivery. No Emirates office. Arabic, English and Gulf review hours are scoped first." },
  { title: "United Kingdom", body: "Remote websites for UK companies. No London office. UK-time reviews are agreed, not assumed." },
  { title: "United States", body: "Remote custom software. No US office. Eastern-to-Pacific overlap is planned per project." },
];

const CAPABILITIES = [
  { title: "Worldwide remote collaboration", body: "Discovery, design reviews, development updates and handover happen through shared tools and video — wherever your team sits." },
  { title: "International project inquiries", body: "Country, timezone and preferred meeting windows are part of the brief. Inquiries are not limited to one market." },
  { title: "Timezone-aware communication", body: "We agree overlap hours at the start so reviews and decisions happen in a window that both sides can keep." },
  { title: "Online consultations", body: "Request a conversation. A time is confirmed after we review the brief — not as an instant calendar booking." },
  { title: "Digital project delivery", body: "Working increments, written approvals and access notes travel with the product. No extra offices are implied." },
];

const STEPS = [
  { title: "Discovery meetings", body: "We meet on video in an agreed overlap window. You bring the workflow, tools and decision-makers." },
  { title: "Remote communication", body: "Written notes, shared designs and staged builds keep progress visible." },
  { title: "Development collaboration", body: "Reviews happen against working increments — not slide decks that hide unfinished software." },
  { title: "Milestones", body: "Scope is split into checkpoints with written approval before the next phase starts." },
  { title: "Progress updates", body: "You see what changed, what is blocked and what is needed from your side." },
  { title: "Delivery and support", body: "Handover includes access and operating notes. Ongoing support is included when it is in the agreement." },
];

export default function LocationsPage() {
  return (
    <div className="bg-white text-[#111111]">
      <PageHero
        eyebrow="Global collaboration"
        lines={[{ text: "No borders." }, { text: "Just possibilities.", accent: true }]}
        description="Great digital products aren't limited by geography. AKTECH collaborates remotely with businesses worldwide, delivering software, digital experiences and technology solutions."
        visual="map"
      />

      <section className="px-4 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E0000B]">A global digital solutions agency</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight">Collaborate with AKTECH from anywhere.</h2>
            <p className="mt-4 leading-relaxed text-[#4B5563]">
              Engineering digital experiences for a connected world. We do not list additional offices, and we do not invent local teams in other cities. Remote collaboration is the working model.
            </p>
          </div>
          <div className="lg:col-span-6">
            <GlobalNetwork />
          </div>
        </div>
      </section>

      <section className="bg-[#F8F8F6] px-4 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight">How international work actually runs</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-black/6 bg-white p-6">
                <h3 className="font-heading text-lg font-extrabold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight">Markets we can discuss</h2>
          <p className="mt-3 max-w-2xl text-[#4B5563]">These are remote-collaboration contexts, not offices. Matching city and country pages stay unpublished until each one is reviewed and approved.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MARKETS.map((item) => (
              <article key={item.title} className="rounded-2xl border border-black/8 bg-[#F8F8F6] p-5">
                <h3 className="font-heading text-lg font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight">The collaboration cadence</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {STEPS.map((step, index) => (
              <article key={step.title} className="grid grid-cols-[auto_1fr] gap-4">
                <p className="font-heading text-3xl font-bold text-[#E0000B]">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="font-heading text-xl font-extrabold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-6 rounded-[2rem] bg-[#111111] px-8 py-12 text-white lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-extrabold">Your global technology partner.</h2>
            <p className="mt-3 max-w-xl text-white/70">Share the problem, your country and a preferred meeting window. We will reply to agree the next useful step.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/book-consultation" className="inline-flex rounded-full bg-[#E0000B] px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white">
              Book a consultation
            </Link>
            <Link href="/contact" className="inline-flex rounded-full border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
