"use client";

import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    let lenis: any = null;
    let rafId: number;

    const init = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        lenis = new Lenis({ lerp: 0.1, duration: 1.2, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 2 });

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
