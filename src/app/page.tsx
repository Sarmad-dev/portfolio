import Preloader from "@/components/ui/Preloader";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Nav from "@/components/ui/Nav";
import Divider from "@/components/ui/Divider";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <div aria-hidden className="grain" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Divider label="Capabilities" />
        <Skills />
        <Projects />
        <Divider label="Journey" />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
