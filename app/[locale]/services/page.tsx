import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedItem } from '@/components/shared/AnimatedSection'
import { ServiceIcon } from '@/components/shared/ServiceIcon'
import { generateWhatsAppLink, services as serviceData } from '@/lib/services'
import { tierPriceText } from '@/lib/price'
import { site } from '@/lib/site'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' })
  return {
    title: t('pageTitle'),
    description: t('pageSubtitle'),
    alternates: { canonical: `/${locale}/services` },
  }
}

export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'services' })
  const tRoot = await getTranslations({ locale })
  const tc = await getTranslations({ locale, namespace: 'common' })

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-gradient-to-b from-crystal-50/70 to-white py-14 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(38,120,209,0.12),transparent)]" />
        <div className="container-page relative text-center">
          <span className="eyebrow">{t('badge')}</span>
          <h1 className="heading-1 mt-5">{t('pageTitle')}</h1>
          <p className="lead mx-auto mt-4 max-w-2xl">{t('pageSubtitle')}</p>
        </div>
      </section>

      <section className="section-below-header">
        <div className="container-page">
          <div className="grid gap-5 lg:grid-cols-2">
            {serviceData.map((service, i) => (
              <AnimatedItem key={service.id} delay={Math.min(i, 5) * 0.05}>
                <article
                  id={service.id}
                  className="flex h-full scroll-mt-32 flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-crystal-50 to-aqua-50 ring-1 ring-inset ring-crystal-100">
                      <ServiceIcon
                        name={service.icon}
                        className="h-7 w-7 text-crystal-600"
                      />
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-bold text-ink-900">
                        {t(`${service.id}.name`)}
                      </h2>
                      <p className="mt-0.5 text-sm text-ink-400">
                        {t(`${service.id}.short`)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-ink-500">
                    {t(`${service.id}.description`)}
                  </p>

                  {/* Price block, straight from the price list */}
                  <div className="mt-5 rounded-xl bg-crystal-50/70 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-crystal-700">
                      {t('priceLabel')}
                    </p>
                    <ul className="space-y-1.5">
                      {service.tiers.map((tier) => (
                        <li
                          key={tier.id}
                          className="flex items-baseline justify-between gap-3 text-sm"
                        >
                          <span className="text-ink-600">
                            {t(`${service.id}.tiers.${tier.id}`)}
                          </span>
                          <span className="shrink-0 font-display font-bold text-ink-900 tabular">
                            {tierPriceText(tier, tRoot)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {service.conditionDependent && (
                      <p className="mt-2.5 text-xs text-ink-400">
                        {tRoot('price.conditionNote')}
                      </p>
                    )}
                  </div>

                  <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wider text-ink-400">
                    {t('whatWeDo')}
                  </p>
                  <ul className="space-y-2">
                    {[1, 2, 3].map((n) => (
                      <li key={n} className="flex items-start gap-2 text-sm">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-crystal-500"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        <span className="text-ink-600">
                          {t(`${service.id}.benefit${n}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-col gap-2 pt-1 sm:flex-row">
                    <Link
                      href={`/${locale}/quote?service=${service.id}`}
                      className="sm:flex-1"
                    >
                      <Button className="group w-full">
                        {t('requestQuote')}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Button>
                    </Link>
                    <a
                      href={generateWhatsAppLink(
                        `${tc('defaultWhatsAppMessage')} (${t(`${service.id}.name`)})`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:w-auto"
                    >
                      <Button variant="outline" className="w-full">
                        <MessageCircle
                          className="h-4 w-4 text-whatsapp"
                          aria-hidden
                        />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </article>
              </AnimatedItem>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-ink-100 bg-white p-6 text-center sm:p-8">
            <p className="text-sm text-ink-500">{tc('callUs')}</p>
            <a
              href={`tel:${site.phoneE164}`}
              className="mt-1 inline-block font-display text-2xl font-extrabold text-crystal-600 hover:text-crystal-700"
            >
              {tc('phone')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
