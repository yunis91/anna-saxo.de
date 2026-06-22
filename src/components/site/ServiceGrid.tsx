'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check } from '@phosphor-icons/react'

import { iconFor } from '@/components/blocks/icons'

export interface ServiceItem {
  icon?: string | null
  title: string
  desc?: string | null
  bullets?: ({ text: string } | string)[] | null
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    icon: 'shield',
    title: 'Versicherung',
    desc: 'Von der Krankenversicherung bis zur Haftpflicht finde ich den Schutz, der zu Ihrem Leben passt, und erkläre jede Klausel verständlich.',
    bullets: [
      'Kranken-, Haftpflicht- und Hausratversicherung',
      'Vergleich und Wechsel ohne Stress',
      'Unterstützung im Schadensfall',
    ],
  },
  {
    icon: 'translate',
    title: 'Übersetzung Deutsch-Russisch',
    desc: 'Verträge, Briefe vom Amt und persönliche Dokumente, sorgfältig übersetzt und für Ihre Termine vorbereitet.',
    bullets: [
      'Dokumente und Korrespondenz',
      'Begleitung bei Behördengängen',
      'Schnell und vertraulich',
    ],
  },
]

const bulletText = (b: { text: string } | string) => (typeof b === 'string' ? b : b.text)

export function ServiceGrid({ items }: { items?: ServiceItem[] | null }) {
  const reduce = useReducedMotion()
  const services = items?.length ? items : DEFAULT_SERVICES

  return (
    <>
      {services.map((service, i) => {
        const Icon = iconFor(service.icon)
        return (
          <motion.article
            key={`${service.title}-${i}`}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={reduce ? undefined : { y: -4 }}
            className="card flex flex-col p-7 sm:p-8"
          >
            <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-800 dark:bg-white/10 dark:text-brand-200">
              <Icon size={26} weight="duotone" aria-hidden />
            </span>

            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {service.title}
            </h3>

            {service.desc && (
              <p className="mt-3 leading-relaxed text-zinc-500 dark:text-zinc-400">{service.desc}</p>
            )}

            {service.bullets?.length ? (
              <ul className="mt-6 space-y-3">
                {service.bullets.map((bullet, bi) => (
                  <li
                    key={bi}
                    className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <Check
                      size={18}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-brand-700 dark:text-brand-300"
                      aria-hidden
                    />
                    <span>{bulletText(bullet)}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.article>
        )
      })}
    </>
  )
}
