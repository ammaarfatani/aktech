import { seoMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/seo/LandingPage";
export const metadata = seoMetadata("Website Development", "Custom business websites, Next.js applications and e-commerce experiences from AKTECH in Karachi. Discuss your scope, content and integrations.", "/services/web-development");
export default function Layout({ children }: { children: React.ReactNode }) { return <><ServiceSchema title="Website Development" description="Custom business websites, Next.js applications and e-commerce experiences from AKTECH in Karachi. Discuss your scope, content and integrations." path="/services/web-development" />{children}</>; }
