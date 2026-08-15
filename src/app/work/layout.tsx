import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Our Work | Interactive Portfolio Index",
  description:
    "Explore the complete work index of AKTECH Digital Solutions. Filter projects by Web Development, E-Commerce, Mobile Apps, and AI Automations.",
  keywords: [
    "AKTECH work index",
    "web agency portfolio",
    "software case studies",
    "Next.js projects showcase",
  ],
  alternates: {
    canonical: `${siteConfig.url}/work`,
  },
  openGraph: {
    title: "Our Work | Interactive Portfolio Index | AKTECH",
    description:
      "Explore the complete work index of AKTECH Digital Solutions. Filter projects by Web Development, E-Commerce, Mobile Apps, and AI Automations.",
    url: `${siteConfig.url}/work`,
  },
  twitter: {
    title: "Our Work | Interactive Portfolio Index | AKTECH",
    description:
      "Explore the complete work index of AKTECH Digital Solutions. Filter projects by Web Development, E-Commerce, Mobile Apps, and AI Automations.",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Work", item: "/work" },
        ]}
      />
      {children}
    </>
  );
}
