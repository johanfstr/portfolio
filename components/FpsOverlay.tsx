"use client";

import { useEffect, useRef } from "react";

export default function FpsOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = performance.now();
    let frames = 0;
    let rafId: number;

    const loop = (now: number) => {
      frames++;
      if (now - last >= 500) {
        const fps = Math.round((frames * 1000) / (now - last));
        if (ref.current) {
          ref.current.textContent = `${fps} FPS`;
          ref.current.style.color = fps >= 50 ? "#4ade80" : fps >= 30 ? "#facc15" : "#f87171";
        }
        frames = 0;
        last = now;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 99999,
        fontFamily: "monospace",
        fontSize: 13,
        fontWeight: 700,
        background: "rgba(0,0,0,0.7)",
        padding: "4px 8px",
        borderRadius: 4,
        pointerEvents: "none",
      }}
    />
  );
}
