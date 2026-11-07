import { publishedPages, services } from "@/lib/seo";
import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { FEATURED_CASE_STUDIES } from "@/data/caseStudies";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;


  // Core main pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/clients`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic Case Studies
  const caseStudyRoutes: MetadataRoute.Sitemap = FEATURED_CASE_STUDIES.map((project) => ({
    url: `${baseUrl}/case-studies/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = ["/products", "/case-studies", ...products.map(product => `/products/${product.slug}`)].map(path => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly", priority: 0.8 }));
  const landingRoutes = publishedPages.map(page => ({ url: `${baseUrl}${page.path}`, lastModified: page.updated }));
  const serviceRoutes = services.map(page => ({ url: `${baseUrl}${page.path}`, lastModified: "2026-11-05" }));
  return [...staticRoutes.filter(page => page.url !== `${baseUrl}/work`), ...caseStudyRoutes, ...productRoutes, ...serviceRoutes, ...landingRoutes, { url: `${baseUrl}/locations` }];
}
