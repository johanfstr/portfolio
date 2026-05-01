"use client"

import { useEffect, useRef, useState } from "react"

interface SoftSkill {
  name: string
}

interface Experience {
  id: string
  title: string
  company: string
  description: string
  fullDescription: string
  dateStart: string
  dateEnd: string
  softSkills: SoftSkill[]
}

const experiences: Experience[] = [
  {
    id: "1",
    title: "Préparateur de commandes - intérim",
    company: "Malvaux (Saint-Gelais, 79)",
    description: "Préparation de commandes et gestion de l'inventaire dans un environnement d'entrepôt dynamique",
    fullDescription: "Préparation de ~40 commandes par jour avec chariot élevateur (CACES 1a) et un terminal PDA. (scan des produits, saisies des quantités, vérification de la conformité). Travail en équipe pour assurer une logistique fluide et efficace, respect des délais et des normes de sécurité lors de cadences soutenues. Suivi des stocks et gestion d'inventaire via le système de gestion d'entrepôt (WMS).",
    dateStart: "Aout 2025",
    dateEnd: "Fin Aout 2025",
    softSkills: [
      { name: "Communication" },
      { name: "Travail d'équipe" },
      { name: "Endurance" },
      { name: "Organisation" },
    ],
  },
  {
    id: "2",
    title: "Travaux de magasinage, approvisionnement machine - intérim",
    company: "La Poste (Chauray, 79)",
    description: "Chargé de l'approvisionnement des machines de tri et du magasinage dans un centre de distribution postal",
    fullDescription: "Tri et magasinage de ~150 colis par heure dans un centre de distribution postal. Approvisionnement en continu des machines de tri automatisées pour assurer un flux de travail ininterrompu. Respect strict des normes de sécurité et des procédures opérationnelles dans un environnement à rythme rapide.",
    dateStart: "Juillet 2024",
    dateEnd: "Fin Aout 2024",
    softSkills: [
      { name: "Rigueur" },
      { name: "Précision" },
      { name: "Autonomie" },
      { name: "Gestion du temps" },
    ],
  },
  {
    id: "3",
    title: "Agent de quai et manutentionnaire - intérim",
    company: "FedEx (La Crèche, 79)",
    description: "Chargé de la manutention et du chargement/déchargement des palettes de livraison dans un centre de tri express",
    fullDescription: "Manutention de palettes de colis dans un centre de tri express. Chargement et déchargement de camions avec utilisation d'équipements de levage (transpalette, chariot élévateur). Travail en équipe pour assurer une logistique fluide et efficace, respect des délais et des normes de sécurité lors de cadences soutenues.",
    dateStart: "Avril 2024",
    dateEnd: "Mai 2024",
    softSkills: [
      { name: "Endurance" },
      { name: "Travail d'équipe" },
      { name: "Autonomie" },
      { name: "Adaptabilité" },
    ],
  },
  {
    id: "4",
    title: "Préparateur de commandes - intérim",
    company: "Kuehne + Nagel (Prahecq, 79)",
    description: "Préparation de commandes et mise à quai des marchandises dans un entrepôt dynamique ",
    fullDescription: "Préparation de commandes avec chariot élevateur (CACES 1a) et système de Voice picking. (diction de code de controles à l'aide d'un casque audio qui nous communique, vérification de la conformité). Respect des délais et des normes de sécurité lors de cadences soutenues.",
    dateStart: "Juillet 2023",
    dateEnd: "Fin Aout 2023",
    softSkills: [
      { name: "Endurance" },
      { name: "Autonomie" },
      { name: "Gestion du temps" },
      { name: "Efficacité" },
    ],
  },
]

export default function Experience() {
  const [visible, setVisible] = useState<boolean[]>(() => experiences.map(() => false))
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(experiences.map(() => true))
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
    <section id="experiences" className="py-20 px-6 bg-transparent min-h-screen flex items-center" data-scroll data-scroll-section>
      <div className="w-full max-w-7xl mx-auto grid gap-12 lg:grid-cols-[minmax(280px,360px)_1fr] items-start">
        <div className="space-y-8">
          <div className="sticky top-32">
            <span className="text-sm uppercase tracking-[0.3em] text-purple-300">Expériences</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-geist-sans">Mes expériences</h2>
            <p className="mt-6 text-white/70 text-lg leading-8">
              Découvrez mon parcours professionnel et les expériences qui ont façonné mon approche du développement.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative" data-scroll data-scroll-speed="0.08">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-purple-400 to-purple-600"></div>

          {/* Experience cards */}
          <div className="space-y-4 md:space-y-4">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                data-idx={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el
                }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-6 top-0 w-14 h-14 md:w-12 md:h-12 flex items-center justify-center z-10">
                  <div className={`w-6 h-6 md:w-5 md:h-5 rounded-full border-4 border-gray-900 bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg transform transition-all duration-500 ${
                    visible[idx] ? "scale-100" : "scale-0"
                  }`}></div>
                </div>

                {/* Card */}
                <div
                  className={`ml-20 md:ml-32 rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-b from-gray-800 to-gray-850 shadow-xl transform transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-2 ${
                    visible[idx]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  data-scroll
                  data-scroll-speed="0.08"
                >
                  <div className="p-6 text-white">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                        <p className="text-purple-400 text-sm font-medium">{exp.company}</p>
                      </div>
                      <span className="text-xs md:text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-semibold whitespace-nowrap ml-2">
                        {exp.dateStart} - {exp.dateEnd}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/80 mb-4">{exp.description}</p>

                    {/* Soft Skills */}
                    {exp.softSkills && exp.softSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.softSkills.map((skill, skillIdx) => (
                          <div
                            key={skillIdx}
                            className="px-3 py-1 bg-gray-700/60 hover:bg-gray-700 rounded-full text-xs text-white/80 transition-colors"
                          >
                            {skill.name}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Button */}
                    <button
                      onClick={() => setSelectedExperience(idx)}
                      className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-semibold shadow-lg hover:scale-105 transition-transform"
                    >
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedExperience !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{experiences[selectedExperience].title}</h2>
                  <p className="text-purple-400 font-medium text-lg mt-1">{experiences[selectedExperience].company}</p>
                  <p className="text-white/60 text-sm mt-2">
                    {experiences[selectedExperience].dateStart} - {experiences[selectedExperience].dateEnd}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="text-white/70 hover:text-white text-2xl font-semibold"
                >
                  ×
                </button>
              </div>

              {/* Full Description */}
              <p className="text-white/80 mb-6 leading-relaxed">
                {experiences[selectedExperience].fullDescription}
              </p>

              {/* Soft Skills */}
              {experiences[selectedExperience].softSkills && experiences[selectedExperience].softSkills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Compétences transversales :</h3>
                  <div className="flex flex-wrap gap-2">
                    {experiences[selectedExperience].softSkills.map((skill, skillIdx) => (
                      <div
                        key={skillIdx}
                        className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30"
                      >
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedExperience(null)}
                className="w-full px-6 py-3 border border-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
