import type { Block } from 'payload'

import { anchorField } from './fields'

/**
 * Editable text module. The text fields are `localized` - Payload shows the
 * content-language switcher at the top of the document; empty translations fall
 * back to German automatically.
 */
export const TextBlock: Block = {
  slug: 'text',
  labels: { singular: 'Textblock', plural: 'Textblöcke' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (optional)', localized: true },
    { name: 'heading', type: 'text', label: 'Überschrift (optional)', localized: true },
    { name: 'content', type: 'richText', label: 'Inhalt', required: true, localized: true },
    {
      name: 'align',
      type: 'select',
      label: 'Ausrichtung',
      defaultValue: 'left',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Zentriert', value: 'center' },
      ],
    },
    anchorField,
  ],
}
