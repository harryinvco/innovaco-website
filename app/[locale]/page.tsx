import { Hero } from '@/components/sections/home/Hero'
import { ServicesOverview } from '@/components/sections/home/ServicesOverview'
import { TrustSignals } from '@/components/sections/home/TrustSignals'
import { ProcessSteps } from '@/components/sections/home/ProcessSteps'
import { BeforeAfter } from '@/components/sections/home/BeforeAfter'
import { HomeCTA } from '@/components/sections/home/HomeCTA'
import { JsonLd } from '@/components/shared/JsonLd'

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Krystallo Cleaning Services',
          description:
            'Professional biological cleaning services in Cyprus. Car, sofa, mattress, carpet cleaning and more.',
          telephone: '+35796653034',
          url: 'https://krystallo.cy',
          areaServed: {
            '@type': 'Country',
            name: 'Cyprus',
          },
          serviceType: [
            'Car Cleaning',
            'Sofa Cleaning',
            'Mattress Cleaning',
            'Carpet Cleaning',
            'Leather Sofa Cleaning',
            'Chair Cleaning',
            'Radiator Cleaning',
            'Stroller Cleaning',
          ],
        }}
      />
      <Hero />
      <ServicesOverview />
      <BeforeAfter />
      <TrustSignals />
      <ProcessSteps />
      <HomeCTA />
    </>
  )
}
