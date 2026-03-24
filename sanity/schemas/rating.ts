import { defineType, defineField } from "sanity";

export default defineType({
  name: "rating",
  title: "Bewertung",
  type: "document",
  fields: [
    defineField({
      name: "flavor",
      title: "Sorte",
      type: "reference",
      to: [{ type: "flavor" }],
    }),
    defineField({
      name: "score",
      title: "Bewertung",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).integer(),
      description: "1-5 Sterne",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name des Bewertenden (optional)",
    }),
    defineField({
      name: "comment",
      title: "Kommentar",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "createdAt",
      title: "Erstellt am",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "approved",
      title: "Freigegeben",
      type: "boolean",
      initialValue: false,
      description: "Bewertung muss freigegeben werden bevor sie sichtbar ist",
    }),
  ],
  preview: {
    select: {
      flavorName: "flavor.name.0.value",
      score: "score",
      reviewer: "name",
      approved: "approved",
    },
    prepare({ flavorName, score, reviewer, approved }) {
      const stars = score ? "★".repeat(score) + "☆".repeat(5 - score) : "";
      return {
        title: `${flavorName || "?"} — ${stars}`,
        subtitle: `${reviewer || "Anonym"} ${approved ? "✓" : "(ausstehend)"}`,
      };
    },
  },
});
