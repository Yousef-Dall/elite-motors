// src/components/WhoWeAre.jsx
import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function WhoWeAre() {
  const { t } = useI18n();

  return (
    <section id="who" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* TEXT */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-5 text-start"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
            {t("who.title") || "Who We Are"}
          </h2>

          <p className="text-lg text-neutral-700 dark:text-white/70">
            {t("who.p1") ||
              "We are engineers, racers, and perfectionists. Our workshop blends OEM tooling with motorsport processes—torque tags, bore scopes, data logs—because details decide podiums."}
          </p>

          <ul className="list-disc ps-5 space-y-2 text-neutral-700 dark:text-white/70 marker:text-neutral-500 dark:marker:text-white/40">
            <li>{t("who.bullets.0") || "Manufacturer-compliant procedures & digital service records"}</li>
            <li>{t("who.bullets.1") || "Partnerships with global motorsport suppliers"}</li>
            <li>{t("who.bullets.2") || "Secure storage with climate & trickle-charge"}</li>
          </ul>
        </motion.div>

        {/* IMAGE + REFLECTION + GLASS FLOOR */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Wrap card so image + reflection share radius */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
            className="relative aspect-[4/3] w-full rounded-3xl overflow-visible"
          >
            {/* Main card */}
            <div className="relative h-full overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 shadow-xl">
              <img
                src="/images/shop-interior.jpg"  /* swap to an import if you keep images in src/assets */
                alt={t("who.imgAlt") || "Workshop"}
                className="absolute inset-0 z-10 h-full w-full object-cover"
              />
            </div>

            {/* Soft reflection (top corners rounded to match the card’s bottom) */}
            <div className="absolute -bottom-20 left-0 right-0 h-20 overflow-hidden rounded-t-3xl pointer-events-none">
              <img
                src="/images/shop-interior.jpg"
                alt=""
                aria-hidden="true"
                className="w-full h-[180%] object-cover blur-[1px] opacity-30 saturate-75"
                style={{
                  transform: "scaleY(-1)",
                  WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))",
                  maskImage: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))",
                }}
              />
            </div>

            {/* Glass floor */}
            <div className="absolute -bottom-5 left-6 right-6 h-9 rounded-[999px] opacity-60 blur-md
                            bg-[radial-gradient(120%_80%_at_50%_100%,rgba(255,255,255,0.35),transparent_60%)]
                            dark:bg-[radial-gradient(120%_80%_at_50%_100%,rgba(255,255,255,0.18),transparent_60%)]" />
            <div className="absolute -bottom-1 left-10 right-10 h-px bg-neutral-300 dark:bg-white/20 blur-[1px] opacity-60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
