import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "About AKTECH | Web & Software Engineering Studio",
  description:
    "Learn about AKTECH Digital Solutions — our engineering principles, custom software methodology, sub-second performance standards, and 100% in-house development team.",
  keywords: [
    "About AKTECH",
    "AKTECH Digital Solutions",
    "software development agency",
    "web development studio",
    "digital agency Karachi",
    "custom software engineering",
  ],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "About AKTECH | Web & Software Engineering Studio",
    description:
      "Learn about AKTECH Digital Solutions — our engineering principles, custom software methodology, and 100% in-house development standards.",
    url: `${siteConfig.url}/about`,
  },
  twitter: {
    title: "About AKTECH | Web & Software Engineering Studio",
    description:
      "Learn about AKTECH Digital Solutions — our engineering principles, custom software methodology, and 100% in-house development standards.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "About", item: "/about" },
        ]}
      />
      {children}
    </>
  );
}
