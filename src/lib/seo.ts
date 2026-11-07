import { validatePages } from "@/lib/seo-validation";
import { FEATURED_CASE_STUDIES } from "@/data/caseStudies";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import records from "@/data/seo-pages.json";
import services from "@/data/seo-services.json";
validatePages(records, [...services.map(s=>s.path), "/case-studies", "/contact", "/services"], FEATURED_CASE_STUDIES.map(p=>p.slug));
export type LandingPage = (typeof records)[number];
export { services };
export const publishedPages = records.filter(page => page.status === "published" && page.approvedBy);
export function findLanding(path: string) { return publishedPages.find(page => page.path === path); }
export function seoMetadata(title: string, description: string, path: string): Metadata {
 const url = `${siteConfig.url}${path}`;
 return { title, description, alternates: { canonical: url }, robots: { index: true, follow: true },
 openGraph: { type: "website", title, description, url, images: [siteConfig.ogImage] },
 twitter: { card: "summary_large_image", title, description, images: [siteConfig.ogImage] } };
}
export function serializeSchema(value: unknown) { return JSON.stringify(value).replace(/</g, "\\u003c"); }
