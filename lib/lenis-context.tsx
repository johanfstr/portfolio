// lib/lenis-context.tsx
"use client";

import { createContext, useContext, useRef, type RefObject } from "react";

type LenisInstance = {
  on: (event: string, cb: (e: { scroll: number }) => void) => void;
  off: (event: string, cb: (e: { scroll: number }) => void) => void;
};

export const LenisContext = createContext<RefObject<LenisInstance | null> | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}