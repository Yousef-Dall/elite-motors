import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../providers/I18nProvider.jsx";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function WhoWeAre() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center text-start">
      {/* TEXT SIDE */}
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
          {t("who.title")}
        </h2>

        <p className="text-lg text-neutral-700 dark:text-white/70">
          {t("who.p1")}
        </p>

        <ul className="list-disc ps-5 space-y-2 text-neutral-700 dark:text-white/70 marker:text-neutral-500 dark:marker:text-white/40">
          <li>{t("who.bullets.0")}</li>
          <li>{t("who.bullets.1")}</li>
          <li>{t("who.bullets.2")}</li>
        </ul>
      </motion.div>

      {/* IMAGE + REFLECTION SIDE */}
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative"
      >
        {/* hover float wrapper */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="relative aspect-[4/3] w-full rounded-3xl overflow-visible"
        >
          {/* Main card */}
          <div className="relative h-full overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 shadow-xl">
            <img
              src="/images/shop-interior.jpg"
              width="1400"
              height="1050"
              decoding="async"
              className="absolute inset-0 z-10 h-full w-full object-cover"
              alt={t("who.imgAlt") || "Workshop"}
            />
          </div>

          {/* Soft reflection */}
          <div className="absolute -bottom-20 left-0 right-0 h-20 overflow-hidden rounded-t-3xl pointer-events-none">
            <img
              src="/images/shop-interior.jpg"
              width="1400"
              height="1050"
              decoding="async"
              loading="lazy"
              alt=""
              aria-hidden="true"
              className="w-full h-[180%] object-cover blur-[1px] opacity-30 saturate-75"
              style={{
                transform: "scaleY(-1)",
                WebkitMaskImage:
                  "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))",
                maskImage:
                  "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))",
              }}
            />
          </div>

          {/* Glass floor glow */}
          <div
            className="absolute -bottom-5 left-6 right-6 h-9 rounded-[999px] opacity-60 blur-md
                       bg-[radial-gradient(120%_80%_at_50%_100%,rgba(255,255,255,0.35),transparent_60%)]
                       dark:bg-[radial-gradient(120%_80%_at_50%_100%,rgba(255,255,255,0.18),transparent_60%)]"
          />
          <div className="absolute -bottom-1 left-10 right-10 h-px bg-neutral-300 dark:bg-white/20 blur-[1px] opacity-60" />
        </motion.div>
      </motion.div>
    </div>
  );
}

