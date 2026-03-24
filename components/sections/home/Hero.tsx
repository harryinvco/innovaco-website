'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Sparkles, Phone, MessageCircle, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const t = useTranslations('homepage.hero')
  const locale = useLocale()

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.12),transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-crystal-50/30 to-white" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-crystal/[0.04] rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-crystal/[0.06] rounded-full blur-3xl" />

      {/* Animated sparkles */}
      {[
        { top: '15%', left: '8%', delay: 0, size: 'h-5 w-5' },
        { top: '25%', right: '12%', delay: 0.8, size: 'h-6 w-6' },
        { top: '65%', left: '15%', delay: 1.6, size: 'h-4 w-4' },
        { top: '45%', right: '25%', delay: 0.4, size: 'h-5 w-5' },
      ].map((s, i) => (
        <motion.div
          key={i}
          animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.15, 0.5, 0.15], rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity, delay: s.delay }}
          className="absolute text-crystal/25"
          style={{ top: s.top, left: s.left, right: s.right }}
        >
          <Sparkles className={s.size} />
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 bg-crystal/10 text-crystal text-sm font-medium px-4 py-1.5 rounded-full">
                <Sparkles className="h-3.5 w-3.5" />
                {t('badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-navy-dark leading-[1.1] tracking-tight"
            >
              {t('headline')}
              <br />
              <span className="bg-gradient-to-r from-crystal to-crystal-600 bg-clip-text text-transparent">
                {t('headlineAccent')}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-lg text-body/80 max-w-lg leading-relaxed"
            >
              {t('subheadline')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link href={`/${locale}/quote`}>
                <Button size="lg" className="w-full sm:w-auto text-base shadow-lg shadow-crystal/20 group">
                  {t('ctaPrimary')}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link href={`/${locale}/book`}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base">
                  {t('ctaSecondary')}
                </Button>
              </Link>
            </motion.div>

            {/* Phone + social proof row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            >
              <a
                href="tel:+35796653034"
                className="flex items-center gap-2 text-sm text-body hover:text-crystal transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-crystal/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-crystal" />
                </div>
                <span>
                  <span className="text-body/60 block text-xs">{t('ctaPhone')}</span>
                  <span className="font-semibold text-navy-dark">96653034</span>
                </span>
              </a>
              <div className="hidden sm:block w-px h-8 bg-slate-200" />
              {/* Mini social proof */}
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-body/60 ml-1">500+ {t('happyClients')}</span>
              </div>
            </motion.div>
          </div>

          {/* Hero image composition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Glow behind image */}
            <div className="absolute -inset-8 bg-gradient-to-br from-crystal/10 to-crystal/5 rounded-[2rem] blur-2xl" />

            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-crystal/10">
              <Image
                src="/images/work-in-action.webp"
                alt="Krystallo Cleaning Services - Professional biological cleaning"
                width={600}
                height={600}
                className="relative object-cover w-full"
                priority
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-dark/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/90 text-sm font-medium">{t('imageCaption')}</p>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-4 -left-6 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 border border-slate-100"
            >
              <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
              </div>
              <div>
                <p className="text-xs text-body/60">{t('quickResponse')}</p>
                <p className="text-sm font-bold text-navy-dark">{t('quickResponseTime')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
