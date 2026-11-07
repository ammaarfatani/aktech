import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getJob, jobs } from "@/data/jobs";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ApplyViaEmail } from "@/components/careers/ApplyViaEmail";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Role not found" };
  return {
    title: job.title,
    description: job.summary,
    alternates: { canonical: `${siteConfig.url}/careers/${job.slug}` },
    robots: job.status === "open" ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const detail = (label: string, value?: string) => (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B7280]">{label}</p>
      <p className="mt-1 font-medium">{value || "To be confirmed"}</p>
    </div>
  );

  return (
    <div className="bg-white text-[#111111]">
      <PageHero
        eyebrow={job.department}
        lines={[{ text: job.title }]}
        description={`${job.location} · ${job.workMode} · ${job.employmentType}`}
        visual="hire"
      />
      <article className="px-4 sm:px-8 lg:px-12 py-16">
        <div className="mx-auto max-w-[800px]">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Careers", href: "/careers" },
              { name: job.title, href: `/careers/${job.slug}` },
            ]}
          />

          {job.status !== "open" && (
            <p className="mb-10 rounded-2xl border border-black/10 bg-[#F8F8F6] px-5 py-4 text-sm text-[#4B5563]">
              This listing is not open for applications.
            </p>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            {detail("Location", job.location)}
            {detail("Work mode", job.workMode)}
            {detail("Employment type", job.employmentType)}
            {detail("Experience", job.experience)}
          </div>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-extrabold">Responsibilities</h2>
            <ul className="mt-4 space-y-2 text-[#4B5563]">
              {job.responsibilities.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          {job.skills.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading text-2xl font-extrabold">Relevant skills</h2>
              <p className="mt-3 text-[#4B5563]">{job.skills.join(" · ")}</p>
            </section>
          )}

          {job.requiredQualifications.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading text-2xl font-extrabold">Required qualifications</h2>
              <ul className="mt-4 space-y-2 text-[#4B5563]">
                {job.requiredQualifications.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>
          )}

          {job.preferredQualifications.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading text-2xl font-extrabold">Preferred qualifications</h2>
              <ul className="mt-4 space-y-2 text-[#4B5563]">
                {job.preferredQualifications.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>
          )}

          {job.status === "open" && (
            <div className="mt-12">
              <ApplyViaEmail job={job} />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
