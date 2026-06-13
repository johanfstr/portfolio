"use client"

import { useState, useRef, useEffect } from "react"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { NoiseTexture } from "@/components/ui/noise-texture"
import { cn } from "@/lib/utils"

const R = 28; // rayon du cercle SVG
const C = 2 * Math.PI * R; // circonférence

function SkillChip({ name, pct }: { name: string; pct: number }) {
  const [hovered, setHovered] = useState(false);
  const dash = (pct / 100) * C;

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Chip */}
      <span className={cn(
        "inline-block px-3 py-1 rounded-md text-sm font-mono cursor-default transition-colors duration-150",
        "bg-white/[0.07] border border-white/10 text-slate-300 hover:border-purple-500/50 hover:text-white"
      )}>
        {name}
      </span>

      {/* Hover popup */}
      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 flex flex-col items-center gap-1 bg-[#1a1625] border border-white/10 rounded-xl p-3 shadow-xl pointer-events-none" style={{ minWidth: 80 }}>
          <svg width={70} height={70} viewBox="0 0 70 70">
            <circle cx={35} cy={35} r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={5} />
            <circle
              cx={35} cy={35} r={R} fill="none"
              stroke="#a78bfa" strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${C}`}
              transform="rotate(-90 35 35)"
            />
            <text x={35} y={39} textAnchor="middle" fill="white" fontSize={13} fontWeight={700} fontFamily="monospace">{pct}%</text>
          </svg>
          <span className="text-xs text-slate-400 text-center">{name}</span>
        </div>
      )}
    </div>
  );
}

const skillCategories = [
  {
    label: "Frontend",
    skills: [
      { name: "Next.js", pct: 85 },
      { name: "React", pct: 88 },
      { name: "TypeScript", pct: 80 },
      { name: "Tailwind CSS", pct: 90 },
      { name: "HTML/CSS", pct: 95 },
      { name: "Framer Motion", pct: 65 },
      { name: "Responsive Design", pct: 90 },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", pct: 70 },
      { name: "REST APIs", pct: 75 },
      { name: "SQL", pct: 75 },
      { name: "PHP", pct: 60 },
      { name: "Symfony", pct: 50 },
      { name: "Django", pct: 50 },
    ],
  },
  {
    label: "Langages",
    skills: [
      { name: "C", pct: 75 },
      { name: "C#", pct: 70 },
      { name: "C++", pct: 60 },
      { name: "JavaScript", pct: 75 },
      { name: "TypeScript", pct: 80 },
      { name: "Java", pct: 65 },
      { name: "OCaml", pct: 70 },
      { name: "Python", pct: 60 },
      { name: "Bash", pct: 70 },
    ],
  },
  {
    label: "Outils",
    skills: [
      { name: "Git", pct: 85 },
      { name: "GitHub", pct: 70 },
      { name: "Docker", pct: 60 },
      { name: "VS Code", pct: 95 },
      { name: "Makefile", pct: 85 },
      { name: "CMake", pct: 70 },
      { name: "Linux", pct: 70 },
      { name: "Vercel", pct: 80 },
      { name: "Firebase", pct: 65 },
    ],
  },
]

const stats = [
  { value: "5+", label: "années de code" },
  { value: "10+", label: "projets réalisés" },
  { value: "6", label: "langages maîtrisés" },
]

const TechIcon = ({ label, src }: { label: string; src: string }) => (
  <div className="w-10 h-10 flex items-center justify-center" title={label}>
    <img src={src} alt={label} className="w-6 h-6 object-contain" />
  </div>
)

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section id="skills" className="relative py-24 bg-[#0b0a0d]">
          {/* Noise texture overlay */}
          <NoiseTexture
            className={cn(
              "absolute inset-0 z-0",
              ""
            )}
          />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className={`mb-14 transition-all duration-700 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-extrabold" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
            — Compétences
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-playfair">
            Mon stack technique
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl">
            Les technologies et outils que j'utilise au quotidien pour concevoir et développer des projets.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

          {/* Card 1 — Chips + hover circle */}
          <div className="md:col-span-2 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.5s ease, transform 0.5s ease", transitionDelay: "0ms" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {skillCategories.map((cat) => (
                <div key={cat.label}>
                  <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">{cat.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <SkillChip key={s.name} name={s.name} pct={s.pct} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 — Orbiting circles */}
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex items-center justify-center min-h-[340px] relative overflow-hidden"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.5s ease, transform 0.5s ease", transitionDelay: "220ms" }}>
            <div className="relative flex items-center justify-center w-full h-full" style={{ minHeight: 280 }}>
              {/* Center */}
              <div className="z-10 w-14 h-14 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-300 text-purple-900 font-bold text-xs">&lt;/&gt;</span>
              </div>
              {/* Outer orbit */}
              <OrbitingCircles iconSize={36} radius={110} speed={0.6}>
                <TechIcon label="Next.js" src="/images/nextjs.png" />
                <TechIcon label="React" src="/images/react.png" />
                <TechIcon label="TypeScript" src="/images/typescript.png" />
                <TechIcon label="Node.js" src="/images/nodejs.png" />
                <TechIcon label="Git" src="/images/git.png" />
                <TechIcon label="Docker" src="/images/docker.svg" />
                <TechIcon label="Linux" src="/images/linux.svg" />
                <TechIcon label="VS Code" src="/images/vscode.svg" />
                <TechIcon label="SQL" src="/images/sql.svg" />
                <TechIcon label="PHP" src="/images/php.svg" />
                <TechIcon label="Tailwind CSS" src="/images/tailwind.png" />
              </OrbitingCircles>
              {/* Inner orbit */}
              <OrbitingCircles iconSize={28} radius={58} reverse speed={1}>
                <TechIcon label="C" src="/images/c.png" />
                <TechIcon label="C#" src="/images/csharp.png" />
                <TechIcon label="C++" src="/images/cpp.svg" />
                <TechIcon label="JavaScript" src="/images/javascript.svg" />
                <TechIcon label="Java" src="/images/java.png" />
                <TechIcon label="OCaml" src="/images/ocaml.svg" />
                <TechIcon label="Python" src="/images/python.svg" />
              </OrbitingCircles>
            </div>
          </div>

          {/* Card 3 — Stats (col-span-3) */}
          <div className="md:col-span-3 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.5s ease, transform 0.5s ease", transitionDelay: "340ms" }}>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center py-4 rounded-xl bg-white/5 border border-white/10 gap-1">
                  <span className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{s.value}</span>
                  <span className="text-slate-400 text-sm text-center">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
