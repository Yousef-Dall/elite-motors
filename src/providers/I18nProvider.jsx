import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DICT } from "../i18n/dictionary";

const I18nCtx = createContext(null);

function getInitialLang() {
  // 1. Check saved preference
  try {
    const stored = localStorage.getItem("elite_lang");
    if (stored === "en" || stored === "ar") return stored;
  } catch {
    /* ignore */
  }

  // 2. Fall back to browser language
  if (typeof navigator !== "undefined") {
    const nav = navigator.language || "en";
    return nav.toLowerCase().startsWith("ar") ? "ar" : "en";
  }

  // 3. Default
  return "en";
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  // Persist language + update <html> attributes
  useEffect(() => {
    try {
      localStorage.setItem("elite_lang", lang);
    } catch {
      /* ignore write errors */
    }

    if (typeof document !== "undefined") {
      const html = document.documentElement;
      html.setAttribute("lang", lang);
      html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    }
  }, [lang]);

  // Translation helper (nested path support)
  const t = (path) => {
    const parts = path.split(".");
    let cur = DICT[lang];
    for (const p of parts) {
      if (cur?.[p] == null) return path; // fallback to key if missing
      cur = cur[p];
    }
    return cur;
  };

  // Memoized value
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return (
    <I18nCtx.Provider value={value}>
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        lang={lang}
        className="min-h-screen"
      >
        {children}
      </div>
    </I18nCtx.Provider>
  );
}

// Hook for accessing language context
export const useI18n = () => useContext(I18nCtx);
