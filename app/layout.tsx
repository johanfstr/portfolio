import type { Metadata } from "next";
import { Fira_Code, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollEffects from "../components/ScrollEffects";
import SpaceGrid from "../components/SpaceGrid";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Johan Forestier - Portfolio",
  description: "Johan Forestier, étudiant en informatique à l'Université de Poitiers, cherche une alternance en développement full-stack pour septembre 2026. Découvrez mes projets, compétences et expériences dans le développement web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={`${firaCode.variable} ${playfair.variable} antialiased`}>
        <SpaceGrid />
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}
