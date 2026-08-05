"use client";

import React, { useEffect, useRef } from "react";

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Approximate 2x2 rotation matrix
    float c = 0.8660254; // cos(30 deg)
    float s = 0.5;       // sin(30 deg)
    for (int i = 0; i < 4; ++i) {
      v += a * noise(p);
      p = vec2(c * p.x - s * p.y, s * p.x + c * p.y) * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    
    // Smooth mouse coordinates translation
    vec2 m = u_mouse / u_resolution.xy;
    m = (m * 2.0 - 1.0) * (u_resolution.xy / min(u_resolution.x, u_resolution.y));
    m.y = -m.y; // Invert y-axis to match WebGL coords

    float dist = length(p - m);
    float mouseGlow = smoothstep(1.5, 0.0, dist) * 0.12;

    // Layered noise for flow speed
    float t = u_time * 0.06;
    vec2 uv1 = p * 1.2;
    uv1.y += t;
    uv1.x += sin(t * 0.4) * 0.4;
    
    float n1 = fbm(uv1);
    
    vec2 uv2 = p * 1.8;
    uv2.y -= t * 0.6;
    uv2.x -= cos(t * 0.2) * 0.3;
    float n2 = fbm(uv2 + n1 * 0.5);

    // Brand color composition (Deep Space, Cyan, Purple)
    vec3 col1 = vec3(0.023, 0.031, 0.086); // Deep space foundation #060816
    vec3 col2 = vec3(0.03, 0.18, 0.3) * n1;   // Cyan energy
    vec3 col3 = vec3(0.18, 0.08, 0.35) * n2;  // Purple ambient glow
    
    vec3 finalColor = col1 + col2 + col3;
    finalColor += vec3(0.08, 0.25, 0.45) * mouseGlow; // Interactive cursor sweep

    // Extremely fine twinkling starry layer
    float stars = step(0.995, hash(gl_FragCoord.xy + vec2(fract(u_time * 0.0001)))) * 0.05 * noise(p * 25.0 + u_time * 0.08);
    finalColor += vec3(stars);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function HeroShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported, falling back to basic background.");
      return;
    }

    // Compile Shader helper
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(VERTEX_SHADER_SOURCE, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(FRAGMENT_SHADER_SOURCE, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    // Link Program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Setup buffer for full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    // Mouse coordinates tracker
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentMouseX = mouseX;
    let currentMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle Resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      const elapsedSeconds = (performance.now() - startTime) / 1000;

      // Smooth mouse damping
      currentMouseX += (mouseX - currentMouseX) * 0.08;
      currentMouseY += (mouseY - currentMouseY) * 0.08;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, elapsedSeconds);
      gl.uniform2f(mouseLocation, currentMouseX, currentMouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 block pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
