"use client";
import { TextReveal } from "@/components/ui/text-reveal";

export default function TextRevealSection() {
  return (
    <div style={{ background: "#0b0a0d", fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
      <TextReveal>
        Découvrez mes projets, un aperçu de mon parcours en informatique à travers mes réalisations.
      </TextReveal>
    </div>
  );
}