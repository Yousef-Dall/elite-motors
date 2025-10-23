import React, { useMemo, useState } from "react";
import { Phone, Mail, MapPin, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

const TO = "elitemotors.om@gmail.com";
const ENDPOINT = "/api/contact";

export default function Contact() {
  const { t } = useI18n();

  const [form, setForm] = useState({ name: "", email: "", vehicle: "", message: "", hp: "" });
  const [status, setStatus] = useState({ state: "idle", note: "" }); // idle | sending | ok | err

  const disabled = useMemo(() => {
    // simple validation
    const hasBasics = form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.message.trim();
    const notSpam = !form.hp; // honeypot must be empty
    return !hasBasics || !notSpam || status.state === "sending";
  }, [form, status.state]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (disabled) return;
    setStatus({ state: "sending", note: "" });

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      vehicle: form.vehicle.trim(),
      message: form.message.trim(),
      to: TO,
      site: "Elite Motors",
      ts: new Date().toISOString(),
    };

    try {
      if (ENDPOINT) {
        // Send to your backend if configured
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus({ state: "ok", note: t("contact.ok") || "Thanks — we’ll get back to you within 24 hours." });
        setForm({ name: "", email: "", vehicle: "", message: "", hp: "" });
      } else {
        // Fallback: open the user's mail client
        const subject = encodeURIComponent(`New inquiry from ${payload.name} (${payload.vehicle || "Vehicle N/A"})`);
        const body = encodeURIComponent(
          [
            `Name: ${payload.name}`,
            `Email: ${payload.email}`,
            `Vehicle: ${payload.vehicle || "—"}`,
            ``,
            payload.message,
            ``,
            `— Sent from elitemotors.gcc contact form`,
          ].join("\n")
        );
        window.location.href = `mailto:${TO}?subject=${subject}&body=${body}`;
        setStatus({ state: "ok", note: t("contact.ok") || "Thanks — your email client is opening now." });
      }
    } catch (err) {
      setStatus({
        state: "err",
        note: t("contact.err") || "Something went wrong. Please try again or email us directly.",
      });
    }
  }

  return (
    <section id="contact" className="scroll-offset py-20 md:py-28 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-neutral-950/80">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10">
        {/* Left: copy */}
        <div className="space-y-6 text-start">
          <h2 className="text-3xl md:text-4xl font-bold">{t("contact.title") || "Get in Touch"}</h2>
          <p className="text-neutral-700 dark:text-white/70">
            {t("contact.intro") || "Tell us about your vehicle and what you need. We'll respond within 24 hours."}
          </p>
          <div className="space-y-3 text-neutral-700 dark:text-white/80">
            <div className="flex items-center gap-3"><Phone className="h-5 w-5" /><span>+968 0000 0000</span></div>
            <div className="flex items-center gap-3"><Mail className="h-5 w-5" /><a href={`mailto:${TO}`} className="underline underline-offset-2">{TO}</a></div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5" /><span>Muscat, Oman</span></div>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} className="p-6 rounded-3xl border backdrop-blur-md space-y-4 text-start
                     bg-white/80 border-black/10 dark:bg-white/5 dark:border-white/10">
          {/* Honeypot (hidden field for bots) */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.hp}
            onChange={(e) => setForm((f) => ({ ...f, hp: e.target.value }))}
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-neutral-600 dark:text-white/70">{t("contact.name") || "Name"}</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 w-full px-3 py-2 rounded-xl border outline-none
                           bg-white text-neutral-900 placeholder-neutral-500
                           dark:bg-neutral-900 dark:text-white dark:placeholder-white/50
                           border-black/10 dark:border-white/10 focus:border-cyan-400"
                placeholder={t("contact.placeholderName") || "Your name"}
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600 dark:text-white/70">{t("contact.email") || "Email"}</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="mt-1 w-full px-3 py-2 rounded-xl border outline-none
                           bg-white text-neutral-900 placeholder-neutral-500
                           dark:bg-neutral-900 dark:text-white dark:placeholder-white/50
                           border-black/10 dark:border-white/10 focus:border-cyan-400"
                placeholder={t("contact.placeholderEmail") || "you@example.com"}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-600 dark:text-white/70">{t("contact.vehicle") || "Vehicle"}</label>
            <input
              value={form.vehicle}
              onChange={(e) => setForm((f) => ({ ...f, vehicle: e.target.value }))}
              className="mt-1 w-full px-3 py-2 rounded-xl border outline-none
                         bg-white text-neutral-900 placeholder-neutral-500
                         dark:bg-neutral-900 dark:text-white dark:placeholder-white/50
                         border-black/10 dark:border-white/10 focus:border-cyan-400"
              placeholder={t("contact.placeholderVehicle") || "e.g., Ferrari 296 GTB"}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-600 dark:text-white/70">{t("contact.help") || "How can we help?"}</label>
            <textarea
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="mt-1 w-full px-3 py-2 rounded-xl border outline-none
                         bg-white text-neutral-900 placeholder-neutral-500
                         dark:bg-neutral-900 dark:text-white dark:placeholder-white/50
                         border-black/10 dark:border-white/10 focus:border-cyan-400"
              placeholder={t("contact.placeholderHelp") || "Maintenance, tuning, detailing…"}
            />
          </div>

          <button
            disabled={disabled}
            className={[
              "w-full py-3 rounded-2xl font-semibold text-white",
              "bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:opacity-95",
              disabled ? "opacity-60 cursor-not-allowed" : "",
            ].join(" ")}
          >
            {status.state === "sending" ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> {t("contact.sending") || "Sending…"}
              </span>
            ) : (
              t("contact.send") || "Send Request"
            )}
          </button>

          {/* status note */}
          {status.state === "ok" && (
            <div className="mt-2 inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" /> {status.note}
            </div>
          )}
          {status.state === "err" && (
            <div className="mt-2 inline-flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="h-5 w-5" /> {status.note} <a href={`mailto:${TO}`} className="underline">Email us</a>.
            </div>
          )}

          {/* tiny hint if backend is wired */}
          {ENDPOINT ? (
            <div className="text-xs text-neutral-500 dark:text-white/40">
              Securely sent via server endpoint.
            </div>
          ) : (
            <div className="text-xs text-neutral-500 dark:text-white/40">
              Tip: set <code>VITE_CONTACT_ENDPOINT</code> for direct delivery without opening an email app.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
