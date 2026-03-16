'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { AnimatedSection, AnimatedItem } from '@/components/shared/AnimatedSection'

export function AnadCallout() {
  const t = useTranslations('homepage.anadCallout')
  const locale = useLocale()

  return (
    <section className="bg-gradient-to-r from-teal-dark to-navy py-12 sm:py-16 lg:py-20">
      <AnimatedSection className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedItem>
          <p className="text-sm font-medium uppercase tracking-widest text-teal-100">
            {t('label')}
          </p>
        </AnimatedItem>
        <AnimatedItem>
          <h2 className="mt-2 text-4xl font-bold text-white">{t('headline')}</h2>
        </AnimatedItem>
        <AnimatedItem>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            {t('description')}
          </p>
        </AnimatedItem>
        <AnimatedItem>
          <span className="mt-6 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium text-white">
            {t('badge')}
          </span>
        </AnimatedItem>
        <AnimatedItem>
          <div className="mt-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="inline-block"
            >
              <Link
                href={`/${locale}/services/training`}
                className="inline-flex rounded-xl bg-white px-6 py-3 font-medium text-navy transition-colors hover:bg-slate-100"
              >
                {t('cta')}
              </Link>
            </motion.div>
          </div>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  )
}
