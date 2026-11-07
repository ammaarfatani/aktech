"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Building2,
  ChevronDown,
  Globe,
  LayoutGrid,
  MapPin,
  Menu,
  Palette,
  Search,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";

type MenuId = "services" | "solutions" | "work" | "products" | "company" | "resources";

const SERVICES = [
  { label: "Web Development", href: "/services/web-development", hint: "Sites, apps and stores", Icon: Globe },
  { label: "Mobile Applications", href: "/services/mobile-app-development", hint: "iOS, Android, React Native", Icon: Smartphone },
  { label: "AI Agents & Automation", href: "/services/ai-agent", hint: "Workflows and assistants", Icon: Bot },
  { label: "CRM & Business Systems", href: "/services/crm-business-systems", hint: "Sales and operations tools", Icon: LayoutGrid },
  { label: "UI/UX Design", href: "/services/uiux-design", hint: "Interfaces and systems", Icon: Palette },
  { label: "SEO & Digital Growth", href: "/services/seo", hint: "Technical and local SEO", Icon: Search },
];

const WORK = [
  { label: "Selected Work", href: "/work", hint: "Live sites and products" },
  { label: "Case Studies", href: "/case-studies", hint: "How the work was built" },
  { label: "Portfolio", href: "/portfolio", hint: "Visual collection" },
  { label: "Clients", href: "/clients", hint: "How we collaborate" },
];

const COMPANY = [
  { label: "About", href: "/about", hint: "Who we are", Icon: Building2 },
  { label: "Our Process", href: "/our-process", hint: "Idea to launch", Icon: Sparkles },
  { label: "Careers", href: "/careers", hint: "Open roles in Karachi", Icon: Briefcase },
  { label: "Global Collaboration", href: "/locations", hint: "Work with us from anywhere", Icon: MapPin },
  { label: "Contact", href: "/contact", hint: "Start a project" },
];

const RESOURCES = [
  { label: "Insights", href: "/insights", hint: "Studio writing" },
  { label: "Project Estimator", href: "/project-estimator", hint: "Scope a brief" },
  { label: "Book a Consultation", href: "/book-consultation", hint: "Request a conversation" },
  { label: "FAQs", href: "/faq", hint: "Common questions" },
];

const NAV: { name: string; href: string; menu?: MenuId }[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", menu: "services" },
  { name: "Solutions", href: "/solutions", menu: "solutions" },
  { name: "Our Work", href: "/work", menu: "work" },
  { name: "Products", href: "/products", menu: "products" },
  { name: "Company", href: "/about", menu: "company" },
  { name: "Resources", href: "/insights", menu: "resources" },
];

