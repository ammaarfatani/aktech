import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "How AKTECH works with schools, restaurants, retailers and product teams — without invented testimonials or unverified metrics.",
  keywords: [
    "AKTECH clients",
    "trusted software agency",
    "global software development agency",
  ],
  alternates: {
    canonical: `${siteConfig.url}/clients`,
  },
  openGraph: {
    title: "Clients & Trust | Proven Software Solutions & Results | AKTECH",
    description:
      "Discover why ambitious startups, enterprise brands, and global businesses partner with AKTECH Digital Solutions for fast, custom, SLA-backed software engineering.",
    url: `${siteConfig.url}/clients`,
  },
  twitter: {
    title: "Clients & Trust | Proven Software Solutions & Results | AKTECH",
    description:
      "Discover why ambitious startups, enterprise brands, and global businesses partner with AKTECH Digital Solutions for fast, custom, SLA-backed software engineering.",
  },
};

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Clients", item: "/clients" },
        ]}
      />
      {children}
    </>
  );
}
