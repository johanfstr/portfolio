"use client"

import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Intro from "../components/Intro";
import Projects from "../components/Projects";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("../components/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
    </div>
  ),
});


import AnoAI from "../components/ui/AnimatedShader";
const ParallaxComponent = dynamic(
  () => import("../components/ui/ParallaxScrolling").then((mod) => mod.ParallaxComponent),
  {
    ssr: false,
    loading: () => <div />,
  }
);

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
      <Navbar />

      <main id="hero" className="relative min-h-screen flex items-center bg-transparent">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParallaxComponent />
          {/* <AnoAI /> */}
        </div>

        <Intro force={forceBoot} onStart={() => setIntroDone(false)} onFinish={() => setIntroDone(true)} />

        <div className={`site ${introDone ? "on" : ""} w-full max-w-7xl mx-auto px-6 relative z-10 overflow-visible`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-screen py-28 overflow-visible">

            <div className="flex-1 max-w-2xl">
              <h1 id="text" className="text-[40px] md:text-[64px] lg:text-[80px] font-extrabold tracking-tight leading-tight font-playfair drop-shadow-[0_8px_24px_rgba(99,58,237,0.25)]">
                <span className="hero-anim anim-h1-1 block bg-gradient-to-b from-white via-[#efe4ff] to-[#ffffff] bg-clip-text text-transparent">Je construis</span>
                <span className="hero-anim anim-h1-2 block bg-gradient-to-b from-white via-[#efe4ff] to-[#d6bbff] bg-clip-text text-transparent">des trucs</span>
                <span className="hero-anim anim-h1-3 block text-white"><span ref={scrRef} className="scramble-word">{scrWord}</span>.</span>
              </h1>

              <p id="text2" className="hero-sub hero-anim anim-sub mt-6 text-white/90 max-w-md">
                Étudiant à l'<code className="px-2 py-1 rounded bg-purple-900/50 border border-purple-400 text-purple-400">EFREI Bordeaux</code>,  Je cherche une{" "}
              <span className="text-white-900 font-semibold">alternance</span>{" "}
              en développement <span className="text-purple-100 font-semibold">full-stack</span>{" "} pour septembre 2026. 
              </p>

              <div id="btn" className="hero-btns hero-anim anim-btns mt-8 flex gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-playfair rounded-full shadow-lg transition-all transform hover:scale-105"
              >
                Voir mes projets
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full font-playfair shadow-lg transition-all transform hover:scale-105"
              >
                Me contacter
              </a>
              </div>
            </div>

            {/* ── Right: 3D Model ── */}
            <div
            className={`flex-1 w-full max-w-lg h-[500px] md:h-[650px] relative overflow-visible ${
              introDone ? "animate-fadeIn delay-400" : "opacity-0"
              }`}
            >
              <ModelViewer modelPath="/models/model.glb" /> 
            </div>

          </div>
        </div>
      </main>

      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
