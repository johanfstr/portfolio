"use client"

import { useEffect, useRef, useState } from "react"
import { NoiseTexture } from "@/components/ui/noise-texture"
import { cn } from "@/lib/utils"
import { ParticleCard, GlobalSpotlight, useMobileDetection } from "@/components/ui/MagicBento"
import SplitText from "@/components/ui/SplitText"
import { ChevronDown } from "lucide-react"

interface Experience {
  title: string
  company: string
  type: string
  dateStart: string
  dateEnd: string
  duration: string
  bullets: string[]
  color: string
  initials: string
  current?: boolean
}

interface Education {
  school: string
  degree: string
  type: string
  dateStart: string
  dateEnd: string
  duration: string
  bullets: string[]
  color: string
  initials: string
  current?: boolean
}

const experiences: Experience[] = [
  {
    title: "Préparateur de commandes",
    company: "MALVAUX",
    type: "Intérim",
    dateStart: "Juillet 2025",
    dateEnd: "Fin Aout 2025",
    duration: "2 mois",
    color: "#7c3aed",
    initials: "M",
    bullets: [
      "Préparation de ~40 commandes par jour avec chariot élevateur (CACES 1a) et terminal PDA",
      "Vérification de la conformité des produits et saisie des quantités",
      "Suivi des stocks et gestion d'inventaire via le système WMS",
    ],
  },
  {
    title: "Approvisionnement machine & magasinage",
    company: "MEDIAPOSTE",
    type: "Intérim",
    dateStart: "Juillet 2024",
    dateEnd: "Fin Aout 2024",
    duration: "2 mois",
    color: "#f59e0b",
    initials: "MP",
    bullets: [
      "Tri et magasinage de ~150 colis par heure dans un centre de distribution postal",
      "Approvisionnement en continu des machines de tri automatisées",
      "Respect strict des normes de sécurité dans un environnement à rythme rapide",
    ],
  },
  {
    title: "Agent de quai & manutentionnaire",
    company: "FedEx",
    type: "Intérim",
    dateStart: "Avril 2024",
    dateEnd: "Mai 2024",
    duration: "2 mois",
    color: "#6366f1",
    initials: "F",
    bullets: [
      "Manutention de palettes de colis dans un centre de tri express",
      "Chargement et déchargement de camions avec transpalette et chariot élévateur",
      "Travail en équipe pour assurer une logistique fluide dans des cadences soutenues",
    ],
  },
  {
    title: "Préparateur de commandes",
    company: "Kuehne + Nagel",
    type: "Intérim",
    dateStart: "Juillet 2023",
    dateEnd: "Fin Aout 2023",
    duration: "2 mois",
    color: "#10b981",
    initials: "K+N",
    bullets: [
      "Préparation de commandes avec chariot (CACES 1a) et système Voice picking",
      "Diction de codes de contrôle via casque audio, vérification de la conformité",
      "Respect des délais et des normes de sécurité lors de cadences soutenues",
    ],
  },
]

const educations: Education[] = [
  {
    school: "EFREI Bordeaux",
    degree: "Cycle Ingénieur, Majeure Logiciels et Systèmes d'Information",
    type: "ING1",
    dateStart: "Sept 2026",
    dateEnd: "Aout 2029",
    duration: "3 ans",
    color: "#e11d48",
    initials: "E",
    current: true,
    bullets: [
      "à venir",
    ],
  },
  {
    school: "Université de Poitiers",
    degree: "Licence Informatique",
    type: "2ème année de licence",
    dateStart: "2023",
    dateEnd: "2026",
    duration: "3 ans",
    color: "#0ea5e9",
    initials: "UP",
    bullets: [
      "à venir",
    ],
  },
  {
    school: "Lycée Saint-André, Niort",
    degree: "Spécialité Mathématiques, Physique-Chimie, SVT",
    type: "Baccalauréat",
    dateStart: "2019",
    dateEnd: "2022",
    duration: "3 ans",
    color: "#f97316",
    initials: "SA",
    bullets: [
      "à venir",
    ],
  },
]

