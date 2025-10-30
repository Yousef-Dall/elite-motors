<<<<<<< HEAD
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().email().max(200),
  vehicle: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10).max(5000),
  hp: z.string().optional(), // honeypot
});

function bad(res, fields) {
  return res.status(400).json({ ok: false, error: "Invalid fields", fields });
=======
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
>>>>>>> 2e809e278af7df7a7284c2c847d0d0c2b2c9870c
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

<<<<<<< HEAD
    const parse = schema.safeParse(body);
    if (!parse.success) {
      const fields = [...new Set(parse.error.issues.map((i) => i.path[0]))];
      return bad(res, fields);
    }

    const { name, email, vehicle = "", message, hp = "" } = parse.data;
    if (hp) return bad(res, ["spam"]);

    const TO = process.env.TO_EMAIL || "elitemotors.om@gmail.com";
    const FROM =
      process.env.FROM_EMAIL ||
      process.env.GMAIL_USER ||
      "no-reply@example.com";
    const SITE = process.env.SITE_NAME || "Elite Motors";

=======
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
>>>>>>> 2e809e278af7df7a7284c2c847d0d0c2b2c9870c
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
<<<<<<< HEAD
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
=======
        user: process.env.GMAIL_USER, // your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // 16-char app password
>>>>>>> 2e809e278af7df7a7284c2c847d0d0c2b2c9870c
      },
    });

    const subject = `New inquiry · ${name}${vehicle ? ` · ${vehicle}` : ""}`;

<<<<<<< HEAD
=======
    // Owner email
>>>>>>> 2e809e278af7df7a7284c2c847d0d0c2b2c9870c
    await transporter.sendMail({
      from: FROM,
      to: TO,
      subject,
      replyTo: email,
      text: [
        `From: ${name} <${email}>`,
<<<<<<< HEAD
        `Vehicle: ${vehicle || "—"}`,
=======
        vehicle ? `Vehicle: ${vehicle}` : `Vehicle: —`,
>>>>>>> 2e809e278af7df7a7284c2c847d0d0c2b2c9870c
        "",
        message,
        "",
        `— Sent from ${SITE} contact form`,
      ].join("\n"),
    });

<<<<<<< HEAD
=======
    // Optional: polite auto-reply to the sender
>>>>>>> 2e809e278af7df7a7284c2c847d0d0c2b2c9870c
    if (email) {
      await transporter.sendMail({
        from: FROM,
        to: email,
        subject: `We received your message — ${SITE}`,
        text: `Hi ${name},

<<<<<<< HEAD
Thanks for reaching out to ${SITE}. We’ve received your message and will reply shortly.
=======
Thanks for reaching out to ${SITE}. We’ve received your message and will reply within 24 hours.
>>>>>>> 2e809e278af7df7a7284c2c847d0d0c2b2c9870c

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

<<<<<<< HEAD
export const config = { api: { bodyParser: false } };
=======
export const config = {
  api: {
    bodyParser: false, // we parse manually to keep it universal-compatible
  },
};
>>>>>>> 2e809e278af7df7a7284c2c847d0d0c2b2c9870c
