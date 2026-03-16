import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import {
  Compass, Megaphone, FunnelIcon, Send, Share2, Workflow, Search,
} from 'lucide-react'
import { ServicePageLayout } from '@/components/layout/ServicePageLayout'
import { ServiceCard } from '@/components/sections/services/ServiceCard'

const cardKeys = [
  { key: 'marketEntry' as const, Icon: Compass, accent: 'bg-teal', iconColor: 'text-teal' },
  { key: 'paidAds' as const, Icon: Megaphone, accent: 'bg-gold', iconColor: 'text-gold' },
  { key: 'funnels' as const, Icon: FunnelIcon, accent: 'bg-navy', iconColor: 'text-navy' },
  { key: 'outreach' as const, Icon: Send, accent: 'bg-teal', iconColor: 'text-teal' },
  { key: 'social' as const, Icon: Share2, accent: 'bg-gold', iconColor: 'text-gold' },
  { key: 'automations' as const, Icon: Workflow, accent: 'bg-navy', iconColor: 'text-navy' },
  { key: 'seo' as const, Icon: Search, accent: 'bg-teal', iconColor: 'text-teal' },
]

const stepKeys = ['step1', 'step2', 'step3', 'step4', 'step5'] as const
const packageKeys = ['starter', 'growth', 'scale', 'marketEntry'] as const
const signalKeys = ['hiring', 'funding', 'weakFunnel', 'newWebsite', 'marketEntry', 'badRoas'] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services.growth.meta' })
  return { title: t('title'), description: t('description') }
}

export default function GrowthPage() {
  const t = useTranslations('services.growth')

  return (
    <ServicePageLayout
      label={t('hero.label')}
      headline={t('hero.headline')}
      subheadline={t('hero.subheadline')}
      ctaText={t('hero.cta')}
      ctaHref="/book"
    >
      {/* Section A — Service cards */}
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-slate-100">
            {cardKeys.map((card, i) => (
              <ServiceCard
                key={card.key}
                title={t(`cards.${card.key}.title`)}
                description={t(`cards.${card.key}.description`)}
                pills={[
                  t(`cards.${card.key}.pill1`),
                  t(`cards.${card.key}.pill2`),
                  t(`cards.${card.key}.pill3`),
                ]}
                price={t(`cards.${card.key}.price`)}
                accent={card.accent}
                Icon={card.Icon}
                iconColor={card.iconColor}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section B — Schedex story */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-teal-50 p-8 md:p-10">
            <blockquote className="text-lg font-medium text-navy">
              &ldquo;{t('schedex.quote')}&rdquo;
            </blockquote>
            <p className="mt-6 font-semibold text-navy">{t('schedex.heading')}</p>
            <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-muted-foreground">
              {stepKeys.map((step) => (
                <li key={step}>{t(`schedex.${step}`)}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Section C — Pricing packages */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy">{t('packages.heading')}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packageKeys.map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <p className="text-lg font-bold text-navy">{t(`packages.${key}.name`)}</p>
                <p className="mt-2 font-mono text-2xl font-bold text-teal">{t(`packages.${key}.price`)}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`packages.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D — Buying signals */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy">{t('signals.heading')}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {signalKeys.map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <p className="font-semibold text-navy">{t(`signals.${key}.name`)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t(`signals.${key}.what`)}</p>
                <p className="mt-3 text-sm font-medium text-teal">{t(`signals.${key}.how`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  )
}
