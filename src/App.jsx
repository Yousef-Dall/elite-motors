import React from "react";
import Navbar from "./components/Navbar"; // keep your original Navbar
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import VisionMission from "./components/VisionMission";
import WhoWeAre from "./components/WhoWeAre";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      {/* decorative glows */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-32 -left-32 h-96 w-96 blur-[140px] bg-cyan-600/15 dark:bg-cyan-600/30" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 blur-[120px] bg-fuchsia-600/15 dark:bg-fuchsia-600/30" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 blur-[120px] bg-indigo-600/10 dark:bg-indigo-600/20" />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <VisionMission />
        <WhoWeAre />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
