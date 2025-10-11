import React, { useMemo } from "react";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "../i18n/I18nProvider";

export default function Navbar() {
  const { t } = useI18n();

  // Keep a single order; let CSS handle placement
  const nav = useMemo(
    () => [
      { label: t("navbar.home"), href: "#home" },
      { label: t("navbar.about"), href: "#about" },
      { label: t("navbar.services"), href: "#services" },
      { label: t("navbar.vm"), href: "#vm" },
      { label: t("navbar.who"), href: "#who" },
      { label: t("navbar.contact"), href: "#contact" },
    ],
    [t]
  );

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/40 border-b border-white/10"
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
        {/* START (logo) */}
        <a href="#home" className="flex items-center gap-3 group" aria-label="Elite Motors – Home">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 grid place-items-center shadow-lg shadow-cyan-500/20">
            <span className="font-black">E</span>
          </div>
          <div className="leading-tight text-start">
            <div className="text-lg font-extrabold tracking-tight">Elite Motors</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">Exotic Cars • GCC</div>
          </div>
        </a>

        {/* END (nav) — use ms-auto so it pushes to the inline end in both LTR/RTL */}
        <nav className="ms-auto hidden md:flex items-center gap-6" role="navigation" aria-label="Main">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {n.label}
            </a>
          ))}
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
