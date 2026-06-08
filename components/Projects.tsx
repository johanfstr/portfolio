"use client"

import { cn } from "@/lib/utils"
import { gsap } from "gsap";
import { NoiseTexture } from "@/components/ui/noise-texture"
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react"

const ProjectMarkdown = dynamic(() => import("./ProjectMarkdown"), { ssr: false });

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
  technologies: Technology[]
  tags: string[]
  demoType: 'web' | 'video' | 'none'
  demoPath?: string
  videoUrl?: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio V1",
    image: "/images/captureportfolio.webp",
    description: "Portfolio personnel mettant en avant mes compétences en développement.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/portfolio",
    technologies: [
      { name: "React", logo: "/images/react-icon.webp" },
      { name: "Tailwind CSS", logo: "/images/tailwind-icon.webp" },
    ],
    tags: ["Web"],
    demoType: "none",
  },
  {
    id: "2",
    title: "Tower Defense Game",
    image: "/images/towerdefend.webp",
    description: "Jeu de tower defense permet de générer des tours autour de chemins aléatoires.",
    accent: "Le jeu a été simplifié sur la démo pour garantir une expérience fluide en ligne. Il manque certains éléments comme le système de sauvegarde.",
    ctaUrl: "https://github.com/johanfstr/TowerDefend",
    technologies: [
      { name: "C", logo: "/images/c-icon.webp" },
      { name: "SDL2", logo: "/images/sdl.svg" },
    ],
    tags: ["C"],
    demoType: "web",
    demoPath: "/emul/towerdefend/index.html",
  },
  {
    id: "3",
    title: "OCrackml",
    image: "/images/ocrackml.jpg",
    description: "Analyse et exploitation de fuites de données issues de différentes applications",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/OCrackml",
    technologies: [
      { name: "OCaml", logo: "/images/ocaml.svg" },
    ],
    tags: ["OCaml"],
    demoType: "none",
  },
  {
    id: "4",
    title: "Sim. Père Noël",
    image: "",
    description: "Simulation de production avec gestion de ressources, événements, suivi des coûts et interface en menus.",
    accent: "",
    ctaUrl: "https://github.com/Printemilio/Jeff_project",
    technologies: [
      { name: "C#", logo: "/images/csharp.png" },
    ],
    tags: ["C#"],
    demoType: "none",
  },
  {
    id: "5",
    title: "projetBus",
    image: "",
    description: "Simulation de différentes lignes de bus sur une carte en C avec SDL2.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/projetBus",
    technologies: [
      { name: "C", logo: "/images/c-icon.webp" },
      { name: "SDL2", logo: "/images/sdl.svg" },
    ],
    tags: ["C"],
    demoType: "none",
  },
  {
    id: "6",
    title: "Camlbrick",
    image: "",
    description: "Jeu de casse-briques développé en OCaml, avec interface graphique basée sur Labltk.",
    accent: "",
    ctaUrl: "https://github.com/johanfstr/Camlbrick",
    technologies: [
      { name: "OCaml", logo: "/images/ocaml.svg" },
    ],
    tags: ["OCaml"],
    demoType: "none",
  },
]

const FILTERS = ["Tous", "C", "C#", "OCaml", "Web"]

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
  box-shadow: 0 10px 30px -10px var(--pill-shadow), inset 0 1px 1px var(--pill-highlight), inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 0 20px 40px -10px var(--pill-shadow-hover), inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}
