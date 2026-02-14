"use client"

import { useEffect, useRef, useState } from "react"

const projects = [
  {
    id: "lorem ipsum",
    title: "lorem ipsum",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    accent: "from-black-500 to-purple-600",
  },
  {
    id: "lorem ipsum 2",
    title: "lorem ipsum 2",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    accent: "from-black-500 to-purple-600",
  },
  {
    id: "lorem ipsum 3",
    title: "lorem ipsum 3",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    accent: "from-black-500 to-purple-600",
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
    <section id="projects" className="py-20 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white font-geist-sans">Projets</h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, idx) => (
          <div
            key={p.id}
            data-idx={idx}
            ref={(el) => {
              cardsRef.current[idx] = el
            }}
            className={`rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl transform transition-all duration-700 ease-out ${
              visible[idx]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className={`h-44 bg-gradient-to-br ${p.accent} bg-opacity-30 flex items-center justify-center`}
              style={{ boxShadow: "inset 0 -40px 40px rgba(0,0,0,0.6)" }}
            >
              <div className="text-white/90 text-xl font-semibold">{p.title}</div>
            </div>

            <div className="p-6 text-center text-white/80">
              <h3 className="text-xl font-semibold text-white mb-3">{p.title}</h3>
              <p className="text-sm mb-6">{p.description}</p>
              <a
                href="#"
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-white-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Voir plus
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
