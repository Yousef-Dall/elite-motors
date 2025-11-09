import React from "react";
import { SEO } from "../components/seo/SEO.jsx";
import { SITE } from "../config/site";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24 text-start">
      <SEO title="Privacy Policy" url={`${SITE.domain}/privacy`} />
      <h1 className="text-3xl md:text-5xl font-extrabold">Privacy Policy</h1>
      <p className="mt-4 text-neutral-700 dark:text-white/70">
        We collect only the data required to deliver our services, respond to inquiries, and improve your experience. We do not sell personal data.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Contact Forms</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        Submissions are sent securely to our inbox. We use your details only to respond to your request.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Analytics</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        Any analytics used is privacy-respecting and aggregated. You can opt out via your browser.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Contact</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        For privacy requests, email us at <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </div>
  );
}
