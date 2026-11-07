export type Product = {
  name: string; slug: string; category: string; headline: string; description: string;
  audience: string; purpose: string; status: "coming-soon"; workingName?: boolean;
  features: { name: string; description: string; planned?: boolean }[];
  ai: { implemented: boolean; description: string };
  screenshots: { src: string; alt: string; caption: string }[];
  benefits: string[]; officialWebsite: string | null;
};

// Content evidence: D:/CRM/school-crm/src and D:/CRM/resturant(crm)/client/src + server/routes.
// Fitivo's implementation was not available during this review; its roadmap is explicitly planned.
// Official product domains have not been confirmed for public launch.
export const products: Product[] = [
  {
    name: "Acadivo", slug: "acadivo", category: "School Management / School ERP",
    headline: "A connected workspace for your school.", status: "coming-soon",
    description: "Acadivo brings school administration, academics, attendance and finance into one centralized platform, with dedicated portals for the people who keep a school running.",
    audience: "School administrators, teachers, reception teams, finance staff, examination teams and parents.",
    purpose: "We built Acadivo to connect everyday school workflows and give each team access to the records and tools relevant to its role.",
    features: [
      { name: "Students & parents", description: "Manage student records and parent accounts, with a dedicated parent portal." },
      { name: "Academics", description: "Organize sessions, classes, sections, subjects and timetables." },
      { name: "Attendance", description: "Record student, teacher and staff attendance and review attendance reports." },
      { name: "Examinations", description: "Manage exams, marks, published results, report cards and certificates." },
      { name: "Finance & payroll", description: "Work with fee structures, challans, collections, receipts, expenses and payroll." },
      { name: "Reception & admissions", description: "Manage admissions, visitors, appointments and reception requests." },
      { name: "Role-based portals", description: "Dedicated workspaces and permissions for administration, teachers, parents and operational staff." },
      { name: "Communication & reports", description: "Share announcements and notifications, and review school reports and dashboards." },
    ],
    ai: { implemented: true, description: "Acadivo includes an AI assistant for questions about school reports. It reads only the reports allowed by the user's role and permissions. AI availability depends on provider configuration; answers should be checked against source records." },
    screenshots: [
      { src: "/products/acadivo/school-admin.jpg", alt: "Acadivo school administrator workspace", caption: "School administration workspace · Development preview" },
      { src: "/products/acadivo/teacher.jpg", alt: "Acadivo teacher portal", caption: "Teacher portal · Development preview" },
      { src: "/products/acadivo/finance.jpg", alt: "Acadivo finance workspace", caption: "Finance workspace · Development preview" },
    ],
    benefits: ["Keep school records connected across teams.", "Give staff a workspace suited to their responsibilities.", "Bring academic and financial workflows into one place."], officialWebsite: null,
  },
  {
    name: "Restro ERP", slug: "restro-erp", category: "Restaurant Management / Restaurant ERP",
    headline: "From the first order to the daily report.", status: "coming-soon",
    description: "Restro ERP centralizes restaurant operations with POS, order management, menu tools, tables, inventory and reporting in one operational workspace.",
    audience: "Restaurant owners, managers, cashiers, kitchen teams and staff working across branches.",
    purpose: "We built Restro ERP to connect the front counter, kitchen and management team around the restaurant's daily work.",
    features: [
      { name: "POS & orders", description: "Build orders from the menu, choose payment methods and update order status." },
      { name: "Menu management", description: "Manage products and categories used by the restaurant's POS." },
      { name: "Tables & reservations", description: "Manage table records and reservations from dedicated workspaces." },
      { name: "Kitchen display", description: "Give kitchen staff a dedicated view of restaurant orders." },
      { name: "Inventory & purchasing", description: "Manage inventory, suppliers and purchase orders." },
      { name: "Staff & permissions", description: "Manage staff, attendance, roles and permission-controlled access." },
      { name: "Branches & customers", description: "Maintain branch information and customer records." },
      { name: "Business reports", description: "Review dashboard metrics, sales charts, orders and top products." },
    ],
    ai: { implemented: false, description: "AI-powered assistance is planned for Restro ERP. Specific assistant capabilities will be shared as development progresses; they are not available in the current preview." },
    screenshots: [{ src: "/projects/resto-crm.png", alt: "Restro ERP restaurant management interface", caption: "Restaurant management interface · Existing project preview" }],
    benefits: ["Connect ordering and kitchen workflows.", "Organize restaurant records across operational teams.", "Review daily activity from a centralized dashboard."], officialWebsite: null,
  },
  {
    name: "Fitivo", slug: "fitivo", category: "Gym Management Software", workingName: true,
    headline: "A new workspace for the business of fitness.", status: "coming-soon",
    description: "Fitivo is AKTECH's upcoming gym management platform, being developed to help gyms organize their daily operations. Fitivo is a working name.",
    audience: "Gym owners, front-desk teams, trainers and membership administrators.",
    purpose: "Our goal is to bring the operational side of a gym into a focused workspace, so teams can spend more time supporting their members.",
    features: [
      { name: "Member records", description: "A planned workspace for member profiles and membership information.", planned: true },
      { name: "Memberships & packages", description: "Planned tools for organizing membership packages.", planned: true },
      { name: "Attendance", description: "Member attendance is part of the proposed product direction.", planned: true },
      { name: "Payments", description: "Payment tracking is planned for the gym management experience.", planned: true },
      { name: "Trainers & staff", description: "Planned tools to organize the gym's team.", planned: true },
      { name: "Dashboard & reports", description: "An operational overview is planned; details will be confirmed before launch.", planned: true },
    ],
    ai: { implemented: false, description: "AI-powered assistance is planned for Fitivo. The assistant's scope and availability will be confirmed as the product develops." },
    screenshots: [], benefits: ["Designed around the everyday needs of gym teams.", "Aiming to connect membership and operational records.", "Built with a focused, approachable product experience in mind."], officialWebsite: null,
  },
];
export function getProduct(slug: string) { return products.find(product => product.slug === slug); }
