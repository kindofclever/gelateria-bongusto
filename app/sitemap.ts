import type { MetadataRoute } from "next";

const baseUrl = "https://bongusto.ch";
const locales = ["de", "it", "en", "fr"];

const pages = [
  "",
  "/sorten",
  "/gelato-esagerato",
  "/standorte",
  "/ueber-uns",
  "/kontakt",
  "/catering",
  "/impressum",
  "/datenschutz",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : page === "/gelato-esagerato" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
