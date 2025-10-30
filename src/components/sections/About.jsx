import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "../../providers/I18nProvider.jsx";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Animated number for KPIs
function CountUp({ to, duration = 1.2, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let raf;
    let start;

    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    const tick = (ts) => {
      start ??= ts;
      const progress = (ts - start) / (duration * 1000);
      const clamped = Math.min(progress, 1);
      const eased = ease(clamped) * to;
      setVal(eased);
      if (clamped < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function About() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-3 gap-10 text-start">
      {/* LEFT BLOCK: copy + bullets */}
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="md:col-span-2 space-y-5"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          {t("about.title")}
        </h2>

        <p className="text-lg text-neutral-700 dark:text-white/70">
          {t("about.p1")}
        </p>

        <ul className="grid md:grid-cols-2 gap-4 text-neutral-700 dark:text-white/70">
          {[0, 1, 2, 3].map((i) => (
            <li
              key={i}
              className="p-4 rounded-2xl border shadow-sm transition
                         bg-white/70 hover:bg-white/90 border-black/10
                         dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10"
            >
              {t(`about.bullets.${i}`)}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* RIGHT BLOCK: stats cards */}
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {/* Experience card */}
        <div
          className="p-6 rounded-3xl border shadow-lg
                     bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10
                     dark:from-cyan-900/30 dark:to-fuchsia-900/30
                     border-black/10 dark:border-white/10"
        >
          <div className="text-sm uppercase tracking-widest text-neutral-600 dark:text-white/70">
            {t("about.exp")}
          </div>
          <div className="text-5xl font-extrabold">
            <CountUp to={12} suffix="+" />
          </div>
          <div className="text-neutral-600 dark:text-white/60">
            {t("about.expNote")}
          </div>
        </div>

        {/* Satisfaction card */}
        <div
          className="p-6 rounded-3xl border shadow-lg
                     bg-white/80 dark:bg-neutral-900
                     border-black/10 dark:border-white/10"
        >
          <div className="text-sm uppercase tracking-widest text-neutral-600 dark:text-white/70">
            {t("about.csat")}
          </div>
          <div className="text-5xl font-extrabold">
            <CountUp to={4.9} decimals={1} suffix="★" />
          </div>
          <div className="text-neutral-600 dark:text-white/60">
            {t("about.csatNote")}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

