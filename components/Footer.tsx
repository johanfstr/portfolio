"use client"

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-800 pt-12 pb-6 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
        <div>
          <h3 className="text-2xl font-extrabold mb-3 font-geist-sans">Portfolio</h3>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 mb-6" />
          <p className="text-white/60 max-w-xl leading-relaxed">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <div className="mt-6 flex gap-3 items-center">
            <span className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="w-3 h-3 rounded-full bg-purple-500/70" />
            <span className="w-3 h-3 rounded-full bg-purple-500/40" />
          </div>
        </div>

        <div className="md:text-right">
          <h4 className="text-2xl font-extrabold mb-3 font-geist-sans">Suivez‑moi</h4>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 mb-6 md:ml-auto" />

          <div className="flex gap-3 justify-start md:justify-end">
            <a href="https://github.com/johanfstr" target="_blank" aria-label="GitHub" className="w-10 h-10 rounded-lg border border-purple-700 flex items-center justify-center text-white/90 hover:bg-white/2 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <title>GitHub</title>
                <path d="M12 .5C5.649.5.5 5.649.5 12c0 5.086 3.292 9.4 7.869 10.93.574.106.783-.25.783-.555 0-.274-.01-1-.015-1.96-3.2.695-3.876-1.544-3.876-1.544-.523-1.33-1.278-1.686-1.278-1.686-1.045-.715.079-.7.079-.7 1.155.081 1.764 1.186 1.764 1.186 1.028 1.762 2.698 1.252 3.354.957.105-.744.403-1.253.733-1.543-2.56-.29-5.248-1.28-5.248-5.696 0-1.259.452-2.286 1.193-3.09-.12-.293-.517-1.472.113-3.068 0 0 .97-.31 3.177 1.18a11.03 11.03 0 012.9-.395c.984 0 1.973.134 2.897.395 2.205-1.49 3.175-1.18 3.175-1.18.635 1.596.237 2.775.116 3.068.743.804 1.192 1.83 1.192 3.09 0 4.42-2.694 5.404-5.258 5.688.414.355.783 1.056.783 2.129 0 1.535-.014 2.773-.014 3.15 0 .308.205.667.79.554C20.71 21.4 24 17.085 24 12 24 5.649 18.351.5 12 .5z"/>
              </svg>
            </a>

            <a href="https://www.linkedin.com/in/johanforestier/" target="_blank" aria-label="LinkedIn" className="w-10 h-10 rounded-lg border border-purple-700 flex items-center justify-center text-white/90 hover:bg-white/2 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <title>LinkedIn</title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.026-3.037-1.85-3.037-1.849 0-2.132 1.444-2.132 2.939v5.667H9.356V9h3.415v1.561h.049c.476-.902 1.637-1.85 3.366-1.85 3.598 0 4.263 2.368 4.263 5.451v6.29zM5.337 7.433c-1.143 0-2.067-.927-2.067-2.068 0-1.142.924-2.068 2.067-2.068 1.142 0 2.066.926 2.066 2.068 0 1.141-.924 2.068-2.066 2.068zM6.834 20.452H3.84V9h2.994v11.452z"/>
              </svg>
            </a>

            <a href="https://www.instagram.com/johanfstr" target="_blank" aria-label="Instagram" className="w-10 h-10 rounded-lg border border-purple-700 flex items-center justify-center text-white/90 hover:bg-white/2 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <title>Instagram</title>
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zM19.5 6.3a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"/>
              </svg>
            </a>

            <a href="mailto:contact@johanf.fr" aria-label="Mail" className="w-10 h-10 rounded-lg border border-purple-700 flex items-center justify-center text-white/90 hover:bg-white/2 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <title>Email</title>
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-gray-800 flex items-center justify-between text-white/60 text-sm">
        <div>© 2026 <span className="text-purple-500 font-semibold">Johan Forestier</span> - Tous droits réservés</div>
        <div>
          Fait avec <span className="ml-1 mr-1 text-red-500">❤</span> avec <a href="#" className="text-purple-500 font-semibold">React</a>
        </div>
      </div>
    </footer>
  )
}
