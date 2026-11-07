import { seoMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/seo/LandingPage";
export const metadata = seoMetadata("Website Development", "Custom business websites, Next.js applications and e-commerce experiences from AKTECH. Discuss your scope, content and integrations — we collaborate remotely worldwide.", "/services/web-development");
export default function Layout({ children }: { children: React.ReactNode }) { return <><ServiceSchema title="Website Development" description="Custom business websites, Next.js applications and e-commerce experiences from AKTECH. Discuss your scope, content and integrations — we collaborate remotely worldwide." path="/services/web-development" />{children}</>; }
