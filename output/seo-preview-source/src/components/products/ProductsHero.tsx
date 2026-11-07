"use client";

import type { PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, GraduationCap, Utensils, Dumbbell } from "lucide-react";
import { products } from "@/data/products";

const productIcons = [GraduationCap, Utensils, Dumbbell];
const productIndustries = ["For schools", "For restaurants", "For gyms"];

export function ProductsHero() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 22 });
  const rotateY = useTransform(springX, [-1, 1], [-6, 6]);
  const rotateX = useTransform(springY, [-1, 1], [5, -5]);

  function moveScene(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  }

  function resetScene() { pointerX.set(0); pointerY.set(0); }

  return (
    <header className="relative overflow-hidden text-secondary">
      <div className="relative mx-auto max-w-[1400px] px-6 pb-8 pt-12 sm:px-10 lg:px-14 lg:pt-16">
        <div className="grid items-center gap-8 lg:min-h-[620px] lg:grid-cols-[1fr_1fr] lg:gap-12">
          <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.65 }} className="relative z-10 pb-2 lg:pb-12">
            <p className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-text-secondary sm:text-xs"><span className="h-px w-8 bg-primary" />AKTECH / Product Studio</p>
            <h1 className="max-w-2xl text-[clamp(2.65rem,5.1vw,5rem)] font-bold leading-[1.02] tracking-[-0.055em]">
              Big ideas.<br />Real-world<br /><span className="relative inline-block text-primary">possibilities.<svg viewBox="0 0 420 18" fill="none" aria-hidden="true" className="absolute -bottom-4 left-0 h-4 w-full"><motion.path d="M3 12C112 0 278 1 417 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: reduceMotion ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0 : 1, delay: 0.4 }} /></svg></span>
            </h1>
            <p className="mb-8 mt-10 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">Thoughtfully built software for schools, restaurants and gyms. Our next chapter, engineered around yours.</p>
            <a href="#product-collection" className="inline-flex items-center gap-5 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Discover the Products <ArrowDown size={17} aria-hidden="true" /></a>
            <p className="mt-5 flex items-center gap-2 text-xs text-text-muted"><span className="h-1.5 w-1.5 rounded-full bg-primary" />In development. Coming soon.</p>
          </motion.div>

          <div onPointerMove={moveScene} onPointerLeave={resetScene} className="relative mx-auto w-full max-w-[550px] py-6 sm:px-4 lg:py-12" style={{ perspective: 1100 }}>
            <div className="pointer-events-none absolute inset-6 rounded-full border border-primary/10 sm:inset-0" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-8 bottom-8 h-48 w-48 rounded-full bg-[#eed6d4] blur-3xl" aria-hidden="true" />
            <motion.div style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY, transformStyle: "preserve-3d" }} initial={{ opacity: 0, y: reduceMotion ? 0 : 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.8 }} className="relative">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.8rem] border border-primary/15 bg-[#e8e2dc] sm:translate-x-5 sm:translate-y-5" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-[#e6e2df] shadow-[0_24px_70px_-30px_rgba(65,38,30,0.3)]">
                <Image src="/products/hero-architecture.webp" alt="Sculptural red spiral staircase in a sunlit modern interior" fill priority sizes="(max-width: 1024px) 90vw, 550px" className="object-cover" />
                <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.26)_45%,transparent_65%)]" animate={reduceMotion ? undefined : { x: ["-100%", "100%"] }} transition={{ duration: 7, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-6 pb-6 pt-20 text-white"><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">Designed to move you forward</p><p className="mt-2 font-heading text-xl font-medium sm:text-2xl">A new perspective on everyday work.</p></div>
              </div>
              <motion.div animate={reduceMotion ? undefined : { y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-2 top-9 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-lg sm:-left-7 sm:px-5" style={{ transform: "translateZ(45px)" }}><p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Built with intention</p><p className="mt-1 font-heading text-sm font-bold text-secondary">Human needs. Better software.</p></motion.div>
              <motion.div animate={reduceMotion ? undefined : { y: [0, 7, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-1 bottom-20 flex items-center gap-3 rounded-2xl bg-primary px-4 py-3 text-white shadow-lg sm:-right-6 sm:px-5"><ArrowUpRight size={25} aria-hidden="true" /><div><p className="text-[9px] uppercase tracking-widest text-white/75">The next chapter</p><p className="font-heading text-sm font-bold">Built by AKTECH.</p></div></motion.div>
            </motion.div>
            <a href="https://unsplash.com/photos/a-red-spiraling-staircase-is-viewed-from-below-Prxni7UJt70" target="_blank" rel="noopener noreferrer" className="relative mt-7 block text-right text-[10px] text-text-muted underline-offset-4 hover:underline">Photo: Declan Sun / Unsplash</a>
          </div>
        </div>

        <div className="mt-8 grid gap-0 border-t border-secondary/10 sm:grid-cols-3 lg:mt-0">
          {products.map((product, index) => {
            const Icon = productIcons[index];
            return <Link key={product.slug} href={`/products/${product.slug}`} className="group flex items-center gap-4 border-b border-secondary/10 px-1 py-6 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-secondary/10 bg-white/70 transition-colors group-hover:border-primary/30 group-hover:bg-primary/5"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></span>
              <div><p className="text-[10px] uppercase tracking-widest text-text-muted">{productIndustries[index]}</p><p className="mt-1 font-heading text-lg font-bold">{product.name}</p></div>
              <ArrowUpRight size={18} className="ml-auto text-text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
            </Link>;
          })}
        </div>
      </div>
    </header>
  );
}
