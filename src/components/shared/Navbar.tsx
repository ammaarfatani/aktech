"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#works" },
  { name: "About Us", href: "#story" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Track scroll position to update navbar styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 pointer-events-none flex justify-center transition-all duration-700 ease-[0.16,1,0.3,1]"
        style={{
         paddingTop: "1rem"
        }}
      >
        <div
  className={cn(
    "pointer-events-auto flex items-center justify-between",
    "w-full max-w-[1400px] h-[88px] px-8 rounded-[999px]",
    "transition-all duration-700 ease-[0.16,1,0.3,1]",
    "relative"
  )}
          style={{
  background: isScrolled
    ? "rgba(6,8,22,0.88)"
    : "rgba(6,8,22,0.45)",

  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",

  border: "1px solid rgba(56,189,248,0.12)",

  boxShadow: isScrolled
    ? "0 10px 40px rgba(0,0,0,.45)"
    : "0 10px 30px rgba(0,0,0,.25)",
}}
        >
          {/* --- LOGO --- */}
          <Link
  href="/"
  className="flex items-center shrink-0 relative z-10"
>
  <div
    className={cn(
      "relative transition-all duration-500",
      isScrolled ? "w-12 h-12" : "w-16 h-16"
    )}
  >
    <Image
      src="/logo.png"
      alt="AKTECH Logo"
      fill
      priority
      className="object-contain"
    />
  </div>
</Link>

          {/* --- DESKTOP NAV LINKS --- */}
          <nav className="hidden lg:flex items-center gap-2 relative z-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-5 py-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-500 rounded-full group",
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">{link.name}</span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Glow */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.03]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* --- DESKTOP CTA BUTTON --- */}
          <div className="hidden lg:block relative z-10">
            <Link 
              href="#" 
              className="relative h-10 px-8 flex items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-500 hover:scale-[1.05] group overflow-hidden"
              style={{
                color: "#ffffff",
                border: "1px solid rgba(59,130,246,0.3)",
                background: "rgba(59,130,246,0.1)",
                boxShadow: "0 0 20px rgba(59,130,246,0.15)",
              }}
            >
              {/* Light Sweep Animation */}
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[50%] transition-transform duration-[1.5s] ease-in-out" />
              <span className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Let&apos;s Talk</span>
            </Link>
          </div>

          {/* --- MOBILE MENU TOGGLE --- */}
          <button
            aria-label="Toggle Navigation Menu"
            className="lg:hidden relative z-50 text-white p-2.5 rounded-full transition-all duration-300 hover:bg-white/5 active:scale-95"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.header>

      {/* --- MOBILE NAVIGATION OVERLAY --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center px-10"
            style={{ background: "rgba(2,4,15,0.95)" }}
          >
            <nav className="flex flex-col items-center gap-10 w-full relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block text-4xl sm:text-5xl font-heading font-bold tracking-tight transition-all duration-500",
                      pathname === link.href ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300" : "text-gray-400 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: NAV_LINKS.length * 0.05 + 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16"
            >
              <Link 
                href="#" 
                onClick={() => setMobileMenuOpen(false)}
                className="h-14 px-12 flex items-center justify-center rounded-full text-white font-bold text-[11px] uppercase tracking-[0.2em] transition-transform active:scale-95"
                style={{ 
                  background: "linear-gradient(135deg, #3B82F6, #06B6D4)", 
                  boxShadow: "0 0 30px rgba(59,130,246,0.3)" 
                }}
              >
                Let&apos;s Talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
