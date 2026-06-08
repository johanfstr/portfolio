"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Intro from "./Intro";
import { useIntro } from "./IntroContext";

const HERO_ANIM_DELAY_MS = 500;

const ParallaxComponent = dynamic(
  () => import("./ui/ParallaxScrolling").then((mod) => mod.ParallaxComponent),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#050710]" aria-hidden /> }
);

type HeroSectionProps = {
  children: React.ReactNode;
};

export default function HeroSection({ children }: HeroSectionProps) {
  const { introDone, setIntroDone } = useIntro();
  const [forceBoot, setForceBoot] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [booting, setBooting] = useState(false);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [heroAnimated, setHeroAnimated] = useState(false);
  const animTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("boot") === "1") setForceBoot(true);
  }, []);

useEffect(() => {
  if (animTimer.current !== null) {
    window.clearTimeout(animTimer.current);
    animTimer.current = null;
  }
  if (!introDone) {
    setHeroAnimated(false);
    return;
  }
  animTimer.current = window.setTimeout(() => {
    setHeroAnimated(true);
    animTimer.current = null;
  }, HERO_ANIM_DELAY_MS);
  return () => {
    if (animTimer.current !== null) window.clearTimeout(animTimer.current);
  };
}, [introDone]); // ← on retire backgroundReady

  return (
    <div className="hero-wrapper">
      <main id="hero" className="relative min-h-screen flex items-center bg-transparent">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParallaxComponent onReady={() => setBackgroundReady(true)} />
        </div>

        <Intro
          force={forceBoot}
          onStart={() => {
            setBooting(true);
            setIntroDone(false);
            setHeroAnimated(false);
          }}
          onFinish={() => {
            setBooting(false);
            setIntroDone(true);
          }}
        />

        <div
          className={`site on w-full max-w-7xl mx-auto px-6 relative z-10 overflow-visible${booting ? " site--booting" : ""}`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-screen py-28 overflow-visible">
            <div
              className={`flex-1 max-w-2xl pt-32 md:pt-0 hero-content${heroAnimated ? " site--animated" : " hero-content--waiting"}`}
              aria-hidden={!heroAnimated}
            >
              {children}
            </div>
          </div>
        </div>
      </main>

      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 transition-opacity duration-500 ${heroAnimated && !scrolled ? "opacity-100" : "opacity-0"}`}
      >
        <span className="text-white/30 text-xs font-mono tracking-widest uppercase">scroll</span>
        <svg
          width="20"
          height="28"
          viewBox="0 0 20 28"
          fill="none"
          className="animate-bounce"
          style={{ filter: "drop-shadow(0 0 6px rgba(168,85,247,0.5))" }}
          aria-hidden
        >
          <path
            d="M10 2 L10 22 M3 15 L10 22 L17 15"
            stroke="rgba(168,85,247,0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
