import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeCtx = createContext(null);

function getInitialTheme() {
  // 1. Check localStorage (preferred user choice)
  try {
    const stored = localStorage.getItem("elite_theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }

  // 2. Fall back to system preference
  if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  // 3. Fallback default
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const html = document.documentElement;

    // Apply current theme to <html>
    if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
      html.classList.add("dark");
    } else {
      html.removeAttribute("data-theme");
      html.classList.remove("dark");
    }

    // Persist preference safely
    try {
      localStorage.setItem("elite_theme", theme);
    } catch {
      /* ignore write errors */
    }
  }, [theme]);

  // Memoized context value for performance
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

// Custom hook for easy access
export const useTheme = () => useContext(ThemeCtx);

