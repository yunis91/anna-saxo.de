import type { GlobalConfig } from 'payload'

/**
 * Editor-controlled contact details, shown in the navbar, hero, contact section
 * and footer, and used as the notification recipient for the contact form.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Kontaktdaten',
  access: { read: () => true },
  admin: { group: 'Einstellungen' },
  fields: [
    {
      name: 'nav',
      type: 'array',
      label: 'Navigationsmenü',
      localized: true,
      labels: { singular: 'Menüpunkt', plural: 'Menüpunkte' },
      admin: {
        description:
          '#anker für Abschnitte (z. B. #leistungen) oder /slug für Unterseiten. Wenn leer, wird das Standardmenü verwendet.',
      },
      fields: [
        { name: 'label', type: 'text', label: 'Beschriftung', required: true },
        { name: 'link', type: 'text', label: 'Link', required: true },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Kontaktdaten',
      fields: [
        { name: 'phone', type: 'text', label: 'Telefon', defaultValue: '+49 151 5384 7012' },
        { name: 'email', type: 'email', label: 'E-Mail', defaultValue: 'hallo@anna-saxo.de' },
        { name: 'city', type: 'text', label: 'Ort', defaultValue: 'Berlin' },
      ],
    },
  ],
}
