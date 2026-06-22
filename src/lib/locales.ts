/**
 * Single source of truth for supported content languages.
 *
 * Payload requires locales to be declared in config (code), so this is the
 * fixed pool. Which of these are actually shown on the site is controlled by
 * the editor in the "Sprachen" global (see getActiveLocales). German is always
 * the default and the fallback.
 *
 * To add a brand-new language to the pool: add one entry here, then enable it
 * in the admin under Sprachen.
 */
export interface LocaleDef {
  code: string
  label: string
}

export const LOCALES: LocaleDef[] = [
  { code: 'de', label: 'Deutsch' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
  { code: 'uk', label: 'Українська' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'pl', label: 'Polski' },
]

export const DEFAULT_LOCALE = 'de'

export const LOCALE_CODES = LOCALES.map((l) => l.code)

export function isLocale(value: string | undefined | null): boolean {
  return Boolean(value) && LOCALE_CODES.includes(value as string)
}

export function localeLabel(code: string): string {
  return LOCALES.find((l) => l.code === code)?.label ?? code.toUpperCase()
}

/** Short uppercase code for the header switch ("DE", "RU"). */
export function localeShort(code: string): string {
  return code.toUpperCase()
}
