// src/config/site.js
// Central site config. One source of truth for URLs, branding, and contact info.

const DOMAIN = import.meta.env.VITE_SITE_URL || "https://elitemotors.om";

export const SITE = {
  name: import.meta.env.VITE_BUSINESS_NAME || "Elite Motors",
  domain: DOMAIN.replace(/\/+$/, ""),
  email: import.meta.env.VITE_PUBLIC_EMAIL || "elitemotors.om@gmail.com",

  phone: {
    display: "+968 0000 0000",
    e164: import.meta.env.VITE_PHONE_E164 || "+96800000000",
    whatsapp: import.meta.env.VITE_WHATSAPP || "96800000000",
  },

  coords: {
    lat: Number(import.meta.env.VITE_MAP_LAT || 23.478528),
    lng: Number(import.meta.env.VITE_MAP_LNG || 58.260806),
  },

  addressShort: "Muscat, Oman",

  booking: {
    calendly: "https://calendly.com/your-calendly/elite-motors",
  },

  ogImage: "/og.jpg",

  description:
    "Factory-grade maintenance, performance tuning, and concierge care for supercars and hypercars in Muscat, Oman.",
};
