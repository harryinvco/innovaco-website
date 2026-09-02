import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Calculator, Heart, Info, MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PriceTable } from '@/components/shared/PriceTable'
import { JsonLd } from '@/components/shared/JsonLd'
import { generateWhatsAppLink, entryPrice, services } from '@/lib/services'
import { site } from '@/lib/site'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pricing' })
  return {
    title: t('pageTitle'),
    description: t('pageSubtitle'),
    alternates: { canonical: `/${locale}/pricing` },
  }
}

export default async function PricingPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'pricing' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const tServices = await getTranslations({ locale, namespace: 'services' })

  const notes = [t('note1'), t('note2'), t('note3'), t('note4')]

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'OfferCatalog',
          name: t('pageTitle'),
          url: `${site.url}/${locale}/pricing`,
          itemListElement: services.map((service, i) => {
            const from = entryPrice(service)
            return {
              '@type': 'Offer',
              position: i + 1,
              itemOffered: {
                '@type': 'Service',
                name: tServices(`${service.id}.name`),
              },
              ...(from !== null ? { priceCurrency: 'EUR', price: from } : {}),
            }
          }),
        }}
      />

      {/* Page header */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-gradient-to-b from-crystal-50/70 to-white py-14 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(38,120,209,0.12),transparent)]" />
        <div className="container-page relative text-center">
          <span className="eyebrow">{t('badge')}</span>
          <h1 className="heading-1 mt-5">{t('pageTitle')}</h1>
          <p className="lead mx-auto mt-4 max-w-2xl">{t('pageSubtitle')}</p>

          <p className="mx-auto mt-8 flex max-w-xl items-start gap-2.5 rounded-2xl border border-crystal-100 bg-white px-5 py-4 text-left text-sm leading-relaxed text-ink-500">
            <Heart className="mt-0.5 h-4 w-4 shrink-0 text-crystal-500" aria-hidden />
            <span>
              <strong className="font-semibold text-ink-800">
                {t('thanksTitle')}.
              </strong>{' '}
              {t('thanksBody')}
            </span>
          </p>
        </div>
      </section>

      <section className="section-below-header">
        <div className="container-page">
          <PriceTable />

          {/* Small print */}
          <div className="mt-10 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
            <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink-900">
              <Info className="h-4 w-4 text-crystal-500" aria-hidden />
              {t('notesTitle')}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {notes.map((note) => (
                <li
                  key={note}
                  className="flex gap-2.5 text-sm leading-relaxed text-ink-500"
                >
                  <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-crystal-400" />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Closing CTA */}
          <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-crystal-600 to-crystal-800 p-8 text-center sm:p-10">
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              {t('ctaBody')}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={generateWhatsAppLink(tc('defaultWhatsAppMessage'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  {tc('whatsappCta')}
                </Button>
              </a>
              <Link href={`/${locale}/quote`}>
                <Button variant="inverse" size="lg" className="w-full sm:w-auto">
                  <Calculator className="h-5 w-5 text-crystal-600" aria-hidden />
                  {t('calculatorCta')}
                </Button>
              </Link>
              <a href={`tel:${site.phoneE164}`} className="sm:hidden">
                <Button variant="inverse" size="lg" className="w-full">
                  <Phone className="h-5 w-5 text-crystal-600" aria-hidden />
                  {tc('phone')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
