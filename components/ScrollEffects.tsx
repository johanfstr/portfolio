"use client";

import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    let lenis: any = null;
    let rafId: number;

    const init = async () => {
      try {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
        const { default: Lenis } = await import('lenis'); // ← changé
        lenis = new Lenis({
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          autoResize: true, // par défaut déjà, explicite pour être sûr
        });

        const raf = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch (e) {
        console.warn('Could not load Lenis:', e);
      }
    };

    const timer = setTimeout(init, 100);
    return () => { clearTimeout(timer); cancelAnimationFrame(rafId); lenis?.destroy(); };
  }, []);

  return null;
}