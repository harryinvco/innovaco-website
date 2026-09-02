import { getTranslations } from 'next-intl/server'
import { Hero } from '@/components/sections/home/Hero'
import { TrustBar } from '@/components/sections/home/TrustBar'
import { ServicesOverview } from '@/components/sections/home/ServicesOverview'
import { PricingPreview } from '@/components/sections/home/PricingPreview'
import { BeforeAfter } from '@/components/sections/home/BeforeAfter'
import { TrustSignals } from '@/components/sections/home/TrustSignals'
import { ProcessSteps } from '@/components/sections/home/ProcessSteps'
import { Reviews } from '@/components/sections/home/Reviews'
import { Faq } from '@/components/sections/home/Faq'
import { HomeCTA } from '@/components/sections/home/HomeCTA'
import { JsonLd } from '@/components/shared/JsonLd'
import { faqIds } from '@/lib/faq'
import { entryPrice, services } from '@/lib/services'
import { site } from '@/lib/site'

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'common' })
  const tServices = await getTranslations({ locale, namespace: 'services' })
  const tFaq = await getTranslations({ locale, namespace: 'homepage.faq' })

  const prices = services
    .map((s) => entryPrice(s))
    .filter((p): p is number => p !== null)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${site.url}/#business`,
          name: site.name,
          description: t('siteDescription'),
          telephone: site.phoneE164,
          url: site.url,
          image: `${site.url}/images/logo.png`,
          priceRange: `€${Math.min(...prices)}–€${Math.max(...prices)}`,
          openingHours: site.openingHours,
          areaServed: { '@type': 'Country', name: site.areaServed },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: tServices('pageTitle'),
            itemListElement: services.map((service) => {
              const from = entryPrice(service)
              return {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: tServices(`${service.id}.name`),
                  description: tServices(`${service.id}.description`),
                },
                ...(from !== null
                  ? { priceCurrency: 'EUR', price: from }
                  : {}),
              }
            }),
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqIds.map((id) => ({
            '@type': 'Question',
            name: tFaq(`q${id}`),
            acceptedAnswer: { '@type': 'Answer', text: tFaq(`a${id}`) },
          })),
        }}
      />

      <Hero />
      <TrustBar />
      <ServicesOverview />
      <PricingPreview />
      <BeforeAfter />
      <TrustSignals />
      <ProcessSteps />
      <Reviews />
      <Faq />
      <HomeCTA />
    </>
  )
}
