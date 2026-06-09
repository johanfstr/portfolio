"use client"

import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { NoiseTexture } from "@/components/ui/noise-texture"
import { cn } from "@/lib/utils"

const skillCategories = [
  {
    label: "Frontend",
    skills: [
      { name: "Next.js", pct: 85 },
      { name: "React", pct: 88 },
      { name: "TypeScript", pct: 80 },
      { name: "Tailwind CSS", pct: 90 },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", pct: 70 },
      { name: "REST APIs", pct: 75 },
      { name: "SQL", pct: 65 },
    ],
  },
  {
    label: "Langages",
    skills: [
      { name: "C", pct: 75 },
      { name: "Java", pct: 65 },
      { name: "C#", pct: 60 },
      { name: "OCaml", pct: 55 },
    ],
  },
  {
    label: "Outils",
    skills: [
      { name: "Git", pct: 85 },
      { name: "GitHub", pct: 70 },
      { name: "VS Code", pct: 95 },
    ],
  },
]

const stats = [
  { value: "5+", label: "années de code" },
  { value: "10+", label: "projets réalisés" },
  { value: "6", label: "langages maîtrisés" },
]

const TechIcon = ({ label, char }: { label: string; char: string }) => (
  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-sm" title={label}>
    {char}
  </div>
)

export default function Skills() {
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
        <div className="mb-14">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

          {/* Card 1 — Skill bars (col-span-2) */}
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-white font-semibold text-lg mb-6">Niveaux</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
              {skillCategories.map((cat) => (
                <div key={cat.label}>
                  <p className="text-purple-400 text-xs uppercase tracking-widest font-bold mb-3">{cat.label}</p>
                  <div className="space-y-3">
                    {cat.skills.map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">{s.name}</span>
                          <span className="text-slate-500">{s.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full"
                            style={{ width: `${s.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 — Orbiting circles */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center min-h-[340px] relative overflow-hidden">
            <div className="relative flex items-center justify-center w-full h-full" style={{ minHeight: 280 }}>
              {/* Center */}
              <div className="z-10 w-14 h-14 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center">
                <span className="text-purple-300 font-bold text-xs text-center leading-tight">&lt;/&gt;</span>
              </div>
              {/* Outer orbit */}
              <OrbitingCircles iconSize={36} radius={110} speed={0.6}>
                <TechIcon label="Next.js" char="N" />
                <TechIcon label="React" char="R" />
                <TechIcon label="TypeScript" char="TS" />
                <TechIcon label="Node.js" char="No" />
                <TechIcon label="Git" char="G" />
              </OrbitingCircles>
              {/* Inner orbit */}
              <OrbitingCircles iconSize={28} radius={58} reverse speed={1}>
                <TechIcon label="C" char="C" />
                <TechIcon label="Java" char="J" />
                <TechIcon label="OCaml" char="O" />
              </OrbitingCircles>
            </div>
          </div>

          {/* Card 3 — Stats (col-span-3) */}
          <div className="md:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-8">
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
