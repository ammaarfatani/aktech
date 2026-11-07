import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bot, Dumbbell } from "lucide-react";
import type { Product } from "@/data/products";
import { siteConfig } from "@/config/site";
import { ComingSoonBadge } from "./ComingSoonBadge";

export const productLinkClass = "inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

export function AIBadge({ product }: { product: Product }) {
  return <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary"><Bot size={15} aria-hidden="true" />{product.ai.implemented ? "Built-in AI" : "AI assistance · Planned"}</span>;
}

export function ProductPreview({ product }: { product: Product }) {
  const screenshot = product.screenshots[0];
  return <div className="overflow-hidden rounded-2xl border border-border bg-background-soft">
    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 text-xs text-text-muted"><span>{product.name}</span><span>Development preview</span></div>
    {screenshot ? <Image src={screenshot.src} alt={screenshot.alt} width={1900} height={1200} sizes="(max-width: 768px) 100vw, 60vw" className="aspect-[16/10] w-full object-contain object-top" /> : <div className="flex aspect-[16/10] flex-col items-center justify-center gap-4 px-8 text-center"><Dumbbell size={44} className="text-primary" aria-hidden="true" /><p className="font-heading text-3xl font-bold">{product.name}</p><p className="max-w-xs text-sm text-text-secondary">Product preview coming soon.<br />The gym platform is under development.</p></div>}
  </div>;
}

export function ProductShowcase({ product, index }: { product: Product; index: number }) {
  return <article className="mb-7 grid items-center gap-10 rounded-3xl border border-border bg-white p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-12">
    <div className="lg:col-span-5">
      <div className="mb-5 flex flex-wrap items-center gap-4"><span className="text-xs font-semibold text-text-muted">0{index + 1}</span><ComingSoonBadge /><AIBadge product={product} /></div>
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">{product.category}</p>
      <h2 className="mb-4 text-4xl font-bold sm:text-5xl">{product.name}</h2>
      <p className="mb-6 leading-relaxed text-text-secondary">{product.description}</p>
      <ul className="mb-8 space-y-2 text-sm text-text-secondary">{product.features.slice(0, 3).map(feature => <li key={feature.name} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" />{feature.name}{feature.planned && <span className="text-xs text-text-muted">· Planned</span>}</li>)}</ul>
      <Link href={`/products/${product.slug}`} className={productLinkClass}>View Product <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </div>
    <div className="lg:col-span-7"><ProductPreview product={product} /></div>
  </article>;
}

export function ProductLaunchCTA({ product }: { product: Product }) {
  const href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Launch updates: ${product.name}`)}&body=${encodeURIComponent(`Hello AKTECH, I would like to hear about the ${product.name} launch.`)}`;
  return <section className="rounded-3xl border border-border bg-background-soft p-8 sm:p-14">
    <ComingSoonBadge /><h2 className="mt-6 mb-4 text-3xl font-bold sm:text-5xl">Something powerful is being built.</h2>
    <p className="mb-7 max-w-xl leading-relaxed text-text-secondary">Stay tuned for the official {product.name} launch. Contact our team to express your interest in launch updates.</p>
    <a href={href} className={productLinkClass}>Request Launch Updates <ArrowUpRight size={17} aria-hidden="true" /></a>
    <p className="mt-3 text-xs text-text-muted">Opens your email app to contact AKTECH.</p>
    {product.officialWebsite ? <a href={product.officialWebsite} className="mt-6 inline-block text-sm font-semibold text-primary" target="_blank" rel="noopener noreferrer">Visit Official Website ↗</a> : <p className="mt-6 text-sm text-text-muted">Official website coming soon.</p>}
  </section>;
}
