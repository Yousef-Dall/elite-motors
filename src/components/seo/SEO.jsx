import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { SITE } from "../../config/site";

export function SEOProvider({ children }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}

export function SEO({ title, description, url, image, type = "website" }) {
  const t = title ? `${title} — ${SITE.name}` : SITE.name;
  const d =
    description ||
    "Factory-grade maintenance, performance tuning, and concierge care for supercars and hypercars in Muscat.";
  const u = url || SITE.domain;
  const i = image || SITE.ogImage;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: SITE.name,
    url: SITE.domain,
    image: i.startsWith("http") ? i : `${SITE.domain}${i}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Muscat",
      addressCountry: "OM"
    },
    telephone: SITE.phone?.e164 || "",
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.coords.lat,
      longitude: SITE.coords.lng
    }
  };

  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <link rel="canonical" href={u} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:url" content={u} />
      <meta property="og:image" content={i.startsWith("http") ? i : `${SITE.domain}${i}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={i.startsWith("http") ? i : `${SITE.domain}${i}`} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
