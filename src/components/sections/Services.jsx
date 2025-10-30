// src/sections/Services.jsx
import React from "react";
import { motion } from "framer-motion";
import SERVICES from "../../data/services.js";
import { useI18n } from "../../providers/I18nProvider.jsx";

// Icons
import {
  Wrench,
  CircleDashed,
  Ruler,
  Orbit,
  Cog,
  Snowflake,
  Cpu,
  KeyRound,
  SprayCan,
  Square,
  Component,
  Truck,
  BatteryCharging,
  Sparkles,
  Package,
  PaintBucket,
} from "lucide-react";

const SERVICE_ICONS = {
  "tyre-replacement": CircleDashed,
  "wheel-alignment": Ruler,
  "wheel-balancing": Orbit,
  "engine-gearbox-repairs": Cog,
  "general-service": Wrench,
  "ac-repairs": Snowflake,
  "electrical-diagnostics": Cpu,
  "key-programming": KeyRound,
  "chassis-alignment": Ruler,
  "body-repairs-paint": SprayCan,
  "glass-replacement": Square,
  "engine-gearbox-overhauls": Cog,
  "suspension-repairs": Component,
  "truck-servicing": Truck,
  "ev-charging": BatteryCharging,
  "washing-detailing": Sparkles,
  "parts-sales": Package,
  "paint-sales": PaintBucket,
};

const iconFor = (id) => SERVICE_ICONS[id] ?? Wrench;

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Services() {
  const { t } = useI18n();

  // Try multiple keys; first one that actually translates wins. Otherwise use fallback.
  const pick = (keys, fallback) => {
    for (const k of keys) {
      const v = t(k);
      if (v !== k) return v;
    }
    return fallback;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 text-start">
      {/* Header */}
      <div className="mb-10">
        <div className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">
          Elite Motors
        </div>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">
          {pick(["services.title"], "Our Services")}
        </h2>
      </div>

      {/* Service cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((svc, i) => {
          const Icon = svc.icon ?? iconFor(svc.id);
          const title = pick(
            [`services.items.${svc.id}.title`, `services.items.${i}.title`],
            svc.title
          );
          const desc = pick(
            [
              `services.items.${svc.id}.summary`,
              `services.items.${i}.summary`,
              `services.items.${i}.desc`,
            ],
            svc.summary ?? svc.desc
          );
          const tag = pick(
            [`services.items.${svc.id}.tag`, `services.items.${i}.tag`],
            svc.tag ?? ""
          );

          return (
            <motion.div
              key={svc.id ?? i}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative p-6 rounded-3xl border shadow-lg transition
                         bg-white/70 border-black/10
                         dark:bg-white/5 dark:border-white/10"
            >
              {/* hover glow background */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0
                           group-hover:opacity-100 transition
                           bg-[radial-gradient(300px_150px_at_20%_-10%,rgba(34,211,238,0.15),transparent_60%),
                               radial-gradient(300px_150px_at_120%_110%,rgba(232,121,249,0.12),transparent_60%)]"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  {/* left: icon + title */}
                  <div className="inline-flex items-center gap-3">
                    <div
                      className="h-11 w-11 rounded-2xl grid place-items-center
                                 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20
                                 border border-black/10 dark:border-white/10"
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                  </div>

                  {/* right: tag badge (hidden if empty) */}
                  {tag ? (
                    <span
                      className="text-[11px] px-2 py-1 rounded-full border
                                 text-neutral-700 dark:text-white/70
                                 border-black/10 dark:border-white/15"
                    >
                      {tag}
                    </span>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </div>

                <p className="text-neutral-700 dark:text-white/70">{desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
