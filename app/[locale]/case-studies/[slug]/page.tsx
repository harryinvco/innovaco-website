import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { useLocale, useTranslations } from 'next-intl'
import { allCaseStudies } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Check } from 'lucide-react'
import { CaseStudyCard } from '@/components/sections/case-studies/CaseStudyCard'
import { HomeCTA } from '@/components/sections/home/HomeCTA'
import { JsonLd } from '@/components/shared/JsonLd'

export function generateStaticParams() {
  return allCaseStudies.flatMap((cs) => [
    { slug: cs.slug, locale: 'en' },
    { slug: cs.slug, locale: 'el' },
  ])
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const cs = allCaseStudies.find((c) => c.slug === slug)
  if (!cs) return {}
  const t = await getTranslations({ locale, namespace: 'caseStudies' })
  return {
    title: locale === 'el' ? cs.titleEl : cs.title,
    description: locale === 'el' ? cs.summaryEl : cs.summary,
  }
}

function MDXBody({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code)
  return (
    <div className="prose prose-slate prose-lg max-w-none prose-headings:text-navy prose-p:leading-relaxed prose-a:text-teal prose-strong:text-navy prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-navy prose-code:before:content-none prose-code:after:content-none">
      <MDXContent />
    </div>
  )
}

export default function CaseStudyDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const t = useTranslations('caseStudies')
  const locale = useLocale()

  const caseStudy = allCaseStudies.find((cs) => cs.slug === params.slug)
  if (!caseStudy) notFound()

  const title = locale === 'el' ? caseStudy.titleEl : caseStudy.title

  const related = allCaseStudies
    .filter((cs) => cs.slug !== caseStudy.slug)
    .slice(0, 2)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          datePublished: caseStudy.date,
          author: { '@type': 'Person', name: 'Harry Newton' },
        }}
      />
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
            {/* Main column */}
            <div>
              {/* Hero card */}
              <div className="rounded-2xl bg-navy px-8 py-10">
                <span className="rounded-full bg-teal/20 px-3 py-1 text-xs font-medium text-teal-100">
                  {caseStudy.sector}
                </span>
                <h1 className="mt-4 text-3xl font-bold text-white">{title}</h1>
                <p className="mt-2 text-sm text-slate-400">
                  {new Date(caseStudy.date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {/* Results bar */}
              {caseStudy.results && caseStudy.results.length > 0 && (
                <div className="mt-8 rounded-xl bg-teal-50 p-6">
                  <p className="font-semibold text-teal">
                    {t('detail.keyResults')}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {caseStudy.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" />
                        <span className="text-sm text-body">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* MDX content */}
              <div className="mt-8">
                <MDXBody code={caseStudy.body.code} />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              {/* CTA card */}
              <div className="rounded-2xl bg-navy p-6 text-white">
                <p className="text-lg font-bold">
                  {t('detail.sidebar.heading')}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {t('detail.sidebar.body')}
                </p>
                <Link
                  href={`/${locale}/book`}
                  className="mt-4 block rounded-xl bg-teal px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-teal-light"
                >
                  {t('detail.sidebar.cta')}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="mt-3 block text-center text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {t('detail.sidebar.contactLink')}
                </Link>
              </div>

              {/* Tags */}
              {caseStudy.tags.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t('detail.topics')}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {caseStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Related case studies */}
      {related.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy">
              {t('detail.moreCaseStudies')}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {related.map((cs) => (
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
      )}

      <HomeCTA />
    </>
  )
}
