import React from "react";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "../../providers/I18nProvider.jsx";
import { SITE } from "../../config/site";
import { CONTACT } from "../../constants/contact";

const DMS = `23°28'42.7"N 58°15'38.9"E`;

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Location() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10 items-start text-start">
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-5"
      >
        <div className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">
          {t("location.tag") || "Visit Us"}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">
          {t("location.title") || "Our Location"}
        </h2>
        <p className="text-lg text-neutral-700 dark:text-white/70">
          {t("location.sub") ||
            "Find us in Muscat — convenient access, secure indoor drop-off, and concierge reception."}
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border bg-white/80 dark:bg-white/5 border-black/10 dark:border-white/10">
            <div className="text-sm text-neutral-600 dark:text-white/60">
              {t("location.address") || "Address"}
            </div>
            <div className="font-semibold">{SITE.addressShort}</div>
          </div>
          <div className="p-4 rounded-2xl border bg-white/80 dark:bg-white/5 border-black/10 dark:border-white/10">
            <div className="text-sm text-neutral-600 dark:text-white/60">
              {t("location.hours") || "Hours"}
            </div>
            <div className="font-semibold">
              {t("location.hoursVal") || "Sat–Thu • 9:00–18:00"}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={CONTACT.MAPS_DIRECTIONS}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 shadow-lg shadow-cyan-500/20"
          >
            <Navigation className="h-4 w-4" />
            {t("location.dir") || "Get Directions"}
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10">
            <MapPin className="h-4 w-4" />
            {DMS}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border shadow-2xl border-black/10 dark:border-white/10">
          <iframe
            title="Elite Motors Location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              CONTACT.MAPS_QUERY
            )}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0))]" />
        </div>
      </motion.div>
    </div>
  );
}
