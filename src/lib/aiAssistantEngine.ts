import {
  COMPANY_KNOWLEDGE,
  SERVICES_KNOWLEDGE,
  PLATFORM_COMPARISON_KNOWLEDGE,
  PROJECTS_KNOWLEDGE,
  SMART_ROUTES,
  PROBLEM_SOLVER_RECOMMENDATIONS,
  ServiceKnowledge,
  ProjectKnowledge
} from "@/data/aiKnowledgeBase";

export interface SmartLink {
  title: string;
  url: string;
}

export interface ProjectHighlight {
  id: string;
  name: string;
  category: string;
  industry: string;
  url: string;
  tagline: string;
}

export interface AIResponsePayload {
  reply: string;
  smartLinks?: SmartLink[];
  suggestedPrompts?: string[];
  projectHighlights?: ProjectHighlight[];
  leadCapturePrompt?: boolean;
}

export interface UserContext {
  currentPath?: string;
  sessionId?: string;
  userRole?: string;
}

/**
 * Generate human-like, conversational, context-aware responses representing AKTech AI Agent.
 */
export function generateAIResponse(
  userQuery: string,
  context: UserContext = {}
): AIResponsePayload {
  const query = userQuery.trim().toLowerCase();
  const currentPath = context.currentPath || "/";

  // 1. GREETINGS
  if (isGreeting(query)) {
    return {
      reply: `Hi there! I'm the AKTech AI Agent.\n\nI can help you find the right digital solution for your business — whether you need high-performance web engineering, WordPress or Shopify stores, an autonomous AI agent, SEO growth, mobile apps, or custom CRM/ERP management systems.\n\nHow can I help you today?`,
      suggestedPrompts: [
        "Explore Services",
        "CRM vs ERP",
        "Shopify vs WordPress",
        "View Projects",
        "Contact AKTech"
      ]
    };
  }

  // 2. LEAD / PROPOSAL REQUESTS
  if (isLeadOrProposalRequest(query)) {
    return {
      reply: `We'd love to help build your next project!\n\nTo get started with an exact scope and proposal, you can fill out our brief contact form or leave your details right here:\n\n• Your Name & Business\n• Required Solution (Web, Mobile, AI, CRM, ERP, SEO)\n• Best Email or WhatsApp Number\n\nOr click below to head straight to our contact page:`,
      smartLinks: [{ title: "Contact AKTech →", url: "/contact" }],
      suggestedPrompts: ["Explore Services", "View Projects", "Contact AKTech"],
      leadCapturePrompt: true
    };
  }

  // 3. DIRECT NAVIGATION INQUIRIES
  const directNavigationMatch = checkDirectNavigation(query);
  if (directNavigationMatch) {
    return directNavigationMatch;
  }

  // 4. PLATFORM COMPARISONS (CRM vs ERP, WordPress vs Shopify)
  if ((query.includes("crm") && query.includes("erp")) || query.includes("difference between crm")) {
    return {
      reply: `That depends on what you're trying to manage in your business.\n\nIf your main challenge is leads, customers, sales team follow-ups, and pipeline tracking, a CRM is usually the best fit.\n\nIf you need to manage multiple operations like inventory stock, purchasing, sales, finance, and different departments in one system, an ERP makes more sense.\n\nTell me a little about your business and what you're struggling with, and I'll help you pick the right system!`,
      smartLinks: [
        { title: "Explore CRM Solutions →", url: "/services/crm-business-systems" },
        { title: "Explore ERP Systems →", url: "/services/erp-systems" }
      ],
      suggestedPrompts: ["Explore CRM Solutions", "Explore ERP Systems", "Contact AKTech"]
    };
  }

  if (query.includes("wordpress") && query.includes("shopify")) {
    return {
      reply: `Here's how to choose between WordPress and Shopify for your website:\n\n• WordPress is great for content-heavy business sites, corporate portals, blogs, and custom WooCommerce stores where you want total content control and zero monthly platform fees.\n\n• Shopify is ideal if you want a dedicated online store with hassle-free hosting, automated payment setups, and simple product catalog management out-of-the-box.\n\n• Custom Web Dev (Next.js) is best if you need sub-second speed, custom web applications, or a scalable SaaS platform.\n\nWhich type of business are you launching?`,
      smartLinks: [{ title: "View Web Development →", url: "/services/web-development" }],
      suggestedPrompts: ["Build WordPress Site", "Launch Shopify Store", "Build Custom App"]
    };
  }

  // 5. SPECIFIC SERVICES
  const serviceMatch = matchServiceFromQuery(query, currentPath);
  if (serviceMatch) {
    return buildServiceResponse(serviceMatch);
  }

  // 6. PORTFOLIO & PROJECTS
  if (isPortfolioQuery(query)) {
    return buildPortfolioResponse(query);
  }

  // 7. BUSINESS PROBLEM MATCHING
  const problemRecommendation = matchBusinessProblem(query);
  if (problemRecommendation) {
    return problemRecommendation;
  }

  // 8. TECH STACK INQUIRIES
  if (isTechStackQuery(query)) {
    return {
      reply: `At AKTech, we use modern, production-tested technologies tailored to your project goals:\n\n• Web Engineering: Next.js 16, React 19, TypeScript, Node.js, WordPress, Shopify & Tailwind CSS.\n• AI & Automation: OpenAI API, Anthropic, n8n workflows, Python, Vector DBs & Webhooks.\n• Mobile Apps: React Native, Expo, Redux & Firebase.\n• Databases: PostgreSQL, MongoDB, Node.js & Docker.\n\nWe focus on giving you sub-second loading speed, high security, and complete ownership of your code.`,
      smartLinks: [{ title: "Explore Web Engineering →", url: "/services/web-development" }],
      suggestedPrompts: ["Explore Services", "View Projects", "Contact AKTech"]
    };
  }

  // 9. OUT OF BOUNDS / UNRELATED QUESTIONS
  if (isOutofBoundsQuery(query)) {
    return {
      reply: `I'm the AKTech AI Agent, so I focus specifically on our web development, AI agents, SEO, mobile apps, CRM/ERP systems, and client projects.\n\nI can't help with that topic, but I'd be happy to answer any questions about building software or websites for your business!`,
      suggestedPrompts: ["What services do you offer?", "View Projects", "Contact AKTech"]
    };
  }

  // 10. GENERAL CONTEXTUAL FALLBACK
  return {
    reply: `I'm AKTech AI Agent. We build high-performance web applications, custom WordPress & Shopify sites, AI chatbots, mobile apps, SEO engines, and custom CRM/ERP business systems.\n\nWhat kind of solution or project are you looking to build?`,
    smartLinks: [{ title: "Explore Services →", url: "/services" }, { title: "Contact AKTech →", url: "/contact" }],
    suggestedPrompts: ["Explore Services", "Shopify vs WordPress", "Do I need a CRM or ERP?", "Contact AKTech"]
  };
}

