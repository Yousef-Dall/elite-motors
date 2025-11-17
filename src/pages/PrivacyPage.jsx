import React from "react";
import { SEO } from "../components/seo/SEO.jsx";
import { SITE } from "../config/site";
import { useI18n } from "../providers/I18nProvider.jsx";

export default function PrivacyPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="mx-auto max-w-3xl px-4 py-16 md:py-24 text-start"
    >
      <SEO
        title="Privacy Policy"
        description="How Elite Motors collects, uses, and protects your personal data when you contact us or book services."
        url={`${SITE.domain}/privacy`}
      />

      <h1
        className={`text-3xl md:text-5xl font-extrabold ${
          isAr ? "text-right" : "text-left"
        }`}
      >
        Privacy Policy
      </h1>

      <p className="mt-4 text-neutral-700 dark:text-white/70">
        This policy explains how we handle your personal data when you
        visit our website, contact us, or book services with{" "}
        {SITE.name}.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Data We Collect</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        We collect only the information needed to respond to your
        inquiries, provide estimates, book appointments, and improve
        our services. This may include your name, contact details,
        vehicle information, and service history.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Contact Forms</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        When you submit a form, the details are sent securely to our
        inbox. We use this information solely to respond to your
        request, follow up on your vehicle, or schedule visits. We do
        not sell or rent your personal data to third parties.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Analytics & Cookies</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        If we use analytics, it is limited to aggregated, privacy-
        respecting data to understand how visitors use our site. You
        can control cookies and tracking technologies through your
        browser settings.
      </p>

      <h2 className="mt-8 text-xl font-semibold">
        Data Retention & Security
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        We keep your data only for as long as needed to provide our
        services, comply with legal obligations, and maintain service
        records. We apply reasonable technical and organizational
        measures to protect your data.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Your Rights</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        Depending on local regulations, you may have the right to
        access, correct, or request deletion of your personal data.
        Contact us if you wish to exercise these rights.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Contact</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        For privacy questions or requests, email us at{" "}
        <a
          className="underline"
          href={`mailto:${SITE.email}`}
        >
          {SITE.email}
        </a>
        .
      </p>
    </div>
  );
}
