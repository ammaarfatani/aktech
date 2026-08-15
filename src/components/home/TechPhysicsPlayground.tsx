"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

interface TechItem {
  id: string;
  name: string;
  color: string;
  textColor: string;
  iconSvg: React.ReactNode;
}

const TECHNOLOGIES: TechItem[] = [
  {
    id: "react",
    name: "React",
    color: "#111827",
    textColor: "#61DAFB",
    iconSvg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-4 h-4 shrink-0">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    color: "#000000",
    textColor: "#FFFFFF",
    iconSvg: (
      <svg viewBox="0 0 180 180" className="w-4 h-4 shrink-0">
        <circle cx="90" cy="90" fill="#000" r="90"/>
        <path d="M149.508 157.52L69.141 54H54v71.97h12.316V69.467l67.825 88.053c5.447-3.084 10.564-6.42 15.367-10.001z" fill="#fff"/>
        <path d="M117.842 54h12.316v72h-12.316z" fill="#fff"/>
      </svg>
    ),
  },
  {
    id: "javascript",
    name: "JavaScript",
    color: "#F7DF1E",
    textColor: "#000000",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0 rounded">
        <rect width="128" height="128" rx="16" fill="#F7DF1E"/>
        <path d="M67.312 103.938c3.188 5.25 7.875 9.188 15.75 9.188 6.75 0 11.438-3.375 11.438-8.25 0-5.625-4.5-7.688-12.188-10.875l-4.312-1.875c-12.375-5.25-20.438-11.812-20.438-25.688 0-12.562 9.75-22.125 24.938-22.125 10.875 0 18.75 3.938 24 13.125l-10.125 6.562c-2.812-4.875-6.188-6.938-13.875-6.938-5.812 0-9.75 3.188-9.75 7.312 0 4.875 3.188 6.75 10.5 9.938l4.312 1.875c14.625 6.188 22.5 12.375 22.5 26.625 0 15.188-12 23.438-27.938 23.438-15.562 0-25.125-7.125-30.375-17.062l11.062-6.375zm-38.625 1.5c2.438 4.312 6 7.688 12.188 7.688 6 0 9.75-2.625 9.75-9.375V45h15.188v58.875c0 14.812-8.625 21.75-23.438 21.75-12.188 0-19.875-6.375-24.188-15l10.5-6.188z" fill="#000"/>
      </svg>
    ),
  },
  {
    id: "typescript",
    name: "TypeScript",
    color: "#3178C6",
    textColor: "#FFFFFF",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0 rounded">
        <rect width="128" height="128" rx="16" fill="#3178C6"/>
        <path d="M72 90.75c2.875 4.725 7.088 8.269 14.175 8.269 6.075 0 10.294-3.038 10.294-7.425 0-5.063-4.05-6.919-10.969-9.788l-3.881-1.688c-11.138-4.725-18.394-10.631-18.394-23.119 0-11.306 8.775-19.913 22.444-19.913 9.788 0 16.875 3.544 21.6 11.813l-9.113 5.906c-2.531-4.388-5.569-6.244-12.488-6.244-5.231 0-8.775 2.869-8.775 6.581 0 4.388 2.869 6.075 9.45 8.944l3.881 1.688c13.163 5.569 20.25 11.138 20.25 23.963 0 13.669-10.8 21.094-25.144 21.094-14.006 0-22.613-6.413-27.338-15.356L72 90.75zM45 47.25H22.5V37.5H78.75v9.75H56.25V114H45V47.25z" fill="#fff"/>
      </svg>
    ),
  },
  {
    id: "nodejs",
    name: "Node.js",
    color: "#339933",
    textColor: "#FFFFFF",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0">
        <path d="M64 10.5L16.5 37.9v54.8L64 120.1l47.5-27.4V37.9L64 10.5zm37.8 77.2L64 109.8 26.2 87.7V43.5L64 21.4l37.8 22.1v44.2z" fill="#fff"/>
      </svg>
    ),
  },
  {
    id: "laravel",
    name: "Laravel",
    color: "#FF2D20",
    textColor: "#FFFFFF",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0">
        <path d="M119.8 33.1L67.1 2.7c-1.9-1.1-4.2-1.1-6.1 0L8.2 33.1c-1.9 1.1-3.1 3.2-3.1 5.4v60.9c0 2.2 1.2 4.3 3.1 5.4l52.8 30.4c1.9 1.1 4.2 1.1 6.1 0l52.8-30.4c1.9-1.1 3.1-3.2 3.1-5.4V38.5c-.1-2.2-1.3-4.3-3.2-5.4zm-55.8-21l41.6 24-17.8 10.3-41.6-24 17.8-10.3zm-46.8 27l41.6 24v48l-41.6-24v-48zm46.8 96l-41.6-24 17.8-10.3 41.6 24-17.8 10.3zm5.2-19.4v-48l41.6-24v48l-41.6 24z" fill="#fff"/>
      </svg>
    ),
  },
  {
    id: "mongodb",
    name: "MongoDB",
    color: "#13AA52",
    textColor: "#FFFFFF",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0">
        <path d="M64 12s-22 36-22 60c0 14 10 24 22 24s22-10 22-24c0-24-22-60-22-60zm0 76c-1.1 0-2-.9-2-2V28.5c.6.9 1.3 1.9 2 2.9.7-1 1.4-2 2-2.9V86c0 1.1-.9 2-2 2z" fill="#fff"/>
      </svg>
    ),
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    color: "#336791",
    textColor: "#FFFFFF",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0">
        <path d="M64 12C35.3 12 12 35.3 12 64s23.3 52 52 52 52-23.3 52-52S92.7 12 64 12zm21 44.5c-1.2 5.5-4.8 11.2-10.5 14.5-3.5 2-7.8 3.1-12.5 3.1-9 0-16.5-4.5-19.5-11.5l10-4.2c1.8 4 6 6.7 11 6.7 3 0 5.8-.8 7.8-2 3.2-1.8 5.2-5 5.8-8.1H50v-9h35v10.5z" fill="#fff"/>
      </svg>
    ),
  },
  {
    id: "docker",
    name: "Docker",
    color: "#2496ED",
    textColor: "#FFFFFF",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0">
        <path d="M118 64c-3.5 0-6.8 1.4-9.3 3.8-3.2-1.8-7-2.8-11.1-2.8-10.2 0-18.9 6.8-21.7 16H23.5c-2.4 0-4.7 1.4-5.8 3.5L8.2 103.5c-1 2-1 4.4 0 6.4 1 2 3.1 3.2 5.4 3.2h94.9c13.7 0 24.9-11.1 24.9-24.9 0-13.3-10.5-24.2-23.7-24.9.5-1.4.8-2.8.8-4.3 0-5.5-4.5-10-10.5-10z" fill="#fff"/>
      </svg>
    ),
  },
  {
    id: "tailwind",
    name: "Tailwind",
    color: "#06B6D4",
    textColor: "#FFFFFF",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0">
        <path d="M34.8 35.2c5.8-11.6 15.1-17.4 27.9-17.4 19.1 0 24.9 14.5 34.8 17.4 6.6 2 12.3-.3 17.4-6.8-5.8 11.6-15.1 17.4-27.9 17.4-19.1 0-24.9-14.5-34.8-17.4-6.7-2-12.4.3-17.4 6.8zm-20.9 34.8c5.8-11.6 15.1-17.4 27.9-17.4 19.1 0 24.9 14.5 34.8 17.4 6.6 2 12.3-.3 17.4-6.8-5.8 11.6-15.1 17.4-27.9 17.4-19.1 0-24.9-14.5-34.8-17.4-6.7-2-12.4.3-17.4 6.8z" fill="#fff"/>
      </svg>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    color: "#F24E1E",
    textColor: "#FFFFFF",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0">
        <circle cx="44" cy="44" r="20" fill="#fff"/>
        <circle cx="84" cy="44" r="20" fill="#fff"/>
        <circle cx="84" cy="84" r="20" fill="#fff"/>
        <circle cx="44" cy="84" r="20" fill="#fff"/>
      </svg>
    ),
  },
  {
    id: "aws",
    name: "AWS",
    color: "#FF9900",
    textColor: "#000000",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0">
        <path d="M64 12C35.3 12 12 35.3 12 64s23.3 52 52 52 52-23.3 52-52S92.7 12 64 12z" fill="#FF9900"/>
      </svg>
    ),
  },
  {
    id: "firebase",
    name: "Firebase",
    color: "#FFCA28",
    textColor: "#000000",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0">
        <path d="M26.1 94.6l18.5-35.3L27.5 27.2c-.8-1.5-3.1-1.1-3.3.6L14.7 91.2l11.4 3.4z" fill="#FFA000"/>
        <path d="M66.4 47.9l-13.2-25.2c-.7-1.4-2.7-1.4-3.4 0L38.2 47.9h28.2z" fill="#F44336"/>
        <path d="M66.4 47.9L53.2 22.7c-.7-1.4-2.7-1.4-3.4 0L38.2 47.9l24.4 46.7 4.8-1.4 39.7-45.3H66.4z" fill="#000"/>
      </svg>
    ),
  },
  {
    id: "n8n",
    name: "N8N AI",
    color: "#FF6584",
    textColor: "#FFFFFF",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "python",
    name: "Python",
    color: "#3776AB",
    textColor: "#FFFFFF",
    iconSvg: (
      <svg viewBox="0 0 128 128" className="w-4 h-4 shrink-0">
        <path d="M63 12c-23.6 0-22.1 10.2-22.1 10.2l.1 10.6h22.6v3.2H32.4S18 34.3 18 58c0 23.6 12.6 22.8 12.6 22.8h7.5v-10.6s-.4-12.6 12.6-12.6h21.7s12.2-.2 12.2-12.1V24.2S86.6 12 63 12zm-6.6 7c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2-4.2-1.9-4.2-4.2 1.9-4.2 4.2-4.2z" fill="#fff"/>
      </svg>
    ),
  },
];

export function TechPhysicsPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    // 1. Matter.js Engine & World
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.1, scale: 0.001 },
    });
    const world = engine.world;

    // 2. Invisible Boundaries matching card's inner area
    const wallOptions = {
      isStatic: true,
      restitution: 0.8,
      friction: 0.05,
    };

    const wallThickness = 100;
    const ground = Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);

    Matter.Composite.add(world, [ground, ceiling, leftWall, rightWall]);

    // 3. Create Rigid Bodies for Card's Badges
    const bodies: Matter.Body[] = [];

    TECHNOLOGIES.forEach((tech, idx) => {
      const nameLength = tech.name.length;
      const bw = Math.max(90, Math.min(130, nameLength * 9 + 45));
      const bh = 34;

      const cols = 3;
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      const startX = Math.max(bw / 2 + 10, Math.min(width - bw / 2 - 10, (col + 0.5) * (width / cols) + (Math.random() - 0.5) * 15));
      const startY = Math.max(bh / 2 + 10, (row + 0.5) * 45 + (Math.random() - 0.5) * 15);

      const body = Matter.Bodies.rectangle(startX, startY, bw, bh, {
        chamfer: { radius: 17 },
        restitution: 0.8,
        friction: 0.05,
        frictionAir: 0.008,
        density: 0.002,
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2.5,
        y: Math.random() * 1.5 + 0.3,
      });

      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);

      bodies.push(body);
    });

    Matter.Composite.add(world, bodies);

    // 4. Mouse Constraint for Dragging inside Card
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Matter.Composite.add(world, mouseConstraint);
    mouse.element.style.touchAction = "none";

    let animationFrameId: number;

    // 5. Render Loop for 60FPS DOM sync
    const renderLoop = () => {
      Matter.Engine.update(engine, 1000 / 60);

      // Keep motion alive
      bodies.forEach((body) => {
        const speed = Math.hypot(body.velocity.x, body.velocity.y);
        if (speed < 0.15) {
          Matter.Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.0005,
            y: (Math.random() - 0.5) * 0.0005,
          });
        }
      });

      bodies.forEach((body, i) => {
        const domNode = badgeRefs.current[i];
        if (domNode) {
          const { x, y } = body.position;
          const angle = body.angle;
          domNode.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}rad)`;
        }
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    setIsLoaded(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden select-none touch-none bg-[#F1F5F9] border border-black/5"
    >
      {/* Background Subtle Dot Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* DOM Synchronized Technology Pill Badges inside Card */}
      {TECHNOLOGIES.map((tech, idx) => (
        <div
          key={tech.id}
          ref={(el) => {
            badgeRefs.current[idx] = el;
          }}
          className="absolute top-0 left-0 px-3.5 py-1.5 rounded-full font-heading font-extrabold text-[11px] sm:text-xs tracking-wider shadow-sm flex items-center gap-2 border cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-150 z-10"
          style={{
            backgroundColor: tech.color,
            color: tech.textColor,
            borderColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: `0 4px 12px rgba(0,0,0,0.15)`,
            opacity: isLoaded ? 1 : 0,
            willChange: "transform",
          }}
        >
          {tech.iconSvg}
          <span className="whitespace-nowrap uppercase">{tech.name}</span>
        </div>
      ))}
    </div>
  );
}