/* ─────────────────────────────────────────────────────────────
   HELPERS & MATCHING LOGIC
   ───────────────────────────────────────────────────────────── */

function isGreeting(q: string): boolean {
  return /^(hi|hello|hey|greetings|good morning|good afternoon|good evening|who are you|start)\b/i.test(q);
}

function isLeadOrProposalRequest(q: string): boolean {
  return /(hire|proposal|quote|pricing|cost|price|estimate|contact you|schedule a call|book a meeting|get in touch|start project)/i.test(q);
}

function checkDirectNavigation(q: string): AIResponsePayload | null {
  if (/(where.*services|see.*services|services page|list of services|what services)/i.test(q)) {
    return {
      reply: `You can check out our full range of services on our Services page. We specialize in Web Development, AI Agents, SEO Growth, Mobile Apps, UI/UX Design, and CRM/ERP Systems.`,
      smartLinks: [{ title: "View Services Page →", url: "/services" }],
      suggestedPrompts: ["Web Development", "AI Agents", "SEO Growth", "CRM Systems"]
    };
  }

  if (/(where.*contact|contact page|phone|email|address|reach out|send message)/i.test(q)) {
    return {
      reply: `You can get in touch with our engineering team anytime through our Contact page:`,
      smartLinks: [{ title: "Contact AKTech →", url: "/contact" }],
      suggestedPrompts: ["Contact Page", "View Services", "View Portfolio"]
    };
  }

  if (/(portfolio|projects|case studies|examples of work|work page|previous work)/i.test(q)) {
    return {
      reply: `You can explore our recent live projects and client case studies on our Portfolio page:`,
      smartLinks: [{ title: "View Projects →", url: "/portfolio" }],
      suggestedPrompts: ["View E-Commerce Projects", "View AkTech Project", "Contact AKTech"]
    };
  }

  return null;
}

