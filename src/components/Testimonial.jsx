import React from "react";
import { Star } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

export default function Testimonial() {
  const { t } = useI18n();
  const quote = t("testimonial.quote");
  const name  = t("testimonial.name");
  const role  = t("testimonial.role");
  const avatar= t("testimonial.avatar");

  return (
    <section id="testimonial" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden">
          <div className="absolute -inset-[1px] rounded-3xl bg-[conic-gradient(from_180deg,theme(colors.cyan.500/25),theme(colors.indigo.500/20),theme(colors.fuchsia.500/25))] -z-10" />
          <div className="relative rounded-3xl bg-white/70 dark:bg-white/5 p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6 text-start">
              <img src={avatar} alt={name} className="h-16 w-16 rounded-2xl object-cover border border-black/10 dark:border-white/10" loading="lazy" />
              <div className="flex-1">
                <div className="flex items-center gap-1 text-amber-400 mb-2">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <p className="text-lg text-neutral-800 dark:text-white/80">{quote}</p>
                <div className="mt-4 text-sm text-neutral-600 dark:text-white/60">
                  <span className="font-semibold text-neutral-900 dark:text-white">{name}</span> • <span>{role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
