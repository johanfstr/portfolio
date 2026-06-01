"use client";

import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    let scroll: any = null;

    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;

        scroll = new (LocomotiveScroll as any)({
          // Locomotive Scroll v5 uses Lenis internally —
          // no separate Lenis instance needed anywhere else.
          lenisOptions: {
            lerp: 0.1,
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
          },
        });

        console.log('✓ Locomotive Scroll v5 initialized');
      } catch (error) {
        console.warn('Could not load Locomotive Scroll:', error);
      }
    };

    // Small delay to let the DOM stabilize after hydration
    const timer = setTimeout(initScroll, 100);

    return () => {
      clearTimeout(timer);
      if (scroll) {
        try { scroll.destroy(); } catch (_) { /* silent */ }
      }
    };
  }, []);

  return null;
}