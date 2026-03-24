import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { schemaTypes } from "./sanity/schemas";
import { projectId, dataset } from "./sanity/env";

export default defineConfig({
  name: "bongusto",
  title: "Bongusto Gelateria",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    internationalizedArray({
      languages: [
        { id: "de", title: "Deutsch" },
        { id: "it", title: "Italiano" },
        { id: "en", title: "English" },
        { id: "fr", title: "Français" },
      ],
      fieldTypes: ["string", "text"],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
