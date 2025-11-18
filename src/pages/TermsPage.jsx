import React from "react";
import { SEO } from "../components/seo/SEO.jsx";
import { SITE } from "../config/site";
import { useI18n } from "../providers/I18nProvider.jsx";

export default function TermsPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const title = isAr ? "الشروط والأحكام" : "Terms & Conditions";
  const description = isAr
    ? "الشروط الأساسية لاستخدام موقع إيليت موتورز وحجز الخدمات."
    : "Key terms for using the Elite Motors website and requesting services.";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="mx-auto max-w-3xl px-4 py-16 md:py-24 text-start"
    >
      <SEO
        title={title}
        description={description}
        url={`${SITE.domain}/terms`}
      />

      <header className={isAr ? "text-right" : "text-left"}>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-neutral-700 dark:text-white/70">
          {isAr
            ? "باستخدامك لهذا الموقع أو عند إرسال طلب أو حجز موعد، فإنك توافق على هذه الشروط في حدود ما يسمح به القانون المعمول به في سلطنة عمان."
            : "By using this website or submitting a request or booking, you agree to these terms to the extent permitted under applicable law in Oman."}
        </p>
      </header>

      <main
        className={`mt-8 space-y-8 ${
          isAr ? "text-right" : "text-left"
        } text-neutral-800 dark:text-white/80`}
      >
        <section>
          <h2 className="text-xl font-semibold">
            {isAr ? "1. استخدام الموقع" : "1. Use of the website"}
          </h2>
          <p className="mt-2">
            {isAr ? (
              <>
                يهدف الموقع إلى تقديم معلومات عن{" "}
                <strong>{SITE.name}</strong> وخدماته، وتسهيل التواصل
                والحجز. لا يجوز استخدام المحتوى لأغراض غير قانونية، أو لنشر
                رسائل غير مرغوبة، أو لمحاولة إلحاق الضرر بالموقع أو
                بالخوادم التي تشغله.
              </>
            ) : (
              <>
                The website is intended to provide information about{" "}
                <strong>{SITE.name}</strong> and to facilitate contact and
                bookings. You must not use the site for unlawful purposes,
                sending unsolicited messages, or attempting to disrupt or damage
                the site or underlying infrastructure.
              </>
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            {isAr ? "2. الحجز وطلب الخدمات" : "2. Bookings & services"}
          </h2>
          <p className="mt-2">
            {isAr ? (
              <>
                أي حجز يتم عبر الموقع أو أنظمة الحجز الخارجية يعتبر طلباً
                أولياً فقط. تصبح الخدمة مؤكدة بعد تواصل فريقنا معك للتأكيد
                وتوضيح التفاصيل والتكلفة المتوقعة. قد نرفض أو نعيد جدولة
                أي حجز إذا لزم الأمر لأسباب تشغيلية أو أمنية.
              </>
            ) : (
              <>
                Any booking made through the website or external booking tools
                is considered an initial request only. A service is confirmed
                once our team contacts you to confirm details and expected
                pricing. We may decline or reschedule a booking where necessary
                for operational or safety reasons.
              </>
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            {isAr ? "3. المحتوى وحقوق الملكية" : "3. Content & IP"}
          </h2>
          <p className="mt-2">
            {isAr ? (
              <>
                جميع الشعارات، الصور، النصوص، والتصاميم المعروضة على الموقع
                (ما لم يُذكر غير ذلك) مملوكة لـ{" "}
                <strong>{SITE.name}</strong> أو مستخدمة بإذن. لا يُسمح
                بنسخ أو إعادة استخدام المحتوى لأغراض تجارية دون موافقة
                خطية مسبقة.
              </>
            ) : (
              <>
                Unless stated otherwise, all logos, images, copy, and designs on
                the site belong to <strong>{SITE.name}</strong> or are used
                with permission. You may not reproduce or reuse them for
                commercial purposes without prior written consent.
              </>
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            {isAr ? "4. حدود المسؤولية" : "4. Limitation of liability"}
          </h2>
          <p className="mt-2">
            {isAr ? (
              <>
                نسعى لعرض معلومات دقيقة وحديثة، لكن قد تحتوي بعض
                المعلومات على أخطاء أو تحديثات متأخرة. لا يتحمل{" "}
                <strong>{SITE.name}</strong> مسؤولية أي خسائر مباشرة أو
                غير مباشرة ناتجة عن الاعتماد على المعلومات المنشورة على
                الموقع دون تأكيدها معنا بشكل مباشر.
              </>
            ) : (
              <>
                We aim to keep information accurate and up to date, but some
                details may change or contain inadvertent errors.{" "}
                <strong>{SITE.name}</strong> is not liable for direct or
                indirect losses arising from reliance on website content without
                confirming details directly with us.
              </>
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            {isAr ? "5. التعديلات على الشروط" : "5. Changes to the terms"}
          </h2>
          <p className="mt-2">
            {isAr ? (
              <>
                قد نقوم بتحديث هذه الشروط من وقت لآخر، وتصبح النسخة المنشورة
                على هذه الصفحة هي النسخة المعتمدة. استمرارك في استخدام الموقع
                بعد نشر أي تعديل يعني موافقتك الضمنية على الشروط المحدّثة.
              </>
            ) : (
              <>
                We may update these terms from time to time. The version
                published on this page is the one currently in force. Continued
                use of the website after changes are posted will be treated as
                acceptance of the updated terms.
              </>
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            {isAr ? "6. التواصل" : "6. Contact"}
          </h2>
          <p className="mt-2">
            {isAr ? (
              <>
                لأي استفسار بخصوص هذه الشروط أو خدماتنا، يمكنك التواصل معنا
                عبر البريد:
                {" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline underline-offset-2"
                >
                  {SITE.email}
                </a>
                .
              </>
            ) : (
              <>
                For any questions regarding these terms or our services, contact
                us at{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline underline-offset-2"
                >
                  {SITE.email}
                </a>
                .
              </>
            )}
          </p>
        </section>
      </main>
    </div>
  );
}
