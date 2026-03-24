import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Seiteneinstellungen",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Titel",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Untertitel",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutTeaser",
      title: "Über uns Teaser",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "einweggebindePrice",
      title: "Einweggebinde Preis (CHF)",
      type: "number",
      description: "Preis für das Einweggebinde, das immer dazugehört",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Seiteneinstellungen" };
    },
  },
});
