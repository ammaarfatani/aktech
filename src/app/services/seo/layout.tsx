import { seoMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/seo/LandingPage";
export const metadata = seoMetadata("Technical SEO Services", "Improve crawlability, page performance and organic discovery with AKTECH technical SEO services. Request an audit focused on your business goals.", "/services/seo");
export default function Layout({ children }: { children: React.ReactNode }) { return <><ServiceSchema title="Technical SEO Services" description="Improve crawlability, page performance and organic discovery with AKTECH technical SEO services. Request an audit focused on your business goals." path="/services/seo" />{children}</>; }
