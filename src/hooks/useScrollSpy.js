import { useEffect, useMemo, useRef, useState } from "react";

export default function useScrollSpyAuto(ids, options = {}) {
  const {
    headerRef,
    headerSelector,
    lineRatio = 0.35,
    switchOffsetPx = 0,
    switchFraction = 0,
    hysteresisPx = 60,
  } = options;

  const [active, setActive] = useState(ids[0] || "");
  const [offsetPx, setOffsetPx] = useState(96);
  const rafLock = useRef(false);

  const headerEl = useMemo(() => {
    if (headerRef?.current) return headerRef.current;
    if (headerSelector && typeof document !== "undefined")
      return document.querySelector(headerSelector);
    return null;
  }, [headerRef, headerSelector]);

  useEffect(() => {
    if (!headerEl) return;
    const compute = () => {
      const h = Math.ceil(headerEl.getBoundingClientRect()?.height || 0);
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
  }, [headerEl]); // eslint-disable-line react-hooks/exhaustive-deps

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
      const candidates = [];
      for (const { id, el } of sections) {
        const rectTop = el.offsetTop;
        const h = el.offsetHeight || 0;
        const neededIn = Math.max(switchOffsetPx, h * switchFraction);
        const thresholdTop = rectTop + neededIn;
        if (thresholdTop <= lineY)
          candidates.push({ id, distance: Math.abs(thresholdTop - lineY) });
      }
      if (!candidates.length) {
        if (!active) setActive(sections[0].id);
        return;
      }

      let best = candidates[0];
      for (let i = 1; i < candidates.length; i++) {
        const c = candidates[i];
        const cBoost = c.id === active ? hysteresisPx : 0;
        const bBoost = best.id === active ? hysteresisPx : 0;
        if (c.distance - cBoost < best.distance - bBoost) best = c;
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
