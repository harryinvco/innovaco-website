'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { AnimatedSection, AnimatedItem } from '@/components/shared/AnimatedSection'

export function HomeCTA() {
  const t = useTranslations('homepage.cta')
  const locale = useLocale()

  return (
    <section className="bg-navy py-12 sm:py-16 lg:py-24">
      <AnimatedSection className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedItem>
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            {t('headline')}
          </h2>
        </AnimatedItem>
        <AnimatedItem>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            {t('subheadline')}
          </p>
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
                href={`/${locale}/book`}
                className="inline-flex rounded-xl bg-teal px-8 py-4 font-medium text-white transition-colors hover:bg-teal-light"
              >
                {t('ctaPrimary')}
              </Link>
            </motion.div>
          </div>
        </AnimatedItem>
        <AnimatedItem>
          <Link
            href={`/${locale}/contact`}
            className="mt-4 inline-block text-sm text-slate-400 transition-colors hover:text-white"
          >
            {t('ctaSecondary')}
          </Link>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  )
}
