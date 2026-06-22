import type { CollectionConfig } from 'payload'

import { blocks } from '../blocks'

/**
 * Editable pages built from modules. slug "home" = "/", otherwise "/<slug>"
 * (and "/<locale>/<slug>" for non-default languages). The slug/title are shared
 * across languages; the module content is localized.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Inhalt',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel (intern)',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: '"home" = Startseite (/). Sonst /slug, z. B. "datenschutz" -> /datenschutz',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Module',
      labels: { singular: 'Modul', plural: 'Module' },
      blocks,
    },
  ],
}
