"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-0 right-0 mx-auto w-[min(820px,92%)] z-[9999]">
      
      <div className="w-full px-4 md:px-6 py-2 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-slate-950/40 backdrop-blur-xl saturate-180 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

        {/* ===== Left: Logo ===== */}
        <a href="#hero" className="transition-transform hover:scale-105">
          <img
            src="/logo-64.webp"
            alt="Logo"
            width={32}
            height={32}
            decoding="async"
            fetchPriority="high"
            className="h-8 w-8 object-contain"
          />
        </a>

        {/* ===== Center: Desktop Navigation ===== */}
        <div className="hidden md:absolute md:inset-0 md:flex md:items-center md:justify-center pointer-events-none">
          <div className="flex gap-4 md:gap-6 text-sm font-semibold pointer-events-auto text-white/80">

            <a href="#about" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M4 21c1.5-4 6-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span>A propos</span>
            </a>

            <a href="#projects" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="14" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="3" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="14" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              <span>Projets</span>
            </a>

            <a href="#skills" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M14 3l7 7-10 10H4v-7L14 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
              <span>Compétences</span>
            </a>

            <a href="#experiences" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M16 3H8v4h8V3z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              <span>Expériences</span>
            </a>

          </div>
        </div>

        {/* ===== Right: Actions and Burger ===== */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`nav-burger md:hidden ${menuOpen ? "open" : ""}`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* ===== Mobile Panel ===== */}
      <div className={`mt-2 p-4 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl transition-all duration-300 ${menuOpen ? "block opacity-100" : "hidden opacity-0"}`}>
        <div className="flex flex-col gap-3 text-sm font-semibold text-white/80">
          <a href="#about" className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5" onClick={() => setMenuOpen(false)}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M4 21c1.5-4 6-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            A propos
          </a>
          <a href="#projects" className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5" onClick={() => setMenuOpen(false)}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="14" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="3" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="14" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            Projets
          </a>
          <a href="#skills" className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5" onClick={() => setMenuOpen(false)}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M14 3l7 7-10 10H4v-7L14 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            Compétences
          </a>
          <a href="#experiences" className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5" onClick={() => setMenuOpen(false)}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M16 3H8v4h8V3z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            Expériences
          </a>
          <a href="#contact" className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5" onClick={() => setMenuOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Me contacter
          </a>
        </div>
      </div>
    </nav>
  );
}