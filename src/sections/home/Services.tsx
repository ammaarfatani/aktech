"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Code, Monitor, Database, PenTool, Image, Video, LayoutTemplate, ArrowRight, Sparkles } from "lucide-react";
import React from "react";

const SERVICES = [
  {
    id: "web",
    title: "Web Development",
    icon: <Monitor className="w-6 h-6" />,
    description: "High-performance, cinematic enterprise websites engineered for global scale and award-winning aesthetics.",
    deliverables: ["Next.js & React Ecosystem", "WebGL & 3D Experiences", "Enterprise CMS"],
    color: "#3B82F6", // Blue
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    id: "saas",
    title: "SaaS Platforms",
    icon: <Code className="w-6 h-6" />,
    description: "Scalable cloud architectures and intuitive applications built for high-growth tech companies.",
    deliverables: ["Microservices", "API Architecture", "Cloud Native Deployment"],
    color: "#8B5CF6", // Purple
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "crm",
    title: "CRM Systems",
    icon: <Database className="w-6 h-6" />,
    description: "Bespoke data management platforms that streamline operations and drive enterprise efficiency.",
    deliverables: ["Custom Dashboards", "Data Pipelines", "Workflow Automation"],
    color: "#06B6D4", // Cyan
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    icon: <LayoutTemplate className="w-6 h-6" />,
    description: "Frictionless, high-conversion interfaces crafted with Apple-level polish and deep user empathy.",
    deliverables: ["Design Systems", "Interactive Prototypes", "User Research"],
    color: "#EC4899", // Pink
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "branding",
    title: "Branding",
    icon: <PenTool className="w-6 h-6" />,
    description: "Iconic, memorable brand positioning that commands authority in the modern digital landscape.",
    deliverables: ["Brand Strategy", "Visual Identity", "Digital Guidelines"],
    color: "#F59E0B", // Amber
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "graphic",
    title: "Graphic Design",
    icon: <Image className="w-6 h-6" />,
    description: "Premium visual assets and 3D compositions designed for high-end digital and physical campaigns.",
    deliverables: ["3D Elements", "Marketing Assets", "Editorial Design"],
    color: "#10B981", // Emerald
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "video",
    title: "Video Editing",
    icon: <Video className="w-6 h-6" />,
    description: "Cinematic post-production, precise color grading, and dynamic motion graphics for compelling brand storytelling.",
    deliverables: ["Motion Graphics", "Commercial Editing", "VFX & Compositing"],
    color: "#EF4444", // Red
    colSpan: "md:col-span-2 lg:col-span-2",
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl p-[1px] overflow-hidden ${service.colSpan}`}
    >
      {/* Default Subtle Border */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent rounded-3xl transition-opacity duration-500 group-hover:opacity-0" />
      
      {/* Hover Animated Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/40 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
      
      {/* Mouse Tracking Glow (Border & Inner) */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${service.color}15, transparent 80%)`,
        }}
      />

      {/* Card Inner */}
      <div className="relative h-full bg-[#050914]/90 backdrop-blur-xl rounded-[23px] p-8 sm:p-10 flex flex-col overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
        
        {/* Floating Corner Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/[0.03] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Icon Container */}
        <div className="relative mb-8 z-10">
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${service.color}20, ${service.color}05)`,
              border: `1px solid ${service.color}30`,
              color: service.color,
            }}
          >
            {/* Inner Icon Glow */}
            <div 
              className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none" 
            />
            {service.icon}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-grow">
          <h3 className="text-2xl font-heading font-bold text-white mb-4 transition-colors duration-300">
            {service.title}
          </h3>
          
          <p className="text-gray-400 text-[15px] sm:text-base leading-relaxed mb-8 flex-grow">
            {service.description}
          </p>

          <div className="space-y-3 mb-8">
            {service.deliverables.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ background: service.color, boxShadow: `0 0 10px ${service.color}` }} 
                />
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 w-fit"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = service.color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            Explore Service 
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden bg-[#02040f]" id="services">
      <style>{`
        @keyframes gridPan {
          0% { background-position: 0px 0px; }
          100% { background-position: 4rem 4rem; }
        }
        .animate-grid-pan {
          animation: gridPan 20s linear infinite;
        }
      `}</style>

      {/* --- BACKGROUND EFFECTS --- */}
      
      {/* Animated Grid */}
      <div 
        className="absolute inset-0 opacity-[0.12] animate-grid-pan pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 0%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 0%, #000 30%, transparent 100%)',
        }}
      />
      
      {/* Radial Atmospheric Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none mix-blend-screen" />

      {/* Floating Stars / Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
         <svg className="w-full h-full">
           <pattern id="stars" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
             <circle fill="#ffffff" cx="15" cy="15" r="1" opacity="0.4" />
             <circle fill="#ffffff" cx="60" cy="50" r="0.5" opacity="0.2" />
             <circle fill="#ffffff" cx="90" cy="20" r="1" opacity="0.6" />
             <circle fill="#ffffff" cx="30" cy="90" r="0.5" opacity="0.3" />
             <circle fill="#ffffff" cx="100" cy="100" r="1.5" opacity="0.1" />
           </pattern>
           <rect x="0" y="0" width="100%" height="100%" fill="url(#stars)" />
         </svg>
      </div>

      {/* Subtle Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none mix-blend-overlay">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-20 sm:mb-28"
        >
          {/* Glowing Badge */}
          <div className="group relative inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-hidden hover:bg-white/[0.05] transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-blue-200/80">
              Our Capabilities
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold mb-8 text-white tracking-tight leading-[1.1]">
            Our <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                Capabilities
              </span>
              {/* Background text glow */}
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-purple-500/30 blur-2xl -z-10 opacity-60" />
            </span>
          </h2>
          <p className="text-gray-400/90 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
            Engineering futuristic digital experiences for global enterprises. We fuse cinematic aesthetics with high-performance scalable architecture.
          </p>
        </motion.div>

        {/* --- ASYMMETRIC GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

