'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { cn } from '@/lib/utils'

const gallery = [
  {
    id: 'mattress',
    before: '/images/mattress-before.webp',
    after: '/images/mattress-after.webp',
    composite: '/images/mattress-before-after.webp',
  },
  { id: 'leather', composite: '/images/leather-sofa-before-after.webp' },
  { id: 'radiator', composite: '/images/radiator-before-after.webp' },
] as const

export function BeforeAfter() {
  const t = useTranslations('homepage.gallery')
  const [active, setActive] = useState(0)
  const current = gallery[active]

  return (
    <section className="section relative overflow-hidden bg-ink-50/60">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(38,120,209,0.05),transparent_65%)]" />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label={t('title')}
            className="inline-flex rounded-xl border border-ink-100 bg-white p-1 shadow-sm"
          >
            {gallery.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  'rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 sm:px-6',
                  active === i
                    ? 'bg-crystal-500 text-white shadow-sm'
                    : 'text-ink-400 hover:text-ink-800'
                )}
              >
                {t(item.id)}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {'before' in current && current.before && current.after && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { src: current.before, label: t('before'), tone: 'bg-ink-900/80' },
                    { src: current.after, label: t('after'), tone: 'bg-crystal-500' },
                  ].map((panel) => (
                    <figure
                      key={panel.label}
                      className="group relative overflow-hidden rounded-2xl"
                    >
                      <Image
                        src={panel.src}
                        alt={`${t(current.id)} — ${panel.label}`}
                        width={640}
                        height={480}
                        sizes="(max-width: 768px) 45vw, 380px"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      <figcaption
                        className={cn(
                          'absolute bottom-3 left-3 rounded-lg px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm',
                          panel.tone
                        )}
                      >
                        {panel.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              <div className="overflow-hidden rounded-2xl shadow-card">
                <Image
                  src={current.composite}
                  alt={t(current.id)}
                  width={960}
                  height={720}
                  sizes="(max-width: 768px) 92vw, 768px"
                  className={cn(
                    'w-full object-cover',
                    'before' in current && current.before
                      ? 'aspect-[16/9]'
                      : 'aspect-[4/3]'
                  )}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {gallery.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActive(i)}
              aria-label={t(item.id)}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                active === i ? 'w-8 bg-crystal-500' : 'w-2.5 bg-ink-200 hover:bg-ink-300'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
