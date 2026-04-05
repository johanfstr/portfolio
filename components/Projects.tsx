"use client"

import { useEffect, useRef, useState } from "react"

const projects = [
  {
    id: "1",
    title: "Portfolio V1",
    image: "",
    description:
      "Développé en React et Tailwind CSS, ce portfolio présente mes projets et compétences de manière élégante et responsive. Il intègre des animations subtiles pour une expérience utilisateur fluide.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/portfolio",
  },
  {
    id: "2",
    title: "Tower Defense Game",
    image: "",
    description: "Développé en C avec la bibliothèque SDL2, ce jeu de tower defense permet de génerer des tours autour de chemins aléatoires avec des mécaniques de jeu dynamiques.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/TowerDefend",
  },
  {
    id: "3",
    title: "OCrackml",
    image: "/images/ocrackml.png",
    description: "Développé en OCaml, c'est un projet d'analyse et d'exploitation de fuites de données issues de différentes applications web, afin de travailler sur l'analyse de données et la sécurité informatique.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/OCrackml",
  },
]

export default function Projects() {
  const [visible, setVisible] = useState<boolean[]>(() => projects.map(() => false))
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // fallback: show all
      setVisible(projects.map(() => true))
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
    <section id="projects" className="py-20 px-6 bg-transparent min-h-screen flex items-center" data-scroll data-scroll-section>
      <div className="w-full max-w-7xl mx-auto grid gap-12 lg:grid-cols-[minmax(280px,360px)_1fr] items-start">
        <div className="space-y-8">
          <div className="sticky top-32">
            <span className="text-sm uppercase tracking-[0.3em] text-purple-300">Projets</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-geist-sans">Mes réalisations</h2>
            <p className="mt-6 text-white/70 text-lg leading-8">
              Découvrez une sélection de projets sur lesquels j'ai travaillé, mettant en avant mes compétences en développement.
            </p>
            <br />
            <br />
            <a
            href="https://github.com/johanfstr" target="_blank" aria-label="GitHub"
            className="px-6 py-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full font-semibold shadow-lg transition-all transform hover:scale-105"
            >
              Voir plus sur mon github
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start" data-scroll data-scroll-speed="0.08">
          {projects.map((p, idx) => {
            const cardSpeed = "0.08";

            return (
              <div
                key={p.id}
                data-idx={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el
                }}
                className={`rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-b from-gray-800 to-gray-850 shadow-xl transform transition-all duration-700 ease-out ${
                  visible[idx]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                data-scroll
                data-scroll-speed={cardSpeed}
              >
                <div
                  className={`h-44 bg-gradient-to-br ${p.accent} bg-opacity-30 flex items-center justify-center relative`}
                  style={{ boxShadow: "inset 0 -40px 40px rgba(0,0,0,0.6)" }}
                >
                  <div className="absolute inset-0"></div>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="relative z-10 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white/90 text-xl font-semibold relative z-10">{p.title}</div>
                  )}
                </div>

                <div className="p-6 text-center text-white/80">
                  <h3 className="text-xl font-semibold text-white mb-3">{p.title}</h3>
                  <p className="text-sm mb-6">{p.description}</p>
                  <a
                    href={p.ctaUrl ?? "#"}
                    target={p.ctaUrl?.startsWith("http") ? "_blank" : undefined}
                    rel={p.ctaUrl?.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
                  >
                    Voir plus
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
