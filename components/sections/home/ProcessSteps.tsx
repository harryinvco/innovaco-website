'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { ListChecks, Calculator, CalendarCheck, SprayCan, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stepConfig = [
  { icon: ListChecks, gradient: 'from-sky-500 to-blue-600', href: '/services' },
  { icon: Calculator, gradient: 'from-violet-500 to-purple-600', href: '/quote' },
  { icon: CalendarCheck, gradient: 'from-emerald-500 to-green-600', href: '/book' },
  { icon: SprayCan, gradient: 'from-amber-500 to-orange-500', href: null },
]

export function ProcessSteps() {
  const t = useTranslations('homepage.process')
  const locale = useLocale()

  const steps = [
    { title: t('step1Title'), desc: t('step1Desc') },
    { title: t('step2Title'), desc: t('step2Desc') },
    { title: t('step3Title'), desc: t('step3Desc') },
    { title: t('step4Title'), desc: t('step4Desc') },
  ]

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50/80 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 bg-crystal/10 text-crystal text-sm font-medium px-3.5 py-1.5 rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
            {t('title')}
          </h2>
        </AnimatedSection>

        {/* Timeline layout */}
        <div className="relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5">
            <div className="w-full h-full bg-slate-200 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-crystal to-crystal-400 rounded-full"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {steps.map((step, i) => {
              const { icon: Icon, gradient, href } = stepConfig[i]
              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                  className="group relative text-center"
                >
                  {/* Step circle */}
                  <div className="relative mx-auto mb-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    {/* Step number badge */}
                    <span className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-white text-navy-dark text-xs font-bold rounded-full flex items-center justify-center shadow-md border border-slate-100">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-navy-dark mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-body/60 leading-relaxed max-w-[200px] mx-auto">
                    {step.desc}
                  </p>
                </motion.div>
              )

              return href ? (
                <Link key={i} href={`/${locale}${href}`} className="block">
                  {content}
                </Link>
              ) : (
                <div key={i}>{content}</div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center mt-14" delay={0.4}>
          <Link href={`/${locale}/book`}>
            <Button size="lg" className="shadow-lg shadow-crystal/20 group">
              {t('step3Title')}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
