import React, { useMemo, useRef, useState, useEffect } from "react";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "../i18n/I18nProvider";
import useScrollSpyAuto from "../hooks/useScrollSpy";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import logoJpg from "../assets/logo.jpg";

export default function Navbar() {
  const { t, lang } = useI18n();
  const headerRef = useRef(null);
  const [open, setOpen] = useState(false);

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
    lineRatio: 0.60,       // reading line lower => later switch
    switchOffsetPx: 220,   // require this many px inside next section
    switchFraction: 0.28,  // or ~28% of section height (whichever is larger)
    hysteresisPx: 120,     // keeps current section a bit longer
  });



  // --- Keep a CSS variable in sync with the real header height ---
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setVar = () => {
      const h = Math.ceil(el.getBoundingClientRect().height || 0);
      document.documentElement.style.setProperty("--em-header-h", `${h}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, [lang]); // re-measure if language changes fonts/line breaks

  // --- Precise scroll that accounts for header height ---
  const handleNavClick = (e, href) => {
    const id = href?.startsWith("#") ? href.slice(1) : null;
    if (!id) return; // let normal link work
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();

    // Close mobile sheet first (so height is correct)
    setOpen(false);

    // Use the measured header height (CSS var), with tiny extra space
    const headerH =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--em-header-h")
      ) || 64;

    const y = target.getBoundingClientRect().top + window.scrollY - (headerH + 8);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header
    
      ref={headerRef}
      dir="ltr"
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/40"
      data-sticky="true"
    >
    <a href="#home" className="sr-only">
  Skip to content
</a>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group shrink-0" onClick={(e)=>handleNavClick(e, "#home")}>
          <img
            src={logoJpg}
            alt="Elite Motors"
            className="h-11 w-auto md:h-14 rounded-md object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
            loading="eager"
            fetchPriority="high"
          />
          <span className="sr-only">Elite Motors</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="ml-auto hidden md:flex items-center gap-6">
          <div className={`flex items-center gap-6 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
            {nav.map((n) => {
              const isActive = activeId === n.id;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => handleNavClick(e, n.href)}
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
          <ThemeToggle />
          <LanguageToggle />
        </nav>

        {/* Mobile: toggles + menu button */}
        <div className="ml-auto flex md:hidden items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down panel */}
      <div className={["md:hidden overflow-hidden transition-[max-height] duration-300 ease-out", open ? "max-h-[60vh]" : "max-h-0"].join(" ")}>
        <div className="mx-auto max-w-7xl px-4 pb-3">
          <div className="grid gap-2 pt-1">
            {nav.map((n) => {
              const isActive = activeId === n.id;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => handleNavClick(e, n.href)}
                  className={[
                    "block rounded-xl px-3 py-2 text-sm",
                    "bg-white/5 hover:bg-white/10 border border-white/10",
                    isActive ? "ring-1 ring-cyan-400/40" : "",
                  ].join(" ")}
                >
                  {n.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
