import { defineType, defineField } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Galerie Bild",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Gelato", value: "gelato" },
          { title: "Standorte", value: "standorte" },
          { title: "Events", value: "events" },
          { title: "Team", value: "team" },
        ],
      },
    }),
    defineField({
      name: "sortOrder",
      title: "Sortierung",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title.0.value",
      media: "image",
      category: "category",
    },
    prepare({ title, media, category }) {
      return {
        title: title || "Unbenannt",
        subtitle: category,
        media,
      };
    },
  },
});
