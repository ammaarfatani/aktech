import { seoMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/seo/LandingPage";
export const metadata = seoMetadata("AI Agents & Automation", "Explore AI agents, business process automation and n8n workflows with AKTECH. Scope integrations, human review and practical automation opportunities.", "/services/ai-agent");
export default function Layout({ children }: { children: React.ReactNode }) { return <><ServiceSchema title="AI Agents & Automation" description="Explore AI agents, business process automation and n8n workflows with AKTECH. Scope integrations, human review and practical automation opportunities." path="/services/ai-agent" />{children}</>; }
