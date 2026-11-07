export type Solution = {
  slug: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string;
  capabilities: string[];
  benefits: string[];
  technologies: string[];
  relatedProducts: { name: string; href: string; status: string }[];
  relatedCaseStudies: string[];
  relatedServices: { label: string; href: string }[];
};

export const solutions: Solution[] = [
  {
    slug: "crm-sales-management",
    title: "CRM & Sales Management",
    summary: "Give sales and operations one place to capture, qualify and follow up on real conversations.",
    challenge:
      "Leads live in inboxes, spreadsheets and chat threads. Handoffs are informal, follow-up is inconsistent, and nobody can see the current status of an inquiry without asking around.",
    approach:
      "AKTECH designs CRM workflows around how the team actually sells: intake, qualification, assignment, notes and next actions. We connect the website, WhatsApp and internal tools only where that connection is useful.",
    capabilities: [
      "Lead capture from website and other agreed channels",
      "Qualification fields and owner assignment",
      "Pipeline stages that match the sales process",
      "Activity history and follow-up reminders",
      "Role-based access for sales and management",
    ],
    benefits: [
      "Inquiries have an owner and a next step",
      "Fewer lost or duplicated conversations",
      "Reporting that reflects the real pipeline, not a generic template",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "REST APIs"],
    relatedProducts: [],
    relatedCaseStudies: [],
    relatedServices: [{ label: "CRM & Business Systems", href: "/services/crm-business-systems" }],
  },
  {
    slug: "erp-business-operations",
    title: "ERP & Business Operations",
    summary: "Connect inventory, orders, staff and reporting when disconnected tools start slowing the business down.",
    challenge:
      "Operations teams keep the same facts in multiple places. Stock, orders, billing and staff records drift apart, and managers cannot trust a single operational picture.",
    approach:
      "We map the operational loop first — what is recorded, who records it, and which record is the source of truth — then build or extend a system around those workflows rather than installing a generic ERP that the team will not use.",
    capabilities: [
      "Operational records for orders, inventory and people",
      "Permissions by role and location",
      "Reporting dashboards for agreed metrics",
      "Integrations with existing accounting or POS tools where needed",
    ],
    benefits: [
      "One operational workspace instead of parallel spreadsheets",
      "Clearer handoffs between teams",
      "A foundation that can grow without rewriting every process at once",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST APIs"],
    relatedProducts: [{ name: "Restro ERP", href: "/products/restro-erp", status: "Coming soon" }],
    relatedCaseStudies: [],
    relatedServices: [
      { label: "ERP Systems", href: "/services/erp-systems" },
      { label: "CRM & Business Systems", href: "/services/crm-business-systems" },
    ],
  },
  {
    slug: "school-management-systems",
    title: "School Management Systems",
    summary: "Bring administration, academics, attendance and finance into a connected school workspace.",
    challenge:
      "Schools often run admissions, attendance, exams and fees in separate tools. Parents and staff cannot see the same picture, and administration spends time reconciling records.",
    approach:
      "AKTECH builds school platforms around the people who use them: administrators, teachers, finance teams and parents. Acadivo is our own school product in this category and remains in development until it is publicly launched.",
    capabilities: [
      "Student and parent records",
      "Attendance and academic organisation",
      "Examinations and results workflows",
      "Fees, collections and operational reports",
      "Role-based portals",
    ],
    benefits: [
      "School records stay connected across teams",
      "Staff work in a portal suited to their role",
      "Parents can be given a defined, permissioned view",
    ],
    technologies: ["Next.js", "Node.js", "role-based access"],
    relatedProducts: [{ name: "Acadivo", href: "/products/acadivo", status: "Coming soon" }],
    relatedCaseStudies: ["international-school"],
    relatedServices: [{ label: "CRM & Business Systems", href: "/services/crm-business-systems" }],
  },
  {
    slug: "restaurant-pos-management",
    title: "Restaurant POS & Management",
    summary: "Connect the counter, kitchen and management view of a restaurant's daily work.",
    challenge:
      "Orders, tables, inventory and reporting often live in separate apps. Managers cannot see what happened on the floor without collecting reports by hand.",
    approach:
      "We design restaurant systems around the service loop: menu, order, kitchen, payment and end-of-day reporting. Restro ERP is AKTECH's own product in this space and is not yet a public launch.",
    capabilities: [
      "POS and order status",
      "Menu and table management",
      "Kitchen display workflows",
      "Inventory and purchasing records",
      "Operational reporting",
    ],
    benefits: [
      "Front-of-house and kitchen share the same order",
      "Managers review the day from one workspace",
      "Branch and staff permissions can be introduced as the business grows",
    ],
    technologies: ["React", "Node.js", "POS workflows"],
    relatedProducts: [{ name: "Restro ERP", href: "/products/restro-erp", status: "Coming soon" }],
    relatedCaseStudies: [],
    relatedServices: [{ label: "ERP Systems", href: "/services/erp-systems" }],
  },
  {
    slug: "ecommerce-solutions",
    title: "E-commerce Solutions",
    summary: "Build a store around catalog, checkout and order operations — not around a generic template.",
    challenge:
      "Growing catalogs need variants, inventory visibility, payment exception handling and an order process the operations team can actually run.",
    approach:
      "AKTECH scopes the buying journey and the operational handoffs first, then chooses a custom build or a platform such as Shopify or WordPress based on that workflow. Custom is not assumed to be the better answer.",
    capabilities: [
      "Catalog, variants and merchandising",
      "Cart and checkout flows",
      "Payment integration with success and failure paths",
      "Order status for operations",
      "Storefront design that matches the brand",
    ],
    benefits: [
      "Shoppers can find and buy without a confusing catalog",
      "Failed payments and cancelled checkouts are planned for",
      "Operations can see what was ordered without a separate spreadsheet",
    ],
    technologies: ["Next.js", "Shopify", "WordPress", "payment gateways"],
    relatedProducts: [],
    relatedCaseStudies: ["custom-ecommerce", "zurane"],
    relatedServices: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "E-commerce Development", href: "/services/ecommerce-development" },
    ],
  },
  {
    slug: "saas-product-development",
    title: "SaaS Product Development",
    summary: "Shape a multi-user product with clear roles, billing boundaries and a maintainable architecture.",
    challenge:
      "SaaS ideas often start as a set of screens. The harder work is tenancy, permissions, onboarding and the operational path from trial to paying workspace.",
    approach:
      "We help define the smallest product that can be used by real customers, then engineer the application, APIs and data model around those roles. Pricing pages and launch claims stay honest until the product is actually available.",
    capabilities: [
      "Multi-tenant or workspace architecture when required",
      "Authentication and role-based access",
      "Admin and customer-facing applications",
      "API design for future integrations",
      "Subscription or billing integration when scoped",
    ],
    benefits: [
      "A product that can be demonstrated with real workflows",
      "Permissions that match how customers actually work",
      "A codebase that can take a second customer without a rewrite",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    relatedProducts: [
      { name: "Acadivo", href: "/products/acadivo", status: "Coming soon" },
      { name: "Fitivo", href: "/products/fitivo", status: "Coming soon" },
    ],
    relatedCaseStudies: [],
    relatedServices: [{ label: "Web Development", href: "/services/web-development" }],
  },
  {
    slug: "ai-agents-business-automation",
    title: "AI Agents & Business Automation",
    summary: "Automate the repetitive parts of a workflow without inventing an AI that the business cannot supervise.",
    challenge:
      "Teams copy the same information between forms, inboxes and CRMs. Adding a chatbot on top of a messy process does not fix the process.",
    approach:
      "AKTECH maps the workflow, identifies where a human must remain in the loop, and then automates the steps that are explicit and repeatable. The on-site assistant uses verified website knowledge; we do not invent pricing or policies in automated answers.",
    capabilities: [
      "Website assistants grounded in approved content",
      "Lead routing and notification workflows",
      "n8n and API-based automations",
      "Internal tools that reduce copy-paste work",
    ],
    benefits: [
      "Faster handling of routine inquiries",
      "Fewer missed follow-ups",
      "Automation that can be inspected and corrected",
    ],
    technologies: ["n8n", "API integrations", "custom assistants"],
    relatedProducts: [],
    relatedCaseStudies: [],
    relatedServices: [
      { label: "AI Agents & Automation", href: "/services/ai-agent" },
      { label: "Lead management automation", href: "/solutions/lead-management-automation" },
    ],
  },
  {
    slug: "analytics-business-dashboards",
    title: "Analytics & Business Dashboards",
    summary: "Show the numbers the team already collects, in a form they can use to make decisions.",
    challenge:
      "Reports live in exports and personal spreadsheets. Different managers see different versions of the same week.",
    approach:
      "We start from the questions leadership actually asks, identify the source systems, and build dashboards that display agreed metrics. We do not invent conversion or revenue figures for marketing pages.",
    capabilities: [
      "Operational dashboards from existing data sources",
      "Role-appropriate views",
      "Export and scheduled reporting where useful",
      "Clear definitions for each metric shown",
    ],
    benefits: [
      "A shared view of the numbers that matter",
      "Less time assembling weekly reports by hand",
      "Metrics that can be traced back to source records",
    ],
    technologies: ["PostgreSQL", "Node.js", "charting and reporting UIs"],
    relatedProducts: [],
    relatedCaseStudies: [],
    relatedServices: [{ label: "CRM & Business Systems", href: "/services/crm-business-systems" }],
  },
];

export function getSolution(slug: string) {
  return solutions.find((item) => item.slug === slug);
}
