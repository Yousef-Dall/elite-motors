import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DICT } from "../i18n/dictionary";

const I18nCtx = createContext(null);

function getInitialLang() {
  try {
    const stored = localStorage.getItem("elite_lang");
    if (stored === "en" || stored === "ar") return stored;
  } catch {}
<<<<<<< HEAD:src/providers/I18nProvider.jsx
  if (typeof navigator !== "undefined") {
    const nav = navigator.language || "en";
    return nav.toLowerCase().startsWith("ar") ? "ar" : "en";
  }
  return "en";
=======
  const nav = (typeof navigator !== "undefined" && navigator.language) || "en";
  return nav.toLowerCase().startsWith("ar") ? "ar" : "en";
>>>>>>> 2e809e278af7df7a7284c2c847d0d0c2b2c9870c:src/i18n/I18nProvider.jsx
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    try { localStorage.setItem("elite_lang", lang); } catch {}
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      html.setAttribute("lang", lang);
      html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    }
  }, [lang]);

  const t = (path) => {
    try {
      const parts = path.split(".");
      let cur = DICT[lang];
      for (const p of parts) cur = cur?.[p];
      return cur ?? path;
    } catch { return path; }
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return (
    <I18nCtx.Provider value={value}>
      <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className="min-h-screen">
        {children}
      </div>
    </I18nCtx.Provider>
  );
}

export const useI18n = () => useContext(I18nCtx);
