"use client"

import { useRef, useEffect, type ComponentPropsWithoutRef, type FC } from "react"
import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])
  const words = children.split(" ")

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrolled = -rect.top
      const total = section.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrolled / total))

      // Fixed pendant l'animation, libéré avant/après
      if (scrolled <= 0) {
        text.style.position = "absolute"
        text.style.top = "0"
        text.style.bottom = "auto"
      } else if (progress >= 1) {
        text.style.position = "absolute"
        text.style.top = "auto"
        text.style.bottom = "0"
      } else {
        text.style.position = "fixed"
        text.style.top = "0"
        text.style.bottom = "auto"
      }

      wordsRef.current.forEach((span, i) => {
        if (!span) return
        const start = i / words.length
        const end = start + 1 / words.length
        span.style.opacity = String(Math.max(0, Math.min(1, (progress - start) / (end - start))))
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [words.length])

  return (
    <div ref={sectionRef} className={cn("relative h-[250vh]", className)}>
      <div
        ref={textRef}
        className="left-0 right-0 h-screen flex items-center justify-center"
        style={{ position: "absolute", top: 0 }}
      >
        <span className="flex flex-wrap max-w-4xl px-8 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
          {words.map((word, i) => (
            <span key={i} className="relative mx-1 lg:mx-1.5">
              <span className="text-white/20">{word}</span>
              <span
                ref={(el) => { if (el) wordsRef.current[i] = el }}
                style={{ opacity: 0 }}
                className="absolute inset-0 text-white"
              >
                {word}
              </span>
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}
