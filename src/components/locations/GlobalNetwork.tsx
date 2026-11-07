"use client";

const NODES = [
  { x: 118, y: 118, r: 4 },
  { x: 168, y: 92, r: 3 },
  { x: 214, y: 128, r: 3.5 },
  { x: 252, y: 98, r: 3 },
  { x: 286, y: 142, r: 3 },
  { x: 148, y: 168, r: 3 },
  { x: 198, y: 178, r: 3.5 },
  { x: 238, y: 158, r: 3 },
];

const ARCS = [
  "M118 118 C148 70, 198 70, 214 128",
  "M168 92 C210 80, 250 90, 252 98",
  "M118 118 C150 160, 190 170, 198 178",
  "M214 128 C240 110, 270 120, 286 142",
  "M148 168 C190 150, 230 148, 238 158",
  "M168 92 C180 140, 200 150, 214 128",
];

export function GlobalNetwork() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(224,0,11,0.12),transparent_42%),radial-gradient(circle_at_70%_70%,rgba(17,17,17,0.06),transparent_55%)]" />
      <svg viewBox="0 0 400 400" className="relative h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="ak-orbit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0000B" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#111111" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="168" fill="none" stroke="rgba(17,17,17,0.08)" strokeWidth="1" />
        <circle cx="200" cy="200" r="132" fill="url(#ak-orbit)" stroke="rgba(17,17,17,0.1)" strokeWidth="1" />
        <ellipse cx="200" cy="200" rx="132" ry="44" fill="none" stroke="rgba(17,17,17,0.12)" />
        <ellipse cx="200" cy="200" rx="44" ry="132" fill="none" stroke="rgba(17,17,17,0.1)" />
        <ellipse cx="200" cy="200" rx="96" ry="132" fill="none" stroke="rgba(17,17,17,0.08)" />
        <g transform="translate(50 70)">
          {ARCS.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="#E0000B"
              strokeWidth="1.4"
              strokeDasharray="6 10"
              className="ak-globe-line"
            />
          ))}
          {NODES.map((node, index) => (
            <g key={`${node.x}-${node.y}`}>
              <circle cx={node.x} cy={node.y} r={node.r + 8} fill="#E0000B" opacity="0.12" className="ak-globe-pulse" style={{ animationDelay: `${index * 0.35}s` }} />
              <circle cx={node.x} cy={node.y} r={node.r} fill={index % 3 === 0 ? "#E0000B" : "#111111"} />
            </g>
          ))}
        </g>
      </svg>
      <style>{`
        .ak-globe-line { animation: ak-dash 8s linear infinite; }
        .ak-globe-pulse { animation: ak-pulse 3.2s ease-out infinite; }
        @keyframes ak-dash { to { stroke-dashoffset: -160; } }
        @keyframes ak-pulse {
          0% { opacity: 0.2; transform: scale(0.7); }
          70% { opacity: 0; transform: scale(1.35); }
          100% { opacity: 0; transform: scale(1.35); }
        }
      `}</style>
    </div>
  );
}
