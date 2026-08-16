/**
 * Site configuration for metadata, SEO, Open Graph, and Structured Data.
 */

const getSiteUrl = () => {
  return "https://aktech.tech";
};
export const siteConfig = {
  name: "AKTECH Digital Solutions",
  shortName: "AKTECH",
  legalName: "AKTECH Digital Solutions",
  description:
    "AKTECH Digital Solutions is a global software engineering and digital agency specializing in custom web applications, Next.js development, mobile apps, AI agents & automation, and business management systems.",
  url: getSiteUrl(),
  ogImage: "/og-image.jpg",
  email: "hello@aktech.tech",
  phone: "+923713410797",
  formattedPhone: "+92 371 3410797",
  address: {
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  links: {
    instagram: "https://www.instagram.com/aktech_digital_solutions/",
    linkedin: "https://www.linkedin.com/in/aktech-digital-solutions-bbb848418",
    whatsapp: "https://wa.me/923713410797",
  },
  keywords: [
    "AKTECH",
    "AKTECH Digital Solutions",
    "web development company",
    "web development agency",
    "custom web development",
    "software development company",
    "software development agency",
    "Next.js web development",
    "React.js developers",
    "custom web application development",
    "mobile app development company",
    "AI automation agency",
    "AI agent development",
    "AI chatbot development",
    "CRM development company",
    "custom CRM development",
    "POS software development",
    "ERP software development",
    "e-commerce development company",
    "WordPress development company",
    "Shopify development company",
    "UI UX design agency",
    "technical SEO services",
    "web development company in Karachi",
    "software development agency in Pakistan",
  ],
  author: "AKTECH Digital Solutions",
};

export type SiteConfig = typeof siteConfig;
