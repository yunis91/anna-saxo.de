'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { acceptedCategory } from 'vanilla-cookieconsent'

interface AnalyticsProps {
  gaId?: string | null
}

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
        return acceptedCategory('analytics')
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
