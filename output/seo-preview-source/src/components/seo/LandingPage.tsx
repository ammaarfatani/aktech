import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";
import { getCaseStudy } from "@/data/caseStudies";
import { serializeSchema, type LandingPage as PageRecord } from "@/lib/seo";
export function ServiceSchema({title, description, path}: {title: string; description: string; path: string}) {
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: serializeSchema({"@context":"https://schema.org", "@type":"Service", name:title, description, url:siteConfig.url+path, provider:{"@id":siteConfig.url+"/#organization"}})}} />;
}
export function LandingPage({page}: {page: PageRecord}) {
 const projects = page.portfolio.map(getCaseStudy).filter(p => p !== undefined);
 const quote = `/contact?service=${encodeURIComponent(page.service)}&landing=${encodeURIComponent(page.path)}`;
 return <div className="bg-[#F8FAFC] pt-36 pb-24 text-[#111111]"><article className="container-custom max-w-5xl">
 <ServiceSchema title={page.title} description={page.description} path={page.path} />
 <BreadcrumbJsonLd items={[{name:"Home",item:"/"},{name:"Services",item:"/services"},{name:page.title,item:page.path}]} />
 <nav aria-label="Breadcrumb" className="mb-8 text-sm"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span>{page.title}</span></nav>
 <p className="mb-5 text-sm font-semibold text-primary">AKTECH Digital Solutions · Karachi, Pakistan</p>
 <h1 className="mb-7 text-4xl font-bold leading-tight sm:text-6xl">{page.h1}</h1>
 <p className="mb-6 text-lg leading-relaxed">{page.introduction}</p>
 <p className="mb-8 leading-relaxed text-text-secondary">{page.context}</p>
 <div className="flex flex-wrap gap-4"><Link href={quote} className="rounded-full bg-primary px-6 py-4 font-semibold text-white">{page.cta}</Link><a className="rounded-full border border-current px-6 py-4 font-semibold" href={`${siteConfig.links.whatsapp}?text=${encodeURIComponent(`Hello AKTECH, I would like to discuss ${page.title}. Page: ${siteConfig.url}${page.path}`)}`}>WhatsApp Us</a></div>
 <section className="mt-16"><h2 className="mb-6 text-3xl font-bold">What to plan for</h2><ul className="list-disc space-y-4 pl-6">{page.benefits.map(item=><li key={item}>{item}</li>)}</ul></section>
 <section className="mt-14"><h2 className="mb-5 text-3xl font-bold">Technology and delivery</h2><p className="mb-6">Options include {page.stack.join(", ")}. The final stack depends on integrations, maintenance and the agreed scope.</p><ol className="list-decimal space-y-4 pl-6">{page.process.map(item=><li key={item}>{item}</li>)}</ol><p className="mt-6">We work from Karachi and can collaborate remotely. Agree communication channels, review windows and decision owners during discovery.</p></section>
 <section className="mt-14"><h2 className="mb-6 text-3xl font-bold">{projects.length ? "Related portfolio" : "Explore our work"}</h2>{projects.map(project=><div key={project.slug} className="mb-6 rounded-2xl border border-border bg-white p-6"><Link className="font-bold underline" href={`/case-studies/${project.slug}`}>{project.title}</Link><p className="mt-3">{project.shortDescription}</p></div>)}<Link className="underline" href="/case-studies">Browse case studies</Link></section>
 <section className="mt-14"><h2 className="mb-6 text-3xl font-bold">Questions before you start</h2>{page.faqs.map(faq=><details className="border-b border-border py-5" key={faq.question}><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-4 leading-relaxed">{faq.answer}</p></details>)}</section>
 <nav aria-label="Related services" className="mt-12 flex flex-wrap gap-6">{page.related.filter(path=>path!=="/case-studies").map(path=><Link className="underline" href={path} key={path}>Explore {path.split("/").pop()?.replaceAll("-"," ")}</Link>)}</nav>
 <section className="mt-14 rounded-2xl bg-[#111111] p-8 text-white"><h2 className="mb-4 text-3xl font-bold">Discuss your project</h2><p className="mb-6">Tell us what needs to change, which tools you use and who the project serves.</p><Link data-conversion="consultation_request" className="underline" href={quote}>Request a Free Consultation / Book a Discovery Call</Link><p className="mt-3 text-sm">Request a call through the contact form; a meeting is confirmed after we agree a time.</p></section>
 </article></div>;
}
