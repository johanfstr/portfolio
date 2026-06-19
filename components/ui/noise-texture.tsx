"use client"

import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

export interface NoiseTextureProps extends ComponentProps<"div"> {
  className?: string
  noiseOpacity?: number
}

export const NoiseTexture = ({ className, noiseOpacity = 0.6, ...props }: NoiseTextureProps) => (
  <div
    className={cn("pointer-events-none absolute inset-0 z-0 select-none", className)}
    style={{ opacity: noiseOpacity * 100, backgroundImage: "url('/images/noise2.webp')", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }}
    {...props}
  />
)
