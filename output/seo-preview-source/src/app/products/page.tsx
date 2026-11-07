import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductShowcase } from "@/components/products/ProductShowcase";
import { ProductsHero } from "@/components/products/ProductsHero";

const description = "Meet Acadivo, Restro ERP and Fitivo: upcoming school, restaurant and gym software products built by AKTECH.";
export const metadata: Metadata = {
  title: "Software Products", description, alternates: { canonical: "/products" },
  openGraph: { title: "Software Products Built by AKTECH", description, url: "/products", images: [{ url: "/products/acadivo/school-admin.jpg", alt: "Acadivo development preview" }] },
  twitter: { card: "summary_large_image", title: "Software Products Built by AKTECH", description, images: ["/products/acadivo/school-admin.jpg"] },
};

export default function ProductsPage() {
  return (
    <div className="bg-[#f5f3f0] bg-[radial-gradient(ellipse_at_85%_10%,#fff_0%,transparent_45%)] pb-24 pt-28 sm:pt-32">
      <ProductsHero />
      <section id="product-collection" className="container-custom scroll-mt-28 pt-16 sm:pt-24">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">Purpose-built software</p><h2 className="text-3xl font-bold sm:text-5xl">Meet the ecosystem.</h2></div>
          <p className="max-w-md text-sm leading-relaxed text-text-secondary">Our own products, alongside the software we build for clients. All three are coming soon.</p>
        </div>
        {products.map((product, index) => <ProductShowcase key={product.slug} product={product} index={index} />)}
      </section>
    </div>
  );
}
