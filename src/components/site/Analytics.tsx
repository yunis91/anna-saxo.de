'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

interface AnalyticsProps {
  gaId?: string | null
}

type CookieConsentApi = { acceptedCategory: (category: string) => boolean }

/**
 * Loads Google Analytics 4 only after the visitor accepts the "analytics"
 * cookie category (managed by CookieBanner via vanilla-cookieconsent).
 * Renders nothing when no gaId is configured or consent is missing.
 */
export function Analytics({ gaId }: AnalyticsProps) {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    const hasConsent = (): boolean => {
      try {
        const cc = (window as unknown as { CookieConsent?: CookieConsentApi }).CookieConsent
        return cc ? cc.acceptedCategory('analytics') : false
      } catch {
        return false
      }
    }

    if (hasConsent()) {
      setConsented(true)
      return
    }

    const handler = () => {
      if (hasConsent()) setConsented(true)
    }
    window.addEventListener('cc:onConsent', handler)
    window.addEventListener('cc:onChange', handler)
    return () => {
      window.removeEventListener('cc:onConsent', handler)
      window.removeEventListener('cc:onChange', handler)
    }
  }, [])

  if (!gaId || !consented) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', { anonymize_ip: true });
      `}</Script>
    </>
  )
}
