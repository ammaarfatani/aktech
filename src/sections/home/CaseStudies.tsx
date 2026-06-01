"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "Aura Fintech",
    category: "Global Platform",
    result: "340% Retention Increase",
    tags: ["Next.js", "WebGL", "Financial Tech"],
    stats: [
      { label: "Performance", value: "99.9%" },
      { label: "Load Time", value: "<0.8s" },
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    color: "#3B82F6",
  },
  {
    id: "02",
    title: "Nova Motors",
    category: "E-Commerce",
    result: "$2.4M Q1 Revenue",
    tags: ["Three.js", "Shopify Plus", "Automotive"],
    stats: [
      { label: "Conversion", value: "+45%" },
      { label: "Global Reach", value: "12 Countries" },
    ],
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
    color: "#8B5CF6",
  },
  {
    id: "03",
    title: "Synthetix AI",
    category: "AI Application",
    result: "Award Winning UI/UX",
    tags: ["React", "OpenAI", "Machine Learning"],
    stats: [
      { label: "Data Processed", value: "10B+ Pts" },
      { label: "User Adoption", value: "2M+" },
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    color: "#06B6D4",
  },
  {
    id: "04",
    title: "Vertex Logistics",
    category: "Enterprise System",
    result: "80% Workflow Automation",
    tags: ["Node.js", "Cloud Architecture", "B2B"],
    stats: [
      { label: "Efficiency", value: "10x" },
      { label: "Active Nodes", value: "50k+" },
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    color: "#10B981",
  },
];

export function CaseStudies() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.8,
  });

  const x = useTransform(smoothProgress, [0, 1], ["5%", "-65%"]);
  const bgX = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={targetRef} className="relative h-[350vh] bg-[#060816]" id="work">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <motion.div style={{ x: bgX }} className="absolute inset-0 w-[200vw] h-full pointer-events-none">
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '8rem 8rem',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          }} />

          <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute top-[40%] left-[30%] w-[1000px] h-[1000px] bg-purple-600/5 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[10%] left-[60%] w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen" />

          <div className="absolute inset-0 opacity-40">
             <svg className="w-full h-full">
               <pattern id="premium-stars" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                 <circle fill="#ffffff" cx="30" cy="30" r="1.5" opacity="0.6" />
                 <circle fill="#ffffff" cx="120" cy="80" r="0.8" opacity="0.3" />
                 <circle fill="#ffffff" cx="80" cy="20" r="2" opacity="0.8" />
                 <circle fill="#ffffff" cx="50" cy="110" r="1" opacity="0.4" />
               </pattern>
               <rect x="0" y="0" width="100%" height="100%" fill="url(#premium-stars)" />
             </svg>
          </div>
        </motion.div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6 px-5 py-2.5 rounded-full w-fit bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-blue-200">
                Selected Works
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <h2 className="text-5xl sm:text-6xl lg:text-8xl font-heading font-bold text-white tracking-tight leading-[1.05] max-w-3xl">
                Digital <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                    Masterpieces.
                  </span>
                  <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-purple-500/10 blur-2xl -z-10 opacity-50" />
                </span>
              </h2>
              
              <p className="text-gray-400 text-lg sm:text-xl font-light max-w-md leading-relaxed pb-4">
                We craft digital experiences that drive measurable business growth for ambitious global brands.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div style={{ x }} className="relative z-10 flex gap-8 sm:gap-12 px-6 sm:px-10 w-max items-center">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative w-[85vw] sm:w-[600px] lg:w-[850px] h-[55vh] sm:h-[65vh] rounded-[32px] overflow-hidden bg-[#0D1323] border border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer flex-shrink-0 transition-transform duration-[0.8s] ease-[0.16,1,0.3,1] hover:-translate-y-3"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              
              <div 
                className="absolute inset-0 transition-opacity duration-700 opacity-90 group-hover:opacity-80"
                style={{
                  background: "linear-gradient(180deg, rgba(6,8,22,0.1) 0%, rgba(6,8,22,0.85) 60%, rgba(6,8,22,1) 100%)",
                }}
              />

              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1s] mix-blend-screen pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${project.color}30 0%, transparent 70%)`,
                }}
              />

              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[32px]">
                <div className="absolute top-0 left-[-100%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 group-hover:left-[200%] transition-all duration-[1.5s] ease-in-out" />
              </div>

              <div className="absolute inset-0 rounded-[32px] border-[2px] border-transparent group-hover:border-white/15 transition-colors duration-700 pointer-events-none" />

              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between z-10">
                
                <div className="flex justify-between items-start">
                  <span className="text-4xl sm:text-5xl font-heading font-black text-white/20 group-hover:text-white/40 transition-colors duration-500">
                    {project.id}
                  </span>
                  <div className="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1] delay-100">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase backdrop-blur-xl bg-white/5 border border-white/10 text-white shadow-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-[0.8s] ease-[0.16,1,0.3,1]">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.color, boxShadow: `0 0 10px ${project.color}` }} />
                      <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: project.color }}>
                        {project.category}
                      </p>
                    </div>
                    
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                      {project.title}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-6 max-w-md mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      {project.stats.map(stat => (
                        <div key={stat.label} className="flex flex-col gap-1">
                          <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
                          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-semibold">{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-gray-300 text-lg sm:text-xl font-light">
                      {project.result}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl bg-white/5 border border-white/10 group-hover:bg-[#0D1323] group-hover:scale-110 transition-all duration-500 ease-out shadow-[0_0_0_rgba(255,255,255,0)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] relative overflow-hidden"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_70%,rgba(59,130,246,1)_100%)] animate-[spin_3s_linear_infinite]" />
                         <div className="absolute inset-[1.5px] bg-[#060816] rounded-full" />
                      </div>
                      <ArrowUpRight className="w-6 h-6 text-white relative z-10 group-hover:rotate-45 transition-transform duration-500" />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
