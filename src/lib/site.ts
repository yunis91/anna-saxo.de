/**
 * Single source of truth for brand, contact, and navigation data.
 * Shared by the navbar, footer, and contact form so labels never drift.
 * Site language: German (de).
 */
export interface NavLink {
  label: string
  href: string
}

export const SITE = {
  name: 'Anna Saxo',
  monogram: 'AS',
  role: 'Versicherungsagentin · Übersetzerin Deutsch-Russisch',
  // Placeholder contact details - replace with the real ones before launch.
  phone: '+49 151 5384 7012',
  phoneHref: 'tel:+4915153847012',
  email: 'hallo@anna-saxo.de',
  city: 'Berlin',
  nav: [
    { label: 'Start', href: '#top' },
    { label: 'Über mich', href: '#about' },
    { label: 'Leistungen', href: '#services' },
  ] satisfies NavLink[],
  // One contact intent, one label - reused in navbar, hero, and footer.
  cta: { label: 'Kontakt aufnehmen', href: '#contact' } satisfies NavLink,
} as const
