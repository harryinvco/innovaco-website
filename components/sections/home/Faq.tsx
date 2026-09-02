'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedItem, AnimatedSection } from '@/components/shared/AnimatedSection'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { faqIds } from '@/lib/faq'
import { generateWhatsAppLink } from '@/lib/services'
import { cn } from '@/lib/utils'

export function Faq() {
  const t = useTranslations('homepage.faq')
  const tc = useTranslations('common')
  const [open, setOpen] = useState<number | null>(faqIds[0])

  return (
    <section className="section bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqIds.map((id, i) => {
            const isOpen = open === id
            return (
              <AnimatedItem
                key={id}
                delay={Math.min(i, 5) * 0.05}
                className={cn(
                  'overflow-hidden rounded-2xl border transition-colors duration-300',
                  isOpen
                    ? 'border-crystal-200 bg-crystal-50/40'
                    : 'border-ink-100 bg-white hover:border-ink-200'
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${id}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="font-display text-[15px] font-bold text-ink-900 sm:text-base">
                      {t(`q${id}`)}
                    </span>
                    <span
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                        isOpen
                          ? 'rotate-180 bg-crystal-500 text-white'
                          : 'bg-ink-50 text-ink-400'
                      )}
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-500 sm:px-6 sm:pb-6">
                        {t(`a${id}`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AnimatedItem>
            )
          })}
        </div>

        <AnimatedSection className="mt-10 text-center" delay={0.1}>
          <p className="mb-3 text-sm text-ink-400">{t('stillQuestions')}</p>
          <a
            href={generateWhatsAppLink(tc('defaultWhatsAppMessage'))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp">
              <MessageCircle className="h-4 w-4" aria-hidden />
              {tc('whatsappCta')}
            </Button>
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
