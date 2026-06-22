import type { Block } from 'payload'

const ICON_OPTIONS = [
  { label: 'Schild (Versicherung)', value: 'shield' },
  { label: 'Übersetzen', value: 'translate' },
  { label: 'Standort', value: 'pin' },
  { label: 'Uhr', value: 'clock' },
  { label: 'Sprechblase', value: 'chat' },
  { label: 'Dokument', value: 'file' },
]

/** "Über mich" module: heading + bio (richText) + optional image + stat tiles. */
export const AboutBlock: Block = {
  slug: 'about',
  labels: { singular: 'Über mich', plural: 'Über-mich-Blöcke' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      required: true,
      localized: true,
      defaultValue: 'Zwei Berufe, ein Ziel: dass Sie alles verstehen.',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Text',
      localized: true,
      admin: { description: 'Wenn leer, wird der Standardtext angezeigt.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild (optional)',
      admin: { description: 'Wenn leer, wird ein Platzhalterbild verwendet.' },
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Kennzahlen',
      localized: true,
      labels: { singular: 'Kennzahl', plural: 'Kennzahlen' },
      admin: { description: 'Wenn leer, werden die Standard-Kennzahlen angezeigt.' },
      fields: [
        { name: 'icon', type: 'select', label: 'Symbol', defaultValue: 'shield', options: ICON_OPTIONS },
        { name: 'value', type: 'text', label: 'Wert', required: true },
        { name: 'caption', type: 'text', label: 'Beschriftung' },
        { name: 'highlight', type: 'checkbox', label: 'Hervorheben (blaue Kachel)', defaultValue: false },
      ],
    },
  ],
}
