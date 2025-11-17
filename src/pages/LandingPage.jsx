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
import { SEO } from "../components/seo/SEO.jsx";
import { SITE } from "../config/site";

export default function LandingPage() {
  return (
    <>
      <SEO
        title={null}
        description={SITE.description}
        url={SITE.domain}
      />

      <MotionSection as="section" id="home" className="scroll-offset py-0">
        <Hero />
      </MotionSection>

      <MotionSection
        as="section"
        id="about"
        className="scroll-offset py-20 md:py-28 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-neutral-950/80"
      >
        <About />
      </MotionSection>

      <MotionSection
        as="section"
        id="services"
        className="scroll-offset py-20 md:py-28"
      >
        <Services />
      </MotionSection>

      <MotionSection
        as="section"
        id="marquee"
        className="scroll-offset py-14 md:py-20 border-y border-white/10 bg-white/60 dark:bg-white/5"
      >
        <ClientsMarquee />
      </MotionSection>

      <MotionSection
        as="section"
        id="vm"
        className="scroll-offset py-20 md:py-28 border-y border-black/10 dark:border-white/10 bg-black/5 dark:bg-neutral-950/70"
      >
        <VisionMission />
      </MotionSection>

      <MotionSection
        as="section"
        id="who"
        className="scroll-offset py-20 md:py-28"
      >
        <WhoWeAre />
      </MotionSection>

      <MotionSection
        as="section"
        id="gallery"
        className="scroll-offset py-16 md:py-24"
      >
        <Gallery />
      </MotionSection>

      <MotionSection
        as="section"
        id="location"
        className="scroll-offset py-20 md:py-28"
      >
        <Location />
      </MotionSection>

      <MotionSection
        as="section"
        id="testimonial"
        className="scroll-offset py-16 md:py-24"
      >
        <Testimonial />
      </MotionSection>

      <MotionSection
        as="section"
        id="contact"
        className="scroll-offset py-20 md:py-28 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-neutral-950/80"
      >
        <Contact />
      </MotionSection>

      <MotionSection
        as="section"
        id="cta"
        className="scroll-offset py-16"
      >
        <CTA />
      </MotionSection>
    </>
  );
}
