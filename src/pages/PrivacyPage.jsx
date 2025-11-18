import React from "react";
import { SEO } from "../components/seo/SEO.jsx";
import { SITE } from "../config/site";
import { useI18n } from "../providers/I18nProvider.jsx";

export default function PrivacyPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const title = isAr ? "سياسة الخصوصية" : "Privacy Policy";
  const description = isAr
    ? "تعرف على كيفية تعامل إيليت موتورز مع بياناتك عند زيارة الموقع أو حجز موعد أو استخدام نموذج التواصل."
    : "Learn how Elite Motors handles your data when you visit the site, book a visit, or use the contact form.";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="mx-auto max-w-3xl px-4 py-16 md:py-24 text-start"
    >
      <SEO
        title={title}
        description={description}
        url={`${SITE.domain}/privacy`}
      />

      <header className={isAr ? "text-right" : "text-left"}>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-neutral-700 dark:text-white/70">
          {isAr
            ? "تنطبق هذه السياسة على موقعنا الإلكتروني وأي تواصل يتم عبر النماذج أو البريد الإلكتروني أو الحجز عبر الإنترنت."
            : "This policy applies to our website and any communication made through forms, email, or online booking."}
        </p>
      </header>

      <main
        className={`mt-8 space-y-8 ${
          isAr ? "text-right" : "text-left"
        } text-neutral-800 dark:text-white/80`}
      >
        <section>
          <h2 className="text-xl font-semibold">
            {isAr ? "1. من نحن" : "1. Who we are"}
          </h2>
          <p className="mt-2">
            {isAr ? (
              <>
                يشير{" "}
                <strong>{SITE.name}</strong> في هذه السياسة إلى ورشة
                السيارات في مسقط، عمان، المالكة للموقع{" "}
                <span className="break-all">
                  {SITE.domain}
                </span>
                . يمكنك التواصل معنا عبر البريد:
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
                <strong>{SITE.name}</strong> operates the workshop in Muscat,
                Oman and the website{" "}
                <span className="break-all">
                  {SITE.domain}
                </span>
                . You can contact us at{" "}
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

        <section>
          <h2 className="text-xl font-semibold">
            {isAr
              ? "2. البيانات التي نجمعها"
              : "2. Information we collect"}
          </h2>
          <ul className="mt-2 list-disc ps-5 space-y-2">
            <li>
              {isAr
                ? "بيانات التواصل: الاسم، البريد الإلكتروني، رقم الهاتف، ووسيلة التواصل المفضلة."
                : "Contact details: your name, email address, phone number, and preferred contact channel."}
            </li>
            <li>
              {isAr
                ? "معلومات عن السيارة: الموديل، نوع الاستخدام، وأي تفاصيل تختار مشاركتها في الرسالة."
                : "Vehicle information: model, usage, and any details you choose to include in your message."}
            </li>
            <li>
              {isAr
                ? "بيانات تقنية أساسية: مثل عنوان IP ونوع المتصفح، تُجمع لأغراض أمنية وإحصائية عامة."
                : "Basic technical data: such as IP address and browser type, collected for security and general analytics."}
            </li>
            <li>
              {isAr
                ? "معلومات الحجز: المواعيد التي تختارها عبر نظام الحجز الخارجي المستخدم على الموقع."
                : "Booking information: appointment slots and details you submit through the external booking tool integrated on the site."}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            {isAr
              ? "3. كيف نستخدم بياناتك"
              : "3. How we use your information"}
          </h2>
          <ul className="mt-2 list-disc ps-5 space-y-2">
            <li>
              {isAr
                ? "للرد على استفساراتك وتنسيق المواعيد والخدمات المطلوبة."
                : "To respond to your inquiries and coordinate bookings and services."}
            </li>
            <li>
              {isAr
                ? "لتجهيز عروض الأسعار والخدمات المناسبة لسيارتك."
                : "To prepare quotations and recommend suitable services for your vehicle."}
            </li>
            <li>
              {isAr
                ? "لتحسين موقعنا وخدماتنا بناءً على أنماط الاستخدام العامة."
                : "To improve our website and services based on general usage patterns."}
            </li>
            <li>
              {isAr
                ? "للالتزام بالمتطلبات القانونية والمحاسبية إن لزم الأمر."
                : "To comply with legal and accounting obligations where applicable."}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            {isAr
              ? "4. ملفات تعريف الارتباط والتحليلات"
              : "4. Cookies & analytics"}
          </h2>
          <p className="mt-2">
            {isAr ? (
              <>
                قد نستخدم ملفات تعريف الارتباط (cookies) أو أدوات تحليلات
                بسيطة لقياس حركة الزيارات على الموقع وتحسين التجربة. لا
                نستغل هذه البيانات لبيعها لطرف ثالث، ويمكنك دائماً ضبط
                إعدادات المتصفح لرفض أو حذف ملفات تعريف الارتباط.
              </>
            ) : (
              <>
                We may use cookies or lightweight analytics tools to understand
                traffic and improve the experience. We do not sell this
                information to third parties. You can configure your browser to
                block or delete cookies if you prefer.
              </>
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            {isAr
              ? "5. الاحتفاظ بالبيانات والأمان"
              : "5. Data retention & security"}
          </h2>
          <p className="mt-2">
            {isAr ? (
              <>
                نحتفظ بالبيانات التي ترسلها لنا فقط للمدة اللازمة للغرض
                الذي جُمعت من أجله، مثل المتابعة على طلبك أو حفظ سجل الخدمة.
                نستخدم إجراءات معقولة لحماية البيانات من الوصول أو الاستخدام
                غير المصرح به، مع العلم أن أي نقل عبر الإنترنت لا يمكن أن
                يكون آمناً بنسبة 100٪.
              </>
            ) : (
              <>
                We keep the information you submit only for as long as needed to
                follow up on your request or maintain service records. We apply
                reasonable measures to protect data from unauthorised access or
                misuse, but no method of transmission over the internet is
                completely risk-free.
              </>
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            {isAr ? "6. حقوقك" : "6. Your rights"}
          </h2>
          <p className="mt-2">
            {isAr ? (
              <>
                يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها
                عندما يكون ذلك مناسباً. فقط راسلنا على{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline underline-offset-2"
                >
                  {SITE.email}
                </a>{" "}
                مع توضيح طلبك، وسنحاول التعامل معه في أقرب وقت ممكن.
              </>
            ) : (
              <>
                You may request access to, correction of, or deletion of your
                personal information where appropriate. Contact us at{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline underline-offset-2"
                >
                  {SITE.email}
                </a>{" "}
                with your request and we will aim to respond promptly.
              </>
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            {isAr
              ? "7. التعديلات على هذه السياسة"
              : "7. Changes to this policy"}
          </h2>
          <p className="mt-2">
            {isAr ? (
              <>
                قد نقوم بتحديث سياسة الخصوصية من وقت لآخر لتواكب التغييرات
                في الخدمات أو المتطلبات القانونية. سيتم نشر أي تعديل على هذه
                الصفحة مع تحديث تاريخ المراجعة عند اللزوم.
              </>
            ) : (
              <>
                We may update this policy from time to time to reflect changes
                in our services or legal requirements. Any updates will be
                posted on this page with an updated review date where relevant.
              </>
            )}
          </p>
        </section>
      </main>
    </div>
  );
}
