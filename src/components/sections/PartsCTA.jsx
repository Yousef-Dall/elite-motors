import React from "react";
import { Link } from "react-router-dom";
import { Cog, Wrench } from "lucide-react";
import { useI18n } from "../../providers/I18nProvider.jsx";

export default function PartsCTA() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-r from-slate-900/90 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-950 dark:to-black">
        <div className="em-hairline absolute top-0 pointer-events-none" />

        <div
          className={`p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center ${
            isAr ? "text-right" : "text-left"
          } text-white`}
        >
          <div className="md:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
              <Wrench className="h-4 w-4" />
              {t("partsCta.tag") /* e.g. "GENUINE PARTS" */}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">
              {t("partsCta.title") /* e.g. "Need reliable parts for your car?" */}
            </h3>
            <p className="text-white/80">
              {t("partsCta.sub") /* e.g. "Browse our parts catalog, check compatibility, and request installation in one place." */}
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-white/70 mt-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <Cog className="h-4 w-4" />
                <span>{t("partsCta.point1") /* e.g. "OEM & high-quality aftermarket options" */}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span>✓</span>
                <span>{t("partsCta.point2") /* e.g. "Verified compatibility & warranty-friendly" */}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span>✓</span>
                <span>{t("partsCta.point3") /* e.g. "Pick-up in workshop or installation with service" */}</span>
              </div>
            </div>
          </div>

          <div className={isAr ? "text-left md:text-left" : "text-left md:text-right"}>
            <Link
              to="/parts"
              className="em-shine inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-slate-900 font-semibold bg-white shadow-lg shadow-slate-900/40"
            >
              {t("partsCta.btn") /* e.g. "Browse parts" */}
              <span className={isAr ? "-scale-x-100" : ""}>➔</span>
            </Link>
          </div>
        </div>

        <div className="em-hairline absolute bottom-0 pointer-events-none" />
      </div>
    </div>
  );
}
