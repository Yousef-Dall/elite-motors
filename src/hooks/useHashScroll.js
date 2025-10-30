import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function getHeaderOffset() {
  const h =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--em-header-h"
      )
    ) || 64;
  return h + 8;
}

function scrollToHash(hash) {
  if (!hash) return;
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // delay a tick to ensure route content rendered
      const t = setTimeout(() => scrollToHash(hash), 0);
      return () => clearTimeout(t);
    }
  }, [hash]);
}
