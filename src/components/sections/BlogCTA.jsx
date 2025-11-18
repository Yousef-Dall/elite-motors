import React from "react";
import { Link } from "react-router-dom";
import { FileText, Sparkles } from "lucide-react";
import { useI18n } from "../../providers/I18nProvider.jsx";

export default function BlogCTA() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900/90">
        <div className="em-hairline absolute top-0 pointer-events-none" />

        <div
          className={`p-8 md:p-12 grid md:grid-cols-[2fr,1.2fr] gap-8 items-center ${
            isAr ? "text-right" : "text-left"
          }`}
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-600 dark:text-white/60">
              <FileText className="h-4 w-4" />
              {t("blogCta.tag") /* e.g. "TIPS & INSIGHTS" */}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">
              {t("blogCta.title") /* e.g. "Learn how to care for your car like a pro" */}
            </h3>
            <p className="text-neutral-700 dark:text-white/70">
              {t("blogCta.sub") /* e.g. "From maintenance checklists to seasonal tips, our blog helps you make smarter decisions about your car." */}
            </p>

            <ul
              className={`mt-3 space-y-2 text-sm text-neutral-700 dark:text-white/70 ${
                isAr ? "pr-4" : "pl-4"
              } list-disc`}
            >
              <li>{t("blogCta.point1") /* e.g. "Understand when you really need a service" */}</li>
              <li>{t("blogCta.point2") /* e.g. "Spot early warning signs before they become expensive" */}</li>
              <li>{t("blogCta.point3") /* e.g. "Get honest explanations in simple language" */}</li>
            </ul>
          </div>

          <div
            className={`flex flex-col items-start md:items-end gap-4 ${
              isAr ? "md:items-start" : "md:items-end"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-neutral-300 dark:border-white/20 px-3 py-2 text-xs text-neutral-600 dark:text-white/70">
              <Sparkles className="h-3 w-3" />
              <span>{t("blogCta.highlight") /* e.g. "New articles every week" */}</span>
            </div>

            <Link
              to="/blog"
              className="em-shine inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 shadow-lg shadow-indigo-500/20"
            >
              {t("blogCta.btn") /* e.g. "Visit the blog" */}
              <span className={isAr ? "-scale-x-100" : ""}>➔</span>
            </Link>
          </div>
        </div>

        <div className="em-hairline absolute bottom-0 pointer-events-none" />
      </div>
    </div>
  );
}
