// src/i18n/I18nProvider.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DICT } from "./dictionary";

const I18nCtx = createContext(null);

function getInitialLang() {
  // 1) localStorage
  try {
    const stored = localStorage.getItem("elite_lang");
    if (stored === "en" || stored === "ar") return stored;
  } catch (_) {}

  // 2) browser language
  const nav = (typeof navigator !== "undefined" && navigator.language) || "en";
  return nav.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  // persist + sync <html> attributes
  useEffect(() => {
    try {
      localStorage.setItem("elite_lang", lang);
    } catch (_) {}

    // keep the document direction and lang correct
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      html.setAttribute("lang", lang);
      html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    }
  }, [lang]);

  // tiny translator
  const t = (path) => {
    const parts = path.split(".");
    let cur = DICT[lang];
    for (const p of parts) cur = cur?.[p];
    return cur ?? path;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return (
    <I18nCtx.Provider value={value}>
      {/* Wrapper is optional since we sync <html>, but it helps scoping utilities */}
      <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className="min-h-screen">
        {children}
      </div>
    </I18nCtx.Provider>
  );
}

export const useI18n = () => useContext(I18nCtx);
