import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HomeSections from "@/components/HomeSections";
import ScrambleWord from "@/components/ScrambleWord";
import MagneticButton from "@/components/MagneticButton";
import { IntroProvider } from "@/components/IntroContext";

export default function Home() {
  return (
    <IntroProvider>
      <Navbar />
      <HeroSection>
        <h1
          id="text"
          className="text-[40px] md:text-[64px] lg:text-[80px] font-extrabold tracking-tight leading-[1.05] drop-shadow-[0_8px_24px_rgba(99,58,237,0.25)]"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
        >
          <span className="hero-anim anim-h1-1 block bg-gradient-to-b from-white via-[#ffffff] to-[#ffffff] bg-clip-text">
            Je construis
          </span>
          <span className="hero-anim anim-h1-2 block bg-gradient-to-b from-white via-[#ffffff] to-[#ffffff] bg-clip-text">
            des trucs
          </span>
          <span className="hero-anim anim-h1-3 block text-white">
            <ScrambleWord className="scramble-word" />
          </span>
        </h1>

        <p id="text2" className="hero-sub hero-anim anim-sub mt-1 font-medium text-white/90 max-w-md">
          Étudiant à l&apos;
          <span className="items-center font-bold inline-flex rounded bg-purple-900/50 border border-purple-400 relative top-2">
<img
  src="/images/efrei.webp"
  alt="EFREI Bordeaux"
  width={230}           // taille d'affichage réelle × devicePixelRatio
  height={70}
  loading="eager"
  fetchPriority="high"
  decoding="async"
  className="h-10 w-auto"
/>
            &nbsp;Bordeaux&nbsp;
          </span>
          <br />
          Je cherche une <span className="text-white-900 font-bold">alternance</span> en développement{" "}
          <span className="text-purple-100 font-bold">full-stack</span> pour septembre 2026.
        </p>

        <div id="btn" className="hero-btns hero-anim anim-btns mt-8 flex gap-4 flex-wrap">
          <MagneticButton
            href="#projects"
            className="hero-glass-pill px-3 py-3 md:px-6 md:py-3 rounded-full text-foreground font-playfair text-sm md:text-base flex items-center gap-2 group"
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <rect x="14" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <rect x="3" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <rect x="14" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            Voir mes projets
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="hero-glass-pill px-3 py-3 md:px-6 md:py-3 rounded-full text-foreground font-playfair text-sm md:text-base flex items-center gap-2 group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            Me contacter
          </MagneticButton>
        </div>
      </HeroSection>

      <HomeSections />
    </IntroProvider>
  );
}