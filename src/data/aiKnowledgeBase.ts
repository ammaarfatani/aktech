/**
 * AKTech Digital Solutions — Comprehensive Knowledge Base
 * Built from actual website architecture, services, projects, technologies, and routing.
 */

export interface ServiceKnowledge {
  id: string;
  name: string;
  category: string;
  url: string;
  tagline: string;
  summary: string;
  description: string;
  whatWeProvide: string[];
  features: string[];
  benefits: string[];
  technologies: string[];
  whoNeedsIt: string[];
  commonUseCases: string[];
  businessProblemsSolved: string[];
  deliverables: string[];
  processSteps: string[];
  relatedServices: string[];
}

export interface ProjectKnowledge {
  id: string;
  name: string;
  category: string;
  industry: string;
  url: string;
  tagline: string;
  description: string;
  technologies: string[];
  keyFeatures: string[];
}

export const COMPANY_KNOWLEDGE = {
  name: "AKTech Digital Solutions",
  shortName: "AKTech",
  websiteUrl: "https://aktech.tech",
  tagline: "360° Digital Solutions & Enterprise Engineering Studio",
  description:
    "AKTech is a high-end digital solutions and software engineering studio. We build high-performance web applications, autonomous AI agents, enterprise CRM & ERP business management systems, native-grade mobile applications, pixel-perfect UI/UX design systems, and data-driven SEO growth engines.",
  positioning:
    "We serve ambitious startups, SMEs, e-commerce brands, and global enterprises seeking bespoke digital products engineered for sub-second speed, flawless usability, and measurable ROI.",
  whyChooseUs: [
    "Sub-Second Core Web Vitals performance — no bloated themes or slow page builders.",
    "Versatile multi-platform mastery — from custom Next.js/React engineering to tailored WordPress & Shopify solutions.",
    "End-to-end agency capabilities — research, wireframing, custom software engineering, deployment, and organic SEO growth.",
    "Transparent development process with dedicated PMs, clean IP handoff, and zero hidden lock-ins.",
    "Proven track record across E-Commerce, Education, Healthcare, Food & Beverage, SaaS, and Enterprise Logistics."
  ],
  developmentApproach:
    "We follow an agile 4-step development lifecycle: 1. Discovery & Strategy -> 2. UI/UX Wireframing & Design Systems -> 3. High-Performance Engineering -> 4. Quality Assurance, Deployment & SEO Optimization.",
  supportAndMaintenance:
    "AKTech provides post-launch maintenance, security monitoring, server infrastructure scaling, performance audits, and SLA-backed ongoing support."
};

