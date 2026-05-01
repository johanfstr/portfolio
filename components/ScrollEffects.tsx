"use client";

import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    let scroll: any = null;

    const initScrollEffects = async () => {
      try {
        // Importer dynamiquement Locomotive Scroll
        const LocomotiveScroll = (await import('locomotive-scroll')).default;

        // Détection mobile
        const isMobile = window.innerWidth <= 768;

        // Sur desktop, activer Locomotive Scroll
        if (!isMobile) {
          try {
            scroll = new (LocomotiveScroll as any)({
              smooth: true,
              smartphone: {
                smooth: false
              },
              tablet: {
                smooth: false
              }
            });

            console.log('✓ Locomotive Scroll initialized');

          } catch (err) {
            console.warn('Locomotive Scroll init failed, using native scroll:', err);
          }
        }

      } catch (error) {
        console.warn('Could not load Locomotive Scroll:', error);
      }
    };

    // Initialiser après un court délai pour laisser le DOM se stabiliser
    const timer = setTimeout(() => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollEffects, { once: true });
      } else {
        initScrollEffects();
      }
    }, 500);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (scroll) {
        try {
          scroll.destroy();
        } catch (e) {
          // Silent fail
        }
      }
    };
  }, []);

  return null;
}