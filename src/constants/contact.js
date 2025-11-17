// src/constants/contact.js
import { SITE } from "../config/site";

const coords = `${SITE.coords.lat},${SITE.coords.lng}`;
const encodedCoords = encodeURIComponent(coords);

export const CONTACT = {
  PHONE_DISPLAY: SITE.phone.display,
  PHONE_TEL: SITE.phone.e164, // tel:+968...
  WHATSAPP: SITE.phone.whatsapp,
  EMAIL: SITE.email,

  MAPS_QUERY: coords,
  MAPS_LINK: `https://maps.google.com/?q=${encodedCoords}`,
  MAPS_DIRECTIONS: `https://www.google.com/maps/dir/?api=1&destination=${encodedCoords}`,
};
