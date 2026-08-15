import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, LayoutGrid } from "lucide-react";
import { FEATURED_CASE_STUDIES, getCaseStudy } from "@/data/caseStudies";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return FEATURED_CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return { title: "Case Study Not Found" };

  const title = `${project.title} | AKTECH Case Study`;
  const description = project.shortDescription;
  const url = `${siteConfig.url}/case-studies/${slug}`;

  return {
    title,
    description,
    keywords: [
      project.title,
      project.category,
      "AKTECH case study",
      ...project.role,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: project.mainImage.startsWith("http") ? project.mainImage : `${siteConfig.url}${project.mainImage}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [project.mainImage.startsWith("http") ? project.mainImage : `${siteConfig.url}${project.mainImage}`],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    notFound();
  }

  // Find previous and next projects for bottom navigation
  const currentIndex = FEATURED_CASE_STUDIES.findIndex((p) => p.slug === slug);
  const prevIndex = (currentIndex - 1 + FEATURED_CASE_STUDIES.length) % FEATURED_CASE_STUDIES.length;
  const nextIndex = (currentIndex + 1) % FEATURED_CASE_STUDIES.length;
  const prevProject = FEATURED_CASE_STUDIES[prevIndex];
  const nextProject = FEATURED_CASE_STUDIES[nextIndex];

  return (
    <div className="min-h-screen bg-white text-[#111111] pt-32 pb-24 px-4 sm:px-8 lg:px-12 selection:bg-[#E0000B]/20 selection:text-[#E0000B]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Portfolio", item: "/portfolio" },
          { name: project.title, item: `/case-studies/${slug}` },
        ]}
      />

      {/* ───── TOP BREADCRUMB / BACK LINK ───── */}
      <div className="max-w-[1200px] mx-auto mb-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-[#E0000B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#E0000B]" />
          <span>Back to Case Studies</span>
        </Link>
      </div>

      {/* ───── 1. HERO SECTION ───── */}
      <header className="max-w-[1200px] mx-auto mb-16 sm:mb-24">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full w-fit bg-[#111111]/5 border border-[#111111]/10">
          <Sparkles className="w-4 h-4 text-[#E0000B]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111]">
            CASE STUDY <span className="text-[#E0000B] mx-1.5">•</span> {project.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.05] mb-8">
          {project.title}
        </h1>

        {/* Short Statement */}
        <p className="text-xl sm:text-2xl text-gray-700 font-normal leading-relaxed max-w-3xl mb-12">
          {project.shortDescription}
        </p>

        {/* Project Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-8 border-y border-black/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-1">
              Client
            </span>
            <span className="text-base font-bold text-[#111111]">{project.client}</span>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-1">
              Year
            </span>
            <span className="text-base font-bold text-[#111111]">{project.year}</span>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-1">
              Role & Services
            </span>
            <span className="text-base font-bold text-[#111111]">{project.role.join(" • ")}</span>
          </div>
        </div>

        {/* Main Hero Showcase Image */}
        <div className="relative w-full h-[400px] sm:h-[600px] lg:h-[700px] rounded-[2.5rem] overflow-hidden border border-black/10 shadow-2xl mt-12 bg-gray-100">
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            sizes="100vw"
            priority
            className="object-cover object-top"
          />
        </div>
      </header>

      {/* ───── 2. EDITORIAL STORY SECTIONS ───── */}
      <main className="max-w-[1000px] mx-auto space-y-20 sm:space-y-28">
        
        {/* SECTION 01: THE CHALLENGE */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-black/10 pb-16">
          <div className="md:col-span-4">
            <span className="text-3xl font-heading font-extrabold text-[#E0000B]">01</span>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111] mt-1">
              THE CHALLENGE
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-normal">
              {project.caseStudy.challenge}
            </p>
          </div>
        </section>

        {/* SECTION 02: THE APPROACH */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-black/10 pb-16">
          <div className="md:col-span-4">
            <span className="text-3xl font-heading font-extrabold text-[#E0000B]">02</span>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111] mt-1">
              THE APPROACH
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-normal">
              {project.caseStudy.approach}
            </p>
          </div>
        </section>

        {/* SECTION 03: KEY FEATURES */}
        <section className="border-b border-black/10 pb-16">
          <div className="mb-10">
            <span className="text-3xl font-heading font-extrabold text-[#E0000B]">03</span>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111] mt-1">
              KEY FEATURES & CAPABILITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#F8FAFC] border border-black/5"
              >
                <CheckCircle2 className="w-5 h-5 text-[#E0000B] shrink-0 mt-0.5" />
                <span className="text-base font-semibold text-[#111111]">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 04: THE RESULT */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-black/10 pb-16">
          <div className="md:col-span-4">
            <span className="text-3xl font-heading font-extrabold text-[#E0000B]">04</span>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111] mt-1">
              THE RESULT
            </h2>
          </div>
          <div className="md:col-span-8">
            <div className="p-8 rounded-[2rem] bg-[#111111] text-white shadow-xl">
              <p className="text-lg sm:text-xl leading-relaxed font-normal">
                {project.caseStudy.result}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 05: PROJECT GALLERY */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-5 h-5 text-[#E0000B]" />
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111]">
                PROJECT GALLERY
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {project.screenshots.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-[350px] sm:h-[550px] rounded-3xl overflow-hidden border border-black/10 shadow-xl bg-gray-50"
                >
                  <Image
                    src={imgSrc}
                    alt={`${project.title} Screenshot ${idx + 1}`}
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* ───── 3. PREVIOUS / NEXT CASE STUDY NAVIGATION ───── */}
      <footer className="max-w-[1200px] mx-auto mt-28 pt-12 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-8">
        
        {/* Previous Project */}
        <Link
          href={`/case-studies/${prevProject.slug}`}
          className="group flex items-center gap-4 p-4 rounded-2xl border border-black/5 hover:border-[#E0000B]/30 hover:bg-[#F8FAFC] transition-all w-full sm:w-auto"
        >
          <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#111111] group-hover:bg-[#E0000B] group-hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block">
              PREVIOUS PROJECT
            </span>
            <span className="text-sm font-bold text-[#111111] group-hover:text-[#E0000B] transition-colors">
              {prevProject.title}
            </span>
          </div>
        </Link>

        {/* Back to All Projects */}
        <Link
          href="/portfolio"
          className="px-6 py-3 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#E0000B] transition-colors"
        >
          Back to Case Studies
        </Link>

        {/* Next Project */}
        <Link
          href={`/case-studies/${nextProject.slug}`}
          className="group flex items-center gap-4 p-4 rounded-2xl border border-black/5 hover:border-[#E0000B]/30 hover:bg-[#F8FAFC] transition-all w-full sm:w-auto text-right"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block">
              NEXT PROJECT
            </span>
            <span className="text-sm font-bold text-[#111111] group-hover:text-[#E0000B] transition-colors">
              {nextProject.title}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#111111] group-hover:bg-[#E0000B] group-hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

      </footer>

    </div>
  );
}
