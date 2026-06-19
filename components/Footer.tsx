"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { NoiseTexture } from "./ui/noise-texture"
import dynamic from "next/dynamic";
const TopoBackground = dynamic(() => import("./ui/TopoBackground"), { ssr: false });

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-plus-jakarta), sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables using standard shadcn/tailwind v4 tokens */
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

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

 /* Theme-adaptive Grid Background
 .footer-bg-grid {
   background-size: 60px 60px;
   background-image: 
     linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
     linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
   mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
   -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
 }
    */
 
 /* Theme-adaptive Aurora Glow */
 .footer-aurora {
   background: radial-gradient(
     circle at 50% 50%, 
     rgba(255, 255, 255, 0.15) 0%, 
     rgba(255, 255, 255, 0.15) 40%, 
     transparent 70%
   );
 }

/* Glass Pill Theming */
.footer-glass-pill {
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

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
type MagneticButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode
}

const MagneticButton = ({ className, children, ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const h = rect.width / 2
        const w = rect.height / 2
        const x = e.clientX - rect.left - h
        const y = e.clientY - rect.top - w

        gsap.to(element, {
          x: x * 0.4,
          y: y * 0.4,
          scale: 1.05,
          ease: "power2.out",
          duration: 0.4,
        })
      }

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
          duration: 1.2,
        })
      }

      element.addEventListener("mousemove", handleMouseMove as any)
      element.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        element.removeEventListener("mousemove", handleMouseMove as any)
        element.removeEventListener("mouseleave", handleMouseLeave)
      }
    }, element)

    return () => ctx.revert()
  }, [])

  return (
    <a ref={ref} className={cn("cursor-pointer", className)} {...props}>
      {children}
    </a>
  )
}

// -------------------------------------------------------------------------
// 3. MARQUEE COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Construis les idées en code</span> <span className="text-primary/60">✦</span>
    <span>Développeur Full Stack</span> <span className="text-secondary/60">✦</span>
    <span>Étudiant en Informatique</span> <span className="text-primary/60">✦</span>
    <span>Code. Learn. Build. Repeat</span> <span className="text-secondary/60">✦</span>
    <span>Contactez-moi pour collaborer</span> <span className="text-primary/60">✦</span>
  </div> 
);

