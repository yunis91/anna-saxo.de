import type { Block } from 'payload'

/** Hero module. Text fields localized; image optional (Picsum fallback). */
export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero-Blöcke' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Eyebrow', localized: true, defaultValue: 'Hallo, ich bin Anna' },
    {
      name: 'headingLine1',
      type: 'text',
      label: 'Überschrift Zeile 1',
      required: true,
      localized: true,
      defaultValue: 'Verständlich versichert.',
    },
    {
      name: 'headingLine2',
      type: 'text',
      label: 'Überschrift Zeile 2',
      localized: true,
      defaultValue: 'Korrekt übersetzt.',
    },
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Untertext',
      localized: true,
      defaultValue:
        'Versicherungsagentin und Übersetzerin Deutsch-Russisch. Ich begleite Sie verständlich durch Verträge, Ämter und Formulare.',
    },
    {
      type: 'group',
      name: 'primaryCta',
      label: 'Button 1 (gefüllt)',
      fields: [
        { name: 'label', type: 'text', label: 'Beschriftung', localized: true, defaultValue: 'Kontakt aufnehmen' },
        { name: 'link', type: 'text', label: 'Link', defaultValue: '#contact' },
      ],
    },
    {
      type: 'group',
      name: 'secondaryCta',
      label: 'Button 2 (Umriss)',
      fields: [
        { name: 'label', type: 'text', label: 'Beschriftung', localized: true, defaultValue: 'Leistungen ansehen' },
        { name: 'link', type: 'text', label: 'Link', defaultValue: '#services' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Porträt (optional)',
      admin: { description: 'Wenn leer, wird ein Platzhalterbild verwendet.' },
    },
  ],
}
