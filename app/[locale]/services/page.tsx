'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import {
  Car,
  Sofa,
  BedDouble,
  Heater,
  SquareDashedBottom,
  Armchair,
  Baby,
  CheckCircle2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedSection, AnimatedItem } from '@/components/shared/AnimatedSection'
import { services as serviceData } from '@/lib/services'

const iconMap: Record<string, React.ElementType> = {
  Car,
  Sofa,
  BedDouble,
  Heater,
  SquareDashedBottom,
  Armchair,
  ArmchairIcon: Armchair,
  Baby,
}

export default function ServicesPage() {
  const t = useTranslations('services')
  const tc = useTranslations('common')
  const locale = useLocale()

  return (
    <section className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <Badge className="mb-4">{t('pageTitle')}</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-dark">
            {t('pageTitle')}
          </h1>
          <p className="mt-4 text-body text-lg max-w-2xl mx-auto">
            {t('pageSubtitle')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceData.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <AnimatedItem key={service.id} delay={i * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-crystal/10 flex items-center justify-center shrink-0">
                        <Icon className="h-7 w-7 text-crystal" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {t(`${service.id}.name`)}
                        </CardTitle>
                        <p className="text-sm text-crystal font-semibold mt-1">
                          {t('startingFrom')} &euro;{service.priceMin} {t('perUnit')}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-sm mb-4">
                      {t(`${service.id}.description`)}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.benefitKeys.map((_, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-crystal shrink-0 mt-0.5" />
                          <span className="text-body">
                            {t(`${service.id}.benefit${bi + 1}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/${locale}/quote?service=${service.id}`}>
                      <Button variant="secondary" size="sm" className="w-full">
                        {t('requestQuote')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedItem>
            )
          })}
        </div>
      </div>
    </section>
  )
}
