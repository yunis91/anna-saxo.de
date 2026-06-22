import { getPayload } from 'payload'
import config from '@payload-config'

import { DEFAULT_LOCALE, LOCALES, type LocaleDef } from './locales'
import type { Page } from '@/payload-types'

function getClient() {
  return getPayload({ config })
}

export interface ContactDetails {
  phone: string
  phoneHref: string
  email: string
  city: string
}

const CONTACT_FALLBACK: ContactDetails = {
  phone: '+49 151 5384 7012',
  phoneHref: 'tel:+4915153847012',
  email: 'hallo@anna-saxo.de',
  city: 'Berlin',
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`
}

export interface NavItem {
  label: string
  link: string
}

const DEFAULT_NAV: NavItem[] = [
  { label: 'Start', link: '#top' },
  { label: 'Über mich', link: '#about' },
  { label: 'Leistungen', link: '#services' },
]

/**
 * Editor-managed navigation per active locale (with German fallback). Returned
 * as a map so the client navbar can pick the entry for the current URL locale.
 */
export async function getNavByLocale(): Promise<Record<string, NavItem[]>> {
  const result: Record<string, NavItem[]> = {}
  try {
    const payload = await getClient()
    const locales = await getActiveLocales()
    for (const { code } of locales) {
      const settings = await payload.findGlobal({
        slug: 'site-settings',
        locale: code as 'de',
        fallbackLocale: DEFAULT_LOCALE as 'de',
      })
      const nav = settings?.nav as NavItem[] | undefined
      result[code] = nav?.length ? nav.map((n) => ({ label: n.label, link: n.link })) : DEFAULT_NAV
    }
  } catch {
    result[DEFAULT_LOCALE] = DEFAULT_NAV
  }
  if (!result[DEFAULT_LOCALE]) result[DEFAULT_LOCALE] = DEFAULT_NAV
  return result
}

/** Editor-managed contact details from the SiteSettings global (with fallback). */
export async function getContact(): Promise<ContactDetails> {
  try {
    const payload = await getClient()
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    const c = settings?.contact
    if (!c?.phone && !c?.email) return CONTACT_FALLBACK
    const phone = c?.phone || CONTACT_FALLBACK.phone
    return {
      phone,
      phoneHref: telHref(phone),
      email: c?.email || CONTACT_FALLBACK.email,
      city: c?.city || CONTACT_FALLBACK.city,
    }
  } catch {
    return CONTACT_FALLBACK
  }
}

/**
 * Languages enabled by the editor in the "Sprachen" global, in their chosen
 * order. German is always present and forced first. Falls back to [de, ru].
 */
export async function getActiveLocales(): Promise<LocaleDef[]> {
  let active: string[] = [DEFAULT_LOCALE, 'ru']
  try {
    const payload = await getClient()
    const settings = await payload.findGlobal({ slug: 'languages' })
    const chosen = (settings?.active as string[] | undefined) ?? []
    if (chosen.length) active = chosen
  } catch {
    // fall through to defaults
  }

  // Always include German, always first, then the rest in chosen order, deduped.
  const ordered = [DEFAULT_LOCALE, ...active.filter((c) => c !== DEFAULT_LOCALE)]
  const seen = new Set<string>()
  return ordered
    .filter((c) => (seen.has(c) ? false : (seen.add(c), true)))
    .map((code) => LOCALES.find((l) => l.code === code))
    .filter((l): l is LocaleDef => Boolean(l))
}

/** Fetch a page by slug in the given locale (auto-fallback to German). */
export async function getPage(slug: string, locale: string): Promise<Page | null> {
  try {
    const payload = await getClient()
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      locale: locale as 'de',
      fallbackLocale: DEFAULT_LOCALE as 'de',
      limit: 1,
      depth: 2,
    })
    return (res.docs[0] ?? null) as Page | null
  } catch {
    return null
  }
}

export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const payload = await getClient()
    const res = await payload.find({
      collection: 'pages',
      limit: 200,
      depth: 0,
      select: { slug: true },
    })
    return res.docs.map((d) => (d as { slug: string }).slug)
  } catch {
    return []
  }
}
