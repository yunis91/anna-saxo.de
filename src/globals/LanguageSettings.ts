import type { GlobalConfig } from 'payload'

import { LOCALES, DEFAULT_LOCALE } from '../lib/locales'

/**
 * Editor-controlled list of which pool languages are active on the website.
 * German is always active and is the default + fallback, regardless of this
 * setting. The order chosen here is the order of the header language switch.
 */
export const LanguageSettings: GlobalConfig = {
  slug: 'languages',
  label: 'Sprachen',
  access: { read: () => true },
  admin: {
    group: 'Einstellungen',
  },
  fields: [
    {
      name: 'active',
      type: 'select',
      hasMany: true,
      label: 'Aktive Sprachen auf der Website',
      defaultValue: [DEFAULT_LOCALE, 'ru'],
      options: LOCALES.map((l) => ({ label: l.label, value: l.code })),
      admin: {
        description:
          'Welche Sprachen auf der Website sichtbar sind (Reihenfolge = Reihenfolge im Sprachumschalter). Deutsch ist immer aktiv und Standard.',
      },
    },
  ],
}
