import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useI18n } from "../providers/I18nProvider.jsx";

export default function NotFoundPage() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen em-noise bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white"
    >
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-start">
        <div className={`${isAr ? "text-right" : "text-left"} space-y-4`}>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            {t("notfound.title") || (isAr ? "الصفحة غير موجودة" : "404 — Page Not Found")}
          </h1>

          <p className="text-lg text-neutral-700 dark:text-white/70 max-w-prose">
            {t("notfound.desc") ||
              (isAr
                ? "الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها."
                : "The page you’re trying to reach doesn’t exist or may have been moved.")}
          </p>

          <a
            href="/"
            className={`inline-block mt-6 underline underline-offset-4 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition ${
              isAr ? "text-right" : ""
            }`}
          >
            {t("notfound.home") || (isAr ? "← العودة إلى الصفحة الرئيسية" : "← Back to Home")}
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
