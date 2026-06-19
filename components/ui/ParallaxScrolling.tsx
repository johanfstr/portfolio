'use client';
import React, { useEffect, useRef } from 'react';

type ParallaxComponentProps = {
  onReady?: () => void;
  disableScroll?: boolean;
};

export function ParallaxComponent({ onReady, disableScroll }: ParallaxComponentProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const readyCalled = useRef(false);
  const loadedCount = useRef(0);
  const totalLayers = 4;

  const notifyReady = () => {
    loadedCount.current += 1;
    if (!readyCalled.current && loadedCount.current >= totalLayers) {
      readyCalled.current = true;
      onReady?.();
    }
  };

  const handleImageRef = (img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) notifyReady();
  };

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
      layers.stars.forEach((el) => { el.style.transform = `translate3d(${value * 0.25}px, 0, 0)`; });
      layers.moon.forEach((el) => { el.style.transform = `translate3d(0, ${value * 1.05}px, 0)`; });
      layers.behind.forEach((el) => { el.style.transform = `translate3d(0, ${value * 0.5}px, 0)`; });
      layers.front.forEach((el) => { el.style.transform = `translate3d(0, ${value * 0}px, 0)`; });
    };

    applyTransforms();

    if (disableScroll) return;

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          applyTransforms();
          rafRef.current = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [disableScroll]);

  return (
    <div className="parallax w-full h-full relative overflow-hidden">
      <section ref={sectionRef} className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none bg-[#050710]">
          <img
            ref={handleImageRef}
            data-layer="stars"
            src="/images/parallax-stars.webp"
            alt=""
            decoding="async"
            fetchPriority="high"
            onLoad={notifyReady}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <img
            ref={handleImageRef}
            data-layer="moon"
            src="/images/parallax-moon.webp"
            alt=""
            decoding="async"
            onLoad={notifyReady}
            className="absolute top-0 left-0 w-full h-full object-cover mix-blend-screen z-10"
          />
          <img
            ref={handleImageRef}
            data-layer="behind"
            src="/images/parallax-mountains-behind.webp"
            alt=""
            decoding="async"
            onLoad={notifyReady}
            className="absolute top-0 left-0 w-full h-full object-cover z-20"
          />
          <img
            ref={handleImageRef}
            data-layer="front"
            src="/images/parallax-mountains-front.webp"
            alt=""
            decoding="async"
            onLoad={notifyReady}
            className="absolute top-0 left-0 w-full h-full object-cover z-30"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#1c0522] to-transparent pointer-events-none z-40" />
      </section>
    </div>
  );
}
