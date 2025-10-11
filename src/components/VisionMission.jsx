import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function VisionMission() {
  const { t } = useI18n();

  return (
    <section id="vm" className="py-20 md:py-28 border-y border-white/10 bg-neutral-950/70">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="p-8 rounded-3xl bg-gradient-to-br from-cyan-900/30 to-cyan-600/10 border border-white/10 text-start"
        >
          <h3 className="text-2xl font-bold mb-2">{t("vm.visionT")}</h3>
          <p className="text-white/70 text-lg">{t("vm.visionP")}</p>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="p-8 rounded-3xl bg-gradient-to-br from-fuchsia-900/30 to-fuchsia-600/10 border border-white/10 text-start"
        >
          <h3 className="text-2xl font-bold mb-2">{t("vm.missionT")}</h3>
          <p className="text-white/70 text-lg">{t("vm.missionP")}</p>
        </motion.div>
      </div>
    </section>
  );
}
