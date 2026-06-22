'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import * as CookieConsent from 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'

import { DEFAULT_LOCALE, LOCALE_CODES } from '@/lib/locales'

type BannerLang = 'de' | 'ru'
type BannerTranslations = NonNullable<
  CookieConsent.CookieConsentConfig['language']
>['translations']

const TRANSLATIONS: BannerTranslations = {
  de: {
    consentModal: {
      title: 'Wir verwenden Cookies',
      description:
        'Notwendige Cookies sind für den Betrieb der Website erforderlich. Analyse-Cookies setzen wir nur mit Ihrer Einwilligung ein.',
      acceptAllBtn: 'Alle akzeptieren',
      acceptNecessaryBtn: 'Alle ablehnen',
      showPreferencesBtn: 'Einstellungen',
    },
    preferencesModal: {
      title: 'Cookie-Einstellungen',
      acceptAllBtn: 'Alle akzeptieren',
      acceptNecessaryBtn: 'Alle ablehnen',
      savePreferencesBtn: 'Auswahl speichern',
      closeIconLabel: 'Schließen',
      sections: [
        {
          title: 'Notwendige Cookies',
          description: 'Für die grundlegende Funktion der Website erforderlich.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analyse-Cookies',
          description: 'Helfen uns, die Nutzung der Website anonymisiert zu verstehen.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
  ru: {
    consentModal: {
      title: 'Мы используем файлы cookie',
      description:
        'Необходимые cookie нужны для работы сайта. Аналитические cookie мы используем только с вашего согласия.',
      acceptAllBtn: 'Принять все',
      acceptNecessaryBtn: 'Отклонить все',
      showPreferencesBtn: 'Настройки',
    },
    preferencesModal: {
      title: 'Настройки cookie',
      acceptAllBtn: 'Принять все',
      acceptNecessaryBtn: 'Отклонить все',
      savePreferencesBtn: 'Сохранить выбор',
      closeIconLabel: 'Закрыть',
      sections: [
        {
          title: 'Необходимые cookie',
          description: 'Нужны для базовой работы сайта.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Аналитические cookie',
          description: 'Помогают анонимно понять, как используется сайт.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
}

export function CookieBanner() {
  const pathname = usePathname() || '/'

  useEffect(() => {
    const seg = pathname.split('/').filter(Boolean)[0]
    const locale = LOCALE_CODES.includes(seg) ? seg : DEFAULT_LOCALE
    const lang: BannerLang = locale === 'ru' ? 'ru' : 'de'

    CookieConsent.run({
      guiOptions: {
        consentModal: { layout: 'box', position: 'bottom left' },
        preferencesModal: { layout: 'box' },
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        // Prepared for the future; no analytics scripts are loaded yet.
        analytics: {},
      },
      language: {
        default: lang,
        translations: TRANSLATIONS,
      },
    })
    // Run once on mount; the banner shows a single time per visitor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
