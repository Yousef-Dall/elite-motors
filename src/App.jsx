import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import VisionMission from "./components/VisionMission";
import WhoWeAre from "./components/WhoWeAre";
import Location from "./components/Location";
import Gallery from "./components/Gallery";
import ClientsMarquee from "./components/ClientsMarquee";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen em-noise bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div aria-hidden className="fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 blur-[140px] bg-cyan-600/30" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 blur-[120px] bg-fuchsia-600/30" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 blur-[120px] bg-indigo-600/20" />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <ClientsMarquee />
        <VisionMission />
        <WhoWeAre />
        <Gallery />
        <Location />
        <Testimonial />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
