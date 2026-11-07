export type JobStatus = "draft" | "open" | "closed";

export type JobListing = {
  slug: string;
  title: string;
  department: string;
  status: JobStatus;
  location?: string;
  workMode?: string;
  employmentType?: string;
  experience?: string;
  deadline?: string;
  summary: string;
  responsibilities: string[];
  requiredQualifications: string[];
  preferredQualifications: string[];
  skills: string[];
};

export const jobs: JobListing[] = [
  {
    slug: "cold-calling-executive",
    title: "Cold Calling Executive",
    department: "Sales & Business Development",
    status: "open",
    location: "Karachi, Pakistan",
    workMode: "On-site",
    employmentType: "Full-time",
    experience: "Professional communication experience preferred; exact years to be confirmed",
    summary:
      "AKTECH is hiring a Cold Calling Executive to run professional outbound conversations, qualify interest in our services, and schedule follow-up meetings. Compensation and work arrangements are discussed privately — they are not published here.",
    responsibilities: [
      "Identify potential business clients relevant to AKTECH services",
      "Conduct professional outbound calls",
      "Qualify leads against agreed criteria",
      "Communicate AKTECH services accurately without inventing pricing",
      "Schedule meetings for the delivery team",
      "Keep CRM records current after each conversation",
    ],
    requiredQualifications: [
      "Clear spoken communication in a professional setting",
      "Comfort with outbound calling and structured follow-up",
      "Willingness to work from a CRM and written talking points",
    ],
    preferredQualifications: [
      "Prior lead generation or appointment-setting experience",
      "Familiarity with software, websites or digital services as a product",
    ],
    skills: ["Professional communication", "Lead generation", "Outbound calling", "Client qualification", "CRM usage", "Appointment scheduling"],
  },
  {
    slug: "full-stack-software-developer",
    title: "Full Stack Software Developer",
    department: "Engineering",
    status: "open",
    location: "Karachi, Pakistan",
    workMode: "On-site",
    employmentType: "Full-time",
    experience: "To be confirmed during hiring",
    summary:
      "Build and maintain web applications across the frontend and backend with the AKTECH stack. You will work on client products and internal tools. Seniority, compensation and work mode are confirmed in the hiring process — not on this page.",
    responsibilities: [
      "Implement interfaces and APIs in React, Next.js, Node.js and TypeScript",
      "Design and consume REST APIs",
      "Work with MongoDB or PostgreSQL as specified by the project",
      "Add authentication and role-aware access where the scope requires it",
      "Keep Git history reviewable and document what you ship",
      "Test responsive behaviour before calling a feature done",
    ],
    requiredQualifications: [
      "Working knowledge of React.js and Next.js",
      "Working knowledge of Node.js and REST APIs",
      "Comfort with Git in a team setting",
    ],
    preferredQualifications: [
      "TypeScript in production code",
      "Experience with MongoDB or PostgreSQL",
      "Familiarity with authentication flows",
    ],
    skills: ["React.js", "Next.js", "Node.js", "TypeScript", "REST APIs", "MongoDB/PostgreSQL", "Authentication", "Git", "Responsive UI development"],
  },
  {
    slug: "motion-graphics-designer",
    title: "Motion Graphics Designer",
    department: "Creative",
    status: "open",
    location: "Karachi, Pakistan",
    workMode: "On-site",
    employmentType: "Full-time",
    experience: "To be confirmed during hiring",
    summary:
      "Create motion graphics and edited video that support AKTECH products, presentations and digital campaigns. Employment terms are confirmed during hiring.",
    responsibilities: [
      "Design motion graphics in After Effects",
      "Edit video in Premiere Pro",
      "Prepare social and web-ready creatives",
      "Support visual storytelling for product and brand sequences",
      "Work from briefs and brand constraints without inventing off-brand claims",
    ],
    requiredQualifications: [
      "Demonstrable After Effects and Premiere Pro work",
      "A portfolio or reel we can review",
    ],
    preferredQualifications: [
      "Experience with social formats and short-form edits",
      "Comfort collaborating with UI designers and engineers",
    ],
    skills: ["Adobe After Effects", "Premiere Pro", "Motion design", "Video editing", "Social media creatives", "Visual storytelling"],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Product Design",
    status: "open",
    location: "Karachi, Pakistan",
    workMode: "On-site",
    employmentType: "Full-time",
    experience: "To be confirmed during hiring",
    summary:
      "Design user journeys, interfaces and systems for websites and products AKTECH engineers. Compensation, location and work mode are confirmed during hiring.",
    responsibilities: [
      "Produce wireframes and high-fidelity UI in Figma",
      "Prototype key flows for review",
      "Contribute to design systems and responsive layouts",
      "Ground decisions in user-centred principles, not decoration",
      "Hand work to engineering with enough structure to implement",
    ],
    requiredQualifications: [
      "A Figma portfolio showing real interface work",
      "Evidence of wireframing and prototyping",
    ],
    preferredQualifications: [
      "Design-system experience",
      "Comfort working with Next.js / React implementation constraints",
    ],
    skills: ["Figma", "Wireframing", "Prototyping", "Design systems", "Responsive interfaces", "UX principles"],
  },
];

export function getJob(slug: string) {
  return jobs.find((job) => job.slug === slug);
}

export function openJobs() {
  return jobs.filter((job) => job.status === "open");
}
