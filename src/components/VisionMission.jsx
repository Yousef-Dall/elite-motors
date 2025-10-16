import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function VisionMission() {
  const { t } = useI18n();

  return (
    <section id="vm" className="scroll-mt-24 py-20 md:py-28 border-y border-black/10 dark:border-white/10 bg-black/5 dark:bg-neutral-950/70">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="p-8 rounded-3xl border shadow-md text-start
                     bg-white/80 dark:bg-transparent
                     bg-gradient-to-br from-cyan-500/5 to-cyan-600/0
                     dark:from-cyan-900/30 dark:to-cyan-600/10
                     border-black/10 dark:border-white/10"
        >
          <h3 className="text-2xl font-bold mb-2">{t("vm.visionT")}</h3>
          <p className="text-lg text-neutral-700 dark:text-white/70">{t("vm.visionP")}</p>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="p-8 rounded-3xl border shadow-md text-start
                     bg-white/80 dark:bg-transparent
                     bg-gradient-to-br from-fuchsia-500/5 to-fuchsia-600/0
                     dark:from-fuchsia-900/30 dark:to-fuchsia-600/10
                     border-black/10 dark:border-white/10"
        >
          <h3 className="text-2xl font-bold mb-2">{t("vm.missionT")}</h3>
          <p className="text-lg text-neutral-700 dark:text-white/70">{t("vm.missionP")}</p>
        </motion.div>
      </div>
    </section>
  );
}
