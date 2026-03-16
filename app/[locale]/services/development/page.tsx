import { getTranslations } from 'next-intl/server'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { Globe, AppWindow, LayoutDashboard, Smartphone, Cable, Rocket } from 'lucide-react'
import { ServicePageLayout } from '@/components/layout/ServicePageLayout'
import { ServiceCard } from '@/components/sections/services/ServiceCard'

const cardKeys = [
  { key: 'websites' as const, Icon: Globe, accent: 'bg-navy', iconColor: 'text-navy' },
  { key: 'webApps' as const, Icon: AppWindow, accent: 'bg-teal', iconColor: 'text-teal' },
  { key: 'dashboards' as const, Icon: LayoutDashboard, accent: 'bg-gold', iconColor: 'text-gold' },
  { key: 'mobile' as const, Icon: Smartphone, accent: 'bg-teal', iconColor: 'text-teal' },
  { key: 'apis' as const, Icon: Cable, accent: 'bg-navy', iconColor: 'text-navy' },
  { key: 'aiMvp' as const, Icon: Rocket, accent: 'bg-teal', iconColor: 'text-teal' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services.development.meta' })
  return { title: t('title'), description: t('description') }
}

export default function DevelopmentPage() {
  const t = useTranslations('services.development')
  const locale = useLocale()

  const badges: string[] = t.raw('techStack.badges')

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

      {/* Section B — Tech stack */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-slate-50 p-8">
            <p className="text-xs font-medium uppercase tracking-widest text-teal">{t('techStack.label')}</p>
            <h2 className="mt-2 text-2xl font-bold text-navy">{t('techStack.heading')}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {badges.map((badge: string) => (
                <span
                  key={badge}
                  className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 font-mono text-sm font-medium text-slate-700"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section C — Inspektra callout */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-teal-50 p-8 md:p-10">
            <blockquote className="text-lg font-medium text-navy">
              &ldquo;{t('inspektraCallout.quote')}&rdquo;
            </blockquote>
            <Link
              href={`/${locale}/case-studies`}
              className="mt-4 inline-block text-sm font-medium text-teal hover:underline"
            >
              {t('inspektraCallout.link')}
            </Link>
          </div>
        </div>
      </section>

      {/* Section D — No templates */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-navy">
                {t('noTemplates.heading')}
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                {t('noTemplates.body')}
              </p>
            </div>
            <ul className="space-y-4">
              {(['bullet1', 'bullet2', 'bullet3', 'bullet4'] as const).map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-teal" />
                  <span className="text-base text-body">{t(`noTemplates.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  )
}
