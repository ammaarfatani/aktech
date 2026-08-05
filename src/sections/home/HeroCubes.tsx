"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Hero3DObject } from "@/components/ui/Hero3DObject";

function Particle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(59,130,246,0.8), transparent)`,
      }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0.5, 1.2, 0.5],
        y: [0, -30, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function SmallCube({ size, x, y, delay, color }: { size: number; x: string; y: string; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -15, 0],
        x: [0, 5, 0],
        rotateY: [0, 360],
        rotateX: [0, 180, 0],
      }}
      transition={{
        duration: 8 + delay * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${color}22, ${color}08)`,
          border: `1px solid ${color}40`,
          borderRadius: 4,
          backdropFilter: "blur(8px)",
          boxShadow: `0 0 20px ${color}15, inset 0 0 15px ${color}08`,
        }}
      >
        <div
          className="absolute inset-0 rounded"
          style={{
            background: `linear-gradient(135deg, ${color}15, transparent 60%)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export function HeroCubeEcosystem() {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    delay: i * 0.3,
    x: `${15 + Math.random() * 70}%`,
    y: `${15 + Math.random() * 70}%`,
    size: 2 + Math.random() * 3,
  }));

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      {/* 3D Torus Knot Midground Layer */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <Hero3DObject />
      </div>
      {/* Atmospheric glow layers */}
      <div
        className="absolute"
        style={{
          width: 400,
          height: 400,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 250,
          height: 250,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Orbit rings */}
      <motion.div
        className="absolute"
        style={{
          width: 350,
          height: 350,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid rgba(59,130,246,0.12)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute"
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#3B82F6",
            boxShadow: "0 0 12px #3B82F6, 0 0 25px rgba(59,130,246,0.4)",
            top: -4,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          width: 280,
          height: 280,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid rgba(139,92,246,0.1)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#8B5CF6",
            boxShadow: "0 0 10px #8B5CF6, 0 0 20px rgba(139,92,246,0.4)",
            bottom: -3,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          width: 440,
          height: 200,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) rotateX(65deg)",
          borderRadius: "50%",
          border: "1px solid rgba(6,182,212,0.08)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute"
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#06B6D4",
            boxShadow: "0 0 8px #06B6D4",
            top: -2.5,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </motion.div>

      {/* Main AK Cube */}
      <motion.div
        className="relative z-10"
        animate={{
          y: [0, -12, 0],
          rotateY: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 16,
            backdropFilter: "blur(20px)",
            boxShadow: `
              0 0 60px rgba(59,130,246,0.15),
              0 0 120px rgba(139,92,246,0.08),
              inset 0 1px 0 rgba(255,255,255,0.1),
              inset 0 0 40px rgba(59,130,246,0.05)
            `,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glass reflection */}
          {/* <div
            className="absolute"
            style={{
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent)",
              borderRadius: "16px 16px 0 0",
            }}
          /> */}
          {/* AK text */}
         <div className="absolute inset-0 flex items-center justify-center">
  <Image
    src="/logo.png"
    alt="AKTECH Logo"
    width={140}
    height={140}
    priority
    className="object-contain drop-shadow-[0_0_40px_rgba(56,189,248,0.45)]"
  />
</div>
          {/* Edge glow line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: 2,
              background: "linear-gradient(90deg, transparent, #3B82F6, #8B5CF6, transparent)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Floating small cubes */}
      <SmallCube size={45} x="12%" y="18%" delay={0} color="#3B82F6" />
      <SmallCube size={35} x="78%" y="15%" delay={0.5} color="#8B5CF6" />
      <SmallCube size={30} x="80%" y="65%" delay={1} color="#06B6D4" />
      <SmallCube size={40} x="8%" y="70%" delay={1.5} color="#3B82F6" />
      <SmallCube size={25} x="65%" y="80%" delay={2} color="#8B5CF6" />
      <SmallCube size={28} x="25%" y="82%" delay={0.8} color="#06B6D4" />
      <SmallCube size={20} x="55%" y="10%" delay={1.2} color="#3B82F6" />
      <SmallCube size={22} x="35%" y="12%" delay={2.2} color="#8B5CF6" />

      {/* Particles */}
      {particles.map((p) => (
        <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
      ))}

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
        <defs>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="20%" y1="25%" x2="45%" y2="45%" stroke="url(#lineGrad1)" strokeWidth="1" />
        <line x1="80%" y1="20%" x2="55%" y2="45%" stroke="url(#lineGrad1)" strokeWidth="1" />
        <line x1="82%" y1="70%" x2="58%" y2="55%" stroke="url(#lineGrad1)" strokeWidth="1" />
        <line x1="15%" y1="75%" x2="42%" y2="55%" stroke="url(#lineGrad1)" strokeWidth="1" />
      </svg>
    </div>
  );
}
