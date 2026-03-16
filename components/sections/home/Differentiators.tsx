'use client'

import { useTranslations } from 'next-intl'
import { Shield, Languages, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedSection, AnimatedItem } from '@/components/shared/AnimatedSection'

const items = [
  { key: 'eu' as const, Icon: Shield },
  { key: 'bilingual' as const, Icon: Languages },
  { key: 'proven' as const, Icon: MapPin },
]

export function Differentiators() {
  const t = useTranslations('homepage.differentiators')

  return (
    <section className="bg-navy-50 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-teal">
          {t('label')}
        </p>
        <h2 className="mt-2 text-4xl font-bold text-navy">{t('headline')}</h2>

        <AnimatedSection className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item) => (
            <AnimatedItem key={item.key}>
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <item.Icon className="h-8 w-8 text-teal" />
              </motion.div>
              <h3 className="mt-4 text-xl font-semibold text-navy">
                {t(`${item.key}.title`)}
              </h3>
              <p className="mt-2 text-base text-muted-foreground">
                {t(`${item.key}.description`)}
              </p>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
