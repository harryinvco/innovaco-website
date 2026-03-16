import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { allCaseStudies } from 'contentlayer/generated'
import { CaseStudyCard } from '@/components/sections/case-studies/CaseStudyCard'
import { CaseStudyFilter } from '@/components/sections/case-studies/CaseStudyFilter'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'caseStudies.meta' })
  return { title: t('title'), description: t('description') }
}

export default function CaseStudiesPage() {
  const t = useTranslations('caseStudies')

  const sorted = [...allCaseStudies].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const featured = sorted.filter((cs) => cs.featured)

  const caseStudyData = sorted.map((cs) => ({
    client: cs.client,
    sector: cs.sector,
    summary: cs.summary,
    results: cs.results ?? [],
    date: cs.date,
    slug: cs.slug,
  }))

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-dark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {t('hero.headline')}
          </h1>
          <p className="mt-4 text-lg text-slate-300">{t('hero.subheadline')}</p>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy">{t('featured')}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((cs) => (
              <CaseStudyCard
                key={cs.slug}
                client={cs.client}
                sector={cs.sector}
                summary={cs.summary}
                results={cs.results ?? []}
                date={cs.date}
                slug={cs.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All with filters */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-navy">{t('all')}</h2>
          <CaseStudyFilter caseStudies={caseStudyData} />
        </div>
      </section>
    </>
  )
}
