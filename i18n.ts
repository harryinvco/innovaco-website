import { getRequestConfig } from 'next-intl/server'

export const locales = ['el', 'en'] as const
export const defaultLocale = 'el' as const

export type Locale = (typeof locales)[number]

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale)
}

export default getRequestConfig(async ({ requestLocale, locale }) => {
  // next-intl v4 resolves the route segment through `requestLocale`; `locale`
  // is only populated when a caller passes one explicitly. Reading both keeps
  // the config correct either way instead of silently falling back to Greek.
  const resolved = (await requestLocale) ?? locale
  const activeLocale = isLocale(resolved) ? resolved : defaultLocale

  return {
    locale: activeLocale,
    messages: (await import(`./messages/${activeLocale}.json`)).default,
  }
})