function matchServiceFromQuery(q: string, path: string): ServiceKnowledge | null {
  if (q.includes("wordpress") || q.includes("shopify") || q.includes("web dev") || q.includes("website") || q.includes("web engineering") || (path.includes("web-development") && !q.includes("seo") && !q.includes("crm"))) {
    return SERVICES_KNOWLEDGE["web-development"];
  }
  if (q.includes("ai agent") || q.includes("chatbot") || q.includes("n8n") || q.includes("automation") || q.includes("bot") || (path.includes("ai-agent") && !q.includes("seo"))) {
    return SERVICES_KNOWLEDGE["ai-agent"];
  }
  if (q.includes("seo") || q.includes("ranking") || q.includes("search engine") || q.includes("organic") || path.includes("seo")) {
    return SERVICES_KNOWLEDGE["seo-digital-growth"];
  }
  if (q.includes("mobile") || q.includes("app") || q.includes("ios") || q.includes("android") || q.includes("react native") || path.includes("mobile-app-development")) {
    return SERVICES_KNOWLEDGE["mobile-development"];
  }
  if (q.includes("ui") || q.includes("ux") || q.includes("figma") || q.includes("prototype") || q.includes("design system") || path.includes("uiux-design")) {
    return SERVICES_KNOWLEDGE["uiux-design"];
  }
  if (q.includes("crm") || q.includes("sales pipeline") || q.includes("lead tracking") || path.includes("crm-business-systems")) {
    return SERVICES_KNOWLEDGE["crm-business-systems"];
  }
  if (q.includes("erp") || q.includes("inventory system") || q.includes("warehouse") || path.includes("erp-systems")) {
    return SERVICES_KNOWLEDGE["erp-systems"];
  }
  return null;
}

function buildServiceResponse(service: ServiceKnowledge): AIResponsePayload {
  return {
    reply: `${service.summary}\n\nKey Highlights:\n• ${service.whatWeProvide[0]}\n• ${service.whatWeProvide[1]}\n• ${service.whatWeProvide[2]}\n\nYou can explore full details, features, and process here:`,
    smartLinks: [{ title: `View ${service.name} →`, url: service.url }],
    suggestedPrompts: [`Explore ${service.name}`, "View Projects", "Contact AKTech"]
  };
}

function isPortfolioQuery(q: string): boolean {
  return /(portfolio|project|case study|built|built an ecommerce|built a school|built a website|examples|past work|client work)/i.test(q);
}

function buildPortfolioResponse(q: string): AIResponsePayload {
  let projects = PROJECTS_KNOWLEDGE;

  if (q.includes("ecommerce") || q.includes("store")) {
    projects = PROJECTS_KNOWLEDGE.filter((p) => p.category.toLowerCase().includes("e-commerce") || p.industry.toLowerCase().includes("retail"));
  } else if (q.includes("school") || q.includes("education")) {
    projects = PROJECTS_KNOWLEDGE.filter((p) => p.industry.toLowerCase().includes("education"));
  }

  const projSummary = projects.slice(0, 3).map((p) => `• ${p.name} (${p.category}): ${p.tagline}`).join("\n");

  return {
    reply: `Here are a few real client projects engineered by AKTech:\n\n${projSummary}\n\nYou can check out all our case studies and live work here:`,
    smartLinks: [{ title: "View Projects →", url: "/portfolio" }],
    projectHighlights: projects.slice(0, 2),
    suggestedPrompts: ["Contact AKTech", "Explore Services"]
  };
}

function matchBusinessProblem(q: string): AIResponsePayload | null {
  for (const rule of PROBLEM_SOLVER_RECOMMENDATIONS) {
    if (rule.keywords.some((kw) => q.includes(kw))) {
      const service = SERVICES_KNOWLEDGE[rule.recommendedServiceId];
      if (service) {
        return {
          reply: `${rule.explanation}\n\nAKTech provides custom solutions designed specifically for your operational workflow so your team doesn't have to deal with manual friction.\n\nTake a look at our service details:`,
          smartLinks: [{ title: `Explore ${service.name} →`, url: service.url }],
          suggestedPrompts: [`Explore ${service.name}`, "Contact AKTech"]
        };
      }
    }
  }
  return null;
}

function isTechStackQuery(q: string): boolean {
  return /(tech stack|technologies|what code|nextjs|react|node|wordpress|shopify|python|n8n|stack|framework)/i.test(q);
}

function isOutofBoundsQuery(q: string): boolean {
  return /(weather|recipe|politics|crypto prediction|sports score|movie recommendation|who won)/i.test(q);
}
