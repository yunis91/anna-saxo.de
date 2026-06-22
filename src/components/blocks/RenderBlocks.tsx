import type { Page } from '@/payload-types'
import type { ContactDetails } from '@/lib/payload-pages'

import { Hero } from '@/components/site/Hero'
import { About } from '@/components/site/About'
import { Services } from '@/components/site/Services'
import { Contact } from '@/components/site/Contact'
import { TextSection } from './TextSection'

type Block = NonNullable<Page['layout']>[number]

/** Pull a usable URL out of an upload field (object when depth >= 1). */
function mediaUrl(value: unknown): string | undefined {
  if (value && typeof value === 'object' && 'url' in value) {
    return (value as { url?: string | null }).url ?? undefined
  }
  return undefined
}

/** Maps a page's `layout` modules to their section components. */
export function RenderBlocks({
  blocks,
  contact,
}: {
  blocks?: Page['layout']
  contact?: ContactDetails | null
}) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block: Block, i) => {
        const key = `${block.blockType}-${block.id ?? i}`
        switch (block.blockType) {
          case 'hero':
            return (
              <Hero
                key={key}
                eyebrow={block.eyebrow}
                headingLine1={block.headingLine1}
                headingLine2={block.headingLine2}
                subtext={block.subtext}
                primaryCta={block.primaryCta}
                secondaryCta={block.secondaryCta}
                imageUrl={mediaUrl(block.image)}
                contact={contact}
              />
            )
          case 'about':
            return (
              <About
                key={key}
                heading={block.heading}
                content={block.content}
                imageUrl={mediaUrl(block.image)}
                stats={block.stats}
              />
            )
          case 'services':
            return (
              <Services
                key={key}
                heading={block.heading}
                intro={block.intro}
                items={block.items}
              />
            )
          case 'contact':
            return (
              <Contact
                key={key}
                heading={block.heading}
                intro={block.intro}
                formLabels={block.form}
                contact={contact}
              />
            )
          case 'text':
            return (
              <TextSection
                key={key}
                eyebrow={block.eyebrow}
                heading={block.heading}
                content={block.content}
                align={block.align}
                anchorId={block.anchorId}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
