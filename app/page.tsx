"use client"

import { useState, useRef, Suspense } from "react";
import Navbar from "../components/Navbar";
import Intro from "../components/Intro";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";

// Dynamically import Three.js components (client-only)
const ModelViewer = dynamic(() => import("../components/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Navbar />

      <main
        id="hero"
        className="relative min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden"
      >
        {/* Intro typing overlay */}
        <Intro onFinish={() => setIntroDone(true)} />

        {/* Two-column layout: text left, model right */}
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 min-h-screen py-28">

          {/* ── Left: Text content ── */}
          <div className="flex-1 max-w-2xl">

            <h1
              className={`text-[40px] md:text-[64px] lg:text-[80px] font-extrabold tracking-tight leading-tight font-geist-sans text-white ${
                introDone ? "animate-fadeInDown" : "opacity-0"
              }`}
            >
              Je suis{" "}
              <span className="text-purple-500">Johan Forestier</span>,
            </h1>

            <p
              className={`mt-4 text-xl md:text-2xl text-white/70 font-geist-sans ${
                introDone ? "animate-fadeIn delay-200" : "opacity-0"
              }`}
            >
              Étudiant à{" "}
              <span className="text-purple-400 font-semibold">
                l'Université de Poitiers
              </span>
            </p>

            <p
              className={`mt-6 text-base md:text-lg text-white/60 max-w-xl ${
                introDone ? "animate-fadeIn delay-400" : "opacity-0"
              }`}
            >
              Je cherche une{" "}
              <span className="text-purple-400 font-semibold">alternance</span>{" "}
              en développement full-stack pour septembre 2026. Passionné par la
              création de sites web modernes et performants, je suis prêt à
              relever de nouveaux défis et à contribuer à des projets innovants.
            </p>

            <div
              className={`mt-10 flex gap-4 flex-wrap ${
                introDone ? "animate-fadeIn delay-600" : "opacity-0"
              }`}
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-lg transition-all transform hover:scale-105"
              >
                Voir mes projets
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full font-semibold shadow-lg transition-all transform hover:scale-105"
              >
                Me contacter
              </a>
            </div>
          </div>

          {/* ── Right: 3D Model ── */}
          <div
            className={`flex-1 w-full max-w-lg h-[500px] md:h-[650px] relative ${
              introDone ? "animate-fadeIn delay-400" : "opacity-0"
            }`}
          >
            {/* Glow behind the model */}
            <div className="absolute inset-0 rounded-3xl bg-purple-600/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-purple-500/20 blur-2xl rounded-full pointer-events-none" />

            <ModelViewer modelPath="/models/model.glb" />
          </div>

        </div>
      </main>

      <Projects />
      <Footer />
    </>
  );
}
