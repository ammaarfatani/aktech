"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { footerColumns } from "@/data/navigation";
import { openConsentPreferences } from "@/lib/analytics";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-3.5 h-3.5 fill-current"} viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-4 h-4 fill-current"} viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266.057 1.645.069 4.849.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-3.5 h-3.5 fill-current"} viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-3.5 h-3.5 fill-current"} viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <details className="group border-b border-black/8 py-3 md:border-0 md:py-0" open>
      <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-bold uppercase tracking-[0.22em] text-[#E0000B] md:pointer-events-none">
        {title}
        <span className="md:hidden text-[#111111] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
      </summary>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-[#4B5563] transition-colors hover:text-[#E0000B]">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function Footer() {
  const social = [
    { href: siteConfig.links.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: siteConfig.links.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: siteConfig.links.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-t border-white/10 bg-[#141414] px-4 py-16 text-white sm:px-10 sm:py-20 lg:px-16" id="contact-cta">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E0000B]/50 to-transparent" />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#E0000B]">Start a conversation</p>
            <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-6xl">
              Let&apos;s build <span className="text-[#E0000B]">what&apos;s next.</span>
            </h2>
            <p className="mt-4 max-w-xl text-white/70">Have an idea, a product, or an operations problem? Write to us with the workflow you want to improve.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] hover:border-white/40">
              <Mail className="h-4 w-4 text-[#E0000B]" />
              {siteConfig.email}
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#E0000B] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#C00009]">
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative bg-white pb-28 text-[#111111] md:pb-10">
        <div className="mx-auto max-w-[1400px] px-4 pt-12 sm:px-10 lg:px-16">
          <div className="grid gap-10 border-b border-black/8 pb-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link href="/" className="mb-4 flex items-center gap-3">
                <div className="relative h-10 w-10">
                  <Image src="/logo.png" alt="AKTECH" fill className="object-contain" />
                </div>
                <span className="font-heading text-xl font-black tracking-tight">AKTECH</span>
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-[#4B5563]">
                Custom software, websites, SaaS, AI automation and digital experiences — engineered for a connected world, delivered through remote collaboration.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-4 py-2 text-xs font-bold text-white hover:bg-[#E0000B]">
                  Email
                </a>
                <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-bold hover:border-[#E0000B] hover:text-[#E0000B]">
                  WhatsApp
                </a>
              </div>
              <div className="mt-5 flex gap-3">
                {social.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#111111] hover:border-[#E0000B] hover:text-[#E0000B]">
                    <Icon className="h-3.5 w-3.5 fill-current" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-8">
              <FooterColumn title="Services" items={footerColumns.services} />
              <FooterColumn title="Company" items={footerColumns.company} />
              <FooterColumn title="Explore" items={footerColumns.explore} />
              <FooterColumn title="Resources" items={footerColumns.resources} />
            </div>
          </div>

          <div className="flex flex-col gap-4 py-6 text-xs text-[#6B7280] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} AKTECH Digital Solutions.
              {" · "}
              <Link href="/privacy" className="hover:text-[#E0000B]">Privacy</Link>
              {" · "}
              <Link href="/terms" className="hover:text-[#E0000B]">Terms</Link>
              {" · "}
              <button
                type="button"
                onClick={openConsentPreferences}
                className="cursor-pointer hover:text-[#E0000B] transition-colors"
              >
                Cookie Preferences
              </button>
            </p>
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-black/25">Worldwide digital solutions</p>
          </div>

          <p className="pointer-events-none select-none overflow-hidden pb-2 text-center font-heading text-[18vw] font-black leading-none tracking-tighter text-black/[0.04] lg:text-[9rem]">
            AKTECH
          </p>
        </div>
      </footer>
    </>
  );
}
