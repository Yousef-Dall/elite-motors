// src/components/WhoWeAre.jsx
import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// extra: image entrance animation
const imageFx = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function WhoWeAre() {
  const { t } = useI18n();

  return (
    <section id="who" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="space-y-5 text-start"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t("who.title")}</h2>
          <p className="text-white/70 text-lg">{t("who.p1")}</p>
          <ul className="list-disc ps-5 text-white/70 space-y-2">
            <li>{t("who.bullets.0")}</li>
            <li>{t("who.bullets.1")}</li>
            <li>{t("who.bullets.2")}</li>
          </ul>
        </motion.div>

        {/* Animated image block */}
        <motion.div
          variants={imageFx}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-xl will-change-transform
                     transition-transform duration-500 hover:-translate-y-1"
        >
          <img
            src="/images/shop-interior.jpg"
            alt="Workshop"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0.4 }}
            whileHover={{ opacity: 0.55 }}
            className="absolute inset-0 bg-black/30"
          />
        </motion.div>
      </div>
    </section>
  );
}