// -------------------------------------------------------------------------
// 4. MAIN COMPONENT
// -------------------------------------------------------------------------
export default function CinematicFooter({ ready = false }: { ready?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const pRef = useRef<HTMLParagraphElement>(null);
  const [pVisible, setPVisible] = useState(false);

  useEffect(() => {
    const el = pRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { setPVisible(e.isIntersecting); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, contentRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* Curtain Reveal Wrapper */}
      <div
        ref={wrapperRef}
        className="relative h-[100dvh] w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* Fixed Footer */}
        <footer className="fixed bottom-0 left-0 flex h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#0b0a0d] text-foreground cinematic-footer-wrapper"
            >
                <TopoBackground ready={ready} />
              {/* <NoiseTexture className="absolute inset-0 z-0" /> */}
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute bottom-0 md:-bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            JOHAN F
          </div>

          {/* Diagonal Sleek Marquee (Top of footer) 
          <div className="absolute top-25 left-0 w-full overflow-hidden border-y border-border/50 bg-background/60 backdrop-blur-md py-4 z-10 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>
          */}

          {/* Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 md:px-6 mt-8 md:mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-8xl mb-4 md:mb-12 text-center pt-8 md:pt-0"
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            >
              Portfolio
            </h2>

            <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3 w-full max-w-4xl">
              {/* Left Section */}
              <div>
                <p ref={pRef} className={`text-white/70 max-w-xl leading-relaxed text-sm md:text-base transition-all duration-700 ease-out ${pVisible ? "delay-200 opacity-100 translate-y-0" : "opacity-0 translate-y-6 delay-0"}`}>
                  Passionné par le développement full-stack, j'aime créer des expériences numériques uniques. Ce portfolio présente mes projets et compétences. Merci de votre visite ! N'hésitez pas à me contacter pour toute question ou opportunité.
                </p>
              </div>
 
              {/* Right Section - Social Links */}
              <div className="md:text-right">
                <h2 className="text-xl md:text-2xl font-playfair mb-3 md:mb-4">Suivez-moi</h2>
 
                {/* Social Media Links */}
                <div className="flex flex-wrap justify-start md:justify-end gap-2 md:gap-3 w-full">
                  <MagneticButton 
                    href="https://github.com/johanfstr" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-glass-pill px-4 py-2 md:px-6 md:py-3 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-2 group"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="md:w-[18px] md:h-[18px]">
                      <title>GitHub</title>
                      <path d="M12 .5C5.649.5.5 5.649.5 12c0 5.086 3.292 9.4 7.869 10.93.574.106.783-.25.783-.555 0-.274-.01-1-.015-1.96-3.2.695-3.876-1.544-3.876-1.544-.523-1.33-1.278-1.686-1.278-1.686-1.045-.715.079-.7.079-.7 1.155.081 1.764 1.186 1.764 1.186 1.028 1.762 2.698 1.252 3.354.957.105-.744.403-1.253.733-1.543-2.56-.29-5.248-1.28-5.248-5.696 0-1.259.452-2.286 1.193-3.09-.12-.293-.517-1.472.113-3.068 0 0 .97-.31 3.177 1.18a11.03 11.03 0 012.9-.395c.984 0 1.973.134 2.897.395 2.205-1.49 3.175-1.18 3.175-1.18.635 1.596.237 2.775.116 3.068.743.804 1.192 1.83 1.192 3.09 0 4.42-2.694 5.404-5.258 5.688.414.355.783 1.056.783 2.129 0 1.535-.014 2.773-.014 3.15 0 .308.205.667.79.554C20.71 21.4 24 17.085 24 12 24 5.649 18.351.5 12 .5z"/>
                    </svg>
                    GitHub
                  </MagneticButton>

                  <MagneticButton 
                    href="https://www.linkedin.com/in/johanforestier/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-glass-pill px-4 py-2 md:px-6 md:py-3 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-2 group"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="md:w-[18px] md:h-[18px]">
                      <title>LinkedIn</title>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.026-3.037-1.85-3.037-1.849 0-2.132 1.444-2.132 2.939v5.667H9.356V9h3.415v1.561h.049c.476-.902 1.637-1.85 3.366-1.85 3.598 0 4.263 2.368 4.263 5.451v6.29zM5.337 7.433c-1.143 0-2.067-.927-2.067-2.068 0-1.142.924-2.068 2.067-2.068 1.142 0 2.066.926 2.066 2.068 0 1.141-.924 2.068-2.066 2.068zM6.834 20.452H3.84V9h2.994v11.452z"/>
                    </svg>
                    LinkedIn
                  </MagneticButton>

                  <MagneticButton 
                    href="https://www.instagram.com/johanfstr" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-glass-pill px-4 py-2 md:px-6 md:py-3 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-2 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="md:w-[16px] md:h-[16px]">
                      <title>Instagram</title>
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                    </svg>
                    Instagram
                  </MagneticButton>
                  <MagneticButton 
                    href="mailto:contact@johanf.fr" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-glass-pill px-4 py-2 md:px-6 md:py-3 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-2 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 22 22" className="md:w-[16px] md:h-[16px]">
                    <title>Email</title>
                    <path d="M21,11c0,6.7-4.3,6.4-4.8,6.4c-0.6,0-1.1-0.1-1.6-0.4c-0.4-0.3-0.8-0.6-1-1.1c-0.4,0.5-0.8,0.9-1.3,1.1 c-0.5,0.3-1,0.4-1.6,0.4c-0.5,0-1-0.1-1.4-0.3c-0.4-0.2-0.8-0.6-1-1c-0.3-0.4-0.5-0.9-0.6-1.5c-0.1-0.6-0.1-1.3-0.1-2 c0.1-0.9,0.3-1.7,0.6-2.5c0.3-0.7,0.7-1.4,1.1-1.9c0.4-0.5,0.9-0.9,1.5-1.2c0.6-0.3,1.2-0.4,1.8-0.4c2,0,3.1,1,3.3,1.2L15.4,14 c0,0.4-0.2,1.8,1.1,1.8c0.4,0,2.4-0.5,2.4-4.7c0-0.1,0.9-7-6.6-7C6.3,4,5,9.9,5,12c0,8.4,5.3,8,7,8c2,0,3.1-0.4,3.3-0.5l0.4,1.8 C15.5,21.5,14.5,22,12,22c-3.1,0-9-0.1-9-10c0-1.4,0.8-10,9.5-10C20.8,2,21,9.6,21,11z M10.1,12.6c-0.1,0.9,0,1.7,0.2,2.2 c0.2,0.5,0.6,0.7,1.2,0.7c1.1,0,1.7-1.4,1.8-1.8l0.5-5.1c-0.1,0-0.7-0.1-0.9-0.1c-0.8,0-1.5,0.4-1.9,1.1 C10.5,10.2,10.2,11.2,10.1,12.6z" />
                    </svg>
                    Email
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar / Credits */}
          <div className="relative z-50 w-full pb-20 md:pb-8 px-4 md:px-12 pointer-events-auto">

            {/* Mobile: single compact row */}
            <div className="flex flex-row items-center justify-between gap-3 md:hidden">
              {/* Left: badge + copyright stacked */}
              <div className="flex flex-col gap-1.5">
                <div className="footer-glass-pill h-12 px-3 rounded-full flex items-center justify-center gap-1.5 cursor-default">
                  <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Construit avec</span>
                  <span className="animate-footer-heartbeat text-sm text-red-500">❤️</span>
                  <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">avec</span>
                  <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-white font-black text-[10px] tracking-normal ml-0.5">Next.js</a>
                </div>
                <div className="text-muted-foreground text-[9px] font-semibold tracking-widest uppercase pl-1">
                  © 2026 <span className="text-purple-500">Johan Forestier</span> - Tous droits réservés
                </div>
              </div>
              {/* Right: arrow — même hauteur h-12 */}
              <MagneticButton
                href="#hero"
                aria-label="Retour en haut de la page"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-muted-foreground hover:text-foreground group relative z-50 shadow-2xl flex-shrink-0"
              >
                <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
              </MagneticButton>
            </div>

            {/* Desktop: original row */}
            <div className="hidden md:flex flex-row items-center justify-between gap-6">
              <div className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                © 2026 <span className="text-purple-500">Johan Forestier</span> - Tous droits réservés
              </div>
              <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 cursor-default">
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Construit avec</span>
                <span className="animate-footer-heartbeat text-lg text-red-500">❤️</span>
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">avec</span>
                <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-white font-black text-xs tracking-normal ml-0.5 hover:text-white/60 transition-colors">Next.js</a>
              </div>
              <MagneticButton
                href="#hero"
                aria-label="Retour en haut de la page"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="w-14 h-14 rounded-full footer-glass-pill flex items-center justify-center text-muted-foreground hover:text-foreground group relative z-50 shadow-2xl"
              >
                <svg className="w-6 h-6 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
              </MagneticButton>
            </div>

          </div>
        </footer>
      </div>
    </>
  );
}