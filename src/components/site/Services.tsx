import { ServiceGrid, type ServiceItem } from './ServiceGrid'

interface ServicesProps {
  heading?: string | null
  intro?: string | null
  items?: ServiceItem[] | null
}

/** "Leistungen" heading tile + service tiles. Props optional -> German defaults. */
export function Services({ heading, intro, items }: ServicesProps) {
  return (
    <section id="services" className="scroll-mt-24">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <div className="card flex flex-col justify-center p-7 sm:p-9">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            {heading ?? 'Womit ich Ihnen helfe'}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
            {intro ??
              'Zwei Bereiche, eine Ansprechpartnerin. Ob Versicherung oder Übersetzung, ich kümmere mich persönlich darum.'}
          </p>
        </div>

        <ServiceGrid items={items} />
      </div>
    </section>
  )
}
