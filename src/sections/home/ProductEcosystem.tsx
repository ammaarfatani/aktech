import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { FEATURED_CASE_STUDIES } from "@/data/caseStudies";
import { AIBadge, productLinkClass } from "@/components/products/ProductShowcase";
import { ComingSoonBadge } from "@/components/products/ComingSoonBadge";

export function ProductEcosystem() {
  return <section className="section-padding border-t border-border bg-background-soft"><div className="container-custom">
    <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">Built by AKTECH</p><h2 className="max-w-2xl text-4xl font-bold sm:text-5xl">Client solutions.<br />Our own product ecosystem.</h2></div><Link href="/products" className={productLinkClass}>Explore Products <ArrowUpRight size={17} /></Link></div>
    <p className="mb-10 max-w-2xl leading-relaxed text-text-secondary">We bring the same engineering focus to the software we build for clients and the products we are preparing to launch.</p>
    <div className="grid gap-6 md:grid-cols-3">{products.map(product => <article key={product.slug} className="flex flex-col rounded-2xl border border-border bg-white p-7"><ComingSoonBadge /><p className="mt-6 text-xs text-primary">{product.category}</p><h3 className="mt-3 mb-4 text-3xl font-bold">{product.name}</h3><p className="mb-5 text-sm leading-relaxed text-text-secondary">{product.description}</p><AIBadge product={product} /><Link href={`/products/${product.slug}`} className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold hover:text-primary">View Product <ArrowUpRight size={17} /></Link></article>)}</div>
  </div></section>;
}

export function FeaturedCaseStudy() {
  const project = FEATURED_CASE_STUDIES[0];
  return <section className="section-padding border-t border-border"><div className="container-custom">
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">Case Studies</p><div className="mb-10 flex flex-wrap items-end justify-between gap-6"><h2 className="text-4xl font-bold sm:text-5xl">From brief to experience.</h2><Link href="/case-studies" className="text-sm font-semibold hover:text-primary">All Case Studies ↗</Link></div>
    <article className="overflow-hidden rounded-3xl border border-border"><Link href={`/case-studies/${project.slug}`} className="block bg-background-soft"><Image src={project.mainImage} alt="Zurane fashion storefront with campaign imagery and shopping navigation" width={1903} height={879} sizes="(max-width: 1280px) 100vw, 1200px" className="h-auto w-full" /></Link><div className="flex flex-col justify-between gap-6 p-7 md:flex-row md:items-center sm:p-10"><div><p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">{project.category}</p><h3 className="mb-3 text-2xl font-bold sm:text-3xl">{project.title}</h3><p className="max-w-xl leading-relaxed text-text-secondary">{project.shortDescription}</p></div><Link href={`/case-studies/${project.slug}`} className={`${productLinkClass} shrink-0`}>View Case Study <ArrowUpRight size={17} /></Link></div></article>
  </div></section>;
}
