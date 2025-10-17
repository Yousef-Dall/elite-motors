import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Hero() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <section id="home" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_-10%,rgba(99,102,241,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.0),rgba(0,0,0,0.04))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.00))]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 grid md:grid-cols-2 items-center gap-10">
        <motion.div variants={fade} initial="hidden" animate="show" className="space-y-6 text-start">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            {t("hero.titleA")}{" "}
            <span className={`${isAr ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent`}>
              {t("hero.titleB")}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-700 dark:text-white/70 max-w-prose">{t("hero.sub")}</p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-semibold
                         bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 shadow-lg shadow-cyan-500/20
                         hover:shadow-cyan-500/30 transition"
            >
              {t("hero.cta1")}
              <ArrowRight className={`h-4 w-4 transition ${isAr ? "-scale-x-100" : ""} group-hover:translate-x-0.5`} />
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border transition
                         bg-white/70 border-black/10 hover:bg-white/90
                         dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
            >
              {t("hero.cta2")}
            </a>
          </div>

          <div className="flex items-center gap-6 pt-2 text-neutral-600 dark:text-white/70">
            <span className="text-sm">{t("hero.badges.0")}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-black/20 dark:bg-white/30" />
            <span className="text-sm">{t("hero.badges.1")}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-black/20 dark:bg-white/30" />
            <span className="text-sm">{t("hero.badges.2")}</span>
          </div>
        </motion.div>

        {/* RIGHT: image card with reflection + glass floor */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative">
          <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 240, damping: 18 }} className="relative aspect-[5/3] w-full overflow-visible rounded-3xl">
            <div className="relative h-full overflow-hidden rounded-3xl border shadow-2xl border-black/10 dark:border-white/10">
              <img
                src="/images/hero-lambo.jpg"
                alt="Elite Motors"
                className="absolute inset-0 z-10 h-full w-full object-cover"
              />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl border border-white/10 backdrop-blur-[4px] bg-transparent text-start z-20">
                <div className="text-xs uppercase tracking-widest text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">
                  {t("hero.featured.tag")}
                </div>
                <div className="mt-1 text-lg font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">
                  {t("hero.featured.title")}
                </div>
                <div className="text-sm text-neutral-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">
                  {t("hero.featured.sub")}
                </div>
              </div>
            </div>

            {/* soft reflection */}
            <div className="absolute -bottom-24 left-0 right-0 h-24 overflow-hidden rounded-t-3xl pointer-events-none">
              <img
                src="/images/hero-lambo.jpg"
                alt=""
                aria-hidden="true"
                className="w-full h-[180%] object-cover blur-[1px] opacity-35 saturate-75"
                style={{
                  transform: "scaleY(-1)",
                  WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))",
                  maskImage: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))",
                }}
              />
            </div>

            <div className="absolute -bottom-6 left-6 right-6 h-10 rounded-[999px] opacity-60 blur-md bg-[radial-gradient(120%_80%_at_50%_100%,rgba(255,255,255,0.35),transparent_60%)] dark:bg-[radial-gradient(120%_80%_at_50%_100%,rgba(255,255,255,0.18),transparent_60%)]" />
            <div className="absolute -bottom-2 left-10 right-10 h-px bg-white/40 dark:bg-white/20 blur-[1px] opacity-60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
