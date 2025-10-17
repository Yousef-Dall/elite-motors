import React, { useMemo } from "react";
import { useI18n } from "../i18n/I18nProvider";


const BRANDS = [
  { name: "Ferrari",       file: "ferrari.png" },
  { name: "McLaren",       file: "mclaren.png" },
  { name: "Porsche",       file: "porsche.png" },
  { name: "Aston Martin",  file: "aston-martin.png" },
  { name: "Lamborghini",   file: "lamborgini.png" },
  { name: "Bugatti", file: "bugatti.png" },
{ name: "Koenigsegg", file: "koenigsegg.png" },
{ name: "Pagani", file: "pagani.png" },
];

export default function ClientsMarquee() {
  const { t } = useI18n();

  // Repeat the row 2x for a seamless loop
  const logos = useMemo(() => [...BRANDS, ...BRANDS, ...BRANDS], []);

  return (
    <section className="py-14 md:py-20 border-y border-white/10 bg-white/60 dark:bg-white/5 em-marquee">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-6">
          <div className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">
            {t("marquee.tag")}
          </div>
        </div>

        <div className="relative overflow-hidden">
          {/* Edge gradients */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent pointer-events-none" />

          {/* Track */}
          <div
            className="em-row flex items-center gap-10 animate-[marquee_28s_linear_infinite] will-change-transform"
            aria-label={t("marquee.tag")}
          >
            {logos.map(({ name, file }, i) => {
              const src = `/images/brands/${file}`;
              return (
                <div key={`${name}-${i}`} className="shrink-0 select-none">
                  <img
                    src={src}
                    alt={name}
                    loading="lazy"
                     className="
   h-19 md:h-12 w-auto opacity-80 hover:opacity-100 transition
   dark:opacity-80 dark:hover:opacity-100
 "
                  
                    onError={(e) => {
                      // Graceful fallback: replace broken image with a pill text
                      const wrap = e.currentTarget.parentElement;
                      if (!wrap) return;
                      wrap.innerHTML = `
                        <span class="inline-block px-4 py-2 rounded-full border text-sm
                          bg-white/70 border-black/10 text-neutral-700
                          dark:bg-white/5 dark:border-white/10 dark:text-white/80">
                          ${name}
                        </span>`;
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Anim + reduced-motion respect */}
      <style>{`
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media (prefers-reduced-motion: reduce){
          .em-row{ animation: none !important; }
        }
      `}</style>
    </section>
  );
}
