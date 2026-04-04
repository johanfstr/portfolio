"use client"

import { useEffect, useState } from "react"

export default function Intro({ onFinish }: { onFinish?: () => void }) {
  const name = "Je suis Johan Forestier,"
  const uni = "Étudiant à l’Université de Poitiers"

  const [visible, setVisible] = useState(true)
  const [typedName, setTypedName] = useState("")
  const [typedUni, setTypedUni] = useState("")
  const [phase, setPhase] = useState<
    | "typingName"
    | "pause1"
    | "typingUni"
    | "pause2"
    | "zooming"
    | "done"
  >("typingName")

  useEffect(() => {
    if (!visible) return

    // Typing "name" — use slice and guard against undefined
    if (phase === "typingName") {
      let i = 1
      setTypedName("")
      const id = setInterval(() => {
        if (i <= name.length) {
          setTypedName(name.slice(0, i))
          i++
        } else {
          clearInterval(id)
          setPhase("pause1")
        }
      }, 50)

      return () => clearInterval(id)
    }

    // short pause before typing university
    if (phase === "pause1") {
      const t = setTimeout(() => setPhase("typingUni"), 350)
      return () => clearTimeout(t)
    }

    // Typing "uni" — use slice and guard against undefined
    if (phase === "typingUni") {
      let j = 1
      setTypedUni("")
      const id2 = setInterval(() => {
        if (j <= uni.length) {
          setTypedUni(uni.slice(0, j))
          j++
        } else {
          clearInterval(id2)
          setPhase("pause2")
        }
      }, 40)
      return () => clearInterval(id2)
    }

    // pause then zoom-out
    if (phase === "pause2") {
      const t2 = setTimeout(() => {
        setPhase("zooming")
        onFinish?.()
      }, 700)
      return () => clearTimeout(t2)
    }

    // keep zoom animation duration in sync with CSS (700ms), then hide
    if (phase === "zooming") {
      const t3 = setTimeout(() => {
        setPhase("done")
        setVisible(false)
      }, 700)
      return () => clearTimeout(t3)
    }
  }, [phase, visible])

  // allow user to skip the intro (Space or Escape)
  const skipIntro = () => {
    // set full text so the overlay looks finished during zoom
    setTypedName(name)
    setTypedUni(uni)

    // if not already zooming/done, trigger zoom to reveal hero and call onFinish
    if (phase !== "zooming" && phase !== "done") {
      setPhase("zooming")
      onFinish?.()
    }
  }

  useEffect(() => {
    if (!visible) return
    const handler = (e: KeyboardEvent) => {
      const key = e.key || e.code
      if (key === " " || key === "Space" || key === "Spacebar" || key === "Escape" || key === "Esc") {
        e.preventDefault()
        skipIntro()
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [visible, phase])

  // split name/uni so highlighted parts can be colored while typing
  const namePrefix = "Je suis "
  const nameHighlight = "Johan Forestier"
  const nameSuffix = ","
  const uniPrefix = "Étudiant à "
  const uniHighlight = "l’Université de Poitiers"

  const namePre = typedName.slice(0, Math.min(typedName.length, namePrefix.length))
  const nameHigh = typedName.length > namePrefix.length ? typedName.slice(namePrefix.length, Math.min(typedName.length, namePrefix.length + nameHighlight.length)) : ""
  const namePost = typedName.length > namePrefix.length + nameHighlight.length ? typedName.slice(namePrefix.length + nameHighlight.length) : ""

  const uniPre = typedUni.slice(0, Math.min(typedUni.length, uniPrefix.length))
  const uniHigh = typedUni.length > uniPrefix.length ? typedUni.slice(uniPrefix.length) : ""

  if (!visible) return null

  return (
    <div className={`intro-screen ${phase === "zooming" ? "intro-zoom" : ""}`}>
      <div className="text-center px-6 max-w-4xl mx-auto text-white pointer-events-none">
        <h1 className="text-[40px] md:text-[72px] lg:text-[96px] font-extrabold tracking-tight leading-tight font-geist-sans">
          <span className="typing-container">
            <span className="text-white">{namePre}</span>
            <span className="text-purple-500">{nameHigh}</span>
            <span className="text-white">{namePost}</span>
            <span className={`cursor ${phase === "typingName" && typedName.length > namePrefix.length ? "text-purple-500" : "text-white"}`} />
          </span>
        </h1>

        <p className="mt-4 text-xl md:text-2xl text-white/70 font-geist-sans">
          <span className="typing-container">
            <span className="text-white">{uniPre}</span>
            <span className="text-purple-400 font-semibold">{uniHigh}</span>
            {phase !== "typingName" && (
              <span className={`cursor ${phase === "typingUni" && typedUni.length > uniPrefix.length ? "text-purple-400" : "text-white"}`} />
            )}
          </span>
        </p>
      </div>

      {/* Skip hint (clickable + keyboard) */}
      <button
        onClick={skipIntro}
        className="pointer-events-auto absolute bottom-7 right-6 bg-white/6 border border-white/10 text-white/70 text-sm px-3 py-2 rounded-full hover:bg-white/8 transition"
        aria-label="Passer l'intro (Espace, Échap)"
      >
        Appuyer sur <span className="font-semibold mx-2">Espace</span> ou <span className="font-semibold mx-2">Échap</span> pour passer
      </button>
    </div>
  )
}
