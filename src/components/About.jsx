import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/** Smooth count-up when in view (once) */
function CountUp({ to, duration = 1.6, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let raf;
    let start;

    const from = 0;
    const end = Number(to);

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (ts) => {
      if (start === undefined) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const eased = easeOutCubic(p);
      const current = from + (end - from) * eased;
      setVal(current);
      if (p < 1) raf = requestAnimationFrame(tick);
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
    <section id="about" className="py-20 md:py-28 border-t border-white/10 bg-neutral-950/80">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-3 gap-10">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="md:col-span-2 space-y-5 text-start"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t("about.title")}</h2>

          <p className="text-white/70 text-lg">{t("about.p1")}</p>

          <ul className="grid md:grid-cols-2 gap-4 text-white/70">
            <li className="p-4 rounded-2xl border border-white/10 bg-white/5">
              {t("about.bullets.0")}
            </li>
            <li className="p-4 rounded-2xl border border-white/10 bg-white/5">
              {t("about.bullets.1")}
            </li>
            <li className="p-4 rounded-2xl border border-white/10 bg-white/5">
              {t("about.bullets.2")}
            </li>
            <li className="p-4 rounded-2xl border border-white/10 bg-white/5">
              {t("about.bullets.3")}
            </li>
          </ul>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-4 text-start"
        >
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-900/30 to-fuchsia-900/30 border border-white/10">
            <div className="text-sm uppercase tracking-widest text-white/70">
              {t("about.exp")}
            </div>
            <div className="text-5xl font-extrabold">
              <CountUp to={12} duration={1.6} decimals={0} suffix="+" />
            </div>
            <div className="text-white/60">{t("about.expNote")}</div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10">
            <div className="text-sm uppercase tracking-widest text-white/70">
              {t("about.csat")}
            </div>
            <div className="text-5xl font-extrabold">
              <CountUp to={4.9} duration={1.6} decimals={1} suffix="★" />
            </div>
            <div className="text-white/60">{t("about.csatNote")}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
