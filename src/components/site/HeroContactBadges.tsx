'use client'

import { EnvelopeSimple, Phone } from '@phosphor-icons/react'

import { SITE } from '@/lib/site'
import type { ContactDetails } from '@/lib/payload-pages'

const badgeClass =
  'grid h-11 w-11 place-items-center rounded-full bg-zinc-900/40 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-zinc-900/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/** Frosted quick-contact icons floating over the hero portrait. */
export function HeroContactBadges({ contact }: { contact?: ContactDetails | null }) {
  const phoneHref = contact?.phoneHref ?? SITE.phoneHref
  const email = contact?.email ?? SITE.email

  return (
    <div className="absolute bottom-4 left-4 flex gap-2 sm:bottom-auto sm:left-auto sm:right-4 sm:top-1/2 sm:-translate-y-1/2 sm:flex-col">
      <a href={phoneHref} aria-label="Anrufen" className={badgeClass}>
        <Phone size={20} weight="fill" aria-hidden />
      </a>
      <a href={`mailto:${email}`} aria-label="E-Mail schreiben" className={badgeClass}>
        <EnvelopeSimple size={20} weight="fill" aria-hidden />
      </a>
    </div>
  )
}
