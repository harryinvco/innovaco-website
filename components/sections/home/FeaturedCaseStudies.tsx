'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { AnimatedSection, AnimatedItem } from '@/components/shared/AnimatedSection'

const placeholderKeys = ['icpac', 'chtisma', 'inspektra'] as const

export function FeaturedCaseStudies() {
  const t = useTranslations('homepage.featuredCaseStudies')
  const locale = useLocale()

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-teal">
          {t('label')}
        </p>
        <h2 className="mt-2 text-4xl font-bold text-navy">{t('headline')}</h2>

        <AnimatedSection className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {placeholderKeys.map((key) => (
            <AnimatedItem key={key}>
              <motion.div
                whileHover={{
                  y: -4,
                  boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12)',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="overflow-hidden rounded-2xl border border-slate-200"
              >
                <div className="bg-navy px-6 py-6">
                  <p className="text-lg font-bold text-white">
                    {t(`placeholders.${key}.client`)}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-teal/20 px-3 py-1 text-xs text-teal-100">
                    {t(`placeholders.${key}.sector`)}
                  </span>
                </div>
                <div className="bg-white p-6">
                  <ul className="space-y-2">
                    <li className="text-sm text-body">
                      {t(`placeholders.${key}.result1`)}
                    </li>
                    <li className="text-sm text-body">
                      {t(`placeholders.${key}.result2`)}
                    </li>
                    <li className="text-sm text-body">
                      {t(`placeholders.${key}.result3`)}
                    </li>
                  </ul>
                  <Link
                    href={`/${locale}/case-studies`}
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
                  >
                    <span>{t('readCaseStudy')}</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedSection>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/case-studies`}
            className="group inline-flex items-center gap-1 text-sm font-medium text-teal hover:text-teal-dark"
          >
            <span>{t('viewAll')}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
