'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { BlogCard } from './BlogCard'

interface PostData {
  title: string
  summary: string
  date: string
  author: string
  tags: string[]
  slug: string
}

const filterKeys = [
  { key: 'filterAll', value: 'all' },
  { key: 'filterAI', value: 'AI' },
  { key: 'filterTraining', value: 'Training' },
  { key: 'filterGDPR', value: 'GDPR' },
  { key: 'filterCyprus', value: 'Cyprus' },
  { key: 'filterDevelopment', value: 'Development' },
] as const

export function BlogFilter({ posts }: { posts: PostData[] }) {
  const t = useTranslations('blog')
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? posts
      : posts.filter((p) =>
          p.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase())
        )

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {filterKeys.map(({ key, value }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === value
                ? 'bg-teal text-white'
                : 'bg-slate-100 text-body hover:bg-slate-200'
            }`}
          >
            {t(key)}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </>
  )
}
