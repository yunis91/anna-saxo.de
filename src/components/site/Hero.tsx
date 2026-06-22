import Image from 'next/image'

import { CtaButton } from './CtaButton'
import { FadeIn } from './FadeIn'
import { HeroContactBadges } from './HeroContactBadges'
import type { ContactDetails } from '@/lib/payload-pages'

interface Cta {
  label?: string | null
  link?: string | null
}

interface HeroProps {
  eyebrow?: string | null
  headingLine1?: string | null
  headingLine2?: string | null
  subtext?: string | null
  primaryCta?: Cta | null
  secondaryCta?: Cta | null
  imageUrl?: string | null
  contact?: ContactDetails | null
}

const PLACEHOLDER = 'https://picsum.photos/seed/anna-saxo-portrait/800/1000'

/**
 * Bento hero card: portrait tile (left) + oversized headline (right).
 * Props are optional and fall back to the current German content, so this works
 * both as an editable Payload module and as the hardcoded home fallback.
 * Headline + image render statically (no opacity gate) for an instant first paint.
 */
export function Hero({
  eyebrow = 'Hallo, ich bin Anna',
  headingLine1 = 'Verständlich versichert.',
  headingLine2 = 'Korrekt übersetzt.',
  subtext = 'Versicherungsagentin und Übersetzerin Deutsch-Russisch. Ich begleite Sie verständlich durch Verträge, Ämter und Formulare.',
  primaryCta,
  secondaryCta,
  imageUrl,
  contact,
}: HeroProps) {
  return (
    <section id="top" className="scroll-mt-24">
      <div className="card overflow-hidden p-3 sm:p-4">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Portrait tile */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] lg:aspect-auto lg:h-full lg:min-h-[540px]">
            <Image
              src={imageUrl || PLACEHOLDER}
              alt="Anna Saxo, Versicherungsagentin und Übersetzerin Deutsch-Russisch"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 42vw"
              className="object-cover"
            />
            <HeroContactBadges contact={contact} />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center px-2 py-8 sm:px-6 lg:px-10 lg:py-12">
            {eyebrow && (
              <FadeIn>
                <p className="text-base text-zinc-500 dark:text-zinc-400">{eyebrow}</p>
              </FadeIn>
            )}

            <h1 className="mt-4 text-5xl font-bold leading-[0.95] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
              {headingLine1}
              {headingLine2 && (
                <>
                  <br />
                  {headingLine2}
                </>
              )}
            </h1>

            {subtext && (
              <FadeIn delay={0.1}>
                <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {subtext}
                </p>
              </FadeIn>
            )}

            <FadeIn delay={0.2}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaButton
                  label={primaryCta?.label ?? 'Kontakt aufnehmen'}
                  href={primaryCta?.link ?? '#contact'}
                />
                <CtaButton
                  variant="outline"
                  label={secondaryCta?.label ?? 'Leistungen ansehen'}
                  href={secondaryCta?.link ?? '#services'}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
