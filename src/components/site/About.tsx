import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { AboutStats, type StatItem } from './AboutStats'
import { Reveal } from './Reveal'

interface AboutProps {
  heading?: string | null
  content?: SerializedEditorState | null
  imageUrl?: string | null
  stats?: StatItem[] | null
}

const PLACEHOLDER = 'https://picsum.photos/seed/anna-saxo-arbeit/700/900'

/** "Über mich" bento. Props optional -> falls back to the current German content. */
export function About({ heading, content, imageUrl, stats }: AboutProps) {
  return (
    <section id="about" className="scroll-mt-24">
      <Reveal className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        {/* Bio tile */}
        <div className="card p-7 sm:p-9 lg:col-span-2">
          <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            {heading ?? 'Zwei Berufe, ein Ziel: dass Sie alles verstehen.'}
          </h2>
          <div className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
            {content ? (
              <div className="rich">
                <RichText data={content} />
              </div>
            ) : (
              <div className="space-y-4">
                <p>
                  Ich bin Anna Saxo, Versicherungsagentin und Übersetzerin für Deutsch und Russisch.
                  Seit über zehn Jahren begleite ich Menschen, die in Deutschland neu angekommen sind,
                  durch Verträge, Ämter und alles, was dazwischen liegt.
                </p>
                <p>
                  Versicherung und Sprache haben für mich dasselbe Ziel: dass Sie genau verstehen,
                  was Sie unterschreiben. Ich nehme mir Zeit, erkläre in Ruhe und spreche Ihre
                  Sprache.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Portrait tile */}
        <div className="card relative min-h-[260px] overflow-hidden lg:min-h-0">
          <Image
            src={imageUrl || PLACEHOLDER}
            alt="Anna Saxo bei der Beratung"
            fill
            sizes="(max-width: 1024px) 92vw, 30vw"
            className="object-cover"
          />
        </div>

        {/* Stat tiles */}
        <AboutStats stats={stats} />
      </Reveal>
    </section>
  )
}
