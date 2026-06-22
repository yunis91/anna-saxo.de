import {
  ShieldCheck,
  Translate,
  MapPin,
  Clock,
  ChatCircle,
  FileText,
  type Icon,
} from '@phosphor-icons/react'

/** Maps the admin icon-select values to Phosphor icons. */
export const ICONS: Record<string, Icon> = {
  shield: ShieldCheck,
  translate: Translate,
  pin: MapPin,
  clock: Clock,
  chat: ChatCircle,
  file: FileText,
}

export function iconFor(value?: string | null): Icon {
  return (value && ICONS[value]) || ShieldCheck
}
