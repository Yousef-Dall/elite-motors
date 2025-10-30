import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { useI18n } from "../providers/I18nProvider.jsx";

const posts = [
  {
    slug: "sto-stage2-build",
    title: {
      en: "Huracán STO • Stage 2 Build",
      ar: "لامبو هوراكان STO • تعديل المرحلة الثانية",
    },
    date: "2025-08-10",
    excerpt: {
      en: "ECU tune, Inconel exhaust, coilovers, and corner balancing for road & track.",
      ar: "برمجة ECU، عادم إنكونيل، سسبيشن قابل للتعديل، ووزن أركان مضبوط للشارع والحلبة.",
    },
    image: "/images/gallery/01-track-setup.jpg",
  },
  {
    slug: "track-alignment-vs-street",
    title: {
      en: "Track Alignment vs Street: What Changes?",
      ar: "معايرة مضمار مقابل الشارع: ما الفرق؟",
    },
    date: "2025-07-01",
    excerpt: {
      en: "We break down toe, camber, and caster—and why your car feels transformed.",
      ar: "نشرح لك زوايا الكامبر والتو والكاستر — ولماذا سيارتك تصبح مختلفة تمامًا.",
    },
    image: "/images/gallery/09-trackside.jpg",
  },
];

export default function BlogPage() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen em-noise bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white"
    >
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* header */}
        <header className={`${isAr ? "text-right" : "text-left"} mb-8`}>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {t("blog.title") || (isAr ? "المقالات" : "Articles")}
          </h1>

          <p className="mt-2 text-neutral-700 dark:text-white/70 max-w-2xl">
            {t("blog.sub") ||
              (isAr
                ? "بناء المشاريع، نصائح العناية، وتحديثات الورشة."
                : "Build stories, ownership tips, and workshop updates.")}
          </p>
        </header>

        {/* posts list */}
        <div
          className={`grid md:grid-cols-2 gap-6 ${
            isAr ? "text-right" : "text-left"
          }`}
        >
          {posts.map((p) => (
            <article
              key={p.slug}
              className="em-card overflow-hidden border border-black/10 dark:border-white/10 bg-white/75 dark:bg-white/5 rounded-3xl shadow-lg"
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={p.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <div className="text-xs uppercase tracking-widest text-neutral-500 dark:text-white/50">
                  {new Date(p.date).toLocaleDateString(
                    isAr ? "ar" : "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </div>

                <h2 className="mt-1 text-xl font-semibold text-neutral-900 dark:text-white">
                  {p.title[lang] || p.title.en}
                </h2>

                <p className="mt-2 text-neutral-600 dark:text-white/70 text-sm leading-relaxed">
                  {p.excerpt[lang] || p.excerpt.en}
                </p>

                <Link
                  to={`/blog/${p.slug}`}
                  className="mt-4 inline-block underline underline-offset-4 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500"
                >
                  {t("blog.readMore") ||
                    (isAr ? "اقرأ المزيد" : "Read more")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

