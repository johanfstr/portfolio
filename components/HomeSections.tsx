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
      <LazySection minHeight="200vh">
        <TextRevealSection />
      </LazySection>
      <LazySection minHeight="100vh">
        <Projects ready={introDone} />
      </LazySection>
      <LazySection minHeight="80vh">
        <Skills ready={introDone}/>
      </LazySection>
      <LazySection minHeight="80vh">
        <Experience ready={introDone} />
      </LazySection>
      <LazySection minHeight="60vh">
        <Contact ready={introDone} />
      </LazySection>
      <LazySection minHeight="40vh">
        <Footer ready={introDone} />
      </LazySection>
    </>
  );
}