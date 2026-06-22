import type { Field } from 'payload'

/** Optional custom anchor id for jump links (e.g. "leistungen" -> #leistungen). */
export const anchorField: Field = {
  name: 'anchorId',
  type: 'text',
  label: 'Anker-ID (optional)',
  admin: {
    description:
      'Optionale HTML-ID dieses Abschnitts für Sprung-Links (z. B. "kontakt" -> #kontakt). Nur Kleinbuchstaben, Zahlen, Bindestriche. Nicht übersetzt.',
  },
}
