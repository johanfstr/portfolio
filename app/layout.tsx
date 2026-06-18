import type { Metadata } from "next";
import { Fira_Code, Playfair_Display, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import DeferredEffects from "../components/DeferredEffects";
import FpsOverlay from "../components/FpsOverlay";
import GradualBlur from "../components/ui/GradualBlur";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Johan Forestier - Portfolio",
  description:
    "Johan Forestier, étudiant en informatique à l'EFREI campus de Bordeaux, cherche une alternance en développement full-stack pour septembre 2026. Découvrez mes projets, compétences et expériences dans le développement web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
<style dangerouslySetInnerHTML={{ __html: 
  `.hero-content--waiting,.hero-content--waiting .hero-anim{opacity:0!important;animation:none!important;pointer-events:none}
  @media (max-width: 767px) { .gradual-blur { display: none !important; } }` 
}} />
        <link
          rel="preload"
          href="/logo-64.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/fonts/syne.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${firaCode.variable} ${playfair.variable} ${plusJakarta.variable} antialiased`}>
        {children}
        <DeferredEffects />
        <FpsOverlay />
        <GradualBlur target="page" position="bottom" height="4rem" strength={1} divCount={3} curve="bezier" exponential />
      </body>
    </html>
  );
}
