"use client"

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import Navbar from "../components/Navbar";
import Intro from "../components/Intro";
import dynamic from "next/dynamic";

const Projects = dynamic(() => import("../components/Projects"), { ssr: false });
const About = dynamic(() => import("../components/About"), { ssr: false });
const Skills = dynamic(() => import("../components/Skills"), { ssr: false });
const Experience = dynamic(() => import("../components/Experience"), { ssr: false });
const Contact = dynamic(() => import("../components/Contact"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

const ModelViewer = dynamic(() => import("../components/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
    </div>
  ),
});


const AnoAI = dynamic(() => import("../components/ui/AnimatedShader"), { ssr: false });
const ParallaxComponent = dynamic(
  () => import("../components/ui/ParallaxScrolling").then((mod) => mod.ParallaxComponent),
  {
    ssr: false,
    loading: () => <div />,
  }
);

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

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [forceBoot, setForceBoot] = useState(false);

  const scrRef = useRef<HTMLSpanElement | null>(null);
  const [scrWord, setScrWord] = useState<string>("cool");
  const words = ["cool", "fou", "wild", "based", "cracked"];
  const chars = "#@$*&!%^~+=";
  const currentIdx = useRef(0);
  const scrambling = useRef(false);

  function scrambleTo(newWord: string) {
    if (scrambling.current) return;
    scrambling.current = true;
    const oldWord = scrRef.current?.textContent || scrWord;
    const maxLen = Math.max(oldWord.length, newWord.length);
    let frame = 0;
    const totalFrames = 12;

    function step() {
      frame++;
      let display = "";
      for (let i = 0; i < maxLen; i++) {
        const charProgress = (frame - i * 1.5) / totalFrames;
        if (charProgress >= 1 && i < newWord.length) display += newWord[i];
        else if (charProgress > 0) display += chars[Math.floor(Math.random() * chars.length)];
        else if (i < oldWord.length) display += oldWord[i];
      }
      setScrWord(display);
      if (frame < totalFrames + maxLen * 1.5) requestAnimationFrame(step);
      else {
        setScrWord(newWord);
        scrambling.current = false;
      }
    }

    requestAnimationFrame(step);
  }

  useEffect(() => {
    const id = setInterval(() => {
      currentIdx.current = (currentIdx.current + 1) % words.length;
      scrambleTo(words[currentIdx.current]);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // enable forcing the boot via URL param `?boot=1` for testing
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('boot') === '1') setForceBoot(true);
    }
  }, []);

  {/*useEffect(() => {
  const applyHeroParallax = () => {
    const value = window.scrollY;

    const text = document.getElementById("text");
    if (text) text.style.transform = `translate(${-value * 0.25}px, ${value * 0.25}px)`;

    const text2 = document.getElementById("text2");
    if (text2) text2.style.transform = `translate(${-value * 0.25}px, ${value * 0.25}px)`;

    const btn = document.getElementById("btn");
    if (btn) btn.style.transform = `translateY(${value * 0.75}px)`;
  };

  window.addEventListener("scroll", applyHeroParallax, { passive: true });
  applyHeroParallax();

  return () => window.removeEventListener("scroll", applyHeroParallax);
  }, []);
  */}

return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HERO_STYLES }} />
      
      <Navbar />

      <div className="hero-wrapper">
        
        <main id="hero" className="relative min-h-screen flex items-center bg-transparent">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <ParallaxComponent />
            {/* <AnoAI /> */}
          </div>

          <Intro force={forceBoot} onStart={() => setIntroDone(false)} onFinish={() => setIntroDone(true)} />

          <div className={`site ${introDone ? "on" : ""} w-full max-w-7xl mx-auto px-6 relative z-10 overflow-visible`}>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-screen py-28 overflow-visible">

            <div className="flex-1 max-w-2xl pt-32 md:pt-0">
              <h1 id="text" className="text-[40px] md:text-[64px] lg:text-[80px] font-extrabold tracking-tight leading-tight font-playfair drop-shadow-[0_8px_24px_rgba(99,58,237,0.25)]">
                <span className="hero-anim anim-h1-1 block bg-gradient-to-b from-white via-[#ffffff] to-[#ffffff] bg-clip-text">Je construis</span>
                <span className="hero-anim anim-h1-2 block bg-gradient-to-b from-white via-[#ffffff] to-[#ffffff] bg-clip-text">des trucs</span>
                <span className="hero-anim anim-h1-3 block text-white"><span ref={scrRef} className="scramble-word">{scrWord}</span>.</span>
              </h1>

              <p id="text2" className="hero-sub hero-anim anim-sub mt-1 text-white/90 max-w-md ">
                Étudiant à l'<span className="items-center font-semibold inline-flex rounded bg-purple-900/50 border border-purple-400 relative top-2">
                <img src="/images/efrei.png" alt="EFREI Bordeaux" className="h-10 w-auto" />
                &nbsp;Bordeaux&nbsp;</span><br />Je cherche une{" "}
              <span className="text-white-900 font-semibold">alternance</span>{" "}
              en développement <span className="text-purple-100 font-semibold">full-stack</span> pour septembre 2026. 
              </p>

              <div id="btn" className="hero-btns hero-anim anim-btns mt-8 flex gap-4 flex-wrap">
                  <MagneticButton 
                    href="#projects" 
                    rel="noopener noreferrer"
                    className="hero-glass-pill px-3 py-3 md:px-6 md:py-3 rounded-full text-foreground font-playfair text-sm md:text-base flex items-center gap-2 group"
                  >
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                      <rect x="14" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                      <rect x="3" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                      <rect x="14" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                    </svg>
                    Voir mes projets
                  </MagneticButton>
                  <MagneticButton 
                    href="#contact" 
                    rel="noopener noreferrer"
                    className="hero-glass-pill px-3 py-3 md:px-6 md:py-3 rounded-full text-foreground font-playfair text-sm md:text-base flex items-center gap-2 group"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <title>Me contacter</title>
                      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Me contacter
                  </MagneticButton>
              </div>
            </div>

            {/* ── Right: 3D Model ── 
            <div
            className={`flex-1 w-full max-w-lg h-[500px] md:h-[650px] relative overflow-visible ${
              introDone ? "animate-fadeIn delay-400" : "opacity-0"
              }`}
            >
              <ModelViewer modelPath="/models/model.glb" /> 
            </div>*/}

          </div>
        </div>
        </main>
      </div>

      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
