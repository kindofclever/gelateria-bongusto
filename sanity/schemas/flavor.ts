import { defineType, defineField } from "sanity";

export default defineType({
  name: "flavor",
  title: "Sorte",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.0.value" },
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "internationalizedArrayText",
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
          { title: "Klassisch", value: "klassisch" },
          { title: "Frucht", value: "frucht" },
          { title: "Spezial", value: "spezial" },
          { title: "Vegan", value: "vegan" },
          { title: "Saisonal", value: "saisonal" },
        ],
      },
    }),
    defineField({
      name: "allergens",
      title: "Allergene",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Milch", value: "milch" },
          { title: "Nüsse", value: "nuesse" },
          { title: "Eier", value: "eier" },
          { title: "Soja", value: "soja" },
          { title: "Gluten", value: "gluten" },
          { title: "Erdnüsse", value: "erdnuesse" },
        ],
      },
    }),
    defineField({
      name: "isVegan",
      title: "Vegan",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isLactoseFree",
      title: "Laktosefrei",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
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
