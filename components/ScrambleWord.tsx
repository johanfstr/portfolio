"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["cool", "fou", "wild", "based", "cracked"];
const CHARS = "#@$*&!%^~+=";
const LCP_DELAY_MS = 3500;

type ScrambleWordProps = {
  initial?: string;
  className?: string;
};

export default function ScrambleWord({ initial = "cool", className }: ScrambleWordProps) {
  const scrRef = useRef<HTMLSpanElement>(null);
  const [scrWord, setScrWord] = useState(initial);
  const currentIdx = useRef(0);
  const scrambling = useRef(false);
  const active = useRef(false);

  function scrambleTo(newWord: string) {
    if (scrambling.current || !active.current) return;
    scrambling.current = true;
    const oldWord = scrRef.current?.textContent || scrWord;
    const maxLen = Math.max(oldWord.length, newWord.length);
    let frame = 0;
    const totalFrames = 12;

    function step() {
      frame++;
      let display = "";
      for (let i = 0; i < maxLen; i++) {
        const charProgress = (frame - i * 1.5) / totalFrames;
        if (charProgress >= 1 && i < newWord.length) display += newWord[i];
        else if (charProgress > 0) display += CHARS[Math.floor(Math.random() * CHARS.length)];
        else if (i < oldWord.length) display += oldWord[i];
      }
      setScrWord(display);
      if (frame < totalFrames + maxLen * 1.5) requestAnimationFrame(step);
      else {
        setScrWord(newWord);
        scrambling.current = false;
      }
    }

    requestAnimationFrame(step);
  }

  useEffect(() => {
    let intervalId: number | undefined;
    const startTimer = window.setTimeout(() => {
      active.current = true;
      intervalId = window.setInterval(() => {
        currentIdx.current = (currentIdx.current + 1) % WORDS.length;
        scrambleTo(WORDS[currentIdx.current]);
      }, 3000);
    }, LCP_DELAY_MS);

    return () => {
      window.clearTimeout(startTimer);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, []);

  return (
    <span ref={scrRef} className={className}>
      {scrWord}
    </span>
  );
}
