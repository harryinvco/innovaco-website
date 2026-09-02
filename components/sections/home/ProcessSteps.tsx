'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import {
  ArrowRight,
  CalendarCheck,
  Calculator,
  ListChecks,
  SprayCan,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedItem, AnimatedSection } from '@/components/shared/AnimatedSection'
import { SectionHeading } from '@/components/shared/SectionHeading'

const stepConfig = [
  { icon: ListChecks, href: '/services' },
  { icon: Calculator, href: '/quote' },
  { icon: CalendarCheck, href: '/book' },
  { icon: SprayCan, href: null },
]

export function ProcessSteps() {
  const t = useTranslations('homepage.process')
  const tc = useTranslations('common')
  const locale = useLocale()

  return (
    <section className="section bg-gradient-to-b from-white to-ink-50/70">
      <div className="container-page">
        <SectionHeading
          eyebrow={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="relative mt-12">
          {/* Connector rail behind the step markers */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 lg:block">
            <div className="h-full w-full rounded-full bg-ink-100" />
            <div className="absolute inset-y-0 left-0 w-full origin-left animate-grow-x rounded-full bg-gradient-to-r from-crystal-500 to-aqua-400" />
          </div>

          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {stepConfig.map(({ icon: Icon, href }, i) => {
              const inner = (
                <AnimatedItem delay={i * 0.1} className="group text-center">
                  <div className="relative mx-auto mb-5 w-16">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-card ring-1 ring-ink-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:ring-crystal-200">
                      <Icon className="h-7 w-7 text-crystal-600" aria-hidden />
                    </span>
                    <span className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-crystal-500 font-display text-xs font-bold text-white shadow-brand">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-ink-900">
                    {t(`step${i + 1}Title`)}
                  </h3>
                  <p className="mx-auto mt-1.5 max-w-[15rem] text-sm leading-relaxed text-ink-400">
                    {t(`step${i + 1}Desc`)}
                  </p>
                </AnimatedItem>
              )

              return (
                <li key={i} className="relative">
                  {href ? (
                    <Link href={`/${locale}${href}`} className="block">
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </li>
              )
            })}
          </ol>
        </div>

        <AnimatedSection className="mt-12 text-center" delay={0.25}>
          <Link href={`/${locale}/book`}>
            <Button size="lg" className="group">
              {tc('bookNow')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
