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

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const subject = `New inquiry · ${name}${vehicle ? ` · ${vehicle}` : ""}`;

    await transporter.sendMail({
      from: FROM,
      to: TO,
      subject,
      replyTo: email,
      text: [
        `From: ${name} <${email}>`,
        `Vehicle: ${vehicle || "—"}`,
        "",
        message,
        "",
        `— Sent from ${SITE} contact form`,
      ].join("\n"),
    });

    if (email) {
      await transporter.sendMail({
        from: FROM,
        to: email,
        subject: `We received your message — ${SITE}`,
        text: `Hi ${name},

Thanks for reaching out to ${SITE}. We’ve received your message and will reply shortly.

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

export const config = { api: { bodyParser: false } };
