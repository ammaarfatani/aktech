import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Services | Custom Web Development, AI Agents & Mobile Apps",
  description:
    "Explore AKTECH's 360° digital engineering capabilities: Custom Web Apps, Mobile Development, AI Agents & n8n Workflows, CRM/POS Systems, UI/UX Design, & Technical SEO.",
  keywords: [
    "web development services",
    "custom web applications",
    "mobile app development",
    "AI agent development",
    "n8n automation agency",
    "custom CRM POS development",
    "UI UX design services",
    "technical SEO services",
  ],
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Services | Custom Web Development, AI Agents & Mobile Apps | AKTECH",
    description:
      "Explore AKTECH's 360° digital engineering capabilities: Custom Web Apps, Mobile Development, AI Agents & n8n Workflows, CRM/POS Systems, UI/UX Design, & Technical SEO.",
    url: `${siteConfig.url}/services`,
  },
  twitter: {
    title: "Services | Custom Web Development, AI Agents & Mobile Apps | AKTECH",
    description:
      "Explore AKTECH's 360° digital engineering capabilities: Custom Web Apps, Mobile Development, AI Agents & n8n Workflows, CRM/POS Systems, UI/UX Design, & Technical SEO.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
        ]}
      />
      {children}
    </>
  );
}