const INTRO: Record<MenuId, { label: string; title: string; body: string; cta: string; href: string }> = {
  services: {
    label: "What we do",
    title: "Build the right system.",
    body: "Web, mobile, AI, CRM and design — scoped to how your team actually works.",
    cta: "All services",
    href: "/services",
  },
  solutions: {
    label: "Solutions",
    title: "Problems, not product names.",
    body: "CRM, schools, restaurants, commerce, SaaS and analytics — mapped to operations.",
    cta: "All solutions",
    href: "/solutions",
  },
  work: {
    label: "Our work",
    title: "Inspect the product.",
    body: "Real websites, stores and systems. No invented case-study metrics.",
    cta: "View work",
    href: "/work",
  },
  products: {
    label: "Products",
    title: "Software we are building.",
    body: "Acadivo, Restro ERP and Fitivo remain Coming Soon until a public launch is confirmed.",
    cta: "Product ecosystem",
    href: "/products",
  },
  company: {
    label: "Company",
    title: "A global digital agency.",
    body: "Engineering, design and hiring — with remote collaboration for businesses worldwide.",
    cta: "About AKTECH",
    href: "/about",
  },
  resources: {
    label: "Resources",
    title: "Plan the next conversation.",
    body: "Insights, a project estimator, consultation requests and FAQs.",
    cta: "Read insights",
    href: "/insights",
  },
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();
  const isHome = pathname === "/";
  const solid = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const show = useCallback((id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
  }, []);

  const hide = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  }, []);

  function active(href: string, menu?: MenuId) {
    if (href === "/") return pathname === "/";
    if (pathname === href || pathname.startsWith(`${href}/`)) return true;
    if (menu === "company") return ["/about", "/our-process", "/careers", "/locations", "/contact"].some((p) => pathname.startsWith(p));
    if (menu === "resources") return ["/insights", "/project-estimator", "/book-consultation", "/faq"].some((p) => pathname.startsWith(p));
    if (menu === "work") return ["/work", "/case-studies", "/portfolio", "/clients"].some((p) => pathname.startsWith(p));
    return false;
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-3 pt-3 sm:px-5">
        <div className="pointer-events-auto flex w-full max-w-[1280px] flex-col items-center overflow-visible" onMouseLeave={hide}>
        <div
          className={cn(
            "relative flex h-16 w-full items-center justify-between rounded-full px-4 sm:px-6",
            solid ? "border border-black/8 bg-white/96 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl" : "bg-transparent"
          )}
        >
          <Link href="/" className="relative z-10 flex items-center gap-2.5" onClick={() => setOpenMenu(null)}>
            <span className={cn("relative h-8 w-8", !solid && "rounded-full bg-white p-1")}>
              <Image src="/logo.png" alt="AKTECH" fill className="object-contain" priority />
            </span>
            <span className={cn("hidden font-heading text-lg font-bold tracking-tight sm:inline", solid ? "text-[#111111]" : "text-white")}>
              AKTECH
            </span>
          </Link>

          <nav className="hidden items-center xl:flex" aria-label="Primary">
            {NAV.map((item) => {
              const isOn = active(item.href, item.menu);
              if (!item.menu) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em]",
                      isOn ? "text-[#E0000B]" : solid ? "text-[#111111] hover:text-[#E0000B]" : "text-white/80 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              }
              return (
                <div key={item.name} onMouseEnter={() => show(item.menu!)} className="relative">
                  <button
                    type="button"
                    aria-expanded={openMenu === item.menu}
                    aria-haspopup="true"
                    aria-controls={`${menuId}-${item.menu}`}
                    onClick={() => setOpenMenu((prev) => (prev === item.menu ? null : item.menu!))}
                    onFocus={() => show(item.menu!)}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em]",
                      isOn || openMenu === item.menu
                        ? "text-[#E0000B]"
                        : solid
                          ? "text-[#111111] hover:text-[#E0000B]"
                          : "text-white/80 hover:text-white"
                    )}
                  >
                    {item.name}
                    <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", openMenu === item.menu && "rotate-180")} />
                  </button>
                </div>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-full bg-[#E0000B] px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white hover:bg-[#C00009] xl:inline-flex"
          >
            Let&apos;s Talk
          </Link>

          <button
            type="button"
            className={cn("rounded-full border p-2 xl:hidden", solid ? "border-black/10 text-[#111111]" : "border-white/25 text-white")}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

        </div>
          <AnimatePresence>
            {openMenu && (
              <motion.div
                id={`${menuId}-${openMenu}`}
                role="menu"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => show(openMenu)}
                className="relative z-[110] mt-2 hidden w-[min(680px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.12)] xl:block"
              >
                <CompactMenu id={openMenu} onNavigate={() => setOpenMenu(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] overflow-y-auto bg-[#111111] px-5 pb-16 pt-24 text-white xl:hidden"
          >
            <button type="button" className="absolute right-5 top-6 rounded-full border border-white/20 p-2" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <X className="h-4 w-4" />
            </button>
            <nav className="mx-auto flex max-w-md flex-col gap-2">
              <Link href="/" onClick={() => setMobileOpen(false)} className="py-3 font-heading text-3xl font-bold">
                Home
              </Link>
              {[
                { id: "services", label: "Services", href: "/services", items: SERVICES },
                { id: "solutions", label: "Solutions", href: "/solutions", items: solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}` })) },
                { id: "work", label: "Our Work", href: "/work", items: WORK },
                { id: "products", label: "Products", href: "/products", items: products.map((p) => ({ label: `${p.name} · Coming soon`, href: `/products/${p.slug}` })) },
                { id: "company", label: "Company", href: "/about", items: COMPANY },
                { id: "resources", label: "Resources", href: "/insights", items: RESOURCES },
              ].map((group) => (
                <div key={group.id} className="border-b border-white/10 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <Link href={group.href} onClick={() => setMobileOpen(false)} className="py-2 font-heading text-3xl font-bold">
                      {group.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={mobileGroup === group.id}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
                      onClick={() => setMobileGroup((v) => (v === group.id ? null : group.id))}
                    >
                      <ChevronDown className={cn("h-5 w-5", mobileGroup === group.id && "rotate-180 text-[#E0000B]")} />
                    </button>
                  </div>
                  {mobileGroup === group.id && (
                    <ul className="mb-3 space-y-1 pl-1">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} onClick={() => setMobileOpen(false)} className="block py-2.5 text-base text-white/70">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#E0000B] text-xs font-bold uppercase tracking-[0.2em]"
              >
                Let&apos;s Talk
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CompactMenu({ id, onNavigate }: { id: MenuId; onNavigate: () => void }) {
  const intro = INTRO[id];
  const links =
    id === "services"
      ? SERVICES
      : id === "solutions"
        ? solutions.map((item) => ({ label: item.title, href: `/solutions/${item.slug}`, hint: item.summary }))
        : id === "work"
          ? WORK
          : id === "products"
            ? products.map((item) => ({ label: item.name, href: `/products/${item.slug}`, hint: "Coming soon" }))
            : id === "company"
              ? COMPANY
              : RESOURCES;

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 border-r border-black/6 bg-[#F8F8F6] p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E0000B]">{intro.label}</p>
        <p className="mt-2 font-heading text-lg font-bold leading-snug">{intro.title}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[#4B5563]">{intro.body}</p>
        <Link href={intro.href} onClick={onNavigate} className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#111111] hover:text-[#E0000B]">
          {intro.cta} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <ul className={cn("col-span-8 p-2", id === "solutions" || id === "services" ? "grid grid-cols-2" : "grid grid-cols-1")}>
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="group flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-[#F8F8F6]"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/15 group-hover:bg-[#E0000B]" />
              <span>
                <span className="block text-sm font-semibold text-[#111111] group-hover:text-[#E0000B]">{item.label}</span>
                {"hint" in item && item.hint ? <span className="mt-0.5 line-clamp-1 block text-xs text-[#6B7280]">{item.hint}</span> : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
