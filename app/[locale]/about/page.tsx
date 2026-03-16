import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { useLocale, useTranslations } from 'next-intl'
import { Award } from 'lucide-react'
import { JsonLd } from '@/components/shared/JsonLd'

const credKeys = ['cred1', 'cred2', 'cred3', 'cred4', 'cred5', 'cred6'] as const
const valueKeys = ['v1', 'v2', 'v3', 'v4', 'v5'] as const
const practiceKeys = ['practice1', 'practice2', 'practice3', 'practice4'] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about.meta' })
  return { title: t('title'), description: t('description') }
}

export default function AboutPage() {
  const t = useTranslations('about')
  const locale = useLocale()

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Harry Newton',
          jobTitle: 'CEO, HN Innovaco Ltd',
          worksFor: { '@type': 'Organization', name: 'HN Innovaco Ltd' },
        }}
      />
      {/* A — Hero */}
      <section className="bg-navy-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-teal">
            {t('hero.label')}
          </p>
          <h1 className="mt-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            {t('hero.headline')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            {t('hero.subheadline')}
          </p>
        </div>
      </section>

      {/* B — The company */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4 text-base leading-relaxed text-body">
              <p>{t('company.p1')}</p>
              <p>{t('company.p2')}</p>
              <p>{t('company.p3')}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {(['stat1', 'stat2', 'stat3'] as const).map((key) => (
                <div
                  key={key}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center"
                >
                  <p className="font-mono text-2xl font-bold text-teal">{t(`company.${key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* C — Harry Newton */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr]">
            {/* Photo placeholder */}
            <div className="flex items-start justify-center">
              <div className="flex h-[400px] w-[320px] items-center justify-center rounded-2xl bg-navy-100 text-sm text-muted-foreground">
                {t('harry.photoAlt')}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy">{t('harry.name')}</h2>
              <p className="mt-1 text-lg text-teal">{t('harry.title')}</p>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-body">
                <p>{t('harry.bio1')}</p>
                <p>{t('harry.bio2')}</p>
                <p>{t('harry.bio3')}</p>
              </div>
              <div className="mt-8 space-y-3">
                {credKeys.map((key) => (
                  <div key={key} className="flex items-center gap-2">
                    <Award className="h-4 w-4 flex-shrink-0 text-teal" />
                    <span className="text-sm text-body">{t(`harry.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D — Nikolas */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-navy">{t('nikolas.name')}</h3>
            <p className="mt-1 text-sm text-teal">{t('nikolas.title')}</p>
            <p className="mt-4 text-base text-body">{t('nikolas.bio')}</p>
          </div>
        </div>
      </section>

      {/* E — Values */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-teal">
            {t('values.label')}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-navy">{t('values.heading')}</h2>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5">
            {valueKeys.map((key) => (
              <div
                key={key}
                className="min-w-[220px] flex-shrink-0 rounded-xl border border-slate-200 bg-white p-5 sm:min-w-0"
              >
                <p className="font-semibold text-navy">{t(`values.${key}.name`)}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`values.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F — Vision */}
      <section className="bg-navy-dark py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-teal-100">
            {t('vision.label')}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            {t('vision.headline')}
          </h2>
          <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-slate-300">
            <p>{t('vision.p1')}</p>
            <p>{t('vision.p2')}</p>
            <p>{t('vision.p3')}</p>
          </div>
          <div className="mt-10">
            <p className="font-semibold text-white">{t('vision.practiceHeading')}</p>
            <ul className="mt-4 space-y-2">
              {practiceKeys.map((key) => (
                <li key={key} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />
                  {t(`vision.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* G — CTA */}
      <section className="bg-gradient-to-r from-teal to-navy py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t('ctaSection.headline')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            {t('ctaSection.subheadline')}
          </p>
          <div className="mt-8">
            <Link
              href={`/${locale}/book`}
              className="inline-flex rounded-xl bg-white px-6 py-3 font-medium text-navy transition-colors hover:bg-slate-100"
            >
              {t('ctaSection.cta')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
