import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

export default function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-white/10 bg-neutral-950/80">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10">
        <div className="space-y-6 text-start">
          <h2 className="text-3xl md:text-4xl font-bold">{t("contact.title")}</h2>
          <p className="text-white/70">{t("contact.intro")}</p>

          <div className="space-y-3 text-white/80">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              <span>+968 0000 0000</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <span>contact@elitemotors.gcc</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <span>Muscat, Oman</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur space-y-4 text-start"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/70">{t("contact.name")}</label>
              <input
                className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 outline-none focus:border-cyan-400"
                placeholder={t("contact.placeholderName")}
              />
            </div>
            <div>
              <label className="text-sm text-white/70">{t("contact.email")}</label>
              <input
                type="email"
                className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 outline-none focus:border-cyan-400"
                placeholder={t("contact.placeholderEmail")}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-white/70">{t("contact.vehicle")}</label>
            <input
              className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 outline-none focus:border-cyan-400"
              placeholder={t("contact.placeholderVehicle")}
            />
          </div>

          <div>
            <label className="text-sm text-white/70">{t("contact.help")}</label>
            <textarea
              rows={4}
              className="mt-1 w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 outline-none focus:border-cyan-400"
              placeholder={t("contact.placeholderHelp")}
            />
          </div>

          <button className="w-full py-3 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:opacity-95">
            {t("contact.send")}
          </button>
        </form>
      </div>
    </section>
  );
}
