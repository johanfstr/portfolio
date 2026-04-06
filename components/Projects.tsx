"use client"

import { useEffect, useRef, useState } from "react"

interface Technology {
  name: string
  logo: string
}

interface Project {
  id: string
  title: string
  image: string
  description: string
  accent: string
  ctaUrl: string
  fullDescription: string
  technologies: Technology[]
}

const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio V1",
    image: "",
    description:
      "Portfolio personnel mettant en avant mes compétences en développement.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/portfolio",
    fullDescription: "Ce portfolio V1 a été développé avec React et Tailwind CSS. Il présente mes compétences et projets de manière élégante et responsive. Les animations subtiles améliorent l'expérience utilisateur.",
    technologies: [
      { name: "React", logo: "/images/react.png" },
      { name: "Tailwind CSS", logo: "/images/tailwind.png" },
    ],
  },
  {
    id: "2",
    title: "Tower Defense Game",
    image: "",
    description: "Jeu de tower defense permet de génerer des tours autour de chemins aléatoires.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/TowerDefend",
    fullDescription: "Un jeu de tower defense complet développé en C utilisant SDL2. Le jeu génère des chemins aléatoires et permet de placer des tours avec différentes mécaniques de jeu.",
    technologies: [
      { name: "C", logo: "/images/c.png" },
      { name: "SDL2", logo: "/images/sdl.svg" },
    ],
  },
  {
    id: "3",
    title: "OCrackml",
    image: "/images/ocrackml.png",
    description: "Analyse et d'exploitation de fuites de données issues de différentes applications web.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/OCrackml",
    fullDescription: "Projet OCaml pour analyser et exploiter des fuites de données web. Focus sur l'analyse de données et la sécurité informatique.",
    technologies: [
      { name: "OCaml", logo: "/images/ocaml.svg" },
    ],
  },
]

export default function Projects() {
  const [visible, setVisible] = useState<boolean[]>(() => projects.map(() => false))
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
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
                className={`rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-b from-gray-800 to-gray-850 shadow-xl transform transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-2 ${
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
                  <p className="text-sm mb-4">{p.description}</p>
                  {p.technologies && p.technologies.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {p.technologies.map((tech, techIdx) => (
                        <div
                          key={techIdx}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-full text-xs text-white"
                        >
                          {tech.logo && (
                            <img src={tech.logo} alt={tech.name} className="w-4 h-4" />
                          )}
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedProject(idx)}
                    className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
                  >
                    Voir plus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedProject !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">{projects[selectedProject].title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white/70 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              {projects[selectedProject].image && (
                <img
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <p className="text-white/80 mb-4">{projects[selectedProject].fullDescription}</p>
              
              {projects[selectedProject].technologies && projects[selectedProject].technologies.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Technologies utilisées :</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].technologies.map((tech, techIdx) => (
                      <div
                        key={techIdx}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-full text-sm text-white"
                      >
                        {tech.logo && (
                          <img src={tech.logo} alt={tech.name} className="w-5 h-5" />
                        )}
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-4">
                <a
                  href={projects[selectedProject].ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
                >
                  Voir sur GitHub
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 border border-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
