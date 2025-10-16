import React, { useMemo, useRef } from "react";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "../i18n/I18nProvider";
import useScrollSpyAuto from "../hooks/useScrollSpy";

// Use your JPG logo (adjust the path if needed)
import logoJpg from "../assets/logo.jpg";

export default function Navbar() {
  const { t, lang } = useI18n();
  const headerRef = useRef(null);

  const nav = useMemo(
    () => [
      { label: t("navbar.home"), href: "#home", id: "home" },
      { label: t("navbar.about"), href: "#about", id: "about" },
      { label: t("navbar.services"), href: "#services", id: "services" },
      { label: t("navbar.vm"), href: "#vm", id: "vm" },
      { label: t("navbar.who"), href: "#who", id: "who" },
      { label: t("navbar.location"), href: "#location", id: "location" },
      { label: t("navbar.contact"), href: "#contact", id: "contact" },
    ],
    [t]
  );

  const activeId = useScrollSpyAuto(nav.map((n) => n.id), {
    headerRef,
    lineRatio: 0.35,
  });

  return (
    // Keep layout LTR so logo stays left, menu stays right
    <header
      ref={headerRef}
      dir="ltr"
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/40"
      data-sticky="true"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
        {/* Logo (bigger) */}
        <a href="#home" className="flex items-center gap-3 group shrink-0">
          <img
            src={logoJpg}
            alt="Elite Motors"
            className="h-12 md:h-14 w-auto rounded-md object-contain
                       drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
            loading="eager"
            fetchPriority="high"
          />
          <span className="sr-only">Elite Motors</span>
        </a>

        {/* Nav on the right */}
        <nav className="ml-auto hidden md:flex items-center gap-6">
          {/* Wrap just the links so we can flip their order in AR without moving the toggle */}
          <div className={`flex items-center gap-6 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
            {nav.map((n) => {
              const isActive = activeId === n.id;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative text-sm transition-colors",
                    "text-white/80 hover:text-white",
                    isActive ? "text-white" : "",
                  ].join(" ")}
                >
                  <span dir="auto">{n.label}</span>
                  <span
                    className={[
                      "absolute left-0 right-0 -bottom-1 h-[2px] rounded-full",
                      "bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500",
                      "transition-opacity",
                      isActive ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />
                </a>
              );
            })}
          </div>

          {/* Language toggle stays pinned at the far right */}
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
