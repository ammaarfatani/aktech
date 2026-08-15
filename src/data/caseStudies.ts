export type CaseStudy = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  mainImage: string;
  screenshots: string[];
  role: string[];
  year: string;
  client: string;
  features: string[];
  caseStudy: {
    challenge: string;
    approach: string;
    result: string;
  };
};

export const FEATURED_CASE_STUDIES: CaseStudy[] = [
  {
    id: "international-school",
    slug: "international-school",
    number: "01",
    title: "International School Platform",
    category: "EDUCATION / WEB",
    shortDescription: "A modern web platform for an international school, providing structured access to courses, admissions, and interactive campus information.",
    mainImage: "/projects/school.png",
    screenshots: ["/projects/school.png"],
    role: ["Frontend Development", "UI/UX Architecture"],
    year: "2024",
    client: "International School System",
    features: [
      "Structured course & curriculum directories",
      "Interactive admission & application forms",
      "Clear campus information architecture",
      "Fast, responsive Next.js frontend",
      "Accessible information layout",
    ],
    caseStudy: {
      challenge: "Building a professional and modern digital presence for an international school while making key information regarding courses, admissions, and campus life easy for visitors to discover.",
      approach: "Developed the complete frontend using Next.js, structuring the user journey around clarity and ease of navigation. Key focus areas included course presentation, admission workflows, and intuitive inquiry forms.",
      result: "Delivered a polished, informative school platform that streamlined admission inquiries and established an authoritative digital identity for parents and students.",
    },
  },
  {
    id: "custom-ecommerce",
    slug: "custom-ecommerce",
    number: "02",
    title: "Custom E-Commerce Platform",
    category: "E-COMMERCE / FULL-STACK",
    shortDescription: "A bespoke full-stack online shopping platform with custom product catalog, cart workflows, and payment gateway integration.",
    mainImage: "/projects/onlineShop.png",
    screenshots: ["/projects/onlineShop.png"],
    role: ["Full-Stack Architecture", "UI Implementation", "Payment Gateway"],
    year: "2024",
    client: "Retail Commerce Brand",
    features: [
      "Dynamic product catalog & details",
      "Custom shopping cart & checkout flow",
      "Secure payment gateway integration",
      "PostgreSQL product database",
      "Full-stack custom architecture",
    ],
    caseStudy: {
      challenge: "Building a complete online shopping experience from scratch without relying on rigid third-party platforms or bloated e-commerce templates.",
      approach: "Architected a high-speed React.js frontend connected to a robust Node.js backend with PostgreSQL database integration. Designed dynamic cart states and integrated direct payment processing workflows.",
      result: "A complete full-stack commerce platform covering the entire customer journey from product discovery to secure payment confirmation.",
    },
  },
  {
    id: "lyba",
    slug: "lyba",
    number: "03",
    title: "LYBA Fashion Storefront",
    category: "FASHION / E-COMMERCE",
    shortDescription: "A modern e-commerce storefront developed for LYBA, featuring curated apparel catalogs, instant filtering, and responsive checkout.",
    mainImage: "/projects/laiba.png",
    screenshots: ["/projects/laiba.png", "/projects/fashion diva.png", "/projects/perfumes.png"],
    role: ["Full-Stack Web Development", "UI Implementation"],
    year: "2024",
    client: "LYBA Apparel",
    features: [
      "Fashion apparel catalog & lookbooks",
      "Product filter & search capabilities",
      "MongoDB dynamic product store",
      "Optimized mobile shopping UI",
      "Seamless checkout experience",
    ],
    caseStudy: {
      challenge: "Creating a polished digital storefront where fashion customers could seamlessly explore clothing collections, view product details, and complete purchases.",
      approach: "Utilized Next.js for high-speed server rendering paired with a MongoDB database architecture. Focused heavily on high-resolution image presentation and friction-free shopping UI.",
      result: "A complete fashion e-commerce storefront with fluid catalog browsing, fast page load speeds, and a reliable checkout workflow.",
    },
  },
  {
    id: "fitness-gym",
    slug: "fitness-gym",
    number: "04",
    title: "Elite Fitness & Gym",
    category: "FITNESS / WEB",
    shortDescription: "A high-energy digital platform for a premium gym, featuring trainer profiles, fitness programs, and membership subscription details.",
    mainImage: "/projects/gym.png",
    screenshots: ["/projects/gym.png", "/projects/urge.png"],
    role: ["Web Development", "UI Design"],
    year: "2023",
    client: "Elite Fitness Center",
    features: [
      "Interactive trainer profiles & rosters",
      "Fitness program breakdown",
      "Membership & subscription tiers",
      "High-impact visual layout",
      "Direct membership call-to-action",
    ],
    caseStudy: {
      challenge: "Establishing a strong digital presence for a gym while making trainer qualifications, fitness programs, and membership options immediately clear to potential members.",
      approach: "Designed and engineered a clean Next.js website structured around potential member decisions. Embedded class schedules, trainer highlights, and prominent subscription pathways.",
      result: "A professional gym platform that clearly communicates fitness programs and subscription options, driving increased member signups.",
    },
  },
  {
    id: "webcloners",
    slug: "webcloners",
    number: "05",
    title: "WEBCLONERS Interactive Agency",
    category: "AGENCY / AI INTEGRATION",
    shortDescription: "A dynamic full-stack agency website featuring Framer Motion micro-interactions, service showcases, and embedded AI agent assistance.",
    mainImage: "/projects/agency.png",
    screenshots: ["/projects/agency.png", "/projects/web.png"],
    role: ["UI Development", "Frontend Engineering", "AI Integration"],
    year: "2024",
    client: "Webcloners USA",
    features: [
      "Interactive Framer Motion animations",
      "AI conversational agent integration",
      "Comprehensive service showcase",
      "High-conversion lead capture",
      "Modern agency visual identity",
    ],
    caseStudy: {
      challenge: "Creating an engaging digital agency platform that communicates technical capabilities while providing interactive, AI-assisted lead capture.",
      approach: "Combined React.js with Framer Motion for smooth micro-interactions. Integrated a custom AI agent into the frontend to answer visitor inquiries and guide prospective clients.",
      result: "A dynamic, interactive agency website with real-time AI assistance, fluid motion design, and complete service presentation.",
    },
  },
  {
    id: "restro-erp",
    slug: "restro-erp",
    number: "06",
    title: "Restro POS & ERP System",
    category: "ERP / RESTAURANT MANAGEMENT",
    shortDescription: "An end-to-end multi-branch restaurant management ecosystem with real-time POS, table management, reservations, and role-based access.",
    mainImage: "/projects/resto-crm.png",
    screenshots: ["/projects/resto-crm.png", "/projects/bawarchi.png", "/projects/lahori.png", "/projects/cafe.png"],
    role: ["System Architecture", "Full-Stack Development", "RBAC Implementation"],
    year: "2024",
    client: "Multi-Location Restaurant Group",
    features: [
      "Multi-branch restaurant operations",
      "Real-time POS & order management",
      "Table layout & reservation system",
      "Role-Based Access Control (RBAC)",
      "Daily business & profit reporting",
    ],
    caseStudy: {
      challenge: "Building a centralized operational platform that can manage multi-branch restaurant workflows—from cashier POS terminals to manager reports and reservations.",
      approach: "Engineered a full-stack Next.js and Node.js enterprise application with role-based access control (RBAC). Structured real-time order pipelines, menu management, and consolidated reporting.",
      result: "A comprehensive restaurant ERP platform that streamlined daily operations from orders and seating to staff management and revenue reporting.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return FEATURED_CASE_STUDIES.find((cs) => cs.slug === slug);
}
