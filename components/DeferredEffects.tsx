"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const ScrollEffects = dynamic(() => import("./ScrollEffects"), { ssr: false });

export default function DeferredEffects() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const enable = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(enable, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return null;

    return (
    <>
      <CustomCursor />
      <ScrollEffects />
    </>
  );
}
