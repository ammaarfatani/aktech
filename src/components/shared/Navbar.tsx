"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Globe,
  Bot,
  Smartphone,
  LayoutGrid,
  Palette,
  Search,
  ChevronDown,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

/* ─────────────────────────────────────────────
   EXACT AKTECH SERVICE CATEGORIES DATA
   ───────────────────────────────────────────── */

const SERVICE_CATEGORIES = [
  {
    title: "AI & Automation",
    icon: Bot,
    items: [
      "AI Agents",
      "AI Chatbots",
      "Workflow Automation",
      "Business Automation",
      "n8n Automation",
      "AI Integrations",
    ],
  },
  {
    title: "Web Development",
    icon: Globe,
    items: [
      "Custom Websites",
      "Web Applications",
      "SaaS Development",
      "E-Commerce Development",
      "WordPress Development",
      "Shopify Development",
      "API Development & Integration",
    ],
  },
  {
    title: "Mobile App Development",
    icon: Smartphone,
    items: [
      "Android Apps",
      "iOS Apps",
      "Cross-Platform Apps",
      "React Native Development",
    ],
  },
  {
    title: "CRM / Business Systems",
    icon: LayoutGrid,
    items: [
      "CRM Systems",
      "Inventory Systems",
      "POS Systems",
      "ERP Solutions",
      "Admin Dashboards",
      "Business Management Systems",
    ],
  },
  {
    title: "UI/UX & Design",
    icon: Palette,
    items: [
      "UI/UX Design",
      "Web Design",
      "Product Design",
      "Landing Pages",
      "Design Systems",
      "Brand Identity",
    ],
  },
  {
    title: "SEO / Digital Growth",
    icon: Search,
    items: [
      "Technical SEO",
      "Local SEO",
      "E-Commerce SEO",
      "Digital Marketing",
      "Social Media",
    ],
  },
];

/* ─────────────────────────────────────────────
   EXACT NAV LINKS
   ───────────────────────────────────────────── */

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasMega: true },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Clients", href: "/clients" },
  { name: "Contact Us", href: "/contact" },
];

