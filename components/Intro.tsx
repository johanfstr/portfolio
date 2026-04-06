"use client"
import { useEffect, useState, useCallback } from "react"

const WARNING_LINES = [
  { type: "text", text: "     __        /!                   ___________ " },
  { type: "text", text: "    |__| ____ |  |__ _____    ____  !_   _____/ " },
  { type: "text", text: "    |  |/ __ !|  |  !!__  !  /    !   |  ___)   " },
  { type: "text", text: "    |  |  !_! )      !/ __ !_   |  !  |  !__    " },
  { type: "text", text: "/!__|  |!____/|___|  /____  /___|  / /___  / /! " },
  { type: "text", text: "!_____/            !/     !/     !/      !/  !/ " },
  { type: "warning", text: "W E L C O M E" },
  { type: "text", text: "# Boot sequence complete. Access granted: johan #" },
  { type: "separator" },
]

const BOOT_LINES = [
  { type: "empty" },
  { type: "cmd", text: "[johan@portfolio ~]$ ls -la" },
  { type: "out", text: "drwxr-xr-x  projects/" },
  { type: "out", text: "-rw-r--r--  about.txt" },
  { type: "out", text: "-rw-r--r--  contact.txt" },
  { type: "empty" },
  { type: "cmd", text: "[johan@portfolio ~]$ cat about.txt" },
  { type: "out", text: "Welcome. Loading portfolio..." },
  { type: "empty" },
]

const ALL_LINES = [...WARNING_LINES, ...BOOT_LINES]

export default function Intro({ onFinish }: { onFinish?: () => void }) {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<"booting" | "zooming" | "done">("booting")
  const [lineIndex, setLineIndex] = useState(0)

  const skipIntro = useCallback(() => {
    if (phase !== "zooming" && phase !== "done") {
      setPhase("zooming")
      onFinish?.()
    }
  }, [phase, onFinish])

  useEffect(() => {
    if (!visible) return
    if (phase === "booting") {
      if (lineIndex < ALL_LINES.length) {
        const delay = ALL_LINES[lineIndex]?.type === "cmd" ? 350 : 120
        const timer = window.setTimeout(() => setLineIndex((c) => c + 1), delay)
        return () => window.clearTimeout(timer)
      }
      const doneTimer = window.setTimeout(() => {
        setPhase("zooming")
        onFinish?.()
      }, 1800)
      return () => window.clearTimeout(doneTimer)
    }
    if (phase === "zooming") {
      const t = window.setTimeout(() => {
        setPhase("done")
        setVisible(false)
      }, 700)
      return () => window.clearTimeout(t)
    }
  }, [phase, visible, lineIndex, onFinish])

  useEffect(() => {
    if (!visible) return
    const handler = (e: KeyboardEvent) => {
      if (["Space", " ", "Spacebar", "Escape", "Esc"].includes(e.key || e.code)) {
        e.preventDefault()
        skipIntro()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [visible, skipIntro])

  if (!visible) return null

  return (
    <div className={`crt-overlay${phase === "zooming" ? " crt-zoom-out" : ""}`}>
      {/* Outer monitor bezel — grey/beige CRT plastic */}
      <div className="crt-monitor">
        {/* Inner sunken recess around screen */}
        <div className="crt-screen-recess">
          {/* The CRT glass surface */}
          <div className="crt-screen">
            <div className="crt-scanlines" />
            <div className="crt-roll" />
            <div className="crt-glass-glare" />
            <div className="crt-phosphor-glow" />

            {/* Terminal content */}
            <div className="crt-content">
              {ALL_LINES.slice(0, lineIndex).map((line, i) => {
                if (line.type === "separator") {
                  return <div key={i} className="crt-separator">{"#".repeat(49)}</div>
                }
                if (line.type === "warning") {
                  return (
                    <div key={i} className="crt-separator crt-warning-title">
                      {"#".repeat(14)} {line.text} {"#".repeat(13)}
                    </div>
                  )
                }
                if (line.type === "empty") {
                  return <div key={i} className="crt-empty-line" />
                }
                if (line.type === "cmd") {
                  return <div key={i} className="crt-line crt-cmd">{line.text}</div>
                }
                return <div key={i} className="crt-line">{line.text}</div>
              })}
              {phase === "booting" && lineIndex <= ALL_LINES.length && (
                <span className="crt-cursor">█</span>
              )}
            </div>
          </div>
        </div>

        {/* Monitor bottom chin with LED */}
        <div className="crt-chin">
          <div className="crt-power-led" />
        </div>
      </div>

      <button onClick={skipIntro} className="crt-skip-btn" aria-label="Skip intro">
        Skip Intro (Press Space or Esc)
      </button>
    </div>
  )
}