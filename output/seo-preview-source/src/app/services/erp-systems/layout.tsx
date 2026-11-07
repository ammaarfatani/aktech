import { seoMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/seo/LandingPage";
export const metadata = seoMetadata("ERP Software Development", "Plan connected inventory, finance and operational workflows with AKTECH ERP development. Discuss data migration, permissions and reporting requirements.", "/services/erp-systems");
export default function Layout({ children }: { children: React.ReactNode }) { return <><ServiceSchema title="ERP Software Development" description="Plan connected inventory, finance and operational workflows with AKTECH ERP development. Discuss data migration, permissions and reporting requirements." path="/services/erp-systems" />{children}</>; }
