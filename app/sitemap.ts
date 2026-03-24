import type { MetadataRoute } from 'next'

const baseUrl = 'https://krystallo.cy'
const locales = ['el', 'en']

const staticRoutes = [
  { path: '', priority: 1.0 },
  { path: '/services', priority: 0.9 },
  { path: '/quote', priority: 0.9 },
  { path: '/book', priority: 0.9 },
  { path: '/contact', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route.priority,
      })
    }
  }

  return entries
}
