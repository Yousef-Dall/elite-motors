import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  // flip arrow in AR so it points “forward” visually
  const arrowClass = `h-4 w-4 transition -translate-x-0 group-hover:translate-x-0.5 ${
    isAr ? "rotate-180" : ""
  }`;

  // reverse gradient direction for Arabic for a more natural look
  const highlightClass = isAr
    ? "bg-gradient-to-l from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent"
    : "bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent";

  return (
    <section id="home" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 grid md:grid-cols-2 items-center gap-10">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="space-y-6 text-start"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            {t("hero.titleA")} <span className={highlightClass}>{t("hero.titleB")}</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-prose">
            {t("hero.sub")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 font-semibold shadow-lg hover:shadow-cyan-500/30"
            >
              {t("hero.cta1")} <ArrowRight className={arrowClass} />
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10"
            >
              {t("hero.cta2")}
            </a>
          </div>

          <div className="flex items-center gap-6 pt-2 text-white/70">
            <div className="text-sm">{t("hero.badges.0")}</div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <div className="text-sm">{t("hero.badges.1")}</div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <div className="text-sm">{t("hero.badges.2")}</div>
          </div>
        </motion.div>

        <motion.div variants={fade} initial="hidden" animate="show" className="relative">
          <div className="relative aspect-[5/3] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img
              src="/images/hero-lambo.jpg"
              alt="Elite Motors"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* readability overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.45),rgba(0,0,0,0.15))]" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur text-start">
              <div className="text-xs uppercase tracking-widest text-white/70">
                {t("hero.featured.tag")}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {t("hero.featured.title")}
              </div>
              <div className="text-sm text-white/70">
                {t("hero.featured.sub")}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
