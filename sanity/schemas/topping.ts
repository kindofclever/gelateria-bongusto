import { defineType, defineField } from "sanity";

export default defineType({
  name: "topping",
  title: "Topping",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "price",
      title: "Preis (CHF)",
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
      media: "image",
      price: "price",
    },
    prepare({ title, media, price }) {
      return {
        title: title || "Unbenannt",
        subtitle: price ? `CHF ${price.toFixed(2)}` : "",
        media,
      };
    },
  },
});
