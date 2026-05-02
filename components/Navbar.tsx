"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 w-[min(820px,92%)] z-50">
      <div className="nav-glass px-4 md:px-6 py-1 flex items-center justify-between gap-3">

        {/* ===== Left: Logo ===== */}
        <div className="nav-logo">
          <img
            src="/logo.png"
            alt="Logo"
            className="nav-logo-img"
          />
        </div>

        {/* ===== Center: Desktop Navigation ===== */}
        <div className="hidden md:absolute md:inset-0 md:flex md:items-center md:justify-center pointer-events-none">
          <div className="flex gap-4 md:gap-8 text-sm font-semibold pointer-events-auto">

            <a href="#hero" className="nav-link nav-link-responsive">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M4 21c1.5-4 6-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span className="nav-text">A propos</span>
            </a>

            <a href="#projects" className="nav-link nav-link-responsive">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="14" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="3" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="14" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              <span className="nav-text">Projets</span>
            </a>

            <a href="#skills" className="nav-link nav-link-responsive">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M14 3l7 7-10 10H4v-7L14 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
              <span className="nav-text">Compétences</span>
            </a>

            <a href="#experiences" className="nav-link nav-link-responsive">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M16 3H8v4h8V3z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              <span className="nav-text">Expériences</span>
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

      <div className={`nav-mobile-panel md:hidden ${menuOpen ? "open" : ""}`}>
        <div className="flex flex-col gap-3 text-sm font-semibold">
          <a href="#hero" className="nav-link nav-link-responsive" onClick={() => setMenuOpen(false)}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M4 21c1.5-4 6-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <span className="nav-text">A propos</span>
          </a>

          <a href="#projects" className="nav-link nav-link-responsive" onClick={() => setMenuOpen(false)}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <rect x="14" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <rect x="3" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <rect x="14" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
            <span className="nav-text">Projets</span>
          </a>

          <a href="#skills" className="nav-link nav-link-responsive" onClick={() => setMenuOpen(false)}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
              <path d="M14 3l7 7-10 10H4v-7L14 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            <span className="nav-text">Compétences</span>
          </a>

          <a href="#experiences" className="nav-link nav-link-responsive" onClick={() => setMenuOpen(false)}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M16 3H8v4h8V3z" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
            <span className="nav-text">Expériences</span>
          </a>

          <a href="#contact" className="nav-link nav-link-responsive" onClick={() => setMenuOpen(false)}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
            <span className="nav-text">Me contacter</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
