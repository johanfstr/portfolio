"use client";

import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    let scroll: any = null;

    const initScrollEffects = async () => {
      try {
        console.log('Initializing scroll effects...');

        // Importer dynamiquement les modules
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const { gsap } = await import('gsap');

        console.log('Modules loaded:', { LocomotiveScroll, gsap });

        // Détection si on est sur mobile pour adapter les paramètres
        const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        console.log('Device detection:', isMobile, {
          width: window.innerWidth,
          hasTouch: 'ontouchstart' in window,
          maxTouchPoints: navigator.maxTouchPoints
        });

        // Initialiser Locomotive Scroll sur tous les appareils avec des paramètres adaptés
        const scrollConfig = isMobile ? {
          // Paramètres pour mobile - moins de fluidité pour éviter les conflits tactiles
          smooth: true,
          touchMultiplier: 1.5, // Plus sensible au toucher
          lerp: 0.15, // Moins fluide pour éviter les saccades
          direction: 'vertical',
          gestureDirection: 'vertical',
          tablet: {
            smooth: true,
            breakpoint: 0
          },
          smartphone: {
            smooth: true // Activer sur mobile
          }
        } : {
          // Paramètres pour desktop - plus fluide
          smooth: true,
          touchMultiplier: 0.25,
          lerp: 0.08,
          direction: 'vertical',
          gestureDirection: 'vertical',
          tablet: {
            smooth: true,
            breakpoint: 0
          },
          smartphone: {
            smooth: false
          }
        };

        scroll = new (LocomotiveScroll as any)(scrollConfig);
        console.log('Locomotive Scroll initialized for all devices with config:', scrollConfig);
        console.log('Device type:', isMobile ? 'Mobile/Touch' : 'Desktop', '- Smooth scroll enabled');

          // Attendre que Locomotive Scroll soit prêt
          scroll.on('scroll', (args: any) => {
            if (args.currentElements) {
              Object.keys(args.currentElements).forEach(key => {
                const el = args.currentElements[key];
                if (el.el.id && ['hero', 'skills', 'experiences', 'contact'].includes(el.el.id)) {
                  console.log(`${el.el.id} section progress:`, el.progress.toFixed(2));
                }
              });
            }
          });

          // Vérifier les éléments avec data-scroll
          setTimeout(() => {
            const scrollElements = document.querySelectorAll('[data-scroll]');
            console.log('Found scroll elements:', scrollElements.length);
            scrollElements.forEach((el, i) => {
              const element = el as HTMLElement;
              console.log(`Element ${i}: ${element.tagName}#${element.id || 'no-id'} - speed: ${element.getAttribute('data-scroll-speed')}`);
            });
          }, 500);

          // Gérer les clics sur les liens d'ancrage
          const handleAnchorClick = (e: Event, href: string) => {
            e.preventDefault();

            const targetId = href.replace('#', '');
            const targetElement = document.getElementById(targetId);

            if (targetElement && scroll) {
              const centerOffset = -Math.round(window.innerHeight * 0.45);
              scroll.scrollTo(targetElement, {
                offset: centerOffset,
                duration: 800,
                easing: [0.25, 0.1, 0.25, 1]
              });
            }
          };

          // Attacher les gestionnaires aux liens d'ancrage
          setTimeout(() => {
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            anchorLinks.forEach(link => {
              link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                  handleAnchorClick(e, href);
                }
              });
            });
          }, 1000);

        // GSAP transitions - toujours actif (même sur mobile)
        const allElements = document.querySelectorAll('main *');
        const header = document.querySelector('nav');
        const links = document.querySelectorAll('a');

        console.log('Found elements:', {
          allElements: allElements.length,
          header: !!header,
          links: links.length
        });

        links.forEach(link => {
          link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Ne pas traiter les ancres (déjà gérées par Locomotive Scroll sur desktop)
            if (href?.startsWith('#')) {
              return;
            }

            if (link.getAttribute('target') === '_blank' ||
                href?.startsWith('mailto:') ||
                href?.startsWith('tel:') ||
                href?.startsWith('javascript:') ||
                href?.includes('wa.me')) {
              return;
            }

            e.preventDefault();
            console.log('Page transition triggered for:', href);

            gsap.to([header, ...allElements], {
              opacity: 0,
              duration: 0.25,
              onComplete: () => {
                window.location.href = href!;
              }
            });
          });
        });

        console.log('GSAP transitions initialized');

      } catch (error) {
        console.error('Error initializing scroll effects:', error);
      }
    };

    // Attendre que le DOM soit prêt
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initScrollEffects);
    } else {
      initScrollEffects();
    }

    // Cleanup
    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  return null; // Ce composant ne rend rien
}