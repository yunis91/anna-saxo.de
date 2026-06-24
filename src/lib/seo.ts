import type { Metadata } from 'next'

import type { Media, Page, SiteSetting } from '@/payload-types'
import { DEFAULT_LOCALE, type LocaleDef } from './locales'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SERVER_URL || 'https://anna-saxo.de'
).replace(/\/$/, '')

/** Brand defaults, shared by the root layout and per-page metadata. */
export const DEFAULT_TITLE =
  'Anna Saxo | Versicherung & Übersetzungen Deutsch-Russisch'
export const DEFAULT_DESCRIPTION =
  'Persönliche Versicherungsberatung in Deutschland und Übersetzungen Deutsch-Russisch. Klar, ehrlich und zweisprachig.'

/** Open Graph locale tags for the languages we support (BCP-47 → OG format). */
const OG_LOCALES: Record<string, string> = {
  de: 'de_DE',
  ru: 'ru_RU',
  en: 'en_US',
  uk: 'uk_UA',
  tr: 'tr_TR',
  pl: 'pl_PL',
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * URL path for a page in a given locale. The default language is served without
 * a prefix ("/", "/datenschutz"); others are prefixed ("/ru", "/ru/datenschutz").
 * The "home" slug maps to the language root.
 */
export function localePath(locale: string, pageSlug: string): string {
  const base = pageSlug === 'home' ? '' : `/${pageSlug}`
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
  return `${prefix}${base}` || '/'
}

function mediaUrl(media: number | Media | null | undefined): string | null {
  if (!media || typeof media === 'number') return null
  return media.url ?? null
}

interface BuildMetadataArgs {
  page?: Page | null
  settings?: SiteSetting | null
  locale: string
  pageSlug: string
  activeLocales: LocaleDef[]
}

/**
 * Full per-page metadata: title, description, canonical, robots, Open Graph,
 * Twitter and hreflang alternates. Page-level SEO fields win; the SiteSettings
 * SEO group provides the fallbacks.
 */
export function buildMetadata({
  page,
  settings,
  locale,
  pageSlug,
  activeLocales,
}: BuildMetadataArgs): Metadata {
  const seo = settings?.seo ?? {}
  const suffix = seo.titleSuffix?.trim() || 'Anna Saxo'

  // The page's internal title is an admin label, not an SEO title — so the home
  // page falls back to the brand default rather than that label.
  const metaTitle = page?.meta?.title?.trim()
  const title = metaTitle
    ? metaTitle
    : pageSlug === 'home' || !page?.title
      ? DEFAULT_TITLE
      : `${page.title} | ${suffix}`

  const description =
    page?.meta?.description?.trim() ||
    seo.defaultDescription?.trim() ||
    DEFAULT_DESCRIPTION

  const ogImage = mediaUrl(page?.meta?.image) || mediaUrl(seo.defaultImage)
  const url = absoluteUrl(localePath(locale, pageSlug))
  const noindex = Boolean(page?.meta?.noindex)

  // hreflang map across the active languages, plus x-default → the default lang.
  const languages: Record<string, string> = {}
  for (const { code } of activeLocales) {
    languages[code] = absoluteUrl(localePath(code, pageSlug))
  }
  languages['x-default'] = absoluteUrl(localePath(DEFAULT_LOCALE, pageSlug))

  return {
    // `absolute` so the root layout's title template isn't applied on top of the
    // already-suffixed title (which would double the brand suffix).
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: suffix,
      locale: OG_LOCALES[locale] ?? OG_LOCALES[DEFAULT_LOCALE],
      type: 'website',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
