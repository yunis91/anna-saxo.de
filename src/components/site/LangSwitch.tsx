'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { DEFAULT_LOCALE, LOCALE_CODES, type LocaleDef } from '@/lib/locales'

/** Text-only DE / RU / … language switch. Builds locale-prefixed URLs. */
export function LangSwitch({ locales }: { locales: LocaleDef[] }) {
  const pathname = usePathname() || '/'
  const segments = pathname.split('/').filter(Boolean)
  const hasPrefix = LOCALE_CODES.includes(segments[0])
  const current = hasPrefix ? segments[0] : DEFAULT_LOCALE
  const rest = hasPrefix ? segments.slice(1) : segments
  const basePath = rest.length ? `/${rest.join('/')}` : '/'

  const hrefFor = (code: string) => {
    if (code === DEFAULT_LOCALE) return basePath
    return basePath === '/' ? `/${code}` : `/${code}${basePath}`
  }

  if (locales.length < 2) return null

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Sprache wählen">
      {locales.map((l) => {
        const isCurrent = l.code === current
        return (
          <Link
            key={l.code}
            href={hrefFor(l.code)}
            hrefLang={l.code}
            aria-current={isCurrent ? 'true' : undefined}
            className={`text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ${
              isCurrent
                ? 'text-zinc-900 dark:text-white'
                : 'text-zinc-400 hover:text-brand-700 dark:text-zinc-500 dark:hover:text-brand-300'
            }`}
          >
            {l.code.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
