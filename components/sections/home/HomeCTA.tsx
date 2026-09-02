'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { generateWhatsAppLink } from '@/lib/services'
import { site } from '@/lib/site'

const sparklePositions = [
  { top: '12%', left: '6%', delay: 0 },
  { top: '22%', right: '9%', delay: 1 },
  { bottom: '16%', left: '13%', delay: 2 },
  { bottom: '26%', right: '16%', delay: 0.6 },
]

export function HomeCTA() {
  const t = useTranslations('homepage.cta')
  const tc = useTranslations('common')

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-crystal-900 to-ink-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(110,207,225,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(38,120,209,0.25),transparent_60%)]" />

      {sparklePositions.map((pos, i) => (
        <motion.div
          key={i}
          aria-hidden
          animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.85, 1.1, 0.85] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: pos.delay }}
          className="absolute text-aqua-300/30"
          style={pos}
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
      ))}

      <div className="container-page relative">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <Image
            src="/images/logo-white.png"
            alt={site.name}
            width={240}
            height={145}
            className="mx-auto h-12 w-auto opacity-70"
          />

          <h2 className="mt-7 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            {t('subtitle')}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={`tel:${site.phoneE164}`} className="sm:w-auto">
              <Button variant="inverse" size="lg" className="w-full">
                <Phone className="h-5 w-5 text-crystal-600" aria-hidden />
                {t('phone')} — {tc('phone')}
              </Button>
            </a>
            <a
              href={generateWhatsAppLink(tc('defaultWhatsAppMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:w-auto"
            >
              <Button variant="whatsapp" size="lg" className="w-full">
                <MessageCircle className="h-5 w-5" aria-hidden />
                {t('whatsapp')}
              </Button>
            </a>
          </div>

          <p className="mt-8 text-sm text-white/40">{t('trustLine')}</p>
        </AnimatedSection>
      </div>
    </section>
  )
}
