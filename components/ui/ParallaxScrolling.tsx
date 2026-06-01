'use client';
import React, { useEffect, useRef } from 'react';

export function ParallaxComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Layer references inside the section
    const layers = {
      stars: Array.from(section.querySelectorAll<HTMLElement>('[data-layer="stars"]')),
      moon: Array.from(section.querySelectorAll<HTMLElement>('[data-layer="moon"]')),
      behind: Array.from(section.querySelectorAll<HTMLElement>('[data-layer="behind"]')),
      front: Array.from(section.querySelectorAll<HTMLElement>('[data-layer="front"]')),
    };

    const applyTransforms = () => {
      const value = window.scrollY;

      // Apply the user's specific transitions
      layers.stars.forEach((el) => {
        el.style.left = `${value * 0.25}px`;
      });
      layers.moon.forEach((el) => {
        el.style.top = `${value * 1.05}px`;
      });
      layers.behind.forEach((el) => {
        el.style.top = `${value * 0.5}px`;
      });
      layers.front.forEach((el) => {
        el.style.top = `${value * 0}px`;
      });

      {/* const text = document.getElementById("text");
      if (text) {
        text.style.transform = `translate(${-value * 0.25}px, ${value * 0.25}px)`;
      }

      const text2 = document.getElementById("text2");
      if (text2) {
        text2.style.transform = `translate(${-value * 0.25}px, ${value * 0.25}px)`;
      }

      const btn = document.getElementById("btn");
      if (btn) {
        btn.style.transform = `translateY(${value * 0.75}px)`;
      }
*/};
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
    
    // initial paint
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
          <img
            data-layer="stars"
            src="https://i.imgur.com/VZkn61W.png"
            alt="stars"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            loading="eager"
          />
          <img
            data-layer="moon"
            src="https://i.imgur.com/pDizBZY.png"
            alt="moon"
            className="absolute top-0 left-0 w-full h-full object-cover mix-blend-screen z-10"
            loading="eager"
          />
          <img
            data-layer="behind"
            src="https://i.imgur.com/jYxvwbK.png"
            alt="mountains behind"
            className="absolute top-0 left-0 w-full h-full object-cover z-20"
            loading="eager"
          />
          <img
            data-layer="front"
            src="https://i.imgur.com/9QGztW5.png"
            alt="mountains front"
            className="absolute top-0 left-0 w-full h-full object-cover z-30"
            loading="eager"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#1c0522] to-transparent pointer-events-none z-40" />
      </section>
    </div>
  );
}