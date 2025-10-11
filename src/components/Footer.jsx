import React from "react";
import { useI18n } from "../i18n/I18nProvider";
import { Instagram, Facebook, Youtube, Linkedin, Phone } from "lucide-react";

export default function Footer() {
  const { t, lang } = useI18n();

  const socials = [
    { href: "https://instagram.com/elitemotors", label: "Instagram", Icon: Instagram },
    { href: "https://facebook.com/elitemotors",  label: "Facebook",  Icon: Facebook  },
    { href: "https://youtube.com/@elitemotors",  label: "YouTube",   Icon: Youtube   },
    { href: "https://linkedin.com/company/elitemotors", label: "LinkedIn", Icon: Linkedin },
    // example: phone/WhatsApp link
    { href: "tel:+96800000000", label: "Call", Icon: Phone },
  ];

  return (
    <footer className="py-10 text-sm text-white/60">
      <div className="mx-auto max-w-7xl px-4 flex flex-col gap-6">
        {/* top row: links + socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-start w-full">
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-white">{t("footer.terms")}</a>
            <a href="#contact" className="hover:text-white">{t("footer.contact")}</a>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white transition"
                title={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* bottom row: copyright */}
        <div className="flex items-center justify-center md:justify-between gap-4">
          <div className="text-center md:text-start">
            © {new Date().getFullYear()} Elite Motors. {lang === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </div>
          <div className="hidden md:block text-white/40">
            {/* Optional: tiny build note or location */}
            Muscat • GCC
          </div>
        </div>
      </div>
    </footer>
  );
}
