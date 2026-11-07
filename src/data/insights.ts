export type InsightArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  readingTime: string;
  status: "draft" | "published";
  ctaLabel: string;
  ctaHref: string;
  body: string[];
};

export const INSIGHT_CATEGORIES = [
  "AI & Automation",
  "Software Engineering",
  "Web Development",
  "Business Technology",
  "SaaS",
  "UI/UX Design",
  "Technical SEO",
];

export const insightArticles: InsightArticle[] = [
  {
    slug: "ai-automation-small-businesses",
    title: "How AI Automation Is Transforming Small Businesses",
    description: "A practical look at where automation helps small teams — and where a human process should stay in place.",
    category: "AI & Automation",
    tags: ["automation", "operations", "AI"],
    date: "2026-11-07",
    readingTime: "8 min",
    status: "published",
    ctaLabel: "Discuss automation",
    ctaHref: "/services/ai-agent",
    body: [
      "## Why small teams feel the cost of manual work first",
      "Small businesses rarely fail because they lack software logos. They stall because the same person is answering inquiries, updating a spreadsheet, chasing a payment, and remembering to follow up. Automation is useful when it removes a repeated step that already has a clear rule.",
      "Treat AI as a way to execute an agreed workflow, not as a substitute for deciding what the workflow is. If nobody can describe when a lead is qualified, no chatbot will invent a reliable definition.",
      "## Start with a map, not a model",
      "Write the current path: inquiry arrives, someone reads it, someone replies, someone records it. Mark which steps are identical every time. Those are candidates for automation. Steps that need judgement — pricing exceptions, custom scope, complaints — should stay with a person.",
      "AKTECH typically connects website forms, WhatsApp, CRM records and internal notifications only where that connection is already part of how the team works. See our [AI automation service](/services/ai-agent) and [CRM solutions](/solutions/crm-sales-management).",
      "## Practical examples without invented results",
      "A restaurant that copies reservations from WhatsApp into a notebook can use a structured intake message and a shared board. A school that retypes admissions emails can capture the same fields on a form. A sales team that loses follow-ups can assign an owner the moment a form is submitted.",
      "None of those examples require a public claim about revenue lift. They require a source of truth and a next action.",
      "## Takeaways",
      "Automate repeated, well-defined steps. Keep judgement with people. Put records in one place before you add a model. If you want help mapping that path, [request a consultation](/book-consultation) or use the [project estimator](/project-estimator).",
    ],
  },
  {
    slug: "custom-software-vs-off-the-shelf",
    title: "Custom Software vs Off-the-Shelf Solutions",
    description: "How to choose between buying a product and commissioning software that matches how you actually operate.",
    category: "Software Engineering",
    tags: ["custom software", "SaaS", "operations"],
    date: "2026-11-07",
    readingTime: "9 min",
    status: "published",
    ctaLabel: "Explore custom systems",
    ctaHref: "/solutions",
    body: [
      "## The real question is not “custom or cheap”",
      "Off-the-shelf tools win when your process already matches the product: invoicing, email, standard ecommerce checkout. Custom software wins when the process is the business — unique inventory rules, school admissions, restaurant floor operations, or a sales pipeline that does not look like a generic CRM demo.",
      "## What you actually buy",
      "A product subscription buys someone else’s roadmap. You get updates and a support channel, and you accept their data model. A custom system buys a fit to your workflow, plus the responsibility to maintain it. Neither is automatically more professional.",
      "## A decision sequence",
      "List the five actions staff take every day. If a reputable product already covers those actions with acceptable workarounds, start there. If staff would have to keep a parallel spreadsheet to make the product usable, you are paying twice.",
      "AKTECH builds custom CRM, ERP-style operations tools, SaaS products and websites. We also implement WordPress and Shopify when those platforms are the right container. Read [CRM solutions](/solutions/crm-sales-management) and [ERP operations](/solutions/erp-business-operations).",
      "## Takeaways",
      "Buy the product when the workflow is common. Commission software when the workflow is the differentiator. Do not start a custom build to copy a feature you have not tried to configure first. [Contact AKTECH](/contact) if you need a working conversation about that choice.",
    ],
  },
  {
    slug: "why-businesses-need-professional-websites",
    title: "Why Modern Businesses Need a Professional Website",
    description: "A website is still the place customers check whether you are real, current and worth a conversation.",
    category: "Web Development",
    tags: ["websites", "trust", "content"],
    date: "2026-11-07",
    readingTime: "7 min",
    status: "published",
    ctaLabel: "Web development",
    ctaHref: "/services/web-development",
    body: [
      "## What a website is for now",
      "Social profiles move. Chat threads disappear. A website is the durable explanation of who you are, what you offer, and how to start work. It does not need to look like a template marketplace to do that job.",
      "## Trust is a composition problem",
      "Visitors decide quickly whether copy, photography, contact details and performance feel consistent. Broken images, empty blog modules and unverifiable claims all say the same thing: this organisation is not finished. AKTECH’s own Insights section stays empty until articles are actually written — the same rule should apply to any client site.",
      "## Practical structure",
      "Every commercial site needs a clear offer, proof that is allowed to be shown, a way to contact a human, and pages that search engines can understand. Extra animation does not replace those four. See [web development](/services/web-development) and [technical SEO](/services/seo).",
      "## Takeaways",
      "Treat the website as an operating document, not a poster. Keep claims verifiable. Make contact easy on a phone. If you are planning a rebuild, [scope it in the estimator](/project-estimator).",
    ],
  },
  {
    slug: "nextjs-for-modern-business-websites",
    title: "Next.js for Modern Business Websites",
    description: "When Next.js is a good fit for a marketing site or a product, and when a CMS platform is simpler.",
    category: "Web Development",
    tags: ["Next.js", "React", "engineering"],
    date: "2026-11-07",
    readingTime: "8 min",
    status: "published",
    ctaLabel: "Talk about a Next.js build",
    ctaHref: "/contact",
    body: [
      "## Why teams choose Next.js",
      "Next.js is a React framework for sites and applications that need routing, server rendering, and APIs in one codebase. AKTECH uses it for high-control marketing sites and for products where the interface and the business logic live together.",
      "## When it is the right tool",
      "Choose Next.js when you need custom UI, authenticated areas, or integrations that a theme cannot express cleanly. Choose WordPress or Shopify when editors must change pages daily without a developer, or when checkout and apps already exist in that ecosystem.",
      "## What “modern” should mean",
      "Modern is not a version number. It is a site that loads on a phone, has unique metadata, does not invent metrics, and can be deployed through a process the team understands. This website itself runs on Next.js App Router and is hosted on Vercel — that is an architecture choice, not a promise that every client must copy it.",
      "Related reading: [custom vs off-the-shelf](/insights/custom-software-vs-off-the-shelf) and [technical SEO](/insights/technical-seo-modern-websites).",
      "## Takeaways",
      "Match the framework to editing needs and product complexity. Do not migrate to Next.js only because it is fashionable. [Book a consultation](/book-consultation) if you are choosing a stack for a real brief.",
    ],
  },
  {
    slug: "crm-systems-improve-sales-operations",
    title: "CRM Systems: How They Improve Sales Operations",
    description: "A CRM helps only when it records ownership, next actions and a pipeline that matches how you sell.",
    category: "Business Technology",
    tags: ["CRM", "sales", "operations"],
    date: "2026-11-07",
    readingTime: "8 min",
    status: "published",
    ctaLabel: "CRM solutions",
    ctaHref: "/solutions/crm-sales-management",
    body: [
      "## Spreadsheets are not the enemy",
      "Spreadsheets fail when two people edit different copies, when WhatsApp is the real CRM, and when nobody owns the next call. A CRM is a shared record of conversations, not a dashboard for its own sake.",
      "## What to model first",
      "Intake, qualification, owner, stage, last activity, next action. If those six fields are honest, reporting can wait. If they are not, no chart will fix the process.",
      "AKTECH designs CRM workflows around how the team sells, including website and WhatsApp intake where those channels are already used. Read [CRM & sales management](/solutions/crm-sales-management) and [our process](/our-process).",
      "## Takeaways",
      "Give every inquiry an owner. Write stages that staff recognise. Connect forms only after the record shape is agreed. Use the [estimator](/project-estimator) if you are scoping a CRM.",
    ],
  },
  {
    slug: "future-of-saas-growing-businesses",
    title: "The Future of SaaS for Growing Businesses",
    description: "SaaS is still a product you operate: onboarding, permissions, billing and support — not just a login screen.",
    category: "SaaS",
    tags: ["SaaS", "product", "growth"],
    date: "2026-11-07",
    readingTime: "8 min",
    status: "published",
    ctaLabel: "SaaS product development",
    ctaHref: "/solutions/saas-product-development",
    body: [
      "## Growth is an operations problem",
      "A SaaS product that cannot explain itself, cannot invite a teammate, or cannot tell an admin what happened last week will stall regardless of visual polish. Growing businesses feel that gap when the founder is still the only person who understands the tool.",
      "## What to build after the first workflow",
      "Permissions, audit-friendly history, a way to export data, and a support path. Multi-tenant architecture is a later decision, not a slogan. AKTECH’s [SaaS solution page](/solutions/saas-product-development) describes how we approach product work without inventing launch metrics.",
      "## Takeaways",
      "Ship the workflow customers already pay you to do. Add administration before you add a marketplace. [Contact us](/contact) if you are planning a product, not a pitch deck.",
    ],
  },
  {
    slug: "choose-the-right-technology-stack",
    title: "How to Choose the Right Technology Stack",
    description: "A stack is a set of constraints. Choose it from the workflow, the editors, and who will maintain it.",
    category: "Software Engineering",
    tags: ["architecture", "Next.js", "CMS"],
    date: "2026-11-07",
    readingTime: "9 min",
    status: "published",
    ctaLabel: "Discuss a stack",
    ctaHref: "/contact",
    body: [
      "## Start from operators",
      "Who will change content next month? Who will deploy? Who holds the customer data? Those answers eliminate more options than a trend list. A marketing site that must be edited daily may belong on WordPress. A product with custom roles may belong in Next.js and a proper database.",
      "## Constraints that matter",
      "Hosting (this studio deploys client and studio sites on Vercel when that matches the stack), payment providers, WhatsApp or email channels, and whether you need an app store presence. See [Next.js for business sites](/insights/nextjs-for-modern-business-websites) and [custom vs packaged software](/insights/custom-software-vs-off-the-shelf).",
      "## Takeaways",
      "Write the operating constraints first. Pick the smallest stack that can honour them. Avoid collecting frameworks as a résumé. [Our process](/our-process) is how we make that choice with you.",
    ],
  },
  {
    slug: "why-ui-ux-matters-for-business-growth",
    title: "Why UI/UX Design Matters for Business Growth",
    description: "Interface design is how people complete a task. Growth follows tasks that can be finished without help.",
    category: "UI/UX Design",
    tags: ["UI/UX", "product design", "conversion"],
    date: "2026-11-07",
    readingTime: "7 min",
    status: "published",
    ctaLabel: "UI/UX design",
    ctaHref: "/services/uiux-design",
    body: [
      "## Design is not decoration",
      "A form that wraps badly on a 375px screen, a CTA hidden under a chat widget, or a job board of identical cards all cost real conversations. UI/UX work is the job of making the next step obvious and possible.",
      "## What we actually design",
      "Information hierarchy, spacing, states (empty, error, success), and the path from landing page to inquiry. AKTECH’s [UI/UX service](/services/uiux-design) covers wireframes, prototypes and design systems when the product needs them — not stock illustrations that could belong to any company.",
      "## Takeaways",
      "Test the path on a phone. Do not cover primary buttons with floating widgets. Write empty states that tell the truth. [See careers](/careers) if you want to join the design team; [contact](/contact) if you need the work done.",
    ],
  },
  {
    slug: "technical-seo-modern-websites",
    title: "Technical SEO Best Practices for Modern Websites",
    description: "Search engines need crawlable URLs, unique metadata, honest content and images that actually load.",
    category: "Technical SEO",
    tags: ["SEO", "metadata", "performance"],
    date: "2026-11-07",
    readingTime: "9 min",
    status: "published",
    ctaLabel: "SEO & digital growth",
    ctaHref: "/services/seo",
    body: [
      "## Technical SEO is housekeeping",
      "Canonical URLs, a sitemap, robots rules, Open Graph tags, and unique titles are the baseline. Preview deployments should stay noindex. Thin pages that repeat the same paragraph in fifty city names do not become strategy by being numerous.",
      "## Content that can rank without being fake",
      "Write pages that answer a real query. Link internally to services, case studies and articles that exist. Do not fabricate statistics. AKTECH publishes Insights only when an article is marked published in the Git content model.",
      "Related: [why professional websites matter](/insights/why-businesses-need-professional-websites) and [our SEO service](/services/seo).",
      "## Takeaways",
      "Make every indexable URL unique. Keep drafts out of the sitemap. Fix broken images before you buy more content. Use the [estimator](/project-estimator) if SEO work is part of a rebuild.",
    ],
  },
  {
    slug: "business-automation-reduces-manual-work",
    title: "How Business Automation Reduces Manual Work",
    description: "Automation pays off when you delete a copy-paste step, not when you add another dashboard nobody opens.",
    category: "AI & Automation",
    tags: ["automation", "operations", "workflows"],
    date: "2026-11-07",
    readingTime: "8 min",
    status: "published",
    ctaLabel: "Automation services",
    ctaHref: "/services/ai-agent",
    body: [
      "## Find the copy-paste",
      "Manual work hides in retyping a form into a sheet, forwarding the same email, or asking “did anyone reply?” Automation should remove that duplication. If the step is irregular, document it first.",
      "## A simple sequence",
      "Capture once. Store once. Notify the owner. Record the outcome. That sequence covers most small-business automation without a large language model. Models help later for classifying messy text — after the record exists.",
      "See [AI automation](/services/ai-agent), [how AI helps small businesses](/insights/ai-automation-small-businesses), and [FAQ](/faq).",
      "## Takeaways",
      "Delete duplicate entry before you add AI. Keep a human for exceptions. [Request a consultation](/book-consultation) if you want that sequence designed around tools you already use.",
    ],
  },
];

export function publishedInsights() {
  return insightArticles.filter((article) => article.status === "published");
}

export function getInsight(slug: string) {
  return publishedInsights().find((article) => article.slug === slug);
}

export function insightCover(category: string) {
  if (category.includes("AI") || category.includes("Automation")) return "/insights/ai.svg";
  if (category.includes("UI") || category.includes("Design")) return "/insights/design.svg";
  if (category.includes("CRM") || category.includes("Business") || category.includes("SaaS")) return "/insights/crm.svg";
  if (category.includes("SEO") || category.includes("Web")) return "/insights/web.svg";
  return "/insights/code.svg";
}

export function relatedInsights(slug: string, category: string) {
  return publishedInsights()
    .filter((article) => article.slug !== slug && article.category === category)
    .slice(0, 3);
}
