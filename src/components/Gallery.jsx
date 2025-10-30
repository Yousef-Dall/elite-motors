import React, { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  { src: "/images/gallery/01-track-setup.jpg", alt: "Track setup" },
  { src: "/images/gallery/02-detailing.jpg",   alt: "Detailing" },
  { src: "/images/gallery/03-dyno.jpg",        alt: "Dyno session" },
  { src: "/images/gallery/04-brakes.jpg",      alt: "Carbon brakes" },
  { src: "/images/gallery/05-engine-bay.jpg",  alt: "Engine bay" },
  { src: "/images/gallery/06-interior.jpg",    alt: "Interior detailing" },
  { src: "/images/gallery/07-wheel-torque.jpg",alt: "Wheel torque" },
  { src: "/images/gallery/08-lift.jpg",        alt: "Workshop lift" },
  { src: "/images/gallery/09-trackside.jpg",   alt: "Trackside support" },
  { src: "/images/gallery/10-delivery.jpg",    alt: "Delivery" }
];

const AUTOPLAY_MS = 4500;
const INTERACTION_PAUSE_MS = 10000;

export default function Gallery() {
  const { t } = useI18n();
  const scrollRef = useRef(null);
  const [idx, setIdx] = useState(0);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const pauseUntilRef = useRef(0);

  const slides = useMemo(
    () => IMAGES.map((g, i) => ({ ...g, title: t(`gallery.items.${i}.title`) || null, cap: t(`gallery.items.${i}.cap`) || null })),
    [t]
  );

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll("[data-slide]"));
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (vis) setIdx(Number(vis.target.getAttribute("data-slide")));
    }, { root, threshold: [0.6] });
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (i) => {
    const root = scrollRef.current; if (!root) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    const el = root.querySelector(`[data-slide="${clamped}"]`); if (!el) return;
    const target = el.offsetLeft - (root.clientWidth - el.clientWidth) / 2;
    root.scrollTo({ left: target, behavior: "smooth" });
  };

  const prev = () => { scrollTo(idx - 1); bumpPause(); };
  const next = () => { scrollTo(idx + 1); bumpPause(); };

  useEffect(() => {
    const root = scrollRef.current; if (!root) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    root.addEventListener("keydown", onKey);
    return () => root.removeEventListener("keydown", onKey);
  }, [idx]);

  const onPointerDown = (e) => {
    const root = scrollRef.current; if (!root) return;
    isDownRef.current = true;
    root.setPointerCapture?.(e.pointerId);
    startXRef.current = (e.clientX ?? e.touches?.[0]?.clientX) || 0;
    scrollStartRef.current = root.scrollLeft;
    bumpPause();
  };
  const onPointerMove = (e) => {
    const root = scrollRef.current; if (!root || !isDownRef.current) return;
    const x = (e.clientX ?? e.touches?.[0]?.clientX) || 0;
    root.scrollLeft = scrollStartRef.current - (x - startXRef.current);
  };
  const onPointerUp = (e) => {
    const root = scrollRef.current; if (!root) return;
    isDownRef.current = false;
    root.releasePointerCapture?.(e.pointerId);
  };

  const onMouseEnter = () => setPaused(true);
  const onMouseLeave = () => setPaused(false);
  const onFocus = () => setPaused(true);
  const onBlur  = () => setPaused(false);

  function bumpPause() {
    pauseUntilRef.current = Date.now() + INTERACTION_PAUSE_MS;
    setPaused(true);
    window.clearTimeout(bumpPause._t);
    bumpPause._t = window.setTimeout(() => {
      if (Date.now() >= pauseUntilRef.current) setPaused(false);
    }, INTERACTION_PAUSE_MS + 50);
  }

  useEffect(() => {
    const vis = () => setPaused(document.hidden || Date.now() < pauseUntilRef.current);
    document.addEventListener("visibilitychange", vis);
    vis();
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      const nextIdx = (idx + 1) % slides.length;
      scrollTo(nextIdx);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, idx, slides.length]);

  return (
    <section id="gallery" className="py-16 md:py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 text-start">
          <div className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">{t("gallery.tag")}</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">{t("gallery.title")}</h2>
        </div>

        <div className="relative">
          <button type="button" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/80 border border-black/10 shadow hover:bg-white dark:bg-white/10 dark:border-white/10" aria-label={t("gallery.prev")}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/80 border border-black/10 shadow hover:bg-white dark:bg-white/10 dark:border-white/10" aria-label={t("gallery.next")}>
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            tabIndex={0}
            role="region"
            aria-label={t("gallery.title")}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
            className="scrollbar-hide relative flex snap-x snap-mandatory gap-6 overflow-x-auto rounded-3xl
                       border border-black/10 dark:border-white/10 p-4 outline-none focus:ring-2 focus:ring-cyan-500/50
                       cursor-grab active:cursor-grabbing select-none overscroll-x-contain overscroll-y-none"
          >
            {slides.map((s, i) => (
              <figure key={i} data-slide={i} className="relative snap-center shrink-0 w-[82%] sm:w-[70%] md:w-[55%] lg:w-[45%] xl:w-[38%]">
                <div className="relative aspect-[5/3] overflow-hidden rounded-2xl">
                  <img src={s.src} alt={s.alt} loading="lazy" width="1200" height="720"
  className="absolute inset-0 h-full w-full object-cover" />
                </div>
                {(s.title || s.cap) && (
                  <figcaption className="mt-3 text-start">
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white">{s.title}</div>
                    <div className="text-sm text-neutral-600 dark:text-white/70">{s.cap}</div>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {slides.map((_, i) => {
              const active = i === idx;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => { scrollTo(i); bumpPause(); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); scrollTo(i); bumpPause(); } }}
                  className={["h-2.5 rounded-full transition-all", active ? "w-8 bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500" : "w-2.5 bg-white/30 dark:bg-white/20"].join(" ")}
                  aria-label={`${t("gallery.title")} – slide ${i + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
      <style>{`@keyframes emfade{from{opacity:.55;transform:translateY(2px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
}
