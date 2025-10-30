import React from "react";
import { useParams, Link } from "react-router-dom";
import { useI18n } from "../providers/I18nProvider.jsx";
import { SEO } from "../components/seo/SEO.jsx";

const posts = {
  "sto-stage2-build": {
    title: { en: "Huracán STO • Stage 2 Build", ar: "لامبو هوراكان STO • تعديل المرحلة الثانية" },
    date: "2025-08-10",
    hero: "/images/gallery/01-track-setup.jpg",
    body: {
      en: ["This STO build focused on reliable power and repeatable lap performance.","We paired an ECU calibration with an Inconel exhaust and dialed in coilovers.","Corner balance and alignment were set for a track-forward street compromise."],
      ar: ["هذا المشروع ركّز على قوة مضمونة وأداء ثابت على المضمار.","قمنا ببرمجة وحدة التحكم ECU، وتركيب عادم إنكونيل، وضبط نظام السسبيشن القابل للتعديل.","وازنّا السيارة على الميزان الرباعي وضبطنا الزوايا لإعداد يميل للحلبة لكن قابل للاستخدام في الشارع."]
    }
  },
  "track-alignment-vs-street": {
    title: { en: "Track Alignment vs Street: What Changes?", ar: "معايرة مضمار مقابل الشارع: ما الفرق؟" },
    date: "2025-07-01",
    hero: "/images/gallery/09-trackside.jpg",
    body: {
      en: ["Alignment transforms how an exotic behaves at speed.","Track setups emphasize camber and stability under high load; street priorities focus on tire life and comfort.","We share what owners should watch for in tire wear when running aggressive camber on the street."],
      ar: ["المعايرة (الزوايا) تغيّر تصرف السيارة الرياضية عند السرعة.","إعداد الحلبة يركز على الكامبر والاستقرار تحت الحمل العالي؛ إعداد الشارع يهتم بعمر الإطار والراحة.","نوضح لك علامات تآكل الإطار التي لازم تراقبها لو كنت تمشي بإعداد كامبر هجومي في الشارع."]
    }
  }
};

export default function ArticlePage() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const isAr = lang === "ar";
  const post = posts[slug];

  if (!post) {
    return (
      <>
        <SEO title="Article not found" description="The article you’re looking for was moved or never existed." />
        <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen em-noise">
          <main className="mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className={isAr ? "text-right" : "text-left"}>
              <h1 className="text-3xl md:text-5xl font-extrabold">{t("article.notFoundTitle") || (isAr ? "المقال غير موجود" : "Article not found")}</h1>
              <Link to="/blog" className="underline mt-4 inline-block text-cyan-600 dark:text-cyan-400 hover:text-cyan-500">
                {t("article.back") || (isAr ? "الرجوع إلى المقالات" : "Back to Articles")}
              </Link>
            </div>
          </main>
        </div>
      </>
    );
  }

  const titleText = post.title[lang] || post.title.en;
  const bodyParas = post.body[lang] || post.body.en;

  return (
    <>
      <SEO title={titleText} description={bodyParas[0]} />
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen em-noise">
        <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
          <div className={isAr ? "text-right" : "text-left"}>
            <div className="text-xs uppercase tracking-widest text-neutral-500 dark:text-white/50">
              {new Date(post.date).toLocaleDateString(isAr ? "ar" : "en-US", { year: "numeric", month: "short", day: "numeric" })}
            </div>
            <h1 className="mt-1 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white">{titleText}</h1>
          </div>
          <div className="mt-6 relative aspect-[16/9] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl">
            <img src={post.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <article className={`prose prose-neutral dark:prose-invert mt-6 max-w-none ${isAr ? "text-right prose-headings:text-right prose-p:text-right" : "text-left"}`}>
            {bodyParas.map((p, i) => (<p key={i} className="text-lg leading-relaxed">{p}</p>))}
          </article>
          <div className={`${isAr ? "text-right" : "text-left"} mt-8`}>
            <Link to="/blog" className="inline-block underline underline-offset-4 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500">
              {t("article.back") || (isAr ? "← الرجوع إلى المقالات" : "← Back to Articles")}
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
