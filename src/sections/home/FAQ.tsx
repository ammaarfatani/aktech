"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle, Sparkles } from "lucide-react";

const FAQS = [
  {
    question: "What is your typical project timeline?",
    answer: "Our timelines are tailored to the complexity of your requirements. A premium marketing website typically launches within 4–6 weeks. Complex enterprise SaaS platforms or bespoke CRM systems undergo rigorous engineering and may take 3–6 months. We provide a precise, milestone-driven roadmap during our initial discovery phase."
  },
  {
    question: "Do you build custom SaaS platforms from scratch?",
    answer: "Yes. Our core engineering team specializes in architecting high-performance, cloud-native SaaS applications. We bypass generic templates, utilizing modern enterprise stacks like Next.js, Node.js, and scalable microservices to ensure your platform handles high-volume growth effortlessly."
  },
  {
    question: "How do you handle the UI/UX design process?",
    answer: "We employ an iterative, highly collaborative design methodology. Beginning with deep user research and wireframing, we construct interactive prototypes with Apple-level polish. You have multiple refinement cycles, ensuring the final interface maximizes engagement and conversion rates."
  },
  {
    question: "What is your pricing structure for enterprise projects?",
    answer: "We engage in value-based pricing tailored to the specific ROI of your project. Rather than ambiguous hourly billing, we offer transparent, fixed-price engagements based on project scope and deliverables. Custom digital experiences generally start at $15k."
  },
  {
    question: "Do you provide post-launch maintenance and SEO?",
    answer: "Absolutely. Launching is only the beginning. We offer dedicated retention retainers that include enterprise-grade hosting, automated security patching, SLA-backed support, and continuous technical SEO optimization to keep you dominating search results."
  },
  {
    question: "How do you ensure performance and security?",
    answer: "Security and speed are built into our foundation. We deploy edge-network hosting, advanced CDN caching, and precise code splitting to guarantee sub-second load times. All data is handled with strict compliance protocols and state-of-the-art encryption standards."
  }
];

function FAQItem({ faq, index, isOpen, toggleOpen }: { faq: typeof FAQS[0], index: number, isOpen: boolean, toggleOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl overflow-hidden transition-all duration-500"
      style={{
        background: isOpen ? "rgba(5,9,20,0.9)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${isOpen ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)"}`,
      }}
    >
      {/* Background Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-colors duration-500 pointer-events-none" />

      {/* Top Edge Animated Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <button
        onClick={toggleOpen}
        className="relative z-10 w-full flex items-start justify-between p-6 sm:p-8 text-left focus:outline-none"
      >
        <span className={`text-lg sm:text-xl font-heading font-bold transition-colors duration-300 pr-8 mt-1 ${isOpen ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
          {faq.question}
        </span>
        <div 
          className={`relative flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-blue-500/20 text-blue-400 rotate-180 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300 border border-transparent group-hover:border-white/10"}`}
        >
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative z-10 px-6 sm:px-8 pb-8 text-gray-400 text-base sm:text-lg font-light leading-relaxed">
              {/* Divider Glow Line */}
              <div className="w-full h-px bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-transparent mb-6" />
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-32 sm:py-40 overflow-hidden bg-[#02040f]" id="faq">
      <style>{`
        @keyframes faqPan {
          0% { background-position: 0px 0px; }
          100% { background-position: 4rem 4rem; }
        }
        .animate-faq-pan {
          animation: faqPan 20s linear infinite;
        }
      `}</style>

      {/* --- BACKGROUND EFFECTS --- */}
      
      {/* Animated Grid */}
      <div 
        className="absolute inset-0 opacity-[0.08] animate-faq-pan pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 20%, transparent 100%)',
        }}
      />
      
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      
      {/* Star Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
         <svg className="w-full h-full">
           <pattern id="faq-stars" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
             <circle fill="#ffffff" cx="15" cy="15" r="1.5" opacity="0.4" />
             <circle fill="#ffffff" cx="80" cy="50" r="0.5" opacity="0.2" />
             <circle fill="#ffffff" cx="100" cy="30" r="1" opacity="0.6" />
             <circle fill="#ffffff" cx="40" cy="90" r="0.5" opacity="0.3" />
           </pattern>
           <rect x="0" y="0" width="100%" height="100%" fill="url(#faq-stars)" />
         </svg>
      </div>

      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none mix-blend-overlay">
        <filter id="faqNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#faqNoise)" />
      </svg>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-20 items-start">
          
          {/* --- LEFT: HEADER & CONTEXT --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-40"
          >
            {/* Glowing Badge */}
            <div className="flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md w-fit">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-purple-200/80">
                Knowledge Base
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-8 text-white tracking-tight leading-[1.1]">
              Frequently <br className="hidden sm:block" />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                  Asked Questions
                </span>
                <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-purple-500/20 blur-2xl -z-10 opacity-60" />
              </span>
            </h2>
            
            <p className="text-gray-400/90 text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-lg">
              Everything you need to know about our enterprise engineering process, pricing models, and world-class delivery capabilities.
            </p>

            {/* Support CTA Card */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-2">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Still have questions?</h3>
                <p className="text-sm text-gray-400 mb-2">
                  Our strategic advisors are ready to discuss your custom project requirements.
                </p>
                <button className="text-sm font-semibold text-white tracking-widest uppercase hover:text-blue-400 transition-colors w-fit flex items-center gap-2">
                  Contact Support <span className="text-blue-500">→</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT: ACCORDION LIST --- */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {FAQS.map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                index={index} 
                isOpen={openIndex === index}
                toggleOpen={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
