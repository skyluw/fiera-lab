import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Titulo",
      type: "string",
    }),
    defineField({
      name: "descripcion",
      title: "Descripcion",
      type: "text",
    }),
  ],
});