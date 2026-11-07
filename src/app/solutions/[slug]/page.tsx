import { notFound } from "next/navigation";
import { publishedPages, findLanding, seoMetadata } from "@/lib/seo";
import { LandingPage } from "@/components/seo/LandingPage";
import { getSolution, solutions } from "@/data/solutions";
import { SolutionDetail } from "@/components/solutions/SolutionDetail";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  const landing = publishedPages
    .filter((page) => page.path.startsWith("/solutions/"))
    .map((page) => ({ slug: page.path.split("/")[2] }));
  const catalog = solutions.map((item) => ({ slug: item.slug }));
  const seen = new Set<string>();
  return [...catalog, ...landing].filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (solution) {
    return {
      title: solution.title,
      description: solution.summary,
      alternates: { canonical: `${siteConfig.url}/solutions/${slug}` },
    };
  }
  const page = findLanding(`/solutions/${slug}`);
  if (!page) return { robots: { index: false, follow: false } };
  return seoMetadata(page.title, page.description, page.path);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (solution) return <SolutionDetail solution={solution} />;
  const page = findLanding(`/solutions/${slug}`);
  if (!page) notFound();
  return <LandingPage page={page} />;
}
