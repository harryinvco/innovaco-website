'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Users, Sparkles, Leaf, Clock } from 'lucide-react'

const statConfig = [
  { icon: Users, color: 'from-sky-500 to-blue-600' },
  { icon: Sparkles, color: 'from-violet-500 to-purple-600' },
  { icon: Leaf, color: 'from-emerald-500 to-green-600' },
  { icon: Clock, color: 'from-amber-500 to-orange-600' },
]

export function TrustSignals() {
  const t = useTranslations('homepage.trust')

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.04),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 bg-crystal/10 text-crystal text-sm font-medium px-3.5 py-1.5 rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
            {t('title')}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {stats.map((stat, i) => {
            const { icon: Icon, color } = statConfig[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="group relative text-center p-6 sm:p-8 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300">
                  {/* Gradient icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="text-3xl sm:text-4xl font-extrabold text-navy-dark mb-1 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-body/60 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
