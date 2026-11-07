export type ProcessStage = {
  number: string;
  stage: string;
  title: string;
  description: string;
  deliverables: string[];
  activities: string[];
};

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    stage: "Discover",
    title: "Understand the business before the interface",
    description:
      "We start by learning how the organisation works today: who the users are, which workflows matter, and what success would look like. Discovery is a working conversation, not a slide deck.",
    activities: [
      "Initial consultation",
      "Business analysis",
      "Requirements gathering",
      "Audience research",
      "Project goals",
    ],
    deliverables: [
      "Problem statement and success criteria",
      "Current-state workflow notes",
      "Audience and stakeholder map",
      "Open questions and constraints",
    ],
  },
  {
    number: "02",
    stage: "Strategize",
    title: "Turn findings into a buildable plan",
    description:
      "Once the problem is clear, we define the technical approach, the scope that can actually ship, and the sequence of milestones. Architecture decisions are made here so they do not appear as surprises mid-build.",
    activities: [
      "Technical planning",
      "Scope definition",
      "Solution architecture",
      "Roadmap",
      "Milestone planning",
    ],
    deliverables: [
      "Scoped feature set and out-of-scope list",
      "Recommended architecture",
      "Milestone plan with review points",
      "Risks, dependencies and assumptions",
    ],
  },
  {
    number: "03",
    stage: "Design",
    title: "Design the experience people will actually use",
    description:
      "We translate the plan into journeys, structure and interface. Design work is grounded in the workflows from discovery, not in generic templates.",
    activities: [
      "Wireframes",
      "UX journeys",
      "UI design",
      "Design systems",
      "Interactive prototypes",
    ],
    deliverables: [
      "Information architecture and key user journeys",
      "Wireframes for primary screens",
      "UI direction aligned with the AKTECH and client brand",
      "Prototype for review before engineering lock-in",
    ],
  },
  {
    number: "04",
    stage: "Develop",
    title: "Engineer a product that can be maintained",
    description:
      "Frontend, backend, data and integrations are built against the agreed scope. We favour clear interfaces, realistic content, and implementations that a team can operate after handover.",
    activities: [
      "Frontend engineering",
      "Backend engineering",
      "API integrations",
      "Database architecture",
      "Quality implementation",
    ],
    deliverables: [
      "Working application increments",
      "Documented APIs and data model where relevant",
      "Role-based access as specified",
      "Staging environment for review",
    ],
  },
  {
    number: "05",
    stage: "Test & Launch",
    title: "Prove it works, then put it in production",
    description:
      "Launch is a controlled event: functional checks, responsive review, security basics, and performance verification against the agreed environment. We do not treat go-live as the first time the product is tested.",
    activities: [
      "Functional testing",
      "Responsive QA",
      "Security checks",
      "Performance testing",
      "Production deployment",
    ],
    deliverables: [
      "QA notes and resolved blockers",
      "Production deployment on the agreed host",
      "Handover of access, content and operating notes",
      "Launch checklist completion",
    ],
  },
  {
    number: "06",
    stage: "Support & Evolve",
    title: "Keep the product useful after day one",
    description:
      "Software continues after launch. We can monitor, maintain and improve the product as the business changes — without pretending that every project includes unlimited support unless that is agreed.",
    activities: [
      "Maintenance",
      "Monitoring",
      "Improvements",
      "Performance optimization",
      "Future enhancements",
    ],
    deliverables: [
      "Agreed support window or retainer, if scoped",
      "Issue handling process",
      "Prioritised improvement backlog",
      "Performance and reliability follow-up",
    ],
  },
];
