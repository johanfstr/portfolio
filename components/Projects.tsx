"use client"

import { cn } from "@/lib/utils"
import { gsap } from "gsap";
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
    image: "/images/captureportfolio.webp",
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
    image: "/images/towerdefend.webp",
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
    image: "/images/ocrackml.jpg",
    description: "Analyse et d'exploitation de fuites de données issues de différentes applications web.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/OCrackml",
    fullDescription: "Projet OCaml pour analyser et exploiter des fuites de données web. Focus sur l'analyse de données et la sécurité informatique.",
    technologies: [
      { name: "OCaml", logo: "/images/ocaml.svg" },
    ],
  },
  {
    id: "4",
    title: "Sim. Père Noël",
    image: "",
    description: "Simulation de production avec gestion de ressources, événements, suivi des coûts et interface en menus. ",
    accent: "",
    ctaUrl: "https://github.com/Printemilio/Jeff_project",
    fullDescription: "Simulation de production avec gestion de ressources via files et piles, événements en temps réel, suivi des coûts et interface en menus. ",
    technologies: [
      { name: "C#", logo: "/images/csharp.png" },
    ],
  },
  {
    id: "5",
    title: "projetBus",
    image: "",
    description: "Simulation de différentes lignes de bus sur une carte en C avec SDL2.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/projetBus",
    fullDescription: "Simulation de différentes lignes de bus sur une carte en C avec SDL2.",
    technologies: [
      { name: "C", logo: "/images/c.png" },
      { name: "SDL2", logo: "/images/sdl.svg" },
    ],
  },
  {
    id: "6",
    title: "Camlbrick",
    image: "",
    description: "Camlbrick est un jeu de casse-briques développé en OCaml, avec interface graphique basée sur Labltk.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/Camlbrick",
    fullDescription: "Camlbrick est un jeu de casse-briques développé en OCaml, avec une interface graphique basée sur Labltk.  Le principe du jeu est classique :      Faire disparaître toutes les briques d’un niveau avec une balle.     Contrôler une raquette pour renvoyer la balle.     Gérer plusieurs types de briques : simple, double, bloc, bonus. Les collisions sont gérées avec la raquette, les murs et les coins de briques ",
    technologies: [
      { name: "OCaml", logo: "/images/ocaml.svg" },
    ],
  },
]

// ────────────────────────────────────────────────────────────────
// GLASS PILL STYLES
// ────────────────────────────────────────────────────────────────
const HERO_STYLES = `
.hero-wrapper {
  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);
  
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

.hero-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}
`;

// ────────────────────────────────────────────────────────────────
// MAGNETIC BUTTON COMPONENT
// ────────────────────────────────────────────────────────────────
type MagneticButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
};

const MagneticButton = ({ className, children, ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const h = rect.width / 2;
        const w = rect.height / 2;
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - w;

        gsap.to(element, {
          x: x * 0.4,
          y: y * 0.4,
          scale: 1.05,
          ease: "power2.out",
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
          duration: 1.2,
        });
      };

      element.addEventListener("mousemove", handleMouseMove as any);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove as any);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <a ref={ref} className={cn("cursor-pointer", className)} {...props}>
      {children}
    </a>
  );
};


export default function Projects() {
  const [visible, setVisible] = useState<boolean[]>(() => projects.map(() => false))
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])
  const sectionRef = useRef<HTMLElement | null>(null)
  const [noiseOpacity, setNoiseOpacity] = useState<number>(0)

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

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === "undefined") return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setNoiseOpacity(0)
      return
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const vh = window.innerHeight || document.documentElement.clientHeight
          const start = vh * 0.9
          const end = vh * 0.2
          const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)))
          setNoiseOpacity(progress)
          ticking = false
        })
        ticking = true
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="projects" className="py-20 px-6 bg-[#1c0522] min-h-screen flex items-center" data-scroll data-scroll-section>
      <div className="w-full max-w-7xl mx-auto grid gap-12 lg:grid-cols-[minmax(280px,360px)_1fr] items-start">
        <div className="space-y-8">
          <div className="sticky top-32">
            <span className="text-sm uppercase tracking-[0.3em] text-purple-300">— Projets</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-playfair">Mes réalisations</h2>
            <p className="mt-6 text-white/70 text-lg leading-8">
              Découvrez une sélection de projets sur lesquels j'ai travaillé, mettant en avant mes compétences en développement.
            </p>
            <br />
            <br />
            <a
            href="https://github.com/johanfstr" target="_blank" aria-label="GitHub"
            className="px-6 py-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full font-playfair shadow-lg transition-all transform hover:scale-105"
            >
              Voir plus sur mon github
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start" data-scroll data-scroll-speed="0.08">
          {projects.map((p, idx) => {
            const cardSpeed = "0.08";

            return (
              <div
                key={p.id}
                data-idx={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el
                }}
                className={`rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-b from-gray-900 to-gray-850 shadow-xl transform transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-2 ${
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
                      loading="lazy"
                      decoding="async"
                      className="relative z-10 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white/10 text-xl font-playfair relative z-10">{p.title}</div>
                  )}
                </div>

                <div className="p-6 text-center text-white/80">
                  <h3 className="text-xl font-playfair text-white mb-3">{p.title}</h3>
                  {/* <p className="text-sm mb-4">{p.description}</p> */}
                  {p.technologies && p.technologies.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {p.technologies.map((tech, techIdx) => (
                        <div
                          key={techIdx}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-full text-xs text-white"
                        >
                          {tech.logo && (
                            <img src={tech.logo} alt={tech.name} loading="lazy" decoding="async" className="w-4 h-4" />
                          )}
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <MagneticButton 
                    onClick={() => setSelectedProject(idx)}
                    className="inline-flex px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-playfair items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> 
                    <path d="M6 12H18M18 12L13 7M18 12L13 17"
                    stroke="#ffffff" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
                    </svg>
                    Voir plus
                  </MagneticButton>
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
                <h2 className="text-2xl font-playfair text-white">{projects[selectedProject].title}</h2>
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
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <p className="text-white/80 mb-4">{projects[selectedProject].fullDescription}</p>
              
              {projects[selectedProject].technologies && projects[selectedProject].technologies.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-playfair text-white mb-2">Technologies utilisées :</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].technologies.map((tech, techIdx) => (
                      <div
                        key={techIdx}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-full text-sm text-white"
                      >
                        {tech.logo && (
                          <img src={tech.logo} alt={tech.name} loading="lazy" decoding="async" className="w-5 h-5" />
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
                  className="px-6 py-3 bg-purple-600 text-white rounded-full font-playfair hover:bg-purple-700 transition-colors"
                >
                  Voir sur GitHub
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 border border-gray-600 text-white rounded-full font-playfair hover:bg-gray-700 transition-colors"
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
