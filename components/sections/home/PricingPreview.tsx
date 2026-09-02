'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, Calculator, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { PriceTable } from '@/components/shared/PriceTable'
import { featuredServices } from '@/lib/services'

export function PricingPreview() {
  const t = useTranslations('homepage.pricing')
  const tPricing = useTranslations('pricing')
  const locale = useLocale()

  return (
    <section className="section bg-ink-50/60">
      <div className="container-page">
        <SectionHeading
          eyebrow={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <AnimatedSection className="mx-auto mt-8 max-w-2xl" delay={0.05}>
          <p className="flex items-start justify-center gap-2 rounded-2xl border border-crystal-100 bg-white px-5 py-4 text-center text-sm leading-relaxed text-ink-500">
            <Heart className="mt-0.5 h-4 w-4 shrink-0 text-crystal-500" aria-hidden />
            {t('thanks')}
          </p>
        </AnimatedSection>

        <PriceTable items={featuredServices} className="mt-10" />

        <AnimatedSection className="mt-10 flex flex-col justify-center gap-3 sm:flex-row" delay={0.1}>
          <Link href={`/${locale}/pricing`}>
            <Button variant="outline" size="lg" className="group w-full sm:w-auto">
              {t('viewFull')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Button>
          </Link>
          <Link href={`/${locale}/quote`}>
            <Button size="lg" className="w-full sm:w-auto">
              <Calculator className="h-4 w-4" aria-hidden />
              {tPricing('calculatorCta')}
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
