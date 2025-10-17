import React, { useEffect } from "react";
import { Languages } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

export default function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  const next = lang === "en" ? "ar" : "en";

  useEffect(() => {
    try { localStorage.setItem("elite_lang", lang); } catch {}
  }, [lang]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("elite_lang");
      if (stored && (stored === "en" || stored === "ar") && stored !== lang) setLang(stored);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      onClick={() => setLang(next)}
      className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
      title={t("navbar.lang")}
      aria-label={t("navbar.lang")}
      aria-pressed={lang === "ar"}
    >
      <Languages className={`h-4 w-4 transition-transform ${lang === "ar" ? "rotate-180" : ""}`} />
      <span className="tabular-nums">{t("navbar.lang")}</span>
      <span className="ml-1 px-1.5 py-0.5 rounded bg-white/10 text-white/70 text-[10px] leading-none">
        {lang.toUpperCase()}
      </span>
    </button>
  );
}
