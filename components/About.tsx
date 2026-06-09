"use client";

import dynamic from "next/dynamic";

const TopoBackground = dynamic(() => import("./ui/TopoBackground"), { ssr: false });
const GlobePulse = dynamic(
  () => import("./ui/Globe").then((mod) => mod.GlobePulse),
  { ssr: false, loading: () => <div className="w-full h-full" aria-hidden /> }
);
const PerspectiveMarquee = dynamic(
  () => import("./ui/PerspectiveMarquee").then((mod) => mod.PerspectiveMarquee),
  { ssr: false, loading: () => <div className="w-full h-full" aria-hidden /> }
);

function PerspectiveMarqueeScene() {
  return (
    <PerspectiveMarquee
      items={[
        "React",
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "JavaScript",
        "C",
        "Java",
        "C#",
        "OCaml",
        "Node.js",
        "Git",
        "Full-Stack",
      ]}
      rotateY={-28}
      rotateX={8}
      perspective={1200}
      pixelsPerFrame={2}
      background="transparent"
      fadeColor="transparent"
      color="#e2e8f0"
    />
  );
}

export default function About({ ready = false }: { ready?: boolean }) {
  return (
    <section id="about" className="relative min-h-screen py-24 z-20 bg-[#1c0522] flex flex-col justify-center">
      <TopoBackground ready={ready} />
      <div className="absolute top-0 left-0 right-0 h-80 pointer-events-none z-10" style={{ 
       background: "linear-gradient(180deg,rgb(28, 5, 34) 0%,rgb(28, 5, 34) 30%, rgba(28, 5, 34, 0.6) 60%, rgba(28, 5, 34, 0.2) 85%, rgba(28, 5, 34, 0) 100%)" }} />
<div
  className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
  style={{
    height: '500px',
    background: 'linear-gradient(0deg, #0b0a0d 0%, rgba(11,10,13,0.9) 25%, rgba(11,10,13,0.5) 55%, rgba(11,10,13,0.1) 80%, rgba(11,10,13,0) 100%)'
  }}
/>
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold font-playfair text-white tracking-tight mb-4 drop-shadow-md">
            À propos de <span className="text-purple-400">moi</span>
          </h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-2xl text-lg text-slate-300 leading-relaxed space-y-6">
            <p>
              Je m'appelle <strong className="text-purple-400 font-extrabold" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>Johan Forestier</strong>, 
              j'habite à <strong className="text-white">Bordeaux</strong>. Je suis actuellement étudiant 
              à l'<strong className="text-purple-400 font-semibold px-1 py-0.5 rounded bg-purple-900/30 border border-purple-500/30">EFREI Bordeaux</strong> 
              &nbsp;où j'entre en 1ère année de cycle ingénieur en majeure <strong className="text-white">LSI</strong> 
              &nbsp;(<strong className="text-white">L</strong>ogiciels et <strong className="text-white">S</strong>ystèmes d'<strong className="text-white">I</strong>nformation).
            </p>
            <p>
              Passionné par le développement, je construis des solutions web modernes et des applications performantes. 
              Mon parcours académique et mes projets m'ont permis d'explorer un large éventail de technologies, 
              du bas niveau&nbsp;
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-full text-xs text-white">
                  <img src="/images/c-icon.webp" alt="C" loading="lazy" decoding="async" width={16} height={16} className="w-4 h-4" />
                  <span>C</span>
                  </span>,
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-full text-xs text-white">
                  <img src="/images/ocaml.svg" alt="OCaml" loading="lazy" decoding="async" width={16} height={16} className="w-4 h-4" />
                  <span>OCaml</span>
                </span>
                &nbsp;au développement full-stack moderne&nbsp;
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-full text-xs text-white">
                  <img src="/images/react-icon.webp" alt="React" loading="lazy" decoding="async" width={16} height={16} className="w-4 h-4" />
                  <span>React</span>
                </span>,
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-full text-xs text-white">
                  <img src="/images/nextjs-icon.webp" alt="Next.js" loading="lazy" decoding="async" width={16} height={16} className="w-4 h-4" />
                  <span>Next.js</span>
                </span>,
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-full text-xs text-white">
                  <img src="/images/typescript-icon.webp" alt="TypeScript" loading="lazy" decoding="async" width={16} height={16} className="w-4 h-4" />
                  <span>TypeScript</span>
                </span>.
            </p>
            <p>
              Je suis activement à la recherche d'une <strong className="text-purple-400 font-semibold">alternance en développement full-stack</strong> à partir de septembre 2026. Curieux et autonome, j'aime relever de nouveaux défis techniques et apporter 
              de la valeur aux projets sur lesquels je travaille.
            </p>
          </div>

          <div className="flex-1 w-full max-w-md aspect-square relative flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none"></div>
            <GlobePulse speed={0.005} />
          </div>
        </div>
      </div>

      <div className="w-full h-[250px] md:h-[350px] mt-16 relative overflow-hidden pointer-events-none opacity-80">
        <PerspectiveMarqueeScene />
      </div>
    </section>
  );
}