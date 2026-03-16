import { getTranslations } from 'next-intl/server'
import { useLocale, useTranslations } from 'next-intl'
import { MessageSquare, Wrench, Phone, Zap, Rocket, ClipboardCheck } from 'lucide-react'
import { ServicePageLayout } from '@/components/layout/ServicePageLayout'
import { ServiceCard } from '@/components/sections/services/ServiceCard'

const cardKeys = [
  { key: 'chatbots' as const, Icon: MessageSquare, accent: 'bg-teal', iconColor: 'text-teal' },
  { key: 'internalTools' as const, Icon: Wrench, accent: 'bg-navy', iconColor: 'text-navy' },
  { key: 'voiceAgents' as const, Icon: Phone, accent: 'bg-teal', iconColor: 'text-teal' },
  { key: 'automations' as const, Icon: Zap, accent: 'bg-gold', iconColor: 'text-gold' },
  { key: 'mvps' as const, Icon: Rocket, accent: 'bg-navy', iconColor: 'text-navy' },
  { key: 'audit' as const, Icon: ClipboardCheck, accent: 'bg-teal', iconColor: 'text-teal' },
]

const stepKeys = ['step1', 'step2', 'step3', 'step4', 'step5'] as const

const verticalKeys = [
  'hotels', 'restaurants', 'accounting', 'legal',
  'medical', 'realEstate', 'retail', 'schools',
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services.ai.meta' })
  return { title: t('title'), description: t('description') }
}

export default function AIServicesPage() {
  const t = useTranslations('services.ai')
  const locale = useLocale()

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

      {/* Section B — How it works */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-slate-50 p-8">
            <p className="text-xs font-medium uppercase tracking-widest text-teal">{t('process.label')}</p>
            <h2 className="mt-2 text-2xl font-bold text-navy">{t('process.heading')}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-5">
              {stepKeys.map((step, i) => (
                <div key={step} className="flex gap-4 sm:flex-col sm:gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{t(`process.${step}.title`)}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t(`process.${step}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section C — Verticals */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-teal">{t('verticals.label')}</p>
          <h2 className="mt-2 text-2xl font-bold text-navy">{t('verticals.heading')}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {verticalKeys.map((key) => (
              <div
                key={key}
                className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <p className="font-semibold text-navy">{t(`verticals.${key}.name`)}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(`verticals.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  )
}
