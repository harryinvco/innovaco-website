import { getRequestConfig } from 'next-intl/server'

export const locales = ['el', 'en'] as const
export const defaultLocale = 'el' as const

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? defaultLocale

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  }
})
