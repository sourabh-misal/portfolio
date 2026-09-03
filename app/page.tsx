import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import AIFeatures from "@/components/AIFeatures";
import WhatToExpect from "@/components/WhatToExpect";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AIFeatures />
        <WhatToExpect />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
