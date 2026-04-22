import { defineField, defineType } from "sanity";

export const servicioType = defineType({
  name: "servicio",
  title: "Servicio",
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