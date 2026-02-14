"use client"

import { useState } from "react";
import Navbar from "../components/Navbar";
import Intro from "../components/Intro";
import Projects from "../components/Projects";
import Footer from "../components/Footer";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Navbar />

      <main id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
        {/* Intro typing overlay (client) - moved inside <main> so it aligns with the hero */}
        <Intro onFinish={() => setIntroDone(true)} />

        <div className="text-center px-6 max-w-4xl">

          {/* Nom et rôle */}
          <h1 className={`text-[40px] md:text-[72px] lg:text-[96px] font-extrabold tracking-tight leading-tight font-geist-sans text-white ${introDone ? 'animate-fadeInDown' : 'opacity-0'}`}>
            Je suis <span className="text-purple-500">Johan Forestier</span>,
          </h1>

          {/* Université / formation */}
          <p className={`mt-4 text-xl md:text-2xl text-white/70 font-geist-sans ${introDone ? 'animate-fadeIn delay-200' : 'opacity-0'}`}>
            Étudiant à <span className="text-purple-400 font-semibold">l’Université de Poitiers</span>
          </p>

          {/* Accroche */}
          <p className={`mt-6 text-base md:text-lg text-white/60 max-w-3xl mx-auto ${introDone ? 'animate-fadeIn delay-400' : 'opacity-0'}`}>
            Je cherche une <span className="text-purple-400 font-semibold">alternance</span> en développement full-stack pour septembre 2026. 
            Passionné par la création de sites web modernes et performants, je suis prêt à relever de nouveaux défis et à contribuer à des projets innovants.
          </p>

          {/* Call to Action */}
          <div className={`mt-10 flex justify-center gap-4 flex-wrap ${introDone ? 'animate-fadeIn delay-600' : 'opacity-0'}`}>
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
      </main>

      {/* Projects section (scroll target) */}
      <Projects />

      {/* Footer */}
      <Footer />
    </>
  );
}
