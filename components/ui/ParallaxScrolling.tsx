'use client';
import React, { useEffect, useRef } from 'react';

export function ParallaxComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const layers = {
      stars: Array.from(section.querySelectorAll<HTMLElement>('[data-layer="stars"]')),
      moon: Array.from(section.querySelectorAll<HTMLElement>('[data-layer="moon"]')),
      behind: Array.from(section.querySelectorAll<HTMLElement>('[data-layer="behind"]')),
      front: Array.from(section.querySelectorAll<HTMLElement>('[data-layer="front"]')),
    };

    const applyTransforms = () => {
      const value = window.scrollY;
      layers.stars.forEach((el) => { el.style.left = `${value * 0.25}px`; });
      layers.moon.forEach((el) => { el.style.top = `${value * 1.05}px`; });
      layers.behind.forEach((el) => { el.style.top = `${value * 0.5}px`; });
      layers.front.forEach((el) => { el.style.top = `${value * 0}px`; });
    };

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          applyTransforms();
          rafRef.current = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    applyTransforms();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="parallax w-full h-full relative overflow-hidden">
      <section ref={sectionRef} className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none">
          {/* Above-the-fold: eager loading, no lazy */}
          <img
            data-layer="stars"
            src="/images/parallax-stars.webp"
            alt="stars"
            decoding="async"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <img
            data-layer="moon"
            src="/images/parallax-moon.webp"
            alt="moon"
            decoding="async"
            className="absolute top-0 left-0 w-full h-full object-cover mix-blend-screen z-10"
          />
          <img
            data-layer="behind"
            src="/images/parallax-mountains-behind.webp"
            alt="mountains behind"
            decoding="async"
            className="absolute top-0 left-0 w-full h-full object-cover z-20"
          />
          <img
            data-layer="front"
            src="/images/parallax-mountains-front.webp"
            alt="mountains front"
            decoding="async"
            className="absolute top-0 left-0 w-full h-full object-cover z-30"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#1c0522] to-transparent pointer-events-none z-40" />
      </section>
    </div>
  );
}
