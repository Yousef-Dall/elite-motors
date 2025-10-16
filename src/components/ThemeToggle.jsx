import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light" : "Dark"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
