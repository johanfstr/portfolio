import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type FromVars = { opacity?: number; y?: number; x?: number; scale?: number };

interface RevealOptions {
  from?: FromVars;
  duration?: number;
  ease?: string;
  stagger?: number;
  start?: string;
  delay?: number;
}

/**
 * Animate elements into view with GSAP ScrollTrigger.
 * Replays every time the trigger re-enters the viewport.
 */
export function useGsapReveal(
  refs: RefObject<HTMLElement | HTMLDivElement | null> | RefObject<HTMLElement | HTMLDivElement | null>[],
  options: RevealOptions = {}
) {
  const {
    from = { opacity: 0, y: 32 },
    duration = 0.6,
    ease = 'power3.out',
    stagger = 0,
    start = 'top 88%',
    delay = 0,
  } = options;

  useEffect(() => {
    const targets = (Array.isArray(refs) ? refs : [refs])
      .map(r => r.current)
      .filter(Boolean) as HTMLElement[];

    if (!targets.length) return;

    const triggers = targets.map(el =>
      gsap.fromTo(
        el,
        { ...from, opacity: from.opacity ?? 0 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          ease,
          delay,
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none reset',
          },
        }
      )
    );

    return () => {
      triggers.forEach(t => {
        (t.scrollTrigger as ScrollTrigger | undefined)?.kill();
        t.kill();
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Animate multiple child elements (e.g. cards) inside a container.
 */
export function useGsapRevealChildren(
  containerRef: RefObject<HTMLElement | HTMLDivElement | null>,
  selector: string,
  options: RevealOptions = {}
) {
  const {
    from = { opacity: 0, y: 32 },
    duration = 0.5,
    ease = 'power3.out',
    stagger = 0.08,
    start = 'top 88%',
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const els = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (!els.length) return;

    const tween = gsap.fromTo(
      els,
      { ...from, opacity: from.opacity ?? 0 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none reset',
        },
      }
    );

    return () => {
      (tween.scrollTrigger as ScrollTrigger | undefined)?.kill();
      tween.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
