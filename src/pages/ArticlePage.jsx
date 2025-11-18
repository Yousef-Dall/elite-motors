import React from "react";
import { useParams, Link } from "react-router-dom";
import { useI18n } from "../providers/I18nProvider.jsx";
import { posts as postList } from "../data/posts";
import { SITE } from "../config/site";
import { SEO } from "../components/seo/SEO.jsx";
import GoHomeButton from "../components/ui/GoHomeButton.jsx";

export default function ArticlePage() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const isAr = lang === "ar";
  const post = postList.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className={isAr ? "text-right" : "text-left"}>
          <SEO title="Article not found" url={`${SITE.domain}/blog/${slug || ""}`} />
          <h1 className="text-3xl md:text-5xl font-extrabold">
            {t("article.notFoundTitle") || (isAr ? "المقال غير موجود" : "Article not found")}
          </h1>
          <Link to="/blog" className="underline mt-4 inline-block text-cyan-600 dark:text-cyan-400 hover:text-cyan-500">
            {t("article.back") || (isAr ? "الرجوع إلى المقالات" : "Back to Articles")}
          </Link>
        </div>
      </div>
    );
  }

  const titleText = post.title[lang] || post.title.en;
  const bodyParas = post.body?.[lang] || post.body?.en || [];

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <SEO title={titleText} url={`${SITE.domain}/blog/${slug}`} image={post.image} type="article" />
      <div className={isAr ? "text-right" : "text-left"}>
        <div className="text-xs uppercase tracking-widest text-neutral-500 dark:text-white/50">
          {new Date(post.date).toLocaleDateString(isAr ? "ar" : "en-US", { year: "numeric", month: "short", day: "numeric" })}
        </div>
        <h1 className="mt-1 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white">
          {titleText}
        </h1>
      </div>

      <div className="mt-6 relative aspect-[16/9] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl">
        <img src={post.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      <article className={`prose prose-neutral dark:prose-invert mt-6 max-w-none ${isAr ? "text-right prose-headings:text-right prose-p:text-right" : "text-left"}`}>
        {bodyParas.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed">{p}</p>
        ))}
      </article>

      <div className={`${isAr ? "text-right" : "text-left"} mt-8`}>
        <Link to="/blog" className="inline-block underline underline-offset-4 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500">
          {t("article.back") || (isAr ? "← الرجوع إلى المقالات" : "← Back to Articles")}
        </Link>

      </div>
      <GoHomeButton />

    </div>
  );
}
