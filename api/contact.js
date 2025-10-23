// api/contact.js
import nodemailer from "nodemailer";

/** Basic payload validation */
function validate(body) {
  const errors = [];
  const name = (body?.name ?? "").toString().trim();
  const email = (body?.email ?? "").toString().trim();
  const vehicle = (body?.vehicle ?? "").toString().trim();
  const message = (body?.message ?? "").toString().trim();
  const hp = (body?.hp ?? "").toString().trim();

  if (!name) errors.push("name");
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("email");
  if (!message) errors.push("message");
  if (hp) errors.push("spam"); // honeypot caught

  return { valid: errors.length === 0, errors, name, email, vehicle, message };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const body =
      req.body ||
      (await new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (c) => (data += c));
        req.on("end", () => {
          try {
            resolve(JSON.parse(data || "{}"));
          } catch (e) {
            reject(e);
          }
        });
      }));

    const { valid, errors, name, email, vehicle, message } = validate(body);
    if (!valid)
      return res
        .status(400)
        .json({ ok: false, error: "Invalid fields", fields: errors });

    // ENV
    const TO = process.env.TO_EMAIL || "elitemotors.om@gmail.com";
    const FROM = process.env.FROM_EMAIL || process.env.GMAIL_USER; // what Gmail will send as
    const SITE = process.env.SITE_NAME || "Elite Motors";

    // Gmail SMTP via app password (2FA required on the account)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER, // your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // 16-char app password
      },
    });

    const subject = `New inquiry · ${name}${vehicle ? ` · ${vehicle}` : ""}`;

    // Owner email
    await transporter.sendMail({
      from: FROM,
      to: TO,
      subject,
      replyTo: email,
      text: [
        `From: ${name} <${email}>`,
        vehicle ? `Vehicle: ${vehicle}` : `Vehicle: —`,
        "",
        message,
        "",
        `— Sent from ${SITE} contact form`,
      ].join("\n"),
    });

    // Optional: polite auto-reply to the sender
    if (email) {
      await transporter.sendMail({
        from: FROM,
        to: email,
        subject: `We received your message — ${SITE}`,
        text: `Hi ${name},

Thanks for reaching out to ${SITE}. We’ve received your message and will reply within 24 hours.

Summary:
- Name: ${name}
- Email: ${email}
- Vehicle: ${vehicle || "—"}

Your message:
${message}

Best,
${SITE}
`,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact handler error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}

export const config = {
  api: {
    bodyParser: false, // we parse manually to keep it universal-compatible
  },
};
