// src/hooks/useScrollSpy.js
// Scroll spy hook: tracks which section is currently in view.
//
// Usage:
// const activeId = useScrollSpyAuto({
//   ids: ["home", "about", "services"],
//   offset: 140,           // header height-ish
//   enabled: isLanding,    // false on other routes
// });

import { useEffect, useMemo, useRef, useState } from "react";

export function useScrollSpyAuto({
  ids = [],
  offset = 0,
  enabled = true,
} = {}) {
  const [activeId, setActiveId] = useState(null);
  const observerRef = useRef(null);

  const idsKey = useMemo(
    () => (Array.isArray(ids) && ids.length ? ids.join("|") : ""),
    [ids],
  );

  useEffect(() => {
    if (!enabled) return;

    const elements = (
      idsKey
        ? ids.map((id) => document.getElementById(id)).filter(Boolean)
        : Array.from(document.querySelectorAll("[data-spy]"))
    ).filter((el) => el instanceof HTMLElement);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );

        if (visible[0]) {
          const el = /** @type {HTMLElement} */ (visible[0].target);
          setActiveId(el.id || null);
        }
      },
      {
        // offset emulates a header pushing the viewport line down
        rootMargin: `${-offset}px 0px -70% 0px`,
        threshold: [0, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [idsKey, offset, enabled, ids]);

  return activeId;
}

export default useScrollSpyAuto;
