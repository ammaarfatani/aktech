import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getInsight, insightCover, publishedInsights, relatedInsights } from "@/data/insights";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InsightBody } from "@/components/insights/InsightBody";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedInsights().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return { robots: { index: false, follow: false } };
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `${siteConfig.url}/insights/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      url: `${siteConfig.url}/insights/${article.slug}`,
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();
  const related = relatedInsights(article.slug, article.category);

  return (
    <div className="bg-white text-[#111111]">
      <PageHero eyebrow={article.category} title={article.title} description={article.description} visual="magazine" />
      <article className="px-4 sm:px-8 lg:px-12 py-16">
        <div className="mx-auto max-w-[760px]">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Insights", href: "/insights" },
              { name: article.title, href: `/insights/${article.slug}` },
            ]}
          />
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-[#111111]">
            <Image src={insightCover(article.category)} alt="" fill unoptimized className="object-cover" />
          </div>
          <p className="mb-8 text-sm text-[#6B7280]">
            Published {article.date} · {article.readingTime} read
          </p>
          <InsightBody body={article.body} />
          <Link
            href={article.ctaHref}
            className="mt-12 inline-flex rounded-full bg-[#E0000B] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
          >
            {article.ctaLabel}
          </Link>

          {related.length > 0 && (
            <section className="mt-16 border-t border-black/8 pt-10">
              <h2 className="font-heading text-2xl font-extrabold">Related articles</h2>
              <ul className="mt-6 space-y-4">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/insights/${item.slug}`} className="font-heading text-lg font-bold hover:text-[#E0000B]">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
