import { SITE } from "../config/site";

export const CONTACT = {
  PHONE_DISPLAY: SITE.phone.display,
  PHONE_TEL: SITE.phone.e164, // works with tel:+968...
  WHATSAPP: SITE.phone.whatsapp,
  EMAIL: SITE.email,
  MAPS_QUERY: `${SITE.coords.lat},${SITE.coords.lng}`,
};
