import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Projects, Web Apps & Case Studies",
  description:
    "Browse AKTECH's showcase of 30+ completed projects, including custom e-commerce platforms, RESTRO ERP systems, AI workflow integrations, and full-stack SaaS applications.",
  keywords: [
    "AKTECH portfolio",
    "web development case studies",
    "custom software projects",
    "e-commerce web development examples",
    "ERP POS system showcase",
  ],
  alternates: {
    canonical: `${siteConfig.url}/portfolio`,
  },
  openGraph: {
    title: "Portfolio | Full-Stack Projects & Case Studies | AKTECH",
    description:
      "Browse AKTECH's showcase of 30+ completed projects, including custom e-commerce platforms, RESTRO ERP systems, AI workflow integrations, and SaaS products.",
    url: `${siteConfig.url}/portfolio`,
  },
  twitter: {
    title: "Portfolio | Full-Stack Projects & Case Studies | AKTECH",
    description:
      "Browse AKTECH's showcase of 30+ completed projects, including custom e-commerce platforms, RESTRO ERP systems, AI workflow integrations, and SaaS products.",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Portfolio", item: "/portfolio" },
        ]}
      />
      {children}
    </>
  );
}
