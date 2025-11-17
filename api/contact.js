import nodemailer from "nodemailer";

// Tiny in-memory rate limiter per IP, per lambda instance.
const BUCKET = new Map();
const WINDOW_MS = 60_000;
const LIMIT = 8;

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

function rateLimit(req) {
  try {
    const ip = getClientIp(req);
    const now = Date.now();
    const entry = BUCKET.get(ip) || { hits: 0, reset: now + WINDOW_MS };

    if (now > entry.reset) {
      entry.hits = 0;
      entry.reset = now + WINDOW_MS;
    }

    entry.hits += 1;
    BUCKET.set(ip, entry);

    return entry.hits <= LIMIT;
  } catch {
    // Fail-open for rate limit, don't DOS legit users because of a bug.
    return true;
  }
}

function validate(body) {
  const errors = [];
  const name = (body?.name ?? "").toString().trim();
  const email = (body?.email ?? "").toString().trim();
  const vehicle = (body?.vehicle ?? "").toString().trim();
  const message = (body?.message ?? "").toString().trim();
  const hp = (body?.hp ?? "").toString().trim(); // honeypot

  if (!name || name.length < 2) errors.push("name");
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("email");
  if (!message || message.length < 5) errors.push("message");
  if (hp) errors.push("spam");

  return { valid: errors.length === 0, errors, name, email, vehicle, message };
}

async function parseBody(req) {
  if (req.body) return req.body;

  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      // crude protection against nonsense payloads
      if (data.length > 64 * 1024) {
        reject(new Error("Body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(data || "{}"));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  if (!rateLimit(req)) {
    return res.status(429).json({ ok: false, error: "Too Many Requests" });
  }

  try {
    const body = await parseBody(req);
    const { valid, errors, name, email, vehicle, message } = validate(body);

    if (!valid) {
      return res
        .status(400)
        .json({ ok: false, error: "Invalid fields", fields: errors });
    }

    const TO = process.env.TO_EMAIL || "elitemotors.om@gmail.com";
    const FROM =
      process.env.FROM_EMAIL ||
      process.env.SMTP_USER ||
      "no-reply@elitemotors.om";
    const SITE = process.env.SITE_NAME || "Elite Motors";

    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    if (!smtpUser || !smtpPass) {
      console.error("contact handler: SMTP credentials missing");
      return res
        .status(500)
        .json({ ok: false, error: "Email service not configured" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = `New inquiry · ${name}${vehicle ? ` · ${vehicle}` : ""}`;

    // Owner email
    await transporter.sendMail({
      from: `"${SITE} Contact" <${FROM}>`,
      to: TO,
      subject,
      replyTo: email,
      text: [
        `From: ${name} <${email}>`,
        vehicle ? `Vehicle: ${vehicle}` : "Vehicle: —",
        "",
        message,
        "",
        `— Sent from ${SITE} contact form`,
      ].join("\n"),
    });

    // Auto-reply
    await transporter.sendMail({
      from: `"${SITE}" <${FROM}>`,
      to: email,
      subject: `We received your message — ${SITE}`,
      text: `Hi ${name},

Thanks for reaching out to ${SITE}. We’ve received your message and will reply soon.

Summary:
- Name: ${name}
- Email: ${email}
- Vehicle: ${vehicle || "—"}

Your message:
${message}

Best regards,
${SITE}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact handler error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}

export const config = { api: { bodyParser: false } };
