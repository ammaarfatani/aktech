import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Solution } from "@/data/solutions";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FEATURED_CASE_STUDIES } from "@/data/caseStudies";

export function SolutionDetail({ solution }: { solution: Solution }) {
  const cases = FEATURED_CASE_STUDIES.filter((item) => solution.relatedCaseStudies.includes(item.slug));

  return (
    <div className="bg-white text-[#111111]">
      <PageHero eyebrow="Solution" title={solution.title} description={solution.summary} />
      <article className="px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="mx-auto max-w-[900px]">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Solutions", href: "/solutions" },
              { name: solution.title, href: `/solutions/${solution.slug}` },
            ]}
          />

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-extrabold">The business challenge</h2>
            <p className="text-lg leading-relaxed text-[#4B5563]">{solution.challenge}</p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="font-heading text-2xl font-extrabold">How AKTECH approaches it</h2>
            <p className="text-lg leading-relaxed text-[#4B5563]">{solution.approach}</p>
          </section>

          <section className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="font-heading text-xl font-extrabold">Capabilities</h2>
              <ul className="mt-4 space-y-2 text-[#4B5563]">
                {solution.capabilities.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-xl font-extrabold">Business benefits</h2>
              <ul className="mt-4 space-y-2 text-[#4B5563]">
                {solution.benefits.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-xl font-extrabold">Relevant technologies</h2>
            <p className="mt-3 text-[#4B5563]">{solution.technologies.join(" · ")}</p>
          </section>

          {solution.relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="font-heading text-xl font-extrabold">AKTECH products</h2>
              <ul className="mt-4 space-y-2">
                {solution.relatedProducts.map((product) => (
                  <li key={product.href}>
                    <Link href={product.href} className="font-medium text-[#111111] hover:text-[#E0000B]">
                      {product.name}
                    </Link>
                    <span className="ml-2 text-sm text-[#6B7280]">({product.status})</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {cases.length > 0 && (
            <section className="mt-12">
              <h2 className="font-heading text-xl font-extrabold">Related work</h2>
              <ul className="mt-4 space-y-2">
                {cases.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/case-studies/${item.slug}`} className="hover:text-[#E0000B]">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-16 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#E0000B] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-[#C00009]"
            >
              Book a consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/book-consultation" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] hover:border-[#E0000B]/40">
              Request a conversation
            </Link>
          </div>

          {solution.relatedServices.length > 0 && (
            <p className="mt-10 text-sm text-[#6B7280]">
              Related services:{" "}
              {solution.relatedServices.map((item, index) => (
                <span key={item.href}>
                  {index > 0 && " · "}
                  <Link href={item.href} className="text-[#111111] underline-offset-2 hover:text-[#E0000B] hover:underline">
                    {item.label}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </article>
    </div>
  );
}
