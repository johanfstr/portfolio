"use client";

import dynamic from "next/dynamic";
import LazySection from "./LazySection";
import { useIntro } from "./IntroContext";

const About = dynamic(() => import("./About"), { ssr: false });
const TextRevealSection = dynamic(() => import("./TextReveal"), { ssr: false });
const Projects = dynamic(() => import("./Projects"), { ssr: false });
const Skills = dynamic(() => import("./Skills"), { ssr: false });
const Experience = dynamic(() => import("./Experience"), { ssr: false });
const Contact = dynamic(() => import("./Contact"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });


export default function HomeSections() {
  const { introDone } = useIntro();

  return (
    <>
      <LazySection minHeight="100vh">
        <About ready={introDone} />
      </LazySection>
      <TextRevealSection /> 
      <LazySection minHeight="100vh">
        <Projects />
      </LazySection>
      <LazySection minHeight="80vh">
        <Skills />
      </LazySection>
      <LazySection minHeight="80vh">
        <Experience />
      </LazySection>
      <LazySection minHeight="60vh">
        <Contact />
      </LazySection>
      <LazySection minHeight="40vh">
        <Footer />
      </LazySection>
    </>
  );
}
