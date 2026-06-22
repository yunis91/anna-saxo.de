'use client'

import { iconFor } from '@/components/blocks/icons'

export interface StatItem {
  icon?: string | null
  value: string
  caption?: string | null
  highlight?: boolean | null
}

const DEFAULT_STATS: StatItem[] = [
  { icon: 'shield', value: '10+', caption: 'Jahre Erfahrung', highlight: true },
  { icon: 'translate', value: 'DE · RU', caption: 'Beratung in Ihrer Sprache' },
  { icon: 'pin', value: 'Berlin', caption: 'Vor Ort und online' },
]

/** Stat tiles for the About bento. One highlighted (blue) tile adds contrast. */
export function AboutStats({ stats }: { stats?: StatItem[] | null }) {
  const items = stats?.length ? stats : DEFAULT_STATS

  return (
    <>
      {items.map((stat, i) => {
        const Icon = iconFor(stat.icon)
        const inverted = Boolean(stat.highlight)
        return (
          <div
            key={`${stat.value}-${i}`}
            className={`${inverted ? 'card-brand' : 'card'} flex min-h-[150px] flex-col justify-between gap-6 p-6`}
          >
            <span
              className={`grid h-10 w-10 place-items-center rounded-full ${
                inverted
                  ? 'bg-white/15 text-white'
                  : 'bg-brand-50 text-brand-800 dark:bg-white/10 dark:text-brand-200'
              }`}
            >
              <Icon size={20} weight="duotone" aria-hidden />
            </span>
            <div>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              {stat.caption && (
                <p
                  className={`mt-1 text-sm ${
                    inverted ? 'text-brand-100' : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {stat.caption}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}