`;

type MagneticButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  onClick?: () => void;
};

const MagneticButton = ({ className, children, onClick, ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(element, { x: x * 0.4, y: y * 0.4, scale: 1.05, ease: "power2.out", duration: 0.4 });
      };
      const handleMouseLeave = () => {
        gsap.to(element, { x: 0, y: 0, scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.2 });
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
    <a ref={ref} className={cn("cursor-pointer", className)} onClick={onClick} {...props}>
      {children}
    </a>
  );
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("Tous")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [visible, setVisible] = useState<boolean[]>(() => projects.map(() => false))
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])

  const modalBoxRef = useRef<HTMLDivElement>(null)
  const [modalContent, setModalContent] = useState<string>("")

  useEffect(() => {
    if (selectedProject === null) { setModalContent(""); return }
    fetch(`/projects/${projects[selectedProject].id}.md`)
      .then(r => r.text())
      .then(setModalContent)
  }, [selectedProject])

  const filtered = activeFilter === "Tous"
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter))

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(projects.map(() => true))
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-idx"))
          if (entry.isIntersecting) {
            setVisible((v) => { const next = [...v]; next[idx] = true; return next })
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    cardsRef.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [filtered])

return (
<section
  id="projects"
  className="relative overflow-hidden py-20 px-6 bg-[#0b0a0d] min-h-screen"
  data-scroll
  data-scroll-section
>
  {/* Dégradé de transition avec la section précédente */}
<div
  className="absolute top-0 left-0 right-0 pointer-events-none z-10"
  style={{
    height: '200px',
    background: 'linear-gradient(to bottom, #0b0a0d 30%, rgb(11, 10, 13,0.6) 60%, transparent 100%)'
  }}
/>
    {/* Noise texture overlay */}
    <NoiseTexture
      className={cn(
        "absolute inset-0 z-0",
        ""
      )}
    />

    <style dangerouslySetInnerHTML={{ __html: HERO_STYLES }} />

    <div className="relative z-10 w-full max-w-7xl mx-auto space-y-12">
      {/* Top row : présentation à gauche, filtres + github à droite */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">

        {/* Gauche : label + titre + description */}
        <div className="max-w-xl">
          <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-extrabold" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>— Projets</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white font-playfair">Mes réalisations</h2>
          <p className="mt-6 text-white/70 text-lg leading-8">
            Découvrez une sélection de projets sur lesquels j'ai travaillé, mettant en avant mes compétences en développement.
          </p>
        </div>

        {/* Droite : filtres + bouton github */}
        <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
          <a
            href="https://github.com/johanfstr"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full font-playfair shadow-lg transition-all transform hover:scale-105 inline-block"
          >
            Voir plus sur mon github
          </a>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-mono border transition-all duration-200",
                  activeFilter === f
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "border-purple-500/40 text-purple-300 hover:border-purple-400 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards grid — pleine largeur, 3 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, idx) => (
          <div
            key={p.id}
            data-idx={idx}
            ref={(el) => { cardsRef.current[idx] = el }}
            onClick={() => setSelectedProject(projects.findIndex(pr => pr.id === p.id))}
            className={cn(
              "group rounded-xl border border-white/10 cursor-pointer text-left backdrop-blur-sm overflow-hidden",
              "bg-white/5 hover:bg-white/10 hover:border-indigo-500/30",
              "transition-all duration-500 ease-in-out hover:-translate-y-2",
              "hover:shadow-[0_8px_32px_rgba(99,102,241,0.2)]",
              visible[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Image */}
            {p.image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={360}
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              </div>
            )}

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-base font-semibold text-white transition-colors duration-300 group-hover:text-indigo-400 mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3">{p.description}</p>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.technologies.map((tech, i) => (
                  <span key={i} className="flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded bg-white/[0.06] text-white/50">
                    {tech.logo && <img src={tech.logo} alt={tech.name} loading="lazy" decoding="async" width={12} height={12} className="w-3 h-3" />}
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Bouton */}
              <button
                className="mt-auto w-fit px-3 py-1.5 text-sm rounded-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 hover:scale-[1.02] transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(projects.findIndex(pr => pr.id === p.id));
                }}
              >
                Détails & démo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* Modal */}
      {selectedProject !== null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4" style={{ paddingTop: '90px' }}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />

          {/* Box — scroll interne, hauteur max limitée */}
          <div ref={modalBoxRef} data-lenis-prevent className="relative w-full max-w-2xl max-h-[calc(100vh-180px)] overflow-y-auto rounded-xl border border-white/10 bg-[#0f0a1a] p-8 shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-[10px] bg-white/[0.08] text-white/70 hover:bg-white/[0.15] text-2xl flex items-center justify-center transition-colors"
            >
              ×
            </button>

            {/* Image */}
            {projects[selectedProject].image && (
              <img src={projects[selectedProject].image} alt={projects[selectedProject].title} loading="lazy" decoding="async" className="w-full h-48 object-cover rounded-lg mb-4" />
            )}

            {/* Header */}
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                {projects[selectedProject].tags.map((tag) => (
                  <span key={tag} className="inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wide rounded bg-purple-500/20 text-purple-300">{tag}</span>
                ))}
              </div>
              <h2 className="text-2xl font-semibold text-white">{projects[selectedProject].title}</h2>
              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {projects[selectedProject].technologies.map((tech, i) => (
                  <span key={i} className="flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded bg-white/[0.06] text-white/50">
                    {tech.logo && <img src={tech.logo} alt={tech.name} loading="lazy" decoding="async" width={12} height={12} className="w-3 h-3" />}
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

                        {/* Demo zone */}
            <div className="mb-6 rounded-lg overflow-hidden bg-black/30 min-h-[120px] flex items-center justify-center">
              {projects[selectedProject].demoType === 'web' && projects[selectedProject].demoPath ? (
                <div className="w-full">
                <p className="text-white/30 text-sm p-8 text-center">
                  {projects[selectedProject].accent}
                </p>
                  {/* <iframe src={projects[selectedProject].demoPath} title={`Démo ${projects[selectedProject].title}`} className="w-full border-0" style={{ height: 560 }} /> */}
                  <a href={projects[selectedProject].demoPath} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block px-4 py-1.5 text-sm rounded-lg text-white/80 bg-white/[0.08] border border-white/10 hover:bg-white/[0.12] transition-all">
                    Tester la démo en ligne
                  </a>
                </div>
              ) : projects[selectedProject].demoType === 'video' && projects[selectedProject].videoUrl ? (
                <iframe src={projects[selectedProject].videoUrl} title={`Vidéo ${projects[selectedProject].title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full border-0" style={{ height: 400 }} />
              ) : projects[selectedProject].demoType === 'video' ? (
                <div className="flex flex-col items-center gap-3 p-8 text-white/30 text-sm text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={48} height={48} className="opacity-50">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Vidéo démo non disponible</p>
                </div>
              ) : (
                <p className="text-white/30 text-sm p-8 text-center">
                  Projet hors-ligne ({projects[selectedProject].tags.join(', ')}). Lancez-le en local pour le tester.
                </p>
              )}
            </div>

            <div className="mb-6 text-sm text-white/70 leading-relaxed">
              <ProjectMarkdown content={modalContent} />
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <a href={projects[selectedProject].ctaUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm rounded-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all">
                Voir le code (GitHub)
              </a>
              <button onClick={() => setSelectedProject(null)} className="px-4 py-2 text-sm rounded-lg text-white/70 bg-white/[0.08] border border-white/10 hover:bg-white/[0.12] transition-all">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}