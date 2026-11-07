import { seoMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/seo/LandingPage";
export const metadata = seoMetadata("UI/UX Design", "Plan clearer user journeys, interactive prototypes and reusable design systems with AKTECH. Explore UI/UX design for websites and business applications.", "/services/uiux-design");
export default function Layout({ children }: { children: React.ReactNode }) { return <><ServiceSchema title="UI/UX Design" description="Plan clearer user journeys, interactive prototypes and reusable design systems with AKTECH. Explore UI/UX design for websites and business applications." path="/services/uiux-design" />{children}</>; }