/* ─────────────────────────────────────────────
   NAVBAR COMPONENT
   ───────────────────────────────────────────── */

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  const megaRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Route-aware navbar: Home page starts transparent and turns white on scroll.
  // All other pages start immediately in the solid white navbar style.
  const isHomePage = pathname === "/";
  const showSolidNavbar = !isHomePage || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega-menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        megaOpen &&
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        servicesButtonRef.current &&
        !servicesButtonRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen]);

  // Close mega-menu on scroll
  useEffect(() => {
    if (!megaOpen) return;
    const handler = () => setMegaOpen(false);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [megaOpen]);

  const handleMegaEnter = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMegaOpen(true);
  }, []);

  const handleMegaLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setMegaOpen(false);
    }, 200);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 pointer-events-none flex justify-center transition-all duration-500"
        style={{
          paddingTop: showSolidNavbar ? "0.5rem" : "1.25rem"
        }}
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between",
            "w-full max-w-[1400px] px-6 sm:px-8 rounded-[999px]",
            "transition-all duration-500 ease-[0.16,1,0.3,1]",
            "relative",
            showSolidNavbar ? "h-[62px] sm:h-[68px]" : "h-[76px] sm:h-[82px]"
          )}
          style={{
            background: showSolidNavbar
              ? "rgba(255, 255, 255, 0.96)"
              : "transparent",

            backdropFilter: showSolidNavbar ? "blur(20px)" : "none",
            WebkitBackdropFilter: showSolidNavbar ? "blur(20px)" : "none",

            border: showSolidNavbar
              ? "1px solid rgba(0, 0, 0, 0.08)"
              : "1px solid transparent",

            boxShadow: showSolidNavbar
              ? "0 8px 24px rgba(0, 0, 0, 0.06)"
              : "none",
          }}
        >
          {/* --- LOGO (Original Asset) --- */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 relative z-10 group"
          >
            <div className={cn(
              "relative transition-all duration-300",
              showSolidNavbar ? "w-8 h-8 sm:w-9 sm:h-9" : "w-10 h-10 sm:w-11 sm:h-11"
            )}>
              <Image
                src="/logo.png"
                alt="AKTECH Logo"
                fill
                priority
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span
              className={cn(
                "font-heading font-black text-lg sm:text-xl tracking-tight hidden sm:inline-block transition-colors duration-500",
                showSolidNavbar ? "text-[#111111]" : "text-white"
              )}
            >
              AKTECH
            </span>
          </Link>

          {/* --- DESKTOP NAV LINKS --- */}
          <nav className="hidden lg:flex items-center gap-1.5 relative z-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              // Services link with hover mega menu
              if (link.hasMega) {
                return (
                  <div
                    key={link.name}
                    className="relative inline-flex items-center"
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <button
                      ref={servicesButtonRef}
                      onClick={() => setMegaOpen((prev) => !prev)}
                      className={cn(
                        "relative px-4 py-2 text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-300 rounded-full group flex items-center gap-1 cursor-pointer",
                        megaOpen || isActive
                          ? "text-[#E0000B]"
                          : showSolidNavbar
                          ? "text-[#111111] hover:text-[#E0000B]"
                          : "text-gray-200 hover:text-white"
                      )}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-300",
                          megaOpen ? "rotate-180 text-[#E0000B]" : ""
                        )}
                      />

                      {/* Hover Glow */}
                      <div className={cn(
                        "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        showSolidNavbar ? "bg-black/[0.04]" : "bg-white/[0.1]"
                      )} />
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-300 rounded-full group",
                    isActive
                      ? "text-[#E0000B]"
                      : showSolidNavbar
                      ? "text-[#111111] hover:text-[#E0000B]"
                      : "text-gray-200 hover:text-white"
                  )}
                >
                  <span className="relative z-10">
                    {link.name}
                  </span>

                  {/* Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "rgba(224, 0, 11, 0.08)",
                        border: "1px solid rgba(224, 0, 11, 0.25)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover Glow */}
                  {!isActive && (
                    <div className={cn(
                      "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      showSolidNavbar ? "bg-black/[0.04]" : "bg-white/[0.1]"
                    )} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* --- DESKTOP CTA BUTTON (Contact Us -> /contact) --- */}
          <div className="hidden lg:block relative z-10">
            <Link
              href="/contact"
              className={cn(
                "relative flex items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-[1.04] active:scale-95 group overflow-hidden text-white bg-[#E0000B] hover:bg-[#C00009]",
                showSolidNavbar ? "h-9 px-6" : "h-10 px-7"
              )}
              style={{
                boxShadow: "0 4px 18px rgba(224, 0, 11, 0.3)",
              }}
            >
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[100%] group-hover:translate-x-[50%] transition-transform duration-[1.2s] ease-in-out" />
              <span className="relative z-10 font-bold">Contact Us</span>
            </Link>
          </div>

          {/* --- MOBILE MENU TOGGLE --- */}
          <button
            aria-label="Toggle Navigation Menu"
            className={cn(
              "lg:hidden relative z-50 p-2 rounded-full transition-all duration-300 active:scale-95",
              showSolidNavbar ? "text-[#111111] hover:bg-black/5" : "text-white hover:bg-white/10"
            )}
            style={{
              border: showSolidNavbar ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 255, 255, 0.2)"
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={cn("w-4 h-4", showSolidNavbar ? "text-[#111111]" : "text-white")} />
            ) : (
              <Menu className={cn("w-4 h-4", showSolidNavbar ? "text-[#111111]" : "text-white")} />
            )}
          </button>
        </div>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════════
          DESKTOP MEGA-MENU — FULL-WIDTH BELOW NAVBAR
         ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            ref={megaRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
            className="fixed left-0 right-0 z-[99] pointer-events-auto hidden lg:block"
            style={{
              top: showSolidNavbar ? "78px" : "96px",
            }}
          >
            <div className="w-full bg-white border-b border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
                <div className="grid grid-cols-12 gap-0">

                  {/* ── LEFT COLUMN: INTRO ── */}
                  <div className="col-span-3 py-10 pr-10 border-r border-gray-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-4 block">
                        WHAT WE DO
                      </span>
                      <h3 className="font-heading font-extrabold text-xl text-[#111111] tracking-tight mb-3 leading-snug">
                        360° Digital Solutions
                      </h3>
                      <p className="text-gray-500 text-[13px] leading-relaxed mb-6 font-normal">
                        Digital products, intelligent systems and experiences built for ambitious businesses.
                      </p>
                    </div>

                    {/* Trust / Fact points */}
                    <div className="flex flex-col gap-2.5 pt-4 border-t border-gray-100">
                      {[
                        { value: "30+", label: "Projects Delivered" },
                        { value: "1+", label: "Years Experience" },
                        { value: "Global", label: "Clients World-Wide" },
                      ].map((fact) => (
                        <div key={fact.label} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E0000B]" />
                          <span className="text-xs text-gray-700 font-medium">
                            <span className="font-extrabold text-[#111111]">{fact.value}</span>{" "}
                            {fact.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── RIGHT COLUMN: 6 SERVICE CATEGORIES GRID ── */}
                  <div className="col-span-9 py-10 pl-10">
                    <div className="grid grid-cols-3 gap-x-10 gap-y-8">
                      {SERVICE_CATEGORIES.map((category) => {
                        const IconComp = category.icon;
                        return (
                          <div key={category.title}>
                            {/* Category Header */}
                            <div className="flex items-center gap-2 mb-2.5">
                              <IconComp className="w-3.5 h-3.5 text-[#E0000B]" strokeWidth={2.5} />
                              <Link
                                href="/services"
                                onClick={() => setMegaOpen(false)}
                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111] hover:text-[#E0000B] transition-colors"
                              >
                                {category.title}
                              </Link>
                            </div>
                            <div className="w-full h-px bg-gray-100 mb-3" />

                            {/* Service Items */}
                            <ul className="flex flex-col gap-1.5">
                              {category.items.map((item) => (
                                <li key={item}>
                                  <Link
                                    href="/services"
                                    onClick={() => setMegaOpen(false)}
                                    className="group flex items-center gap-2 py-1 text-[13px] text-gray-600 hover:text-[#111111] transition-colors duration-200 font-medium"
                                  >
                                    <span>{item}</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#E0000B]" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE NAVIGATION OVERLAY
         ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-start pt-28 px-8 bg-[#111111]/98 text-white overflow-y-auto pb-16"
          >
            <nav className="flex flex-col items-center gap-6 w-full relative z-10 max-w-md">
              {NAV_LINKS.map((link, i) => {
                // Services with expandable sub-menu on mobile
                if (link.hasMega) {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full text-center"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href="/services"
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "text-3xl sm:text-4xl font-heading font-bold tracking-tight transition-all duration-300",
                            pathname === link.href ? "text-[#E0000B]" : "text-gray-300 hover:text-white"
                          )}
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={() => setMobileServicesOpen((prev) => !prev)}
                          className="p-1 cursor-pointer"
                        >
                          <ChevronDown
                            className={cn(
                              "w-6 h-6 transition-transform duration-300",
                              mobileServicesOpen ? "rotate-180 text-[#E0000B]" : "text-gray-400"
                            )}
                          />
                        </button>
                      </div>

                      {/* Mobile Services Expansion */}
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 pb-2 flex flex-col gap-5 text-left">
                              {SERVICE_CATEGORIES.map((category) => {
                                const IconComp = category.icon;
                                return (
                                  <div key={category.title}>
                                    <div className="flex items-center gap-2 mb-2">
                                      <IconComp className="w-3.5 h-3.5 text-[#E0000B]" strokeWidth={2.5} />
                                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                                        {category.title}
                                      </span>
                                    </div>
                                    <div className="w-full h-px bg-white/10 mb-2" />
                                    <ul className="flex flex-col gap-1 pl-5">
                                      {category.items.map((item) => (
                                        <li key={item}>
                                          <Link
                                            href="/services"
                                            onClick={() => {
                                              setMobileMenuOpen(false);
                                              setMobileServicesOpen(false);
                                            }}
                                            className="flex items-center gap-2 py-1 text-sm text-gray-400 hover:text-white transition-colors font-medium"
                                          >
                                            <ChevronRight className="w-3 h-3 text-[#E0000B]/60" />
                                            {item}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block text-3xl sm:text-4xl font-heading font-bold tracking-tight transition-all duration-300",
                        pathname === link.href ? "text-[#E0000B]" : "text-gray-300 hover:text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: NAV_LINKS.length * 0.05 + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12"
            >
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="h-12 px-10 flex items-center justify-center rounded-full text-white font-bold text-[11px] uppercase tracking-[0.2em] transition-transform active:scale-95 bg-[#E0000B] hover:bg-[#C00009] shadow-[0_10px_30px_rgba(224,0,11,0.4)]"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