function TimelineItem({ item }: { item: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex gap-5 items-start">
      <div
        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg"
        style={{ backgroundColor: item.color }}
      >
        {item.initials}
      </div>
      <div className="flex-1 min-w-0 pb-2">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <h4 className="text-white font-semibold text-sm">{item.title}</h4>
          {item.current && (
            <span className="text-xs px-2 py-0.5 rounded-full border border-white/20 text-white/70">
              À venir
            </span>
          )}
        </div>
        <p className="text-white/50 text-xs mb-1">{item.sub} · {item.type}</p>
        <p className="text-white/35 text-xs mb-3">
          {item.dateStart} — {item.dateEnd}{item.duration ? ` · ${item.duration}` : ""}
        </p>
        {item.bullets && item.bullets.length > 0 && (
          <div className="mt-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-1.5 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>{isExpanded ? "Masquer les détails" : "Voir les détails"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isExpanded ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-2 pb-1">
                  {item.bullets.map((bullet: string, bIdx: number) => (
                    <li key={bIdx} className={cn("flex gap-2 text-xs", "text-white/55")}>
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-500/50 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TimelineCard({ label, count, subtitle, items, fit }: {
  label: string
  count: string
  subtitle: string
  fit?: boolean
  items: Array<{
    title: string
    sub: string
    type: string
    dateStart: string
    dateEnd: string
    duration: string
    bullets: string[]
    color: string
    initials: string
    current?: boolean
  }>
}) {
  return (
    <div className={`relative border border-white/[0.08] rounded-2xl bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 flex flex-col gap-6 ${fit ? "h-fit" : "h-full"}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-base">{label}</h3>
        <span className="text-white/40 text-xs">{count}</span>
      </div>
      <p className="text-white/40 text-xs -mt-4">{subtitle}</p>

      {/* Vertical line */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />
        <div className="space-y-8">
          {items.map((item, idx) => (
            <TimelineItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const bentoGridRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [card1Visible, setCard1Visible] = useState(false)
  const [card2Visible, setCard2Visible] = useState(false)
  const isMobile = useMobileDetection()

  useEffect(() => {
    const pairs: [React.RefObject<HTMLDivElement | null>, React.Dispatch<React.SetStateAction<boolean>>][] = [
      [headerRef, setHeaderVisible],
      [card1Ref, setCard1Visible],
      [card2Ref, setCard2Visible],
    ]
    const observers = pairs.map(([ref, setter]) => {
      const obs = new IntersectionObserver(([e]) => { setter(e.isIntersecting); }, { threshold: 0.1 })
      if (ref.current) obs.observe(ref.current)
      return obs
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <section
      id="parcours"
      className="relative overflow-hidden py-20 px-6 bg-[#0b0a0d] min-h-screen"
    >
      <NoiseTexture className="absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-12">
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-xl">
            <div className={`transition-all duration-700 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 delay-0"}`}>
              <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-extrabold" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>— Parcours</span>
            </div>
            <SplitText text="Expériences & Formations" tag="h2" className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-playfair" textAlign="left" delay={60} duration={0.8} splitType="chars" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} rootMargin="-50px" />
            <p className={`mt-6 text-white/70 text-lg leading-8 transition-all duration-700 ease-out ${headerVisible ? "delay-200 opacity-100 translate-y-0" : "opacity-0 translate-y-6 delay-0"}`}>
              Mon parcours professionnel et académique qui a façonné ma rigueur et mes compétences.
            </p>
          </div>
          <p className={`text-white/40 text-sm shrink-0 transition-all duration-700 ease-out ${headerVisible ? "delay-300 opacity-100 translate-y-0" : "opacity-0 translate-y-6 delay-0"}`}>
            {experiences.length} rôles · {educations.length} formations
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={bentoGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 bento-section">
          <GlobalSpotlight gridRef={bentoGridRef} disableAnimations={isMobile} />

          <div ref={card1Ref} className={`transition-all duration-700 ease-out ${card1Visible ? "delay-100 opacity-100 translate-y-0" : "opacity-0 translate-y-8 delay-0"}`}>
            <ParticleCard className="magic-bento-card magic-bento-card--border-glow h-full rounded-2xl" disableAnimations={isMobile} glowColor="132, 0, 255" clickEffect enableMagnetism={false}>
              <TimelineCard
                label="Expériences professionnelles"
                count={`${experiences.length} rôles`}
                subtitle="Missions en logistique & supply chain"
                items={experiences.map((e) => ({ title: e.title, sub: e.company, type: e.type, dateStart: e.dateStart, dateEnd: e.dateEnd, duration: e.duration, bullets: e.bullets, color: e.color, initials: e.initials, current: e.current }))}
              />
            </ParticleCard>
          </div>
          <div ref={card2Ref} className={`transition-all duration-700 ease-out ${card2Visible ? "delay-200 opacity-100 translate-y-0" : "opacity-0 translate-y-8 delay-0"}`}>
            <ParticleCard className="magic-bento-card magic-bento-card--border-glow rounded-2xl" disableAnimations={isMobile} glowColor="132, 0, 255" clickEffect enableMagnetism={false}>
              <TimelineCard
                label="Formations"
                count={`${educations.length} établissements`}
                subtitle="Parcours académique"
                fit
                items={educations.map((e) => ({ title: e.school, sub: e.degree, type: e.type, dateStart: e.dateStart, dateEnd: e.dateEnd, duration: e.duration, bullets: e.bullets, color: e.color, initials: e.initials, current: e.current }))}
              />
            </ParticleCard>
          </div>
        </div>
      </div>
    </section>
  )
}
