'use client'

import { Clock, EnvelopeSimple, MapPin, Phone, type Icon } from '@phosphor-icons/react'
import Link from 'next/link'

import { SITE } from '@/lib/site'
import type { ContactDetails } from '@/lib/payload-pages'

interface InfoItem {
  Icon: Icon
  label: string
  value: string
  href?: string
}

/** Alternative ways to reach Anna, shown inside the contact info tile. */
export function ContactInfo({ contact }: { contact?: ContactDetails | null }) {
  const phone = contact?.phone ?? SITE.phone
  const phoneHref = contact?.phoneHref ?? SITE.phoneHref
  const email = contact?.email ?? SITE.email
  const city = contact?.city ?? SITE.city

  const items: InfoItem[] = [
    { Icon: Phone, label: 'Telefon', value: phone, href: phoneHref },
    { Icon: EnvelopeSimple, label: 'E-Mail', value: email, href: `mailto:${email}` },
    { Icon: MapPin, label: 'Vor Ort', value: city },
    { Icon: Clock, label: 'Antwortzeit', value: 'In der Regel innerhalb eines Werktags' },
  ]

  return (
    <ul className="space-y-5">
      {items.map(({ Icon, label, value, href }) => (
        <li key={label} className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-800 dark:bg-white/10 dark:text-brand-200">
            <Icon size={20} weight="duotone" aria-hidden />
          </span>
          <span className="flex flex-col">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
            {href ? (
              <Link
                href={href}
                className="font-medium text-zinc-900 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:text-zinc-100 dark:hover:text-brand-300"
              >
                {value}
              </Link>
            ) : (
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{value}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}
