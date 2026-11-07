import { notFound } from "next/navigation";
import { publishedPages, findLanding, seoMetadata } from "@/lib/seo";
import { LandingPage } from "@/components/seo/LandingPage";
type Props = { params: Promise<{ segments: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() { return publishedPages.filter(p=>p.path.startsWith("/industries/")).map(p=>({ segments: p.path.split("/").slice(2) })); }
async function resolve(params: Props["params"]) { const { segments: value } = await params; return findLanding(`/industries/${value.join("/")}`); }
export async function generateMetadata({params}: Props) { const page = await resolve(params); if (!page) return {robots: { index: false, follow: false }}; return seoMetadata(page.title,page.description,page.path); }
export default async function Page({params}: Props) { const page=await resolve(params); if(!page) notFound(); return <LandingPage page={page} />; }
