import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bot, CheckCircle2, Layers, Users } from "lucide-react";
import { products, getProduct } from "@/data/products";
import { ComingSoonBadge } from "@/components/products/ComingSoonBadge";
import { AIBadge, ProductPreview, ProductLaunchCTA } from "@/components/products/ProductShowcase";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return products.map(product => ({ slug: product.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const title = `${product.name} — ${product.category} | Coming Soon`;
  const images = [{ url: product.screenshots[0]?.src ?? "/logo.png", alt: product.screenshots[0]?.alt ?? `${product.name} by AKTECH` }];
  return { title, description: product.description, alternates: { canonical: `/products/${product.slug}` }, openGraph: { title, description: product.description, url: `/products/${product.slug}`, images }, twitter: { card: "summary_large_image", title, description: product.description, images: images.map(image => image.url) } };
}
export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return <div className="bg-white"><div className="container-custom pb-24 pt-32 sm:pt-40">
    <Link href="/products" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary"><ArrowLeft size={16} />All Products</Link>
    <header className="grid items-center gap-10 rounded-3xl border border-border bg-background-soft p-6 sm:p-10 lg:grid-cols-2 lg:p-12">
      <div><div className="mb-6 flex flex-wrap items-center gap-4"><ComingSoonBadge /><AIBadge product={product} /></div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">{product.category}</p>
        <h1 className="mb-5 text-5xl font-bold sm:text-6xl">{product.name}</h1>
        <p className="mb-5 font-heading text-2xl font-semibold sm:text-3xl">{product.headline}</p>
        <p className="leading-relaxed text-text-secondary">{product.description}</p>
        {product.workingName && <p className="mt-3 text-xs text-text-muted">Working name · Final branding will be announced before launch.</p>}
        <a href="#launch" className="mt-7 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover">Stay Updated</a>
      </div><ProductPreview product={product} />
    </header>
    <section className="mt-16 grid gap-10 border-y border-border py-16 md:grid-cols-2">
      <div><Users className="mb-4 text-primary" aria-hidden="true" /><h2 className="mb-4 text-3xl font-bold">Built for your team.</h2><p className="leading-relaxed text-text-secondary">{product.audience}</p></div>
      <div><Layers className="mb-4 text-primary" aria-hidden="true" /><h2 className="mb-4 text-3xl font-bold">Why we are building it.</h2><p className="leading-relaxed text-text-secondary">{product.purpose}</p></div>
    </section>
    <section className="py-20"><p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">{product.workingName ? "Product direction" : "Inside the product"}</p><h2 className="mb-4 text-3xl font-bold sm:text-4xl">{product.workingName ? "A focused roadmap." : "Modules for your daily operations."}</h2>
      <p className="mb-10 text-text-secondary">{product.workingName ? "These areas are planned. Implemented capabilities will be confirmed before launch." : "Implemented functionality in the development version. Public availability is coming soon."}</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{product.features.map(feature => <article key={feature.name} className="rounded-2xl border border-border p-6"><CheckCircle2 className="mb-5 text-primary" aria-hidden="true" /><h3 className="mb-3 text-lg font-bold">{feature.name}</h3>{feature.planned && <p className="mb-3 text-xs font-semibold text-primary">Planned</p>}<p className="text-sm leading-relaxed text-text-secondary">{feature.description}</p></article>)}</div>
    </section>
    <section className="grid gap-8 rounded-3xl bg-secondary p-8 text-white sm:p-12 md:grid-cols-[1fr_2fr]"><div><Bot size={32} className="mb-5 text-primary" aria-hidden="true" /><p className="text-xs font-semibold uppercase tracking-widest text-white/60">{product.ai.implemented ? "Built-in AI · Development version" : "AI assistance · Planned"}</p><h2 className="mt-4 text-3xl font-bold">Intelligence with purpose.</h2></div><p className="self-center text-lg leading-relaxed text-white/75">{product.ai.description}</p></section>
    <section className="border-t border-border py-16"><h2 className="mb-8 text-3xl font-bold">{product.workingName ? "What we are working toward." : "A more connected way to work."}</h2><ul className="grid gap-6 md:grid-cols-3">{product.benefits.map(benefit => <li key={benefit} className="flex items-start gap-3 leading-relaxed text-text-secondary"><CheckCircle2 size={20} className="mt-1 shrink-0 text-primary" aria-hidden="true" />{benefit}</li>)}</ul></section>
    <div id="launch" className="scroll-mt-28"><ProductLaunchCTA product={product} /></div>
  </div></div>;
}
