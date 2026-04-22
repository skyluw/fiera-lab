import { type SchemaTypeDefinition } from 'sanity'

import { heroType } from '../schemas/heroType'
import { servicioType } from '../schemas/servicioType'
import { contactoType } from '../schemas/contactoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType, servicioType, contactoType],
}