'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedItem, AnimatedSection } from '@/components/shared/AnimatedSection'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ServiceIcon } from '@/components/shared/ServiceIcon'
import { services as serviceData } from '@/lib/services'
import { servicePriceText } from '@/lib/price'

export function ServicesOverview() {
  const t = useTranslations('homepage.services')
  const tRoot = useTranslations()
  const tServices = useTranslations('services')
  const locale = useLocale()

  return (
    <section className="section relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(38,120,209,0.04),transparent_45%)]" />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3">
          {serviceData.map((service, i) => (
            <AnimatedItem key={service.id} delay={Math.min(i, 6) * 0.04}>
              <Link
                href={`/${locale}/quote?service=${service.id}`}
                className="group relative flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-crystal-200 hover:shadow-card-hover sm:p-6"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-crystal-50 to-aqua-50 ring-1 ring-inset ring-crystal-100 transition-transform duration-300 group-hover:scale-105">
                  <ServiceIcon name={service.icon} className="h-6 w-6 text-crystal-600" />
                </span>

                <h3 className="font-display text-[15px] font-bold leading-snug text-ink-900 sm:text-base">
                  {tServices(`${service.id}.name`)}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-400">
                  {tServices(`${service.id}.short`)}
                </p>

                <p className="mt-4 pt-3 text-sm font-semibold text-crystal-600 tabular">
                  {servicePriceText(service, tRoot)}
                </p>

                <span
                  aria-hidden
                  className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-crystal-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <ArrowRight className="h-3 w-3 text-crystal-600" />
                </span>
              </Link>
            </AnimatedItem>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center" delay={0.1}>
          <Link href={`/${locale}/services`}>
            <Button variant="outline" className="group">
              {t('viewAll')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
