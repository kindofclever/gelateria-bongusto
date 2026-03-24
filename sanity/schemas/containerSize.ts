import { defineType, defineField } from "sanity";

export default defineType({
  name: "containerSize",
  title: "Behältergrösse",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "volume",
      title: "Volumen",
      type: "string",
      description: "z.B. 0.5L, 0.75L, 1L",
    }),
    defineField({
      name: "price",
      title: "Preis (CHF)",
      type: "number",
    }),
    defineField({
      name: "maxFlavors",
      title: "Max. Sorten",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sortOrder",
      title: "Sortierung",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "name.0.value",
      volume: "volume",
      price: "price",
    },
    prepare({ title, volume, price }) {
      return {
        title: title || volume || "Unbenannt",
        subtitle: `${volume || ""} — CHF ${price?.toFixed(2) || "0.00"}`,
      };
    },
  },
});
