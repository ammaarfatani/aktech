import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Sparkles, Home, Briefcase, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111111] pt-36 sm:pt-44 pb-20 flex flex-col justify-between selection:bg-[#E0000B]/20 selection:text-[#E0000B]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex-1 flex flex-col items-center justify-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white border border-black/10 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#E0000B]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111]">
            404 ERROR
          </span>
        </div>

        {/* 404 Number */}
        <h1 className="font-heading font-black text-8xl sm:text-[11rem] text-[#111111] leading-none tracking-tighter mb-4">
          4<span className="text-[#E0000B]">0</span>4
        </h1>

        <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#111111] uppercase tracking-tight mb-4">
          PAGE NOT FOUND
        </h2>

        <p className="text-gray-600 text-base sm:text-lg max-w-md font-normal leading-relaxed mb-10">
          The page you are looking for does not exist or has been moved to a new location.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href="/"
            className="px-7 py-4 rounded-full bg-[#111111] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#E0000B] transition-colors shadow-lg flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/services"
            className="px-7 py-4 rounded-full bg-white text-[#111111] border border-black/10 hover:border-[#E0000B] font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-[#E0000B]" />
            <span>Explore Services</span>
          </Link>

          <Link
            href="/contact"
            className="px-7 py-4 rounded-full bg-white text-[#111111] border border-black/10 hover:border-[#E0000B] font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#E0000B]" />
            <span>Contact Us</span>
          </Link>
        </div>

        {/* Quick Links Grid */}
        <div className="w-full max-w-2xl bg-white border border-black/10 rounded-2xl p-6 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block text-center">
            POPULAR DESTINATIONS
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: "Portfolio", href: "/portfolio" },
              { name: "About Us", href: "/about" },
              { name: "Clients", href: "/clients" },
              { name: "Contact", href: "/contact" },
              { name: "Case Studies", href: "/portfolio" },
              { name: "Get Quote", href: "/contact" },
            ].map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 text-xs font-semibold text-[#111111] transition-colors group"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E0000B] transition-colors" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
