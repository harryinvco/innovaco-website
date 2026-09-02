'use client'

import { useTranslations } from 'next-intl'
import { Clock, Leaf, Sparkles, Users } from 'lucide-react'
import { AnimatedItem } from '@/components/shared/AnimatedSection'
import { SectionHeading } from '@/components/shared/SectionHeading'

const statConfig = [
  { icon: Users, tint: 'from-crystal-500 to-crystal-700' },
  { icon: Sparkles, tint: 'from-aqua-400 to-crystal-500' },
  { icon: Leaf, tint: 'from-emerald-500 to-emerald-700' },
  { icon: Clock, tint: 'from-crystal-400 to-aqua-500' },
]

export function TrustSignals() {
  const t = useTranslations('homepage.trust')

  const stats = statConfig.map((config, i) => ({
    ...config,
    value: t(`stat${i + 1}Value`),
    label: t(`stat${i + 1}Label`),
  }))

  return (
    <section className="section relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(110,207,225,0.09),transparent_50%)]" />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <AnimatedItem
                key={stat.label}
                delay={i * 0.07}
                className="group rounded-2xl border border-ink-100 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover sm:p-8"
              >
                <span
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.tint} shadow-brand transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon className="h-6 w-6 text-white" aria-hidden />
                </span>
                <p className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-ink-400">
                  {stat.label}
                </p>
              </AnimatedItem>
            )
          })}
        </div>
      </div>
    </section>
  )
}
