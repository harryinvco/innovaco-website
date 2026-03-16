'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

interface CaseStudyCardProps {
  client: string
  sector: string
  summary: string
  results: string[]
  date: string
  slug: string
}

export function CaseStudyCard({
  client,
  sector,
  summary,
  results,
  date,
  slug,
}: CaseStudyCardProps) {
  const t = useTranslations('caseStudies')
  const locale = useLocale()

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl border border-slate-200 bg-white p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-navy">{client}</h3>
        <span className="flex-shrink-0 rounded-full border border-navy/20 bg-navy/10 px-3 py-1 text-xs font-medium text-navy">
          {sector}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{summary}</p>
      {results.length > 0 && (
        <ul className="mt-4 space-y-1">
          {results.slice(0, 2).map((result, i) => (
            <li key={i} className="text-sm text-body">
              · {result}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
          })}
        </span>
        <Link
          href={`/${locale}/case-studies/${slug}`}
          className="group inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
        >
          <span>{t('readCaseStudy')}</span>
        </Link>
      </div>
    </motion.div>
  )
}
