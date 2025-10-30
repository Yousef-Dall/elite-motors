import React, { forwardRef, useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LanguageToggle from "../ui/LanguageToggle";
import ThemeToggle from "../ui/ThemeToggle";
import { useI18n } from "../../providers/I18nProvider.jsx";
import useScrollSpyAuto from "../../hooks/useScrollSpy";
import logoJpg from "../../assets/logo.jpg";
import { getHeaderOffset } from "../../hooks/useHashScroll";

const Navbar = forwardRef(function Navbar(_, headerRef) {
  const { t, lang } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const nav = useMemo(
    () => [
      { label: t("navbar.home"), to: "/", id: "home", type: "route" },
      { label: t("navbar.about"), to: "#about", id: "about", type: "hash" },
      { label: t("navbar.services"), to: "#services", id: "services", type: "hash" },
      { label: "Pricing", to: "/pricing", id: "pricing", type: "route" },
      { label: "Booking", to: "/booking", id: "booking", type: "route" },
      { label: "Blog", to: "/blog", id: "blog", type: "route" },
      { label: t("navbar.contact"), to: "#contact", id: "contact", type: "hash" }
    ],
    [t]
  );

  const activeId = useScrollSpyAuto(["home", "about", "services", "vm", "who", "gallery", "location", "contact"], {
    headerRef,
    lineRatio: 0.6,
    switchOffsetPx: 220,
    switchFraction: 0.28,
    hysteresisPx: 120
  });

  const onAnchor = (e, hash) => {
    e.preventDefault();
    setOpen(false);
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) {
      // if we're not on home, navigate to home with hash
      window.location.href = `/${hash}`;
      return;
    }
    const y = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header
      ref={headerRef}
      dir="ltr"
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/40"
    >
      <a href="#home" className="sr-only">Skip to content</a>

      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <a
          href="/"
          className="flex items-center gap-3 group shrink-0"
        >
          <img
            src={logoJpg}
            alt="Elite Motors"
            className="h-11 w-auto md:h-14 rounded-md object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
            loading="eager"
            fetchPriority="high"
          />
          <span className="sr-only">Elite Motors</span>
        </a>

        <nav aria-label="Main navigation" className="ml-auto hidden md:flex items-center gap-6">
          <div className={`flex items-center gap-6 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
            {nav.map((n) => {
              const isActive = n.type === "hash" ? activeId === n.id && pathname === "/" : pathname.startsWith(n.to);
              if (n.type === "route") {
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={[
                      "relative text-sm transition-colors",
                      "text-white/80 hover:text-white",
                      isActive ? "text-white" : ""
                    ].join(" ")}
                  >
                    <span dir="auto">{n.label}</span>
                    <span
                      className={[
                        "absolute left-0 right-0 -bottom-1 h-[2px] rounded-full",
                        "bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500",
                        "transition-opacity",
                        isActive ? "opacity-100" : "opacity-0"
                      ].join(" ")}
                    />
                  </Link>
                );
              }
              return (
                <a
                  key={n.to}
                  href={n.to}
                  onClick={(e) => onAnchor(e, n.to)}
                  className={[
                    "relative text-sm transition-colors",
                    "text-white/80 hover:text-white",
                    isActive ? "text-white" : ""
                  ].join(" ")}
                >
                  {n.label}
                  <span
                    className={[
                      "absolute left-0 right-0 -bottom-1 h-[2px] rounded-full",
                      "bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500",
                      "transition-opacity",
                      isActive ? "opacity-100" : "opacity-0"
                    ].join(" ")}
                  />
                </a>
              );
            })}
          </div>
          <ThemeToggle />
          <LanguageToggle />
        </nav>

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

      <div className={["md:hidden overflow-hidden transition-[max-height] duration-300 ease-out", open ? "max-h-[60vh]" : "max-h-0"].join(" ")}>
        <div className="mx-auto max-w-7xl px-4 pb-3">
          <div className="grid gap-2 pt-1">
            {nav.map((n) =>
              n.type === "route" ? (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  {n.label}
                </Link>
              ) : (
                <a
                  key={n.to}
                  href={n.to}
                  onClick={(e) => onAnchor(e, n.to)}
                  className="block rounded-xl px-3 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  {n.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