export const SERVICES_KNOWLEDGE: Record<string, ServiceKnowledge> = {
  "web-development": {
    id: "web-development",
    name: "Web Engineering (WordPress, Shopify & Custom)",
    category: "ENGINEERING",
    url: "/services/web-development",
    tagline: "High-converting web solutions tailored to your exact business platform needs.",
    summary:
      "AKTech provides comprehensive Web Development covering custom Next.js 16/React 19 software engineering, corporate WordPress development, and scalable Shopify e-commerce storefronts.",
    description:
      "Whether you need an easily editable corporate website on WordPress, a feature-rich online store on Shopify, or a complex custom SaaS web application built with Next.js & React, AKTech selects and engineers the right technology for your business goals.",
    whatWeProvide: [
      "Custom Web Applications & Enterprise SaaS platforms",
      "Corporate WordPress websites, blogs & landing pages",
      "Shopify e-commerce stores & custom Liquid theme development",
      "Headless CMS integration & custom admin control panels",
      "WooCommerce online store setup & plugin customization",
      "RESTful API & GraphQL microservice backend engineering",
      "Sub-second Core Web Vitals speed tuning & mobile responsiveness"
    ],
    features: [
      "Sub-second page loading speeds",
      "100% mobile-first responsive layouts",
      "SEO schema JSON-LD & metadata pre-configured",
      "Secure payment gateway integrations (Stripe, PayPal, Local Gateways)",
      "Role-based authentication & admin access control",
      "Third-party API & CRM webhooks integration"
    ],
    benefits: [
      "Higher search engine rankings due to clean code & sub-second loading speed",
      "Increased checkout & lead conversions with optimized UI funnels",
      "Complete ownership of code, design assets, and content control",
      "Scalable infrastructure capable of handling high traffic spikes"
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Node.js",
      "WordPress",
      "Shopify",
      "WooCommerce",
      "Tailwind CSS",
      "PostgreSQL",
      "GraphQL"
    ],
    whoNeedsIt: [
      "Businesses launching a new company website or online store",
      "Companies with outdated, slow, or non-responsive websites needing a complete redesign",
      "E-commerce brands seeking higher sales conversions on Shopify or WooCommerce",
      "SaaS startups needing custom web app architectures and admin dashboards"
    ],
    commonUseCases: [
      "Corporate Business Websites",
      "E-Commerce Online Stores (Shopify & WooCommerce)",
      "Custom SaaS Product Platforms",
      "High-Converting Marketing Landing Pages",
      "Headless CMS Storefronts"
    ],
    businessProblemsSolved: [
      "Slow page load speeds driving visitors away to competitors",
      "Outdated design damaging brand trust and credibility",
      "Inability to easily update website content without developer intervention",
      "Low online sales conversion rates"
    ],
    deliverables: [
      "Production-ready Website or Web Application",
      "Complete Code Source Repository & Ownership",
      "WordPress or Shopify Admin Handoff & Video Guide",
      "SEO Schema & Speed Optimization Verification",
      "Responsive Layout Testing across 10+ Device Viewports"
    ],
    processSteps: [
      "1. Platform Strategy & Tech Selection (WordPress vs Shopify vs Custom)",
      "2. UI/UX Wireframing & Visual Design",
      "3. Front-end & Back-end Code Engineering",
      "4. Quality Assurance, Speed Audit & Production Launch"
    ],
    relatedServices: ["uiux-design", "seo-digital-growth", "crm-business-systems"]
  },
  "ai-agent": {
    id: "ai-agent",
    name: "AI Agents & Autonomous Automation",
    category: "ARTIFICIAL INTELLIGENCE",
    url: "/services/ai-agent",
    tagline: "24/7 autonomous conversational AI bots, LLM agents & workflow automations.",
    summary:
      "Transform customer support, lead qualification, and internal company operations with custom AI agents powered by OpenAI, Anthropic, n8n, and intelligent database integrations.",
    description:
      "AKTech builds autonomous AI agents that act as 24/7 website customer assistants, lead screeners, internal knowledge-base lookup bots, and automated workflow orchestrators connecting your web apps to CRMs, databases, and APIs.",
    whatWeProvide: [
      "Custom 24/7 Website AI Chatbots & Customer Support Agents",
      "n8n & Zapier Enterprise Workflow Automations",
      "Lead Screening, Qualification & Automatic CRM Routing",
      "Custom Fine-Tuned AI Prompts & RAG Knowledge Base Search",
      "Database, Webhook & API Data Synchronization",
      "Internal Business Assistants for Document & Policy Queries"
    ],
    features: [
      "Page-aware & context-sensitive conversational responses",
      "Instant lead capture with automatic email/SMS notifications",
      "Multi-channel deployment (Website, WhatsApp, Slack, Custom Web Apps)",
      "Strict data privacy controls — zero exposure of system prompts or keys",
      "Custom action triggers (redirect to URL, book meeting, query inventory)"
    ],
    benefits: [
      "Capture and qualify leads 24/7 even outside business hours",
      "Reduce customer support response times from hours to milliseconds",
      "Eliminate repetitive manual data entry across departments",
      "Lower operational overhead while increasing customer satisfaction"
    ],
    technologies: ["OpenAI API", "Anthropic Claude", "n8n", "LangChain", "Python", "Vector DBs", "Webhooks", "Node.js"],
    whoNeedsIt: [
      "Agencies receiving frequent after-hours lead inquiries",
      "E-commerce stores needing instant order status and product support",
      "B2B service providers needing automated lead qualification funnels",
      "Companies with complex internal documents needing instant AI lookup"
    ],
    commonUseCases: [
      "Website Customer Support AI Assistants",
      "Automated Lead Qualification & CRM Entry",
      "Internal Company Knowledge Base Query Bots",
      "Multi-System Data Sync & Webhook Automations"
    ],
    businessProblemsSolved: [
      "Lost sales leads due to slow response times",
      "Overwhelmed support teams answering repetitive questions",
      "Manual data entry errors between web forms and CRMs",
      "Lack of after-hours customer engagement"
    ],
    deliverables: [
      "Fully Trained & Tested AI Agent Model",
      "n8n Workflow Automation Architecture",
      "Website & Web App Widget Integration Code",
      "Lead Capture Routing & CRM Connection",
      "Admin Control Panel & Prompt Maintenance Guide"
    ],
    processSteps: [
      "1. Business Process & Knowledge Audit",
      "2. Agent Prompt & RAG Vector Database Architecture",
      "3. n8n Automation & API Integration Setup",
      "4. Production Deployment & Conversation Analytics"
    ],
    relatedServices: ["web-development", "crm-business-systems", "seo-digital-growth"]
  },
  "seo-digital-growth": {
    id: "seo-digital-growth",
    name: "Technical SEO & Organic Search Growth",
    category: "ORGANIC SCALING",
    url: "/services/seo",
    tagline: "Command organic search authority with data-backed technical SEO.",
    summary:
      "AKTech delivers rigorous technical SEO audits, structured JSON-LD schema markup, page speed tuning, and content strategy to rank your business for high-intent revenue keywords.",
    description:
      "We do not sell empty guarantees or spam links. AKTech executes real, technical SEO engineering — auditing site architecture, fixing crawl errors, implementing Google-recommended structured data, and optimizing Core Web Vitals for sustained organic revenue growth.",
    whatWeProvide: [
      "Comprehensive Technical & Structural SEO Audits",
      "Rich Snippet JSON-LD Schema Architecture (Organization, Product, FAQ, Service)",
      "Core Web Vitals & PageSpeed Performance Tuning",
      "On-Page Content & High-Intent Keyword Optimization",
      "Local SEO & Google Business Profile Strategy",
      "Conversion Rate Optimization (CRO) & User Funnel Audit"
    ],
    features: [
      "Sub-second page rendering for search crawlers",
      "Structured data validation for rich search results",
      "Clean XML sitemaps & robots.txt directives",
      "Canonical URL enforcement & duplicate content fixes",
      "Mobile-friendly indexation verification"
    ],
    benefits: [
      "Predictable, long-term organic traffic without relying solely on ad spend",
      "Higher ranking for high-intent commercial keywords",
      "Improved click-through rates (CTR) in search results via rich snippets",
      "Better user retention and lower bounce rates"
    ],
    technologies: ["Google Search Console", "Google Analytics 4", "Ahrefs", "SEMrush", "Screaming Frog", "JSON-LD Schema", "Lighthouse"],
    whoNeedsIt: [
      "Businesses struggling to get visible traffic on Google",
      "E-commerce stores wanting organic product sales",
      "Local service providers needing map pack and regional search dominance",
      "Websites that recently suffered traffic drops after algorithm updates"
    ],
    commonUseCases: [
      "E-Commerce Organic Search Scaling",
      "Local Business Map & Regional Search Dominance",
      "B2B Tech Keyword Strategy & Organic Funnels",
      "Technical Core Web Vitals Speed Diagnostics"
    ],
    businessProblemsSolved: [
      "High ad dependency resulting in skyrocketing marketing costs",
      "Low website traffic despite having good products or services",
      "Poor search engine indexing and missing schema metadata",
      "Uncompetitive website loading speed"
    ],
    deliverables: [
      "Full Technical SEO Audit Report",
      "Implemented JSON-LD Schema Code",
      "Core Web Vitals Speed Diagnostic & Fixes",
      "Targeted Keyword Strategy & Content Map",
      "Google Search Console & GA4 Setup Verification"
    ],
    processSteps: [
      "1. Site Architecture & Technical Audit",
      "2. Keyword Research & Competitor Gap Analysis",
      "3. Schema Implementation & On-Page Code Optimization",
      "4. Core Web Vitals Speed Tuning & Monthly Performance Tracking"
    ],
    relatedServices: ["web-development", "uiux-design", "ai-agent"]
  },
  "mobile-development": {
    id: "mobile-development",
    name: "Cross-Platform Mobile App Development",
    category: "MOBILE PRODUCT",
    url: "/services/mobile-app-development",
    tagline: "Native-grade iOS & Android apps built for speed and engagement.",
    summary:
      "Engineered with React Native and Expo, AKTech builds cross-platform mobile apps featuring Apple-level polish, offline data caching, biometrics, and push notification systems.",
    description:
      "We deliver high-end mobile experiences for iOS and Android using a single high-performance codebase in React Native. From food delivery and e-commerce to social platforms and internal enterprise tools, we handle everything from design to App Store publishing.",
    whatWeProvide: [
      "Cross-Platform iOS & Android App Development",
      "React Native & Expo Ecosystem Engineering",
      "Offline Data Caching & Encrypted Local Storage",
      "Push Notification & Mobile Engagement Workflows",
      "Apple App Store & Google Play Store Publishing",
      "Biometrics (FaceID/Fingerprint) & Secure Auth Integration"
    ],
    features: [
      "60fps smooth animations and touch responses",
      "Native device hardware access (Camera, GPS, Bluetooth, Push)",
      "Real-time database sync & offline queueing",
      "Over-The-Air (OTA) app update capabilities"
    ],
    benefits: [
      "Build for both iOS and Android simultaneously, saving up to 50% development cost",
      "Direct channel to engage customers via push notifications",
      "Seamless mobile user experience leading to high app retention",
      "Complete ownership of app binary assets and codebase"
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "Firebase", "Node.js", "App Store Connect", "Google Play Console"],
    whoNeedsIt: [
      "Businesses launching consumer mobile services or delivery platforms",
      "E-commerce brands seeking direct mobile app sales channels",
      "Enterprises needing mobile workforce app tools for field teams"
    ],
    commonUseCases: [
      "E-Commerce & Retail Shopping Apps",
      "Food Delivery & Order Management Apps",
      "On-Demand Service Booking Apps",
      "Internal Business Logistics & Field Inspection Apps"
    ],
    businessProblemsSolved: [
      "Inability to send direct push marketing notifications to mobile users",
      "High costs of building separate native iOS (Swift) and Android (Kotlin) teams",
      "Poor mobile web conversions compared to dedicated native app flows"
    ],
    deliverables: [
      "Compiled iOS (.ipa) & Android (.aab) Binaries",
      "Complete React Native Source Code Repository",
      "App Store & Google Play Listing Approval Assistance",
      "Push Notification Gateway Setup",
      "Backend API & Database Connection Architecture"
    ],
    processSteps: [
      "1. Mobile Wireframing & UI/UX Design",
      "2. React Native Codebase & API Integration",
      "3. Device Testing (iOS Simulator & Android Emulators)",
      "4. App Store & Google Play Submission"
    ],
    relatedServices: ["uiux-design", "web-development", "crm-business-systems"]
  },
  "uiux-design": {
    id: "uiux-design",
    name: "UI/UX & Digital Product Design",
    category: "DESIGN SYSTEM",
    url: "/services/uiux-design",
    tagline: "Human-centric interfaces, interactive prototypes & design systems.",
    summary:
      "Crafting pixel-perfect Figma design systems, interactive prototypes, user journey flows, and high-converting visual interfaces for web, mobile, and SaaS platforms.",
    description:
      "AKTech treats UI/UX design as strategic business architecture. Every screen layout, button state, font hierarchy, and micro-interaction is engineered in Figma to reduce user friction and maximize conversion rates.",
    whatWeProvide: [
      "Figma Design Systems & Scalable UI Token Libraries",
      "Interactive Click-Through High-Fidelity Prototypes",
      "User Journey Mapping & Information Architecture",
      "Desktop, Tablet & Mobile Responsive Screen Layouts",
      "Usability Testing & Conversion Rate Optimization (CRO)",
      "Developer Handoff Inspection Files & Asset Exports"
    ],
    features: [
      "Pixel-perfect auto-layout components in Figma",
      "Dark mode & light mode UI token specifications",
      "Micro-interaction motion guidelines",
      "WCAG accessibility color contrast compliance"
    ],
    benefits: [
      "Validate user flows before spending money on custom code",
      "Faster developer implementation due to standardized design tokens",
      "Increased user engagement and lower onboarding churn rates"
    ],
    technologies: ["Figma", "Framer", "Adobe CC", "Principle", "Tailwind Design Tokens", "Lottie"],
    whoNeedsIt: [
      "Startups needing a complete prototype for investor pitching",
      "Existing websites/apps with confusing layouts and drop-offs",
      "SaaS products needing clean, complex dashboard interfaces"
    ],
    commonUseCases: [
      "SaaS Dashboard & Admin Portal Design",
      "Mobile App UI/UX Design Systems",
      "E-Commerce Product & Checkout Flow Optimization",
      "Corporate Brand Refresh & Web Guidelines"
    ],
    businessProblemsSolved: [
      "High user bounce rates caused by confusing navigation",
      "Inconsistent visual design across web and mobile products",
      "Developer confusion during code implementation"
    ],
    deliverables: [
      "Interactive Figma Prototype Source Link",
      "Complete UI Kit & Design System Library",
      "Exported SVG Icons & Graphic Assets",
      "Developer Handoff Guide & Responsive Specs"
    ],
    processSteps: [
      "1. User Research & Wireframing",
      "2. Visual Art Direction & Color System",
      "3. Component Design & Interactive Prototype Creation",
      "4. Design QA & Developer Handoff"
    ],
    relatedServices: ["web-development", "mobile-development", "seo-digital-growth"]
  },
  "crm-business-systems": {
    id: "crm-business-systems",
    name: "Enterprise CRM & Business Systems",
    category: "ENTERPRISE SOFTWARE",
    url: "/services/crm-business-systems",
    tagline: "Bespoke CRMs, POS engines & executive management dashboards.",
    summary:
      "Centralize your company's sales pipeline, customer records, lead follow-ups, and operational metrics into a secure, custom-built management dashboard.",
    description:
      "Off-the-shelf CRMs often force businesses to pay expensive monthly per-user fees for features they never use. AKTech builds custom CRM solutions tailored specifically to your company's workflows, with zero user-seat limits.",
    whatWeProvide: [
      "Bespoke Lead & Sales Pipeline Tracking Dashboards",
      "Customer 360° Profiles & Interaction Histories",
      "Automated Task Reminders & Follow-Up Workflows",
      "POS & Multi-Branch Sales Engines",
      "Granular Role-Based Access Control (RBAC)",
      "Real-Time Executive Revenue & P&L Analytics"
    ],
    features: [
      "Drag-and-drop kanban sales funnels",
      "Granular permissions (Admin, Manager, Agent, Auditor)",
      "Automated email & WhatsApp lead notifications",
      "Exportable CSV/PDF financial and activity reports"
    ],
    benefits: [
      "Never lose track of a potential sales lead again",
      "Eliminate expensive monthly per-user SaaS subscription costs",
      "100% custom workflows built around your specific sales process",
      "Complete data privacy and full database ownership"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Docker"],
    whoNeedsIt: [
      "Sales teams whose agents forget follow-ups or drop leads",
      "Companies paying tens of thousands per year for Salesforce/HubSpot",
      "Businesses with custom sales pipelines not supported by off-the-shelf CRMs"
    ],
    commonUseCases: [
      "Sales Team Lead Tracking CRMs",
      "Multi-Branch POS & Inventory Dashboards",
      "Customer Support Ticket & Service Request Managers",
      "Real-Time Executive Operations Centers"
    ],
    businessProblemsSolved: [
      "Sales agents forgetting lead follow-ups",
      "Data scattered across multiple spreadsheets",
      "Lack of real-time visibility into daily revenue and agent performance"
    ],
    deliverables: [
      "Deployed Custom CRM Platform",
      "Role-Based Admin Access Management",
      "User Training Video Documentation",
      "Complete Source Code & Database Architecture"
    ],
    processSteps: [
      "1. Sales Workflow & Data Schema Mapping",
      "2. UI/UX Dashboard Wireframing",
      "3. Database & Backend API Engineering",
      "4. Data Migration, Security QA & Handoff"
    ],
    relatedServices: ["erp-systems", "ai-agent", "web-development"]
  },
  "erp-systems": {
    id: "erp-systems",
    name: "Enterprise Resource Planning (ERP) Systems",
    category: "ENTERPRISE SOFTWARE",
    url: "/services/erp-systems",
    tagline: "Unify inventory, sales, procurement, finance & HR under one roof.",
    summary:
      "Streamline multi-department company operations with custom ERP systems connecting inventory, purchasing, order fulfillment, finance, and human resources.",
    description:
      "AKTech engineers tailored ERP systems for non-technical business owners and enterprise managers. Instead of juggling disconnected tools for warehouse inventory, accounting, and employee payroll, an AKTech ERP provides a single source of truth for your entire business.",
    whatWeProvide: [
      "Multi-Branch Warehouse & Live Inventory Control",
      "Supplier Procurement & Purchase Order Management",
      "Order Fulfillment & Logistics Tracking",
      "General Ledger, Invoicing & Financial Accounting Modules",
      "HR, Employee Management & Attendance/Payroll Tracking",
      "Executive Business Intelligence (BI) & Audit Trails"
    ],
    features: [
      "Real-time stock level alerts & automatic re-order points",
      "Multi-currency & multi-tax calculation support",
      "Detailed activity audit logging for enterprise compliance",
      "Custom reporting dashboards tailored for C-level executives"
    ],
    benefits: [
      "Eliminate inventory stockouts and duplicate purchasing",
      "Give executives an instantaneous real-time view of company health",
      "Break down operational silos between departments",
      "Tailored specifically to your industry without bloated unnecessary features"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Redis", "Tailwind CSS"],
    whoNeedsIt: [
      "Growing companies struggling with inventory discrepancies across warehouses",
      "Manufacturing & distribution businesses with complex supplier supply chains",
      "Organized enterprises needing a unified platform for operations, HR, and accounting"
    ],
    commonUseCases: [
      "Warehouse Inventory & Stock Control ERP",
      "Manufacturing & Procurement Management ERP",
      "Multi-Location Retail & Order Fulfillment ERP",
      "Corporate Operations & HR Management System"
    ],
    businessProblemsSolved: [
      "Inventory loss, stock discrepancies, and over-purchasing",
      "Disconnected financial data between sales and accounting",
      "Inability to track employee productivity or multi-warehouse stock"
    ],
    deliverables: [
      "Production Enterprise ERP System Deployment",
      "Multi-Department Access Controls & RBAC Setup",
      "Database Backup & Security Protocol Configuration",
      "User Training Materials & Source Code Repository"
    ],
    processSteps: [
      "1. Operational Audit & Multi-Department Data Mapping",
      "2. System Architecture & Database Schema Design",
      "3. Core Module Engineering (Inventory, Finance, HR)",
      "4. System Integration, Security Audit & Handoff"
    ],
    relatedServices: ["crm-business-systems", "web-development", "ai-agent"]
  }
};

export const PLATFORM_COMPARISON_KNOWLEDGE = {
  wordpressVsShopifyVsCustom: {
    title: "WordPress vs. Shopify vs. Custom Web Development",
    summary:
      "AKTech provides all three options and recommends the right platform based on your business requirements:",
    comparison: [
      {
        platform: "WordPress",
        bestFor: "Content-driven sites, corporate business websites, blogs, landing pages, and flexible WooCommerce stores.",
        pros: "Easy content management, low hosting costs, thousands of plugin integrations, complete data ownership.",
        cons: "Requires regular security & plugin maintenance if not configured properly.",
        url: "/services/web-development"
      },
      {
        platform: "Shopify",
        bestFor: "Pure e-commerce businesses wanting a hassle-free online store with built-in payment & shipping.",
        pros: "Managed hosting, high security out-of-the-box, easy product catalog management, fast checkout.",
        cons: "Monthly subscription fees and transaction fees; custom features require Liquid/App development.",
        url: "/services/web-development"
      },
      {
        platform: "Custom Web Dev (Next.js / React)",
        bestFor: "SaaS products, web applications, custom platforms, and enterprises needing sub-second speed.",
        pros: "Unmatched performance, 100% custom functionality, zero platform limitations, maximum security.",
        cons: "Higher upfront investment compared to template website builds.",
        url: "/services/web-development"
      }
    ]
  },
  crmVsErp: {
    title: "CRM vs. ERP Systems",
    summary:
      "Understanding whether your business needs a CRM, an ERP, or an integrated solution:",
    comparison: [
      {
        system: "CRM (Customer Relationship Management)",
        focus: "Front-office operations: Sales, leads, customer communications, marketing follow-ups, and revenue pipelines.",
        bestIf: "Your main problem is managing customer inquiries, agent follow-ups, and sales conversions.",
        url: "/services/crm-business-systems"
      },
      {
        system: "ERP (Enterprise Resource Planning)",
        focus: "Back-office operations: Multi-warehouse inventory, procurement, supply chain, finance, accounting, and HR.",
        bestIf: "Your main problem is tracking stock levels, purchase orders, multi-department workflows, and financial reports.",
        url: "/services/erp-systems"
      }
    ]
  }
};

export const PROJECTS_KNOWLEDGE: ProjectKnowledge[] = [
  {
    id: "international-school",
    name: "Global International School Portal",
    category: "EdTech & Web Portal",
    industry: "Education",
    url: "/case-studies/international-school",
    tagline: "Enterprise school portal with student management & gradebook analytics.",
    description:
      "A complete digital portal engineered for a premier international school system, featuring student grade tracking, parent communication channels, and administrative dashboards.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
    keyFeatures: ["Student Gradebook & Analytics", "Parent Communication Feed", "Tuition & Fee Payment Integration", "Multi-Role Teacher/Admin Portal"]
  },
  {
    id: "custom-ecommerce",
    name: "High-Fashion E-Commerce Storefront",
    category: "E-Commerce",
    industry: "Fashion & Retail",
    url: "/case-studies/custom-ecommerce",
    tagline: "High-converting online store with custom product filtering and instant checkout.",
    description:
      "A fast e-commerce platform built for a luxury apparel brand, optimized for sub-second product loading, mobile shopping, and automated inventory sync.",
    technologies: ["Next.js", "React", "Shopify API", "Tailwind CSS", "Stripe"],
    keyFeatures: ["Instant Search & Filter", "Mobile-First Drawer Checkout", "Multi-Currency Support", "Automated Inventory Sync"]
  },
  {
    id: "lyba",
    name: "Lyba Corporate Platform",
    category: "Corporate Web App",
    industry: "Corporate & Consulting",
    url: "/case-studies/lyba",
    tagline: "Modern corporate website with dynamic content CMS and service showcases.",
    description:
      "An editorial corporate platform delivering elegant brand positioning, interactive service calculators, and seamless lead generation funnels.",
    technologies: ["Next.js", "React 19", "Framer Motion", "Tailwind CSS"],
    keyFeatures: ["Smooth Motion Micro-Interactions", "Dynamic CMS Service Catalog", "Lead Funnel Capture", "100/100 Core Web Vitals Score"]
  },
  {
    id: "sh-perfumes",
    name: "SH Perfumes E-Commerce",
    category: "Luxury Retail",
    industry: "Cosmetics & Perfumes",
    url: "/portfolio",
    tagline: "Cinematic luxury perfume e-commerce store with rich visual art direction.",
    description:
      "A visually stunning online store for luxury fragrances featuring video backgrounds, persistent cart management, and elegant product storytelling.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Local Cart State"],
    keyFeatures: ["Cinematic Video Showcase", "Fragrance Note Breakdown Cards", "Persistent Shopping Cart", "WhatsApp Direct Order Channel"]
  },
  {
    id: "inventory-crm",
    name: "Multi-Branch Inventory & Sales CRM",
    category: "Enterprise System",
    industry: "Retail & Distribution",
    url: "/services/crm-business-systems",
    tagline: "Centralized inventory tracking and point-of-sale management engine.",
    description:
      "A custom-built enterprise CRM allowing managers to track inventory stock, agent sales performance, and branch P&L metrics in real-time.",
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    keyFeatures: ["Real-Time Inventory Deductions", "Role-Based Access Control", "Sales Pipeline Kanban", "Automated PDF Reporting"]
  }
];

export const SMART_ROUTES: Record<string, { title: string; url: string; description: string }> = {
  home: { title: "Home Page", url: "/", description: "AKTech Digital Solutions Main Overview" },
  about: { title: "About AKTech", url: "/about", description: "Company background, values, and engineering methodology" },
  services: { title: "Services Directory", url: "/services", description: "All 6 AKTech core digital services" },
  "web-development": { title: "Web Development Service", url: "/services/web-development", description: "WordPress, Shopify & Custom Next.js Web Engineering" },
  "ai-agent": { title: "AI Agent & Automation Service", url: "/services/ai-agent", description: "Autonomous AI Chatbots & n8n Enterprise Workflows" },
  seo: { title: "SEO Growth Service", url: "/services/seo", description: "Technical SEO, Core Web Vitals & Organic Search Growth" },
  "mobile-app-development": { title: "Mobile App Development Service", url: "/services/mobile-app-development", description: "Native-grade iOS & Android React Native Apps" },
  "uiux-design": { title: "UI/UX Design Service", url: "/services/uiux-design", description: "Figma Design Systems & Interactive Prototypes" },
  "crm-business-systems": { title: "CRM Business Systems Service", url: "/services/crm-business-systems", description: "Custom Lead Pipelines, POS & Operations CRMs" },
  "erp-systems": { title: "ERP Systems Service", url: "/services/erp-systems", description: "Multi-Department Inventory, HR & Accounting ERPs" },
  portfolio: { title: "Projects & Case Studies", url: "/portfolio", description: "Selected work, live client platforms & case studies" },
  contact: { title: "Contact AKTech", url: "/contact", description: "Schedule a proposal or speak directly with AKTech engineers" },
  clients: { title: "Our Clients", url: "/clients", description: "Client portfolio and partner showcase" }
};

export const PROBLEM_SOLVER_RECOMMENDATIONS = [
  {
    keywords: ["sales", "follow up", "leads lost", "sales team", "forget leads", "customer records"],
    recommendedServiceId: "crm-business-systems",
    explanation: "Your sales process requires an Enterprise CRM to track leads, automate follow-up reminders, and give your sales team a structured pipeline."
  },
  {
    keywords: ["stock", "inventory", "warehouse", "purchase order", "suppliers", "multiple branches", "hr", "payroll"],
    recommendedServiceId: "erp-systems",
    explanation: "You need an Enterprise ERP System to unify inventory stock, supplier purchases, order fulfillment, and multi-department company operations under one dashboard."
  },
  {
    keywords: ["no traffic", "google ranking", "seo", "organic sales", "search visibility", "slow speed", "core web vitals"],
    recommendedServiceId: "seo-digital-growth",
    explanation: "Our Technical SEO & Growth Service will audit your site, fix schema markup, tune Core Web Vitals speeds, and rank your site for high-intent keywords."
  },
  {
    keywords: ["online store", "ecommerce", "sell online", "shopify", "woocommerce", "products"],
    recommendedServiceId: "web-development",
    explanation: "AKTech builds high-converting e-commerce stores on Shopify, WooCommerce, or custom Next.js storefronts based on your catalog size and operational needs."
  },
  {
    keywords: ["chatbot", "24/7 support", "ai assistant", "automate leads", "n8n", "ai workflow", "whatsapp bot"],
    recommendedServiceId: "ai-agent",
    explanation: "Our AI Agent Service will deploy a custom 24/7 AI chatbot trained on your business knowledge to capture leads and automate customer inquiries."
  },
  {
    keywords: ["mobile app", "iphone app", "android app", "ios", "react native"],
    recommendedServiceId: "mobile-development",
    explanation: "We build native-grade iOS & Android applications using React Native and Expo with push notifications, offline sync, and smooth animations."
  },
  {
    keywords: ["outdated website", "confusing UI", "redesign", "figma", "wireframe", "user flow"],
    recommendedServiceId: "uiux-design",
    explanation: "Our UI/UX Design studio will map user funnels, build custom Figma prototypes, and redesign your interface for maximum conversion."
  }
];
