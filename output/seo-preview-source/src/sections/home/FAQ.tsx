"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { FAQJsonLd } from "@/components/shared/JsonLd";

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

export function FAQ() {
  const accordionItems = FAQS.map((faq) => ({
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section className="relative py-32 sm:py-40 overflow-hidden bg-[#F8FAFC]" id="faq">
      {/* FAQ Schema */}
      <FAQJsonLd faqs={FAQS} />

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
        className="absolute inset-0 opacity-[0.04] animate-faq-pan pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, #111111 1px, transparent 1px), linear-gradient(to bottom, #111111 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 20%, transparent 100%)',
        }}
      />
      
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E0000B]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#111111]/5 blur-[150px] rounded-full pointer-events-none" />

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
            <div className="flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full bg-[#111111]/[0.04] border border-[#111111]/[0.08] backdrop-blur-md w-fit">
              <Sparkles className="w-4 h-4 text-[#E0000B]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#111111]">
                Knowledge Base
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold mb-8 text-[#111111] tracking-tight leading-[1.1]">
              Frequently <br className="hidden sm:block" />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#E0000B] via-[#C00009] to-[#111111]">
                  Asked Questions
                </span>
              </span>
            </h2>
            
            <p className="text-gray-600 text-lg sm:text-xl font-normal leading-relaxed mb-12 max-w-lg">
              Everything you need to know about our enterprise engineering process, pricing models, and world-class delivery capabilities.
            </p>

            {/* Support CTA Card */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-white border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0000B]/5 blur-3xl rounded-full" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E0000B]/10 border border-[#E0000B]/20 flex items-center justify-center mb-2">
                  <MessageCircle className="w-6 h-6 text-[#E0000B]" />
                </div>
                <h3 className="text-xl font-bold text-[#111111]">Still have questions?</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Our strategic advisors are ready to discuss your custom project requirements.
                </p>
                <a 
                  href="mailto:hello@aktech.tech" 
                  className="text-xs sm:text-sm font-bold text-[#111111] tracking-widest uppercase hover:text-[#E0000B] transition-colors w-fit flex items-center gap-2 cursor-pointer font-heading"
                >
                  <span className="lowercase font-bold">hello@aktech.tech</span> <span className="text-[#E0000B]">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT: ACCORDION LIST --- */}
          <div>
            <Accordion items={accordionItems} />
          </div>

        </div>
      </div>
    </section>
  );
}
