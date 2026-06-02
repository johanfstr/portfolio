import type { Metadata } from "next";
import { Fira_Code, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";
import ScrollEffects from "../components/ScrollEffects";
// SpaceGrid temporarily removed for clarity

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
  description: "Johan Forestier, étudiant en informatique à l'EFREI campus de Bordeaux, cherche une alternance en développement full-stack pour septembre 2026. Découvrez mes projets, compétences et expériences dans le développement web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${firaCode.variable} ${playfair.variable} antialiased`}>
        <CustomCursor />
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}
