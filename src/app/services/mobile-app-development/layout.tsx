import { seoMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/seo/LandingPage";
export const metadata = seoMetadata("Mobile App Development", "Build mobile experiences around your customer workflows. Explore AKTECH app development, platform planning, integrations and project delivery.", "/services/mobile-app-development");
export default function Layout({ children }: { children: React.ReactNode }) { return <><ServiceSchema title="Mobile App Development" description="Build mobile experiences around your customer workflows. Explore AKTECH app development, platform planning, integrations and project delivery." path="/services/mobile-app-development" />{children}</>; }
