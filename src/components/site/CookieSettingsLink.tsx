'use client'

import * as CookieConsent from 'vanilla-cookieconsent'

/**
 * Reopens the cookie preferences modal. Rendered in the footer so visitors can
 * change their consent after the initial banner has been dismissed.
 */
export function CookieSettingsLink({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={() => CookieConsent.showPreferences()} className={className}>
      {label}
    </button>
  )
}
