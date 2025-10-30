import React from "react";

import MotionSection from "../components/layout/MotionSection";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import ClientsMarquee from "../components/sections/ClientsMarquee";
import VisionMission from "../components/sections/VisionMission";
import WhoWeAre from "../components/sections/WhoWeAre";
import Gallery from "../components/sections/Gallery";
import Location from "../components/sections/Location";
import Testimonial from "../components/sections/Testimonial";
import Contact from "../components/sections/Contact";
import CTA from "../components/sections/CTA";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppFab from "../components/layout/WhatsAppFab";
import MobileQuickBar from "../components/layout/MobileQuickBar";

export default function LandingPage() {
  return (
    <div className="min-h-screen em-noise bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white overflow-x-hidden pb-16 md:pb-0">
      {/* background glow blobs */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-x-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 blur-[140px] bg-cyan-600/30 max-w-[50vw] max-h-[50vh]" />
        <div className="absolute top-1/3 right-0 -mr-16 h-80 w-80 blur-[120px] bg-fuchsia-600/30 max-w-[60vw] max-h-[40vh]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 blur-[120px] bg-indigo-600/20 max-w-[50vw] max-h-[40vh]" />
      </div>

      {/* site chrome */}
      <Navbar />

      <main>
        {/* HERO */}
        <MotionSection
          as="section"
          id="home"
          className="scroll-offset py-0 md:py-0"
        >
          <Hero />
        </MotionSection>

        {/* ABOUT */}
        <MotionSection
          as="section"
          id="about"
          className="scroll-offset py-20 md:py-28 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-neutral-950/80"
        >
          <About />
        </MotionSection>

        {/* SERVICES */}
        <MotionSection
          as="section"
          id="services"
          className="scroll-offset py-20 md:py-28"
        >
          <Services />
        </MotionSection>

        {/* CLIENTS MARQUEE */}
        <MotionSection
          as="section"
          id="marquee"
          className="scroll-offset py-14 md:py-20 border-y border-white/10 bg-white/60 dark:bg-white/5"
        >
          <ClientsMarquee />
        </MotionSection>

        {/* VISION & MISSION */}
        <MotionSection
          as="section"
          id="vm"
          className="scroll-offset py-20 md:py-28 border-y border-black/10 dark:border-white/10 bg-black/5 dark:bg-neutral-950/70"
        >
          <VisionMission />
        </MotionSection>

        {/* WHO WE ARE */}
        <MotionSection
          as="section"
          id="who"
          className="scroll-offset py-20 md:py-28"
        >
          <WhoWeAre />
        </MotionSection>

        {/* GALLERY */}
        <MotionSection
          as="section"
          id="gallery"
          className="scroll-offset py-16 md:py-24"
        >
          <Gallery />
        </MotionSection>

        {/* LOCATION */}
        <MotionSection
          as="section"
          id="location"
          className="scroll-offset py-20 md:py-28"
        >
          <Location />
        </MotionSection>

        {/* TESTIMONIAL */}
        <MotionSection
          as="section"
          id="testimonial"
          className="scroll-offset py-16 md:py-24"
        >
          <Testimonial />
        </MotionSection>

        {/* CONTACT */}
        <MotionSection
          as="section"
          id="contact"
          className="scroll-offset py-20 md:py-28 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-neutral-950/80"
        >
          <Contact />
        </MotionSection>

        {/* CTA */}
        <MotionSection
          as="section"
          id="cta"
          className="scroll-offset py-16"
        >
          <CTA />
        </MotionSection>
      </main>

      <Footer />

      {/* floating actions */}
      <WhatsAppFab />
      <MobileQuickBar />
    </div>
  );
}

