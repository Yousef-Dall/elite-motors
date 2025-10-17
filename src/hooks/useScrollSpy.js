import { useEffect, useMemo, useRef, useState } from "react";

/**
 * useScrollSpyAuto – pixel-accurate scroll spy using a reading line and auto header height.
 */
export default function useScrollSpyAuto(ids, options = {}) {
  const { headerRef, headerSelector, lineRatio = 0.35 } = options;
  const [active, setActive] = useState(ids[0] || "");
  const [offsetPx, setOffsetPx] = useState(96);
  const rafLock = useRef(false);

  const headerEl = useMemo(() => {
    if (headerRef?.current) return headerRef.current;
    if (headerSelector) return document.querySelector(headerSelector);
    return null;
  }, [headerRef, headerSelector]);

  useEffect(() => {
    if (!headerEl) return;
    const compute = () => {
      const h = Math.ceil(headerEl.getBoundingClientRect().height || 0);
      if (h && h !== offsetPx) setOffsetPx(h);
    };
    compute();
    const ro = new ResizeObserver(() => compute());
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
      let best = { id: active, score: Infinity };
      for (const { id, el } of sections) {
        const top = el.offsetTop;
        const dist = Math.abs(top - lineY);
        const isAbove = top <= lineY;
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

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offsetPx, lineRatio]);

  return active;
}
