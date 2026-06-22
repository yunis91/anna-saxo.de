import { Hero } from '@/components/site/Hero'
import { About } from '@/components/site/About'
import { Services } from '@/components/site/Services'
import { Contact } from '@/components/site/Contact'
import type { ContactDetails } from '@/lib/payload-pages'

/**
 * The hand-built homepage (Hero / Über mich / Leistungen / Kontakt), used as the
 * home fallback when no Payload "home" page exists.
 */
export function HomeSections({ contact }: { contact?: ContactDetails | null }) {
  return (
    <>
      <Hero contact={contact} />
      <About />
      <Services />
      <Contact contact={contact} />
    </>
  )
}
