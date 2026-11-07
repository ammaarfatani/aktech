import { seoMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/seo/LandingPage";
export const metadata = seoMetadata("Custom CRM Development", "Connect lead capture, sales pipelines and customer operations with a custom CRM. Explore AKTECH business systems and request a project consultation.", "/services/crm-business-systems");
export default function Layout({ children }: { children: React.ReactNode }) { return <><ServiceSchema title="Custom CRM Development" description="Connect lead capture, sales pipelines and customer operations with a custom CRM. Explore AKTECH business systems and request a project consultation." path="/services/crm-business-systems" />{children}</>; }
