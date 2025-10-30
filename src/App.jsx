import React from "react";

// layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// ui / floating actions
import WhatsAppFab from "./components/layout/WhatsAppFab";
import MobileQuickBar from "./components/layout/MobileQuickBar";

export default function App({ children }) {
  return (
    <div className="min-h-screen em-noise bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white overflow-x-hidden pb-16 md:pb-0 relative">
      {/* Ambient glow blobs */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none overflow-hidden md:overflow-visible"
      >
        {/* top-left cyan */}
        <div className="absolute -top-32 -left-32 h-96 w-96 blur-[140px] bg-cyan-600/30" />
        {/* mid-right fuchsia (clipped on mobile so it doesn't cause sideways scroll) */}
        <div className="absolute top-1/3 right-0 translate-x-1/4 md:translate-x-0 md:-right-24 h-80 w-80 blur-[120px] bg-fuchsia-600/30" />
        {/* bottom indigo glow */}
        <div className="absolute bottom-0 left-1/4 h-72 w-72 blur-[120px] bg-indigo-600/20" />
      </div>

      <Navbar />

      <main>{children}</main>

      <Footer />

      <WhatsAppFab />
      <MobileQuickBar />
    </div>
  );
}




