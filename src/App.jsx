import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppFab from "./components/layout/WhatsAppFab";
import MobileQuickBar from "./components/layout/MobileQuickBar";
import useHashScroll, { getHeaderOffset } from "./hooks/useHashScroll";

export default function App() {
  useHashScroll(); // smooth scroll on #hash changes

  // Update CSS var for sticky offset based on actual header height
  const headerRef = useRef(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setVar = () => {
      const h = Math.ceil(el.getBoundingClientRect().height || 0);
      document.documentElement.style.setProperty("--em-header-h", `${h}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, []);

  return (
    <div className="min-h-screen em-noise bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white overflow-x-hidden pb-16 md:pb-0 relative">
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none overflow-hidden md:overflow-visible"
      >
        <div className="absolute -top-32 -left-32 h-96 w-96 blur-[140px] bg-cyan-600/30" />
        <div className="absolute top-1/3 right-0 translate-x-1/4 md:translate-x-0 md:-right-24 h-80 w-80 blur-[120px] bg-fuchsia-600/30" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 blur-[120px] bg-indigo-600/20" />
      </div>

      <Navbar ref={headerRef} />
      <main><Outlet /></main>
      <Footer />
      <WhatsAppFab />
      <MobileQuickBar />
    </div>
  );
}
