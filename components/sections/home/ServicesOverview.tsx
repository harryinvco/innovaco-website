'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import {
  Car, Sofa, BedDouble, Heater, SquareDashedBottom, Armchair, Baby, ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { services as serviceData } from '@/lib/services'

const iconMap: Record<string, React.ElementType> = {
  Car, Sofa, BedDouble, Heater, SquareDashedBottom,
  Armchair, ArmchairIcon: Armchair, Baby,
}

// Alternating subtle accent colors for visual variety
const accentColors = [
  'from-sky-500/10 to-sky-500/5',
  'from-emerald-500/10 to-emerald-500/5',
  'from-violet-500/10 to-violet-500/5',
  'from-amber-500/10 to-amber-500/5',
  'from-rose-500/10 to-rose-500/5',
  'from-cyan-500/10 to-cyan-500/5',
  'from-indigo-500/10 to-indigo-500/5',
  'from-orange-500/10 to-orange-500/5',
]

export function ServicesOverview() {
  const t = useTranslations('homepage.services')
  const tServices = useTranslations('services')
  const locale = useLocale()

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.03),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 bg-crystal/10 text-crystal text-sm font-medium px-3.5 py-1.5 rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-3 text-body/70 text-lg max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* Bento-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {serviceData.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <Link
                  href={`/${locale}/quote?service=${service.id}`}
                  className="group relative flex flex-col h-full p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 hover:border-crystal/20 hover:shadow-xl hover:shadow-crystal/5 transition-all duration-300"
                >
                  {/* Icon with gradient bg */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentColors[i]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-crystal" />
                  </div>

                  <h3 className="font-semibold text-navy-dark text-sm sm:text-[15px] leading-snug mb-1">
                    {tServices(`${service.id}.name`)}
                  </h3>

                  <p className="text-xs text-body/50 mt-auto pt-2">
                    {tServices('startingFrom')} &euro;{service.priceMin}
                  </p>

                  {/* Hover arrow */}
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-crystal/0 group-hover:bg-crystal/10 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <ArrowRight className="h-3 w-3 text-crystal" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <AnimatedSection className="text-center mt-10" delay={0.2}>
          <Link href={`/${locale}/services`}>
            <Button variant="secondary" className="group">
              {t('viewAll')}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
