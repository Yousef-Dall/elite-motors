import React from "react";
import { SEO } from "../components/seo/SEO.jsx";
import { Check } from "lucide-react";

const TIERS = [
  { name: "Maintenance", price: "From 120 OMR", blurb: "Factory-grade servicing for exotics.", items: ["Digital service logs", "OEM diagnostics", "Warranty-friendly"] },
  { name: "Performance", price: "From 250 OMR", blurb: "ECU tune, suspension, track alignment.", items: ["ECU remap options", "Corner weighting", "Track alignment"] },
  { name: "Concierge", price: "From 60 OMR/mo", blurb: "Storage, covered transport, on-demand care.", items: ["Covered transport", "Battery tender", "Climate control"] }
];

export default function PricingPage() {
  return (
    <>
      <SEO title="Pricing" description="Transparent base pricing. Final quotes depend on your vehicle, parts, and scope of work." url="https://elitemotors.om/pricing" />
      <main className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <header className="mb-10 text-start">
          <div className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">Elite Motors</div>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold">Pricing</h1>
          <p className="mt-3 text-neutral-700 dark:text-white/70 max-w-2xl">Transparent base pricing — final quotes depend on the vehicle, parts, and scope of work.</p>
        </header>
        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div key={tier.name} className="p-6 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-md hover:shadow-lg transition text-start">
              <h2 className="text-xl font-semibold">{tier.name}</h2>
              <div className="mt-1 text-2xl font-bold text-cyan-600 dark:text-cyan-400">{tier.price}</div>
              <p className="mt-2 text-neutral-600 dark:text-white/60">{tier.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {tier.items.map((item) => (
                  <li key={item} className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-500 shrink-0" /><span>{item}</span></li>
                ))}
              </ul>
              <a href="/booking" className="mt-6 inline-flex items-center justify-center w-full rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 shadow-md hover:opacity-95 transition">Book Consultation</a>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
