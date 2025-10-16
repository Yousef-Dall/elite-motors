import { useEffect, useMemo, useRef, useState } from "react";

/**
 * useScrollSpyAuto
 * Pixel-accurate scroll spy using a reading line and auto-detected header height.
 *
 * @param {string[]} ids - section ids (without '#')
 * @param {{
 *   headerRef?: React.RefObject<HTMLElement>, // sticky header element ref
 *   headerSelector?: string,                  // fallback CSS selector (e.g., 'header[ data-sticky="true"]')
 *   lineRatio?: number                        // 0..1, 0.35 means 35% down the viewport
 * }} options
 */
export default function useScrollSpyAuto(ids, options = {}) {
  const { headerRef, headerSelector, lineRatio = 0.35 } = options;
  const [active, setActive] = useState(ids[0] || "");
  const [offsetPx, setOffsetPx] = useState(96); // sensible default
  const rafLock = useRef(false);

  // resolve header element
  const headerEl = useMemo(() => {
    if (headerRef?.current) return headerRef.current;
    if (headerSelector) return document.querySelector(headerSelector);
    return null;
  }, [headerRef, headerSelector]);

  // keep offsetPx in sync with header height
  useEffect(() => {
    if (!headerEl) return;

    const compute = () => {
      const h = Math.ceil(headerEl.getBoundingClientRect().height || 0);
      if (h && h !== offsetPx) setOffsetPx(h);
    };

    compute();

    // Watch size changes (resizes, font loads, language switch, etc.)
    const ro = new ResizeObserver(() => compute());
    ro.observe(headerEl);

    // Fallback on window resize as well
    const onResize = () => compute();
    window.addEventListener("resize", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [headerEl]); // eslint-disable-line

  useEffect(() => {
    if (!ids?.length) return;

    const sections = ids
      .map((id) => {
        const el = document.getElementById(id);
        return el ? { id, el } : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    const readingLineY = () =>
      window.scrollY + offsetPx + window.innerHeight * lineRatio;

    const update = () => {
      const lineY = readingLineY();
      let best = { id: active, score: Infinity };

      for (const { id, el } of sections) {
        const top = el.offsetTop; // absolute Y
        const dist = Math.abs(top - lineY);
        const isAbove = top <= lineY;
        // prefer sections already entered
        const score = isAbove ? dist * 0.9 : dist * 1.1;
        if (score < best.score) best = { id, score };
      }

      if (best.id && best.id !== active) setActive(best.id);
    };

    const onScroll = () => {
      if (rafLock.current) return;
      rafLock.current = true;
      requestAnimationFrame(() => {
        update();
        rafLock.current = false;
      });
    };

    // initial run + listeners
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offsetPx, lineRatio]); // active not included to avoid extra loops

  return active;
}
