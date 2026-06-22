import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { Reveal } from '@/components/site/Reveal'

interface TextSectionProps {
  eyebrow?: string | null
  heading?: string | null
  content: SerializedEditorState
  align?: ('left' | 'center') | null
  anchorId?: string | null
}

/** Renders the editable Text module as a bento card. */
export function TextSection({ eyebrow, heading, content, align, anchorId }: TextSectionProps) {
  const centered = align === 'center'

  return (
    <section id={anchorId || undefined} className="scroll-mt-24">
      <Reveal className="card p-7 sm:p-10 lg:p-12">
        <div className={`mx-auto max-w-3xl ${centered ? 'text-center' : ''}`}>
          {eyebrow && (
            <p className="mb-3 text-sm font-medium text-brand-700 dark:text-brand-300">{eyebrow}</p>
          )}
          {heading && (
            <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              {heading}
            </h2>
          )}
          <div className={`rich ${centered ? 'mx-auto' : ''}`}>
            <RichText data={content} />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
