"use client"

import { useEffect, useRef, useState } from "react"

interface Skill {
  id: string
  name: string
  level: number
  description: string
}

const skills: Skill[] = [
  {
    id: "1",
    name: "React & Next.js",
    level: 85,
    description: "Framework modern pour construire des interfaces web dynamiques et performantes avec TypeScript.",
  },
  {
    id: "2",
    name: "JavaScript & TypeScript",
    level: 80,
    description: "Langage typé superset de JavaScript pour améliorer la qualité du code et réduire les erreurs.",
  },
  {
    id: "3",
    name: "C & C#",
    level: 75,
    description: "Langages de programmation pour le développement d'applications système et logicielles.",
  },
  {
    id: "4",
    name: "OCaml",
    level: 75,
    description: "Langage fonctionnel pour l'algorithmique avancée et l'analyse de données.",
  },
  {
    id: "5",
    name: "Python",
    level: 70,
    description: "Langage de haut niveau pour l'analyse de données et l'intelligence artificielle.",
  },
  {
    id: "6",
    name: "Java",
    level: 65,
    description: "Langage orienté objet pour le développement d'applications enterprise.",
  },
]

export default function Skills() {
  const [visible, setVisible] = useState<boolean[]>(() => skills.map(() => false))
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(skills.map(() => true))
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-idx"))
          if (entry.isIntersecting) {
            setVisible((v) => {
              const next = [...v]
              next[idx] = true
              return next
            })
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    cardsRef.current.forEach((el) => el && obs.observe(el))

    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="py-20 px-6 bg-transparent min-h-screen flex items-center" data-scroll data-scroll-section>
      <div className="w-full max-w-7xl mx-auto grid gap-12 lg:grid-cols-[minmax(280px,360px)_1fr] items-start">
        <div className="space-y-8">
          <div className="sticky top-32">
            <span className="text-sm uppercase tracking-[0.3em] text-purple-300">Compétences</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-geist-sans">Mes skills</h2>
            <p className="mt-6 text-white/70 text-lg leading-8">
              Découvrez les technologies et langages que je maîtrise, avec mon niveau de compétence pour chacun.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start" data-scroll data-scroll-speed="0.08">
          {skills.map((skill, idx) => {
            return (
              <div
                key={skill.id}
                data-idx={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el
                }}
                className={`rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-b from-gray-800 to-gray-850 shadow-xl transform transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-2 ${
                  visible[idx]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                data-scroll
                data-scroll-speed="0.08"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{skill.name}</h3>
                  <p className="text-sm text-white/70 mb-6">{skill.description}</p>

                  {/* Skill Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-white/80">Niveau</span>
                      <span className="text-sm font-semibold text-purple-400">{skill.level}%</span>
                    </div>
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transform transition-all duration-1000 ease-out"
                        style={{
                          width: visible[idx] ? `${skill.level}%` : "0%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
