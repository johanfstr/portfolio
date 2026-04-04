import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import ScrollEffects from "../components/ScrollEffects";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
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
      <body className={`${firaCode.variable} antialiased`} data-scroll-container>
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}
