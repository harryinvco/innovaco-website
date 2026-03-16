'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CaseStudyCard } from './CaseStudyCard'

interface CaseStudyData {
  client: string
  sector: string
  summary: string
  results: string[]
  date: string
  slug: string
}

const sectorFilterMap: Record<string, string[]> = {
  all: [],
  ai: ['AI Chatbot', 'Professional Association', 'Construction & Trading'],
  development: ['Web Platform', 'Public Sector & Healthcare'],
  analytics: ['Field Services & SaaS'],
  publicSector: ['Public Sector & Healthcare'],
}

const filterKeys = [
  { key: 'filterAll', value: 'all' },
  { key: 'filterAI', value: 'ai' },
  { key: 'filterDevelopment', value: 'development' },
  { key: 'filterAnalytics', value: 'analytics' },
  { key: 'filterPublicSector', value: 'publicSector' },
] as const

export function CaseStudyFilter({
  caseStudies,
}: {
  caseStudies: CaseStudyData[]
}) {
  const t = useTranslations('caseStudies')
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? caseStudies
      : caseStudies.filter((cs) =>
          sectorFilterMap[activeFilter]?.some(
            (s) => cs.sector.toLowerCase().includes(s.toLowerCase())
          )
        )

  return (
    <>
      <div className="flex flex-wrap gap-2">
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
        {filtered.map((cs) => (
          <CaseStudyCard key={cs.slug} {...cs} />
        ))}
      </div>
    </>
  )
}
