import { Hero } from '@/components/sections/home/Hero'
import { ProofBar } from '@/components/sections/home/ProofBar'
import { ServicesOverview } from '@/components/sections/home/ServicesOverview'
import { Differentiators } from '@/components/sections/home/Differentiators'
import { FeaturedCaseStudies } from '@/components/sections/home/FeaturedCaseStudies'
import { AnadCallout } from '@/components/sections/home/AnadCallout'
import { HomeCTA } from '@/components/sections/home/HomeCTA'
import { JsonLd } from '@/components/shared/JsonLd'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hninnovaco.com'

export const metadata = {
  title: 'HN Innovaco — AI & Digital Transformation Cyprus',
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'HN Innovaco Ltd',
          url: baseUrl,
          description: 'AI and digital transformation company, Larnaca, Cyprus',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Larnaca',
            addressCountry: 'CY',
          },
        }}
      />
      <Hero />
      <ProofBar />
      <ServicesOverview />
      <Differentiators />
      <FeaturedCaseStudies />
      <AnadCallout />
      <HomeCTA />
    </>
  )
}
