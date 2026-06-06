"use client"

import { useEffect, useRef, useState } from "react"

type BootPart = string | { cls?: string; text: string; cursor?: boolean }
type Line =
  | { kind: 'text'; text: string }
  | { kind: 'parts'; parts: BootPart[] }

const STORAGE_KEY = 'nr_boot_seen'

const LINES: Line[] = [
  { kind: 'text', text: 'BIOS v6.2 — JF Systems Inc.' },
  { kind: 'parts', parts: ['checking memory.......... ', { cls: 'ok', text: 'ok' }] },
  { kind: 'parts', parts: ['loading kernel ', { cls: 'info', text: 'johanfstr' }, '.', { cls: 'val', text: 'portfolio' }] },
  { kind: 'parts', parts: ['detecting projects........ ', { cls: 'ok', text: '[6 found]' }] },
  { kind: 'parts', parts: ['stack: ', { cls: 'info', text: 'C' }, ', ', { cls: 'info', text: 'C#' }, ', ', { cls: 'info', text: 'React' }, ', ', { cls: 'info', text: 'JavaScript' }, ', ', { cls: 'info', text: 'OCaml' }, ', ', { cls: 'info', text: 'Java' }] },
  { kind: 'parts', parts: ['coffee.service: ', { cls: 'warn', text: 'low' }] },
  { kind: 'parts', parts: ['all systems ', { cls: 'ok', text: 'ready', cursor: true }] },
]

export default function Intro({ onFinish, onStart, force }: { onFinish?: () => void; onStart?: () => void; force?: boolean }) {
  const [visible, setVisible] = useState(true)
  const [idx, setIdx] = useState(0)
  const [barOn, setBarOn] = useState(false)
  const [fillGo, setFillGo] = useState(false)
  const [crtOff, setCrtOff] = useState(false)
  const [replayVisible, setReplayVisible] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    // If user already saw the boot and `force` is not set, skip it and show site immediately
    const seen = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)
    if (!force && seen) {
      setVisible(false)
      setReplayVisible(true)
      const t = window.setTimeout(() => onFinish?.(), 900)
      return () => clearTimeout(t)
    }

    runBootSequence()

    return () => {
      // clear timeouts
      timers.current.forEach(t => clearTimeout(t))
      timers.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [force])

  function clearTimers() {
    timers.current.forEach(t => clearTimeout(t))
    timers.current = []
  }

  function runBootSequence() {
    clearTimers()
    setVisible(true)
    setIdx(0)
    setBarOn(false)
    setFillGo(false)
    setCrtOff(false)
    setReplayVisible(false)

    let i = 0

    function nextLine() {
      if (i < LINES.length) {
        setIdx((c) => c + 1)
        i++
        const delay = 120 + Math.random() * 80
        const t = window.setTimeout(nextLine, delay)
        timers.current.push(t)
      } else {
        // show bar
        setBarOn(true)
        const t1 = window.setTimeout(() => setFillGo(true), 80)
        timers.current.push(t1)
        const t2 = window.setTimeout(() => {
          setCrtOff(true)
          const t3 = window.setTimeout(() => {
            setVisible(false)
            onFinish?.()
            try { window.localStorage.setItem(STORAGE_KEY, '1') } catch (e) {}
            setReplayVisible(true)
          }, 500)
          timers.current.push(t3)
        }, 900)
        timers.current.push(t2)
      }
    }

    const t0 = window.setTimeout(nextLine, 300)
    timers.current.push(t0)
  }

  function handleReplay() {
    // notify parent that intro is starting so it can remove `site.on` class
    onStart?.()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => runBootSequence(), 400)
  }

  if (!visible) {
    // Replay button moved to Footer - scroll-to-top arrow replaces this
    return null
  }

  return (
    <div className={`boot${crtOff ? ' crt-off' : ''}`} id="boot">
      <div id="bootLines">
        {LINES.map((line, i) => (
          <div key={i} className={`boot-line ${i < idx ? 'on' : ''}`}>
            {line.kind === 'text' ? (
              line.text
            ) : (
              // explicit ternary so TypeScript narrows `line` to the 'parts' branch
              line.parts.map((p: BootPart, j: number) => (
                typeof p === 'string' ? (
                  <span key={j}>{p}</span>
                ) : (
                  <span key={j} className={p.cls}>{p.text}{p.cursor ? <span className="boot-cursor" /> : null}</span>
                )
              ))
            )}
            {i === idx && <span className="boot-cursor" />}
          </div>
        ))}
      </div>

      <div className={`boot-bar ${barOn ? 'on' : ''}`} id="bootBar">
        <div className={`boot-fill ${fillGo ? 'go' : ''}`} id="bootFill"></div>
      </div>
    </div>
  )
}