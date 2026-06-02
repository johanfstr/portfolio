"use client";
import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 12;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const positions = useRef(Array(TRAIL_LENGTH).fill({ x: -100, y: -100 }));
  const mouse = useRef({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };

    const onDown = (e: MouseEvent) => {
      setClicking(true);
      const newRipples = [0, 1, 2].map((i) => ({
        id: rippleId.current++,
        x: e.clientX,
        y: e.clientY,
        size: 12 + i * 10,
        delay: i * 80,
      }));
      setRipples((prev) => [...prev, ...newRipples]);
      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((r) => !newRipples.find((n) => n.id === r.id))
        );
      }, 700);
    };

    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let lastTime = 0;
    let raf: number;

    const animate = (ts: number) => {
      if (ts - lastTime > 16) {
        lastTime = ts;
        positions.current = [
          { ...mouse.current },
          ...positions.current.slice(0, TRAIL_LENGTH - 1),
        ];
        trailRefs.current.forEach((el, i) => {
          if (!el) return;
          const p = positions.current[i];
          el.style.left = p.x + "px";
          el.style.top = p.y + "px";
        });
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes ripple-out {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        .cursor-ripple {
          position: fixed;
          border-radius: 50%;
          border: 1.5px solid #8b5cf6;
          pointer-events: none;
          /* CORRECTION 1 : L'onde passe au-dessus de la navbar */
          z-index: 100010;
          transform: translate(-50%, -50%) scale(1);
          animation: ripple-out 0.5s ease-out forwards;
        }
      `}</style>

      {/* Main dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: clicking ? "#8b5cf6" : "white",
          transform: `translate(-50%, -50%) scale(${clicking ? 1.2 : 1})`,
          transition: "transform 0.1s ease, background 0.1s",
          pointerEvents: "none",
          /* CORRECTION 2 : Le point principal survole absolument tout */
          zIndex: 100020,
          left: -100,
          top: -100,
        }}
      />

      {/* Trail */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => {
        const size = Math.max(8, 25 - i * 0.55);
        return (
          <div
            key={i}
            ref={(el) => { if (el) trailRefs.current[i] = el; }}
            style={{
              position: "fixed",
              width: size,
              height: size,
              borderRadius: "50%",
              background: "white",
              opacity: (1 - i / TRAIL_LENGTH) * 0.4,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              /* CORRECTION 3 : La traînée commence à 100 000 et descend, 
                 restant largement supérieure au z-[9999] de la Navbar */
              zIndex: 100000 - i,
              left: -100,
              top: -100,
            }}
          />
        );
      })}

      {/* Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="cursor-ripple"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            animationDelay: `${r.delay}ms`,
          }}
        />
      ))}
    </>
  );
}