import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const CALENDLY_URL = "https://calendly.com/your-calendly/elite-motors"; // replace with your real Calendly link

export default function BookingPage() {
  return (
    <div className="min-h-screen em-noise bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* HEADER */}
        <header className="mb-10 text-start">
          <div className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">
            Elite Motors
          </div>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold">Book a Visit</h1>
          <p className="mt-3 text-neutral-700 dark:text-white/70 max-w-2xl">
            Choose a convenient time for your visit — we’ll confirm the details by email or WhatsApp.
          </p>
        </header>

        {/* CALENDLY EMBED */}
        <div
          className="rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden
                     shadow-md hover:shadow-lg transition bg-white/70 dark:bg-white/5"
        >
          <iframe
            title="Elite Motors Booking"
            src={CALENDLY_URL}
            className="w-full h-[780px] rounded-2xl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
          />
        </div>

        {/* FALLBACK CONTACT */}
        <div className="mt-6 text-sm text-neutral-600 dark:text-white/60">
          Prefer WhatsApp?{" "}
          <a
            href="https://wa.me/96800000000"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-cyan-500 dark:hover:text-cyan-400"
          >
            Message us
          </a>
          .
        </div>
      </main>

      <Footer />
    </div>
  );
}


