import React from "react";
import { SITE } from "../config/site";
import { SEO } from "../components/seo/SEO.jsx";
import { useI18n } from "../providers/I18nProvider.jsx";

export default function BookingPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const title = isAr ? "احجز زيارة" : "Book a Visit";
  const tagLabel = SITE.name;
  const intro = isAr
    ? "اختر الموعد المناسب لزيارة الورشة. سنتواصل معك لتأكيد التفاصيل عبر البريد الإلكتروني أو واتساب، ونخبرك بأي تجهيزات مطلوبة قبل الزيارة."
    : "Choose a convenient time for your visit. We’ll confirm the details by email or WhatsApp and share any preparation steps if required.";

  const preferWhatsAppLabel = isAr ? "تفضّل واتساب؟" : "Prefer WhatsApp?";
  const messageUsLabel = isAr ? "راسلنا" : "Message us";

  const description = isAr
    ? "احجز موعد زيارة إيليت موتورز في مسقط للصيانة، الفحص، أو استشارة الأداء."
    : "Schedule a concierge visit to Elite Motors in Muscat for maintenance, diagnostics, or performance consultation.";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="mx-auto max-w-7xl px-4 py-16 md:py-24"
    >
      <SEO
        title={title}
        description={description}
        url={`${SITE.domain}/booking`}
      />

      <header
        className={`mb-10 text-start ${
          isAr ? "text-right" : "text-left"
        }`}
      >
        <div className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">
          {tagLabel}
        </div>
        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold">
          {title}
        </h1>
        <p className="mt-3 text-neutral-700 dark:text-white/70 max-w-2xl">
          {intro}
        </p>
      </header>

      <div className="rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden shadow-md hover:shadow-lg transition bg-white/70 dark:bg-white/5">
        <iframe
          title={title}
          src={SITE.booking.calendly}
          className="w-full h-[780px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
        />
      </div>

      <div className="mt-6 text-sm text-neutral-600 dark:text-white/60">
        {preferWhatsAppLabel}{" "}
        <a
          href={`https://wa.me/${SITE.phone.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-cyan-500 dark:hover:text-cyan-400"
        >
          {messageUsLabel}
        </a>
        .
      </div>
    </div>
  );
}
