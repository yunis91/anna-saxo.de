import { ContactForm, type ContactFormLabelInput } from './ContactForm'
import { ContactInfo } from './ContactInfo'
import { Reveal } from './Reveal'
import type { ContactDetails } from '@/lib/payload-pages'

interface ContactProps {
  heading?: string | null
  intro?: string | null
  formLabels?: ContactFormLabelInput | null
  contact?: ContactDetails | null
}

/** "Kontakt" bento: info tile + form tile. Props optional -> German defaults. */
export function Contact({ heading, intro, formLabels, contact }: ContactProps) {
  return (
    <section id="contact" className="scroll-mt-24">
      <Reveal className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <div className="card flex flex-col p-7 sm:p-9 lg:col-span-1">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            {heading ?? 'Schreiben Sie mir'}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
            {intro ??
              'Erzählen Sie kurz, worum es geht. Ich melde mich persönlich bei Ihnen, auf Deutsch oder auf Russisch.'}
          </p>
          <div className="mt-8 lg:mt-auto lg:pt-8">
            <ContactInfo contact={contact} />
          </div>
        </div>

        <div className="card p-6 sm:p-8 lg:col-span-2">
          <ContactForm labels={formLabels} />
        </div>
      </Reveal>
    </section>
  )
}
