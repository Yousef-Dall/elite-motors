import { useEffect, useMemo, useRef, useState } from "react";

/**
 * useScrollSpyAuto
 * - Tracks which section is active based on a "reading line"
 * - Won't switch until you're sufficiently *inside* the next section
 *
 * Options:
 *  - headerRef / headerSelector: sticky header element to auto-measure
 *  - lineRatio: vertical position of the reading line (0..1), default 0.35
 *  - switchOffsetPx: require at least this many px into the next section
 *  - switchFraction: require this fraction of the section height (0..1)
 *  - hysteresisPx: small stickiness so current section keeps control until you pass further
 */
export default function useScrollSpyAuto(ids, options = {}) {
  const {
    headerRef,
    headerSelector,
    lineRatio = 0.35,
    switchOffsetPx = 0, // e.g. 200
    switchFraction = 0, // e.g. 0.25  (25% of section height)
    hysteresisPx = 60, // keeps current a bit longer
  } = options;

  const [active, setActive] = useState(ids[0] || "");
  const [offsetPx, setOffsetPx] = useState(96);
  const rafLock = useRef(false);

  const headerEl = useMemo(() => {
    if (headerRef?.current) return headerRef.current;
    if (headerSelector) return document.querySelector(headerSelector);
    return null;
  }, [headerRef, headerSelector]);

  // Keep offsetPx synced with header height
  useEffect(() => {
    if (!headerEl) return;
    const compute = () => {
      const h = Math.ceil(headerEl.getBoundingClientRect().height || 0);
      if (h && h !== offsetPx) setOffsetPx(h);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(headerEl);
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

      // Only consider sections whose "switch threshold" is above the reading line.
      // Threshold = sectionTop + max(px, fraction*height)
      const candidates = [];
      for (const { id, el } of sections) {
        const rectTop = el.offsetTop; // absolute Y of section top
        const h = el.offsetHeight || 0;
        const neededIn = Math.max(switchOffsetPx, h * switchFraction);
        const thresholdTop = rectTop + neededIn;

        if (thresholdTop <= lineY) {
          candidates.push({
            id,
            distance: Math.abs(thresholdTop - lineY),
          });
        }
      }

      if (!candidates.length) {
        // If we haven't crossed any threshold yet, keep current (or first)
        if (!active) setActive(sections[0].id);
        return;
      }

      // Prefer the nearest threshold we've *passed*, but add hysteresis so the current
      // section sticks a little longer if it's still close.
      let best = candidates[0];
      for (let i = 1; i < candidates.length; i++) {
        const c = candidates[i];
        const curBoost = c.id === active ? Math.max(0, hysteresisPx) : 0;
        const bestBoost = best.id === active ? Math.max(0, hysteresisPx) : 0;

        const cScore = c.distance - curBoost;
        const bScore = best.distance - bestBoost;
        if (cScore < bScore) best = c;
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

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [
    ids,
    offsetPx,
    lineRatio,
    switchOffsetPx,
    switchFraction,
    hysteresisPx,
    active,
  ]);

  return active;
}
