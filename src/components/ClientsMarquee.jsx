import React, { useMemo } from "react";
import { useI18n } from "../i18n/I18nProvider";

const BRANDS = [
  { name: "Ferrari",       file: "ferrari.svg" },
  { name: "McLaren",       file: "mclaren.svg" },
  { name: "Porsche",       file: "porsche.svg" },
  { name: "Aston Martin",  file: "aston-martin.svg" },
  { name: "Lamborghini",   file: "lamborghini.svg" },
];

function LogoPill({ name }) {
  return (
    <span className="inline-block px-4 py-2 rounded-full border text-sm
      bg-white/70 border-black/10 text-neutral-700
      dark:bg-white/5 dark:border-white/10 dark:text-white/80">
      {name}
    </span>
  );
}

function BrandImg({ name, file }) {
  const src = `/images/brands/${file}`;
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      className="h-10 md:h-12 w-auto opacity-80 hover:opacity-100 transition dark:opacity-80 dark:hover:opacity-100"
      onError={(e) => {
        const wrap = e.currentTarget.parentElement;
        if (!wrap) return;
        wrap.innerHTML = "";
        const pill = document.createElement("span");
        pill.className =
          "inline-block px-4 py-2 rounded-full border text-sm bg-white/70 border-black/10 text-neutral-700 dark:bg-white/5 dark:border-white/10 dark:text-white/80";
        pill.textContent = name;
        wrap.appendChild(pill);
      }}
    />
  );
}

export default function ClientsMarquee() {
  const { t } = useI18n();
  const rowMd = useMemo(() => [...BRANDS, ...BRANDS], []);
  const rowSm = BRANDS; // one row is enough for swipe on phones

  return (
    <section className="py-14 md:py-20 border-y border-white/10 bg-white/60 dark:bg-white/5">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-6">
          <div className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">
            {t("marquee.tag")}
          </div>
        </div>

        {/* Mobile: swipeable row (no CSS animation) */}
        <div className="relative md:hidden">
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent pointer-events-none" />

          <div
            role="list"
            aria-label={t("marquee.tag")}
            className="scrollbar-hide flex items-center gap-8 overflow-x-auto snap-x snap-mandatory px-1"
          >
            {rowSm.map(({ name, file }, i) => (
              <div
                role="listitem"
                key={`${name}-${i}`}
                className="snap-center shrink-0 select-none"
              >
                <span className="sr-only">{name}</span>
                <BrandImg name={name} file={file} />
              </div>
            ))}
          </div>
        </div>

        {/* md+ : smooth infinite marquee */}
        <div className="relative hidden md:block em-marquee">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent pointer-events-none" />

          <div
            className="em-row flex items-center gap-12 animate-[marquee_28s_linear_infinite] will-change-transform"
            aria-label={t("marquee.tag")}
          >
            {rowMd.map(({ name, file }, i) => (
              <div key={`${name}-${i}`} className="shrink-0 select-none">
                <BrandImg name={name} file={file} />
              </div>
            ))}
          </div>

          <style>{`
            @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
            @media (prefers-reduced-motion: reduce){ .em-row{ animation: none !important; } }
          `}</style>
        </div>
      </div>
    </section>
  );
}
