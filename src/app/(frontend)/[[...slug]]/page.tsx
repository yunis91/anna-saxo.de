import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { DEFAULT_LOCALE } from '@/lib/locales'
import { getActiveLocales, getContact, getPage } from '@/lib/payload-pages'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { HomeSections } from '@/components/site/HomeSections'

export const revalidate = 300

interface RouteParams {
  slug?: string[]
}

/** Resolve the locale + page slug from the URL segments. */
async function resolve(segments: string[]) {
  const active = await getActiveLocales()
  const codes = active.map((l) => l.code)
  const first = segments[0]

  // /de/... is a duplicate of the unprefixed default - redirect to clean URL.
  const isDePrefix = first === DEFAULT_LOCALE
  const isLocalePrefix = Boolean(first) && first !== DEFAULT_LOCALE && codes.includes(first)

  const locale = isLocalePrefix ? first : DEFAULT_LOCALE
  const rest = isLocalePrefix || isDePrefix ? segments.slice(1) : segments
  const pageSlug = rest.length ? rest.join('/') : 'home'

  return { locale, pageSlug, isDePrefix, restPath: rest.join('/') }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>
}): Promise<Metadata> {
  const { slug = [] } = await params
  const { locale, pageSlug } = await resolve(slug)
  if (pageSlug === 'home') return {}
  const page = await getPage(pageSlug, locale)
  return page?.title ? { title: page.title } : {}
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { slug = [] } = await params
  const { locale, pageSlug, isDePrefix, restPath } = await resolve(slug)

  if (isDePrefix) redirect(`/${restPath}`)

  const [page, contact] = await Promise.all([getPage(pageSlug, locale), getContact()])

  let content: React.ReactNode = null
  if (page?.layout?.length) {
    content = <RenderBlocks blocks={page.layout} contact={contact} />
  } else if (pageSlug === 'home') {
    content = <HomeSections contact={contact} />
  }

  if (!content) notFound()

  return (
    <main lang={locale} className="flex flex-col gap-3 sm:gap-4">
      {content}
    </main>
  )
}
