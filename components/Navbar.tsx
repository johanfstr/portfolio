export default function Navbar() {
  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 w-[min(820px,92%)] z-50">
      <div className="nav-glass px-4 md:px-6 py-1 flex items-center justify-between">

        {/* ===== Left: Logo ===== */}
        <div className="nav-logo">
          <img
            src="/logo.png"
            alt="Logo"
            className="nav-logo-img"
          />
        </div>

        {/* ===== Center: Navigation Links ===== */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex gap-4 md:gap-8 text-sm font-semibold pointer-events-auto">

            {/* About */}
            <a href="#hero" className="nav-link nav-link-responsive">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M4 21c1.5-4 6-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span className="nav-text">A propos</span>
            </a>

            {/* Projects */}
            <a href="#projects" className="nav-link nav-link-responsive">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="14" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="3" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <rect x="14" y="15" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              <span className="nav-text">Projets</span>
            </a>

            {/* Skills */}
            <a href="#skills" className="nav-link nav-link-responsive">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M14 3l7 7-10 10H4v-7L14 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
              <span className="nav-text">Compétences</span>
            </a>

            {/* Experiences */}
            <a href="#experiences" className="nav-link nav-link-responsive">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M16 3H8v4h8V3z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              <span className="nav-text">Expériences</span>
            </a>

          </div>
        </div>

        {/* ===== Right: Actions (e.g., WhatsApp) ===== */}
        <div className="flex items-center gap-1">
          <a
            href="https://wa.me/"
            aria-label="WhatsApp"
            className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shadow-whats ring-4 ring-emerald-900/30 mr-3"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 .03 5.343.03 12c0 2.116.557 4.191 1.61 6.03L0 24l6.24-1.634A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.205-1.255-6.203-3.48-8.52zM12 21.5c-1.85 0-3.595-.5-5.13-1.44l-.37-.22L4 20l1.16-2.53-.24-.39A9.5 9.5 0 012.5 12C2.5 6.75 6.75 2.5 12 2.5S21.5 6.75 21.5 12 17.25 21.5 12 21.5z"
                fill="white"
              />
            </svg>
          </a>
        </div>

      </div>
    </nav>
  );
}
