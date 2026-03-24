export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "IceCreamShop",
    name: "Bongusto Gelateria",
    description:
      "Handgemachtes italienisches Gelato. Frisch zubereitet mit natürlichen Zutaten in Abtwil und Rorschach.",
    url: "https://gelateria-bongusto.ch",
    telephone: "+41 71 000 00 00",
    email: "info@bongusto.ch",
    servesCuisine: "Italian Gelato",
    priceRange: "$$",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Sanitätspark",
        addressLocality: "Abtwil",
        addressRegion: "SG",
        postalCode: "9030",
        addressCountry: "CH",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Rorschach",
        addressRegion: "SG",
        addressCountry: "CH",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "11:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "12:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/gelateriabongusto/",
      "https://facebook.com",
      "https://tiktok.com",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
