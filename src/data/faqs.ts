export type FaqItem = {
  question: string;
  answer: string;
  category: string;
  relatedHref?: string;
  relatedLabel?: string;
};

export const FAQ_CATEGORIES = [
  "General Questions",
  "Website Development",
  "Custom Software",
  "AI & Automation",
  "Project Process",
  "Pricing & Payments",
  "Maintenance & Support",
  "Careers",
] as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: "General Questions",
    question: "What does AKTECH Digital Solutions do?",
    answer:
      "AKTECH is a global digital solutions agency. We design and build websites, custom software, mobile applications, CRM and operations systems, UI/UX, SEO foundations, and AI-assisted automation. Work is delivered through remote collaboration with businesses worldwide.",
    relatedHref: "/about",
    relatedLabel: "About AKTECH",
  },
  {
    category: "General Questions",
    question: "Do you work with international clients?",
    answer:
      "Yes. AKTECH collaborates remotely with businesses worldwide. Discovery, design reviews, development and delivery happen through digital meetings and shared tools. Timezone overlap is agreed at the start. We do not list additional offices.",
    relatedHref: "/locations",
    relatedLabel: "Global collaboration",
  },
  {
    category: "General Questions",
    question: "How do I start a project?",
    answer:
      "Use the contact form, book a consultation request, or complete the project estimator. Those submissions go to the same inquiry workflow. A conversation is not a signed contract until scope and commercial terms are agreed in writing.",
    relatedHref: "/contact",
    relatedLabel: "Contact",
  },
  {
    category: "Website Development",
    question: "Do you build custom websites or only templates?",
    answer:
      "We build custom websites when the brief needs original UI and engineering. We also work with WordPress and Shopify when an editable CMS or a store platform is the right fit. Platform choice is part of discovery, not a default.",
    relatedHref: "/services/web-development",
    relatedLabel: "Web development",
  },
  {
    category: "Website Development",
    question: "Can you work with an existing site?",
    answer:
      "Yes, when it is practical to extend or rebuild parts of what you already have. We review the current stack, content and hosting before recommending a rebuild versus an incremental change.",
    relatedHref: "/services/web-development",
    relatedLabel: "Web development",
  },
  {
    category: "Custom Software",
    question: "Do you build CRM, ERP or internal tools?",
    answer:
      "Yes. CRM, ERP-style operations tools, dashboards and internal workflows are a core part of the practice. We map how the team actually works before choosing fields, roles and integrations.",
    relatedHref: "/services/crm-business-systems",
    relatedLabel: "CRM & business systems",
  },
  {
    category: "Custom Software",
    question: "Which technologies do you use?",
    answer:
      "Typical web work uses React, Next.js, Node.js and TypeScript, with databases such as PostgreSQL or MongoDB when the project needs them. Mobile work uses React Native or native platforms as agreed. We do not force one stack onto every brief.",
    relatedHref: "/solutions",
    relatedLabel: "Solutions",
  },
  {
    category: "AI & Automation",
    question: "Is the site chatbot a live language model?",
    answer:
      "The AKTECH AI Agent on this website is a rule-based assistant grounded in published site content. It is not presented as a hosted large language model. Separate client AI or automation work is scoped as a project.",
    relatedHref: "/services/ai-agent",
    relatedLabel: "AI & automation",
  },
  {
    category: "AI & Automation",
    question: "Can you automate WhatsApp, CRM or internal workflows?",
    answer:
      "We can design automation around tools you already use, including n8n-style workflows, when the process is clear and the integrations are available. Automation is scoped after we understand the steps a person currently performs.",
    relatedHref: "/services/ai-agent",
    relatedLabel: "AI & automation",
  },
  {
    category: "Project Process",
    question: "What does your process look like?",
    answer:
      "Discover, Strategize, Design, Develop, Test & Launch, then Support & Evolve. Each stage has activities and deliverables. Exact duration depends on the agreed scope, not on a one-size timeline.",
    relatedHref: "/our-process",
    relatedLabel: "Our process",
  },
  {
    category: "Project Process",
    question: "How do remote collaboration meetings work?",
    answer:
      "Discovery, reviews and milestone updates happen on video or written channels you already use. We share progress against the agreed plan. Timezones are handled explicitly on consultation requests.",
    relatedHref: "/locations",
    relatedLabel: "Global collaboration",
  },
  {
    category: "Pricing & Payments",
    question: "Do you publish fixed prices?",
    answer:
      "No public price list is published because scope differs by workflow, integrations and content. The project estimator collects requirements so we can prepare a tailored estimate. It does not generate a guaranteed price.",
    relatedHref: "/project-estimator",
    relatedLabel: "Project estimator",
  },
  {
    category: "Pricing & Payments",
    question: "What is your refund policy?",
    answer:
      "Refund, deposit and payment terms are written into the project agreement for that engagement. This FAQ does not invent a site-wide refund policy.",
  },
  {
    category: "Maintenance & Support",
    question: "Do you offer hosting and maintenance?",
    answer:
      "Ongoing hosting, patching, content updates or SEO retainers are scoped separately when you want them. There is no implied unlimited support after launch unless that work is in the agreement.",
    relatedHref: "/contact",
    relatedLabel: "Discuss support",
  },
  {
    category: "Careers",
    question: "Are you hiring?",
    answer:
      "Yes. Open roles in Karachi (full-time, on-site): Cold Calling Executive, Full Stack Software Developer, Motion Graphics Designer and UI/UX Designer. Apply via email from the role page and attach your CV.",
    relatedHref: "/careers",
    relatedLabel: "Careers",
  },
  {
    category: "Careers",
    question: "How do I apply?",
    answer:
      "Open the role and use Apply via Email. A message to hello@aktech.tech is prepared with labeled fields. Attach your CV before sending. Opening the email app does not send the application by itself.",
    relatedHref: "/careers",
    relatedLabel: "Open roles",
  },
];
