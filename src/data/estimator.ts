export const PROJECT_TYPES = [
  { id: "business-website", label: "Business Website", service: "Web Development" },
  { id: "ecommerce", label: "E-commerce", service: "Web Development" },
  { id: "custom-web-app", label: "Custom Web Application", service: "Web Development" },
  { id: "crm-erp", label: "CRM/ERP", service: "CRM & Business Systems" },
  { id: "saas", label: "SaaS", service: "Web Development" },
  { id: "ai-automation", label: "AI Automation", service: "AI Agents & Automation" },
  { id: "mobile-app", label: "Mobile Application", service: "Mobile Apps" },
] as const;

export const FEATURES_BY_TYPE: Record<string, string[]> = {
  "business-website": ["Custom UI/UX", "CMS or content editing", "Blog or insights", "SEO foundations", "Analytics", "Multilingual content"],
  ecommerce: ["Product catalog", "Payment integration", "Inventory visibility", "Admin dashboard", "Analytics", "Custom UI/UX"],
  "custom-web-app": ["Authentication", "Admin dashboard", "Role-based access", "Third-party APIs", "Analytics", "Custom UI/UX"],
  "crm-erp": ["Authentication", "Role-based access", "Admin dashboard", "Reporting", "Third-party APIs", "Automation"],
  saas: ["Authentication", "Multi-tenant architecture", "Admin dashboard", "Role-based access", "Analytics", "Payment integration"],
  "ai-automation": ["Automation", "Third-party APIs", "Admin dashboard", "Analytics", "Custom UI/UX"],
  "mobile-app": ["Authentication", "Push or in-app notifications", "API-backed features", "Admin dashboard", "Custom UI/UX"],
};

export const TIMELINES = ["Not sure yet", "Under 4 weeks", "1–3 months", "3–6 months", "Flexible"];
export const BUDGET_RANGES = [
  "To be discussed",
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000+",
];
export const BUSINESS_TYPES = [
  "Retail & e-commerce",
  "Restaurant & hospitality",
  "Education",
  "Healthcare",
  "Professional services",
  "Real estate",
  "Manufacturing & logistics",
  "Technology & SaaS",
  "Nonprofit",
  "Other",
];

export function serviceForProjectType(id: string) {
  const match = PROJECT_TYPES.find((item) => item.id === id);
  return match?.service ?? "Web Development";
}
