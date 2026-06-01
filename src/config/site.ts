/**
 * Site configuration for metadata, SEO, and Open Graph.
 */

export const siteConfig = {
  name: "AKTECH",
  description:
    "A premium, cinematic, and futuristic digital agency delivering handcrafted enterprise-level solutions.",
  url: "https://aktech.agency", // Replace with actual URL
  ogImage: "https://aktech.agency/og.jpg",
  links: {
    twitter: "https://twitter.com/aktech",
    github: "https://github.com/aktech",
  },
  keywords: [
    "Digital Agency",
    "Web Development",
    "Design",
    "Futuristic",
    "Premium Web Design",
    "AKTECH",
    "Enterprise Solutions",
  ],
  author: "AKTECH Agency",
};

export type SiteConfig = typeof siteConfig;
