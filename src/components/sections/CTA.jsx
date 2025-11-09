import React from "react";
import { Link } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { useI18n } from "../../providers/I18nProvider.jsx";

export default function CTA() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-r from-cyan-500/15 via-indigo-500/12 to-fuchsia-500/15">
        <div className="em-hairline absolute top-0 pointer-events-none" />

        <div className={`p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center ${isAr ? "text-right" : "text-left"}`}>
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-600 dark:text-white/60">
              <CalendarCheck className="h-4 w-4" />
              {t("cta.tag")}
            </div>
            <h3 className="mt-3 text-2xl md:text-3xl font-bold">{t("cta.title")}</h3>
            <p className="mt-2 text-neutral-700 dark:text-white/70">{t("cta.sub")}</p>
          </div>

          <div className={isAr ? "text-left md:text-left" : "text-left md:text-right"}>
            <Link
              to="/booking"
              className="em-shine inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 shadow-lg shadow-cyan-500/20"
            >
              {t("cta.btn")} <span className={isAr ? "-scale-x-100" : ""}>➔</span>
            </Link>
          </div>
        </div>

        <div className="em-hairline absolute bottom-0 pointer-events-none" />
      </div>
    </div>
  );
}
