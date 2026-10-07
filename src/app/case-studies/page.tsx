import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_CASE_STUDIES } from "@/data/caseStudies";
export const metadata: Metadata = { title: "Case Studies", description: "Explore AKTECH's client websites and software projects, including the Zurane fashion storefront.", alternates: { canonical: "/case-studies" }, openGraph: { title: "AKTECH Case Studies", description: "Client websites and software experiences built by AKTECH.", url: "/case-studies", images: ["/projects/zurane.png"] } };
export default function CaseStudiesPage() {
  return <div className="bg-white"><div className="container-custom pb-24 pt-36"><p className="mb-5 text-xs font-bold uppercase tracking-widest text-primary">Client work</p><h1 className="mb-6 text-5xl font-bold sm:text-7xl">Case Studies.</h1><p className="mb-14 max-w-2xl text-lg leading-relaxed text-text-secondary">A closer look at the interfaces, systems and experiences we build.</p><div className="grid gap-8 md:grid-cols-2">{FEATURED_CASE_STUDIES.map(project => <article key={project.slug} className="overflow-hidden rounded-2xl border border-border"><Link href={`/case-studies/${project.slug}`}><Image src={project.mainImage} alt={project.title} width={1900} height={1200} sizes="(max-width: 768px) 100vw, 50vw" className="aspect-[16/10] w-full bg-background-soft object-contain object-top" /><div className="p-7"><p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">{project.category}</p><h2 className="mb-3 text-2xl font-bold">{project.title}</h2><p className="mb-6 leading-relaxed text-text-secondary">{project.shortDescription}</p><span className="text-sm font-semibold text-primary">View Case Study ↗</span></div></Link></article>)}</div></div></div>;
}

