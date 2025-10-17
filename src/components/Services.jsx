import React from "react";
import { motion } from "framer-motion";
import { SERVICES } from "../data/services";
import { useI18n } from "../i18n/I18nProvider";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Services() {
  const { t } = useI18n();
  const pick = (k, f) => (t(k) === k ? f : t(k));

  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-start">
          <div className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">Elite Motors</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">{t("services.title")}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const title = pick(`services.items.${i}.title`, s.title);
            const desc  = pick(`services.items.${i}.desc`,  s.desc);
            const tag   = pick(`services.items.${i}.tag`,   s.tag);

            return (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.6 }}
                className="group relative p-6 rounded-3xl border shadow-lg transition text-start
                           bg-white/70 border-black/10
                           dark:bg-white/5 dark:border-white/10"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition
                                bg-[radial-gradient(300px_150px_at_20%_-10%,rgba(34,211,238,0.15),transparent_60%),
                                    radial-gradient(300px_150px_at_120%_110%,rgba(232,121,249,0.12),transparent_60%)]" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl grid place-items-center
                                      bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20
                                      border border-black/10 dark:border-white/10">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold">{title}</h3>
                    </div>
                    <span className="text-[11px] px-2 py-1 rounded-full border
                                     text-neutral-700 dark:text-white/70
                                     border-black/10 dark:border-white/15">
                      {tag}
                    </span>
                  </div>
                  <p className="text-neutral-700 dark:text-white/70">{desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
