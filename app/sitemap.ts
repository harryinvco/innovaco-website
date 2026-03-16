import type { MetadataRoute } from 'next'
import { allCaseStudies, allPosts } from 'contentlayer/generated'

const locales = ['el', 'en']
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hninnovaco.com'

const staticRoutes = [
  { path: '', priority: 1.0 },
  { path: '/services/ai', priority: 0.9 },
  { path: '/services/development', priority: 0.9 },
  { path: '/services/growth', priority: 0.9 },
  { path: '/services/training', priority: 0.9 },
  { path: '/case-studies', priority: 0.8 },
  { path: '/about', priority: 0.8 },
  { path: '/contact', priority: 0.8 },
  { path: '/book', priority: 0.9 },
  { path: '/blog', priority: 0.7 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const route of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route.priority,
      })
    }
  }

  for (const cs of allCaseStudies) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/case-studies/${cs.slug}`,
        lastModified: new Date(cs.date),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  for (const post of allPosts) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
