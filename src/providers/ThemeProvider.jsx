import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeCtx = createContext(null);

function getInitialTheme() {
  try {
    const stored = localStorage.getItem("elite_theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  if (typeof window !== "undefined") {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
      html.classList.add("dark");
    } else {
      html.removeAttribute("data-theme");
      html.classList.remove("dark");
    }
    try { localStorage.setItem("elite_theme", theme); } catch {}
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
