import type { Block } from 'payload'

const ICON_OPTIONS = [
  { label: 'Schild (Versicherung)', value: 'shield' },
  { label: 'Übersetzen', value: 'translate' },
  { label: 'Standort', value: 'pin' },
  { label: 'Uhr', value: 'clock' },
  { label: 'Sprechblase', value: 'chat' },
  { label: 'Dokument', value: 'file' },
]

/** "Leistungen" module: heading + intro + service tiles. */
export const ServicesBlock: Block = {
  slug: 'services',
  labels: { singular: 'Leistungen', plural: 'Leistungen-Blöcke' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      required: true,
      localized: true,
      defaultValue: 'Womit ich Ihnen helfe',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitung',
      localized: true,
      defaultValue:
        'Zwei Bereiche, eine Ansprechpartnerin. Ob Versicherung oder Übersetzung, ich kümmere mich persönlich darum.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Leistungen',
      localized: true,
      labels: { singular: 'Leistung', plural: 'Leistungen' },
      admin: { description: 'Wenn leer, werden die Standard-Leistungen angezeigt.' },
      fields: [
        { name: 'icon', type: 'select', label: 'Symbol', defaultValue: 'shield', options: ICON_OPTIONS },
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'desc', type: 'textarea', label: 'Beschreibung' },
        {
          name: 'bullets',
          type: 'array',
          label: 'Punkte',
          labels: { singular: 'Punkt', plural: 'Punkte' },
          fields: [{ name: 'text', type: 'text', label: 'Text', required: true }],
        },
      ],
    },
  ],
}
