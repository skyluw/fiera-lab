import { defineField, defineType } from "sanity";

export const contactoType = defineType({
  name: "contacto",
  title: "Contacto",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "telefono",
      title: "Telefono",
      type: "string",
    }),
  ],
});