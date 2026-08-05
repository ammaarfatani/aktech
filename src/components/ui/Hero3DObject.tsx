"use client";

import React, { useEffect, useRef } from "react";

export function Hero3DObject() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // 3D Point Interface
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    // Generate Torus Knot vertices
    const points: Point3D[] = [];
    const numPoints = 220;
    const p = 3; // Knot parameters
    const q = 7;
    const R = 2.4; // Major radius
    const r = 0.9; // Minor radius

    for (let i = 0; i < numPoints; i++) {
      const theta = (i / numPoints) * Math.PI * 2 * p;
      const x = (R + r * Math.cos((q / p) * theta)) * Math.cos(theta);
      const y = (R + r * Math.cos((q / p) * theta)) * Math.sin(theta);
      const z = r * Math.sin((q / p) * theta);
      points.push({ x, y, z });
    }

    // Interactive rotation offsets
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const xPercent = (e.clientX / window.innerWidth) - 0.5;
      const yPercent = (e.clientY / window.innerHeight) - 0.5;
      targetRotX = yPercent * 1.5;
      targetRotY = xPercent * 1.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      const size = Math.min(window.innerWidth * 0.45, 520);
      canvas.width = size;
      canvas.height = size;
      width = size;
      height = size;
    };
    resize();
    window.addEventListener("resize", resize);

    // Animation variables
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Smooth damping for mouse interaction
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      // Base rotation + mouse interaction
      angleX = (performance.now() * 0.0003) + currentRotX;
      angleY = (performance.now() * 0.0004) + currentRotY;
      angleZ = performance.now() * 0.0001;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // Project and draw lines
      const projected: { x: number; y: number; z: number }[] = [];
      const scale = width * 0.16; // Projection size scaler
      const depth = 6;            // Camera Z distance

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // 3D Rotations (Euler angles)
        // Rotate X
        let y1 = pt.y * cosX - pt.z * sinX;
        let z1 = pt.y * sinX + pt.z * cosX;

        // Rotate Y
        let x2 = pt.x * cosY + z1 * sinY;
        let z2 = -pt.x * sinY + z1 * cosY;

        // Rotate Z
        let x3 = x2 * cosZ - y1 * sinZ;
        let y3 = x2 * sinZ + y1 * cosZ;

        // Perspective Projection
        const wVal = 1 / (z2 + depth);
        const projX = width / 2 + x3 * scale * wVal;
        const projY = height / 2 + y3 * scale * wVal;

        projected.push({ x: projX, y: projY, z: z2 });
      }

      // Draw the Torus Knot line with glowing depth sorting
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        const p2 = projected[(i + 1) % projected.length];

        // Depth sorting opacity: closer lines are brighter
        const avgDepth = (p1.z + p2.z) / 2; // Range -r to +r (-0.9 to 0.9)
        const opacity = Math.max(0.12, Math.min(1.0, 0.5 - (avgDepth / 1.8)));

        // Purple-cyan gradient style
        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        gradient.addColorStop(0, `rgba(56, 189, 248, ${opacity})`); // Cyan
        gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`); // Purple

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        
        // Glow effect for close points
        if (opacity > 0.6) {
          ctx.shadowColor = "rgba(56, 189, 248, 0.35)";
          ctx.shadowBlur = 15;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] pointer-events-none">
      {/* Underlying halo ring */}
      <div className="absolute inset-0 rounded-full border border-blue-500/10 blur-[2px] scale-95 animate-[spin_50s_linear_infinite]" />
      <div className="absolute inset-4 rounded-full border border-dashed border-purple-500/5 scale-90 animate-[spin_40s_linear_infinite_reverse]" />
      
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="relative z-10 block pointer-events-none drop-shadow-[0_0_35px_rgba(56,189,248,0.2)]" />
    </div>
  );
}
