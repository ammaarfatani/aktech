import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us | Hire AKTECH Web & Software Developers",
  description:
    "Get in touch with AKTECH Digital Solutions from anywhere. Request a project conversation, share your country and timezone, or email hello@aktech.tech.",
  keywords: [
    "contact AKTECH",
    "hire web developers",
    "hire software developers",
    "web development quote",
    "software agency contact",
    "hello@aktech.tech",
  ],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact Us | Hire AKTECH Web & Software Developers",
    description:
      "Get in touch with AKTECH Digital Solutions from anywhere. Request a project conversation, share your country and timezone, or email hello@aktech.tech.",
    url: `${siteConfig.url}/contact`,
  },
  twitter: {
    title: "Contact Us | Hire AKTECH Web & Software Developers",
    description:
      "Get in touch with AKTECH Digital Solutions from anywhere. Request a project conversation, share your country and timezone, or email hello@aktech.tech.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Contact", item: "/contact" },
        ]}
      />
      {children}
    </>
  );
}
