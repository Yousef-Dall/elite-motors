import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { SITE } from "../../config/site";

export function SEOProvider({ children }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}

export function SEO({
  title,
  description,
  url,
  image,
  type = "website",
  noIndex = false,
}) {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.name;
  const desc =
    description ||
    SITE.description ||
    "Factory-grade maintenance, performance tuning, and concierge care for supercars and hypercars in Muscat.";
  const canonical = url || SITE.domain;
  const ogImage = image || SITE.ogImage;
  const ogFull = ogImage.startsWith("http")
    ? ogImage
    : `${SITE.domain}${ogImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: SITE.name,
    url: SITE.domain,
    image: ogFull,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Muscat",
      addressCountry: "OM",
    },
    telephone: SITE.phone?.e164 || "",
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.coords.lat,
      longitude: SITE.coords.lng,
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      {noIndex && (
        <meta name="robots" content="noindex, nofollow" />
      )}

      {/* Open Graph / Twitter */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogFull} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogFull} />

      <meta name="theme-color" content="#0f172a" />

      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
