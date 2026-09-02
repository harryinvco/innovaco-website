import type { MetadataRoute } from 'next'
import { locales } from '@/i18n'
import { site } from '@/lib/site'

const routes = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/pricing', priority: 0.95, changeFrequency: 'weekly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/quote', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/book', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${site.url}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${site.url}/${alt}${route.path}`])
        ),
      },
    }))
  )
}
