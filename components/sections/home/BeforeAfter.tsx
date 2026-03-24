'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { cn } from '@/lib/utils'

const gallery = [
  { id: 'mattress', before: '/images/mattress-before.webp', after: '/images/mattress-after.webp', branded: '/images/mattress-before-after.webp' },
  { id: 'leather', branded: '/images/leather-sofa-before-after.webp' },
  { id: 'radiator', branded: '/images/radiator-before-after.webp' },
]

export function BeforeAfter() {
  const t = useTranslations('homepage.gallery')
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['mattress', 'leather', 'radiator'] as const

  return (
    <section className="py-20 lg:py-28 bg-slate-50/70 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.04),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-crystal/10 text-crystal text-sm font-medium px-3.5 py-1.5 rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-3 text-body/70 text-lg max-w-lg mx-auto">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={cn(
                  'px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  activeTab === i
                    ? 'bg-crystal text-white shadow-sm'
                    : 'text-body/60 hover:text-navy-dark'
                )}
              >
                {t(tab)}
              </button>
            ))}
          </div>
        </div>

        {/* Image display area */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Featured before/after for mattress */}
              {activeTab === 0 && gallery[0].before && gallery[0].after ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative group overflow-hidden rounded-2xl">
                      <Image
                        src={gallery[0].before}
                        alt={t('before')}
                        width={600}
                        height={450}
                        className="object-cover w-full aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                        {t('before')}
                      </span>
                    </div>
                    <div className="relative group overflow-hidden rounded-2xl">
                      <Image
                        src={gallery[0].after}
                        alt={t('after')}
                        width={600}
                        height={450}
                        className="object-cover w-full aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-3 left-3 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                        {t('after')}
                      </span>
                    </div>
                  </div>
                  {/* Branded composite */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src={gallery[0].branded!}
                      alt={t('mattress')}
                      width={800}
                      height={450}
                      className="object-cover w-full aspect-[16/9]"
                    />
                  </div>
                </div>
              ) : (
                /* Single branded image for other tabs */
                <div className="relative overflow-hidden rounded-2xl group">
                  <Image
                    src={gallery[activeTab].branded!}
                    alt={t(tabs[activeTab])}
                    width={800}
                    height={600}
                    className="object-cover w-full aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="absolute bottom-5 left-5 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t(tabs[activeTab])}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail strip */}
        <div className="flex justify-center gap-2 mt-6">
          {tabs.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300',
                activeTab === i
                  ? 'bg-crystal w-8'
                  : 'bg-slate-300 hover:bg-slate-400'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
