import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { Award, BookOpen, BarChart3, UserCog, FileText } from 'lucide-react'
import { ServicePageLayout } from '@/components/layout/ServicePageLayout'

const programmeKeys = ['businessOwners', 'hospitality', 'dxSmes', 'promptEng', 'corporate'] as const
const consultingKeys = [
  { key: 'audit' as const, Icon: FileText },
  { key: 'roadmap' as const, Icon: BarChart3 },
  { key: 'fractionalCto' as const, Icon: UserCog },
  { key: 'euProject' as const, Icon: BookOpen },
]
const credentialKeys = ['item1', 'item2', 'item3', 'item4', 'item5'] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services.training.meta' })
  return { title: t('title'), description: t('description') }
}

export default function TrainingPage() {
  const t = useTranslations('services.training')

  return (
    <ServicePageLayout
      label={t('hero.label')}
      headline={t('hero.headline')}
      subheadline={t('hero.subheadline')}
      ctaText={t('hero.cta')}
      ctaHref="/book"
    >
      {/* Section A — ANAD callout */}
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-teal p-8 text-white md:p-10">
            <span className="pointer-events-none absolute -right-4 -top-4 select-none font-mono text-[8rem] font-bold leading-none text-white/10 md:text-[10rem]">
              {t('anadCallout.stat')}
            </span>
            <p className="relative text-lg">{t('anadCallout.body')}</p>
          </div>
        </div>
      </section>

      {/* Section B — Training programme cards */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy">{t('programmes.heading')}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmeKeys.map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <p className="text-lg font-bold text-navy">{t(`programmes.${key}.title`)}</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>{t(`programmes.${key}.duration`)}</p>
                  <p>{t(`programmes.${key}.audience`)}</p>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-sm text-muted-foreground line-through">
                    {t(`programmes.${key}.price`)}
                  </p>
                  <p className="font-mono text-lg font-bold text-teal">
                    {t(`programmes.${key}.anadPrice`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section C — Consulting services */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy">{t('consulting.heading')}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {consultingKeys.map(({ key, Icon }) => (
              <div
                key={key}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <Icon className="h-6 w-6 text-teal" />
                <p className="mt-3 text-lg font-semibold text-navy">
                  {t(`consulting.${key}.title`)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`consulting.${key}.description`)}
                </p>
                <p className="mt-3 text-sm font-semibold text-teal">
                  {t(`consulting.${key}.price`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D — Credentials */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy">{t('credentials.heading')}</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            {credentialKeys.map((key) => (
              <div
                key={key}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <Award className="h-5 w-5 flex-shrink-0 text-teal" />
                <span className="text-sm font-medium text-navy">{t(`credentials.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  )
}
