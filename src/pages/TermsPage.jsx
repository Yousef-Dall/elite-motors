import React from "react";
import { SEO } from "../components/seo/SEO.jsx";
import { SITE } from "../config/site";
import { useI18n } from "../providers/I18nProvider.jsx";

export default function TermsPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="mx-auto max-w-3xl px-4 py-16 md:py-24 text-start"
    >
      <SEO
        title="Terms of Service"
        description="Key terms for booking, estimates, and vehicle service at Elite Motors."
        url={`${SITE.domain}/terms`}
      />

      <h1
        className={`text-3xl md:text-5xl font-extrabold ${
          isAr ? "text-right" : "text-left"
        }`}
      >
        Terms of Service
      </h1>

      <p className="mt-4 text-neutral-700 dark:text-white/70">
        By using {SITE.name} and booking services with us, you agree
        to these terms. They are a summary and may be supplemented by
        your written work order.
      </p>

      <h2 className="mt-8 text-xl font-semibold">
        Estimates & Approvals
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        We provide written or digital estimates before starting work,
        except for basic inspections or emergency situations requested
        by you. No major work is carried out without your approval.
      </p>

      <h2 className="mt-8 text-xl font-semibold">
        Parts & Warranty
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        Parts are supplied as OEM or equivalent quality where agreed.
        Parts are covered by the manufacturer&apos;s warranty, and our
        workmanship is covered by our service warranty as stated on
        your invoice or work order.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Liability</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        We take reasonable care of vehicles in our custody. Our
        liability is limited to the cost of rectifying proven
        workmanship issues or as otherwise agreed in writing. We are
        not responsible for unrelated pre-existing faults or for
        issues arising from declined recommendations.
      </p>

      <h2 className="mt-8 text-xl font-semibold">
        Vehicle Collection & Storage
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        Vehicles should be collected promptly after work is completed.
        Long-term storage or extended stays may incur storage charges,
        which will be discussed in advance where possible.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Contact</h2>
      <p className="mt-2 text-neutral-700 dark:text-white/70">
        If you have questions about these terms, contact us at{" "}
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
