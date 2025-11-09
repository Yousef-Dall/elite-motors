import React from "react";
import { SEO } from "../components/seo/SEO.jsx";
import { SITE } from "../config/site";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24 text-start">
      <SEO title="Terms of Service" url={`${SITE.domain}/terms`} />
      <h1 className="text-3xl md:text-5xl font-extrabold">Terms of Service</h1>
      <p className="mt-4 text-neutral-700 dark:text-white/70">
        By using {SITE.name}, you agree to fair use of our content and to book services subject to availability, inspection, and a written estimate.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Estimates & Warranty</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        We provide written estimates. Parts carry manufacturer warranty; workmanship carries our service warranty.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Liability</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        We take reasonable care with vehicles in our custody. See your work order for full terms.
      </p>
    </div>
  );
}
