import React from "react";
import { motion } from "framer-motion";
import { SERVICES } from "../data/services";
import { useI18n } from "../i18n/I18nProvider";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  const { t } = useI18n();

  // helper: use translation if it exists, else fallback to original
  const pick = (path, fallback) => {
    const val = t(path);
    return val === path ? fallback : val;
  };

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-start">
          {t("services.title")}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const title = pick(`services.items.${i}.title`, s.title);
            const desc  = pick(`services.items.${i}.desc`,  s.desc);
            const tag   = pick(`services.items.${i}.tag`,   s.tag);

            const Icon = s.icon;
            return (
              <motion.div
                key={title + i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                className="group p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition shadow-lg text-start"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl grid place-items-center bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 border border-white/10">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded-full border border-white/15 text-white/70">
                    {tag}
                  </span>
                </div>
                <p className="text-white/70">{desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
