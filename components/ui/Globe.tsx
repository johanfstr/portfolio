"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

interface PulseMarker {
  id: string
  location: [number, number]
  delay: number
}

interface GlobePulseProps {
  markers?: PulseMarker[]
  className?: string
  speed?: number
}

const defaultMarkers: PulseMarker[] = [
  { id: "pulse-1", location: [44.8378, -0.5792], delay: 0 }, // Bordeaux
]

export function GlobePulse({
  markers = defaultMarkers,
  className = "",
  speed = 0.003,
}: GlobePulseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 0

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width, height: width,
      phi: 0, theta: 0.2, dark: 1, diffuse: 1.5,
      mapSamples: 16000, mapBrightness: 10,
      baseColor: [0.5, 0.5, 0.5],
      markerColor: [0.2, 0.8, 0.9],
      glowColor: [0.05, 0.05, 0.05],
      markerElevation: 0,
      markers: markers.map((m) => ({ location: m.location, size: 0.025, id: m.id })),
      arcs: [], arcColor: [0.3, 0.85, 0.95],
      arcWidth: 0.5, arcHeight: 0.25, opacity: 0.7,
    })
    function animate() {
      if (!isPausedRef.current) phi += speed
      globe!.update({
        phi: phi + phiOffsetRef.current + dragOffset.current.phi,
        theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
      })
      animationId = requestAnimationFrame(animate)
    }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [markers, speed])

  return (
    <div className={`relative w-full aspect-square select-none ${className}`}>
      <style>{`
        @keyframes pulse-expand {
          0% { transform: scaleX(0.3) scaleY(0.3); opacity: 0.8; }
          100% { transform: scaleX(1.5) scaleY(1.5); opacity: 0; }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%", height: "100%", cursor: "grab", opacity: 0,
          transition: "opacity 1.2s ease", borderRadius: "50%", touchAction: "none",
        }}
      />
      {markers.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${m.id}`,
            top: "anchor(center)",
            left: "anchor(center)",
            // On centre le point d'ancrage exactement à (0,0) avec une taille nulle
            translate: "-50% -50%",
            width: 0, 
            height: 0,
            pointerEvents: "none" as const,
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            transition: "opacity 0.4s ease",
            willChange: "opacity",
          }}
        >
          {/* Le label LIVE décalé vers le haut */}
          <div style={{
            position: "absolute",
            bottom: "16px", // Distance au-dessus du point bleu
            left: "50%",
            translate: "-50% 0", // Pour bien le centrer horizontalement
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.35rem 0.6rem",
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
            borderRadius: 4,
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            whiteSpace: "nowrap" as const,
          }}>
            <span style={{
              width: 8, height: 8, background: "#ff3b30", borderRadius: "50%",
              boxShadow: "0 0 8px #ff3b30",
              animation: "live-pulse 1.5s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "font-semibold", fontWeight: 600,
              color: "#ffffff", 
            }}>Bordeaux</span>
          </div>

          {/* Le point bleu et ses pulsations parfaitement centrés sur l'origine */}
          <div style={{ 
            position: "absolute",
            top: 0,
            left: 0,
            translate: "-50% -50%", // Le centre du point bleu est exactement sur l'ancrage
            width: 10, height: 10, 
            display: "flex", justifyContent: "center", alignItems: "center" 
          }}>
            <span style={{
              position: "absolute", width: 30, height: 30,
              border: "2px solid #33ccdd", borderRadius: "50%", opacity: 0,
              animation: `pulse-expand 2s ease-out infinite ${m.delay}s`,
            }} />
            <span style={{
              position: "absolute", width: 30, height: 30,
              border: "2px solid #33ccdd", borderRadius: "50%", opacity: 0,
              animation: `pulse-expand 2s ease-out infinite ${m.delay + 0.5}s`,
            }} />
            <span style={{
              width: 10, height: 10, background: "#33ccdd", borderRadius: "50%",
              boxShadow: "0 0 0 3px #111, 0 0 0 5px #33ccdd", zIndex: 1,
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}