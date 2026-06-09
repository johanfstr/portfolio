"use client"

import { cn } from "@/lib/utils"
import type { CSSProperties, FC, ReactNode } from "react"

interface OrbitingCirclesProps {
  children?: ReactNode
  iconSize?: number
  radius?: number
  reverse?: boolean
  speed?: number
  className?: string
}

export const OrbitingCircles: FC<OrbitingCirclesProps> = ({
  children,
  iconSize = 40,
  radius = 160,
  reverse = false,
  speed = 1,
  className,
}) => {
  const items = Array.isArray(children) ? children : children ? [children] : []
  const count = items.length
  const duration = 20 / speed

  return (
    <>
      <div
        className="absolute rounded-full border border-white/10 pointer-events-none"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      {items.map((child, i) => {
        const startAngle = (360 / count) * i
        return (
          <div
            key={i}
            className={cn("absolute flex items-center justify-center", className)}
            style={
              {
                width: iconSize,
                height: iconSize,
                "--radius": `${radius}px`,
                "--start": `${startAngle}deg`,
                "--duration": `${duration}s`,
                animation: `${reverse ? "orbitReverse" : "orbitForward"} var(--duration) linear infinite`,
              } as CSSProperties
            }
          >
            {child}
          </div>
        )
      })}
    </>
  )
}
