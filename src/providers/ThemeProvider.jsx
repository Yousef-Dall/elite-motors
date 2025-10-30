import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
const ThemeCtx = createContext(null);

function getInitialTheme() {
  try {
    const stored = localStorage.getItem("elite_theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const html = document.documentElement;
<<<<<<< HEAD:src/providers/ThemeProvider.jsx
    if (theme === "dark") { html.setAttribute("data-theme", "dark"); html.classList.add("dark"); }
    else { html.removeAttribute("data-theme"); html.classList.remove("dark"); }
=======
    if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
      html.classList.add("dark");
    } else {
      html.removeAttribute("data-theme");
      html.classList.remove("dark");
    }
>>>>>>> 2e809e278af7df7a7284c2c847d0d0c2b2c9870c:src/theme/ThemeProvider.jsx
    try { localStorage.setItem("elite_theme", theme); } catch {}
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
