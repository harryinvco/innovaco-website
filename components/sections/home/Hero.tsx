'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  MessageCircle,
  Phone,
  Sparkles,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { entryPrice, services } from '@/lib/services'
import { euro } from '@/lib/price'
import { site } from '@/lib/site'

/** The cheapest published figure anywhere on the price list */
const lowestPrice = Math.min(
  ...services.map((s) => entryPrice(s)).filter((p): p is number => p !== null)
)

const sparkles = [
  { top: '14%', left: '6%', size: 'h-5 w-5', delay: 0 },
  { top: '24%', right: '10%', size: 'h-6 w-6', delay: 0.9 },
  { top: '68%', left: '13%', size: 'h-4 w-4', delay: 1.7 },
  { top: '48%', right: '28%', size: 'h-5 w-5', delay: 0.4 },
]

export function Hero() {
  const t = useTranslations('homepage.hero')
  const tc = useTranslations('common')
  const locale = useLocale()

  const points = [t('point1'), t('point2'), t('point3')]

  return (
    <section className="header-bleed relative overflow-hidden">
      {/* Layered brand background */}
      <div className="absolute inset-0 bg-gradient-to-b from-crystal-50/70 via-white to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_-10%,rgba(38,120,209,0.16),transparent)]" />
      <div className="absolute -right-24 top-1/4 h-[520px] w-[520px] rounded-full bg-aqua-300/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full bg-crystal-400/10 blur-3xl" />

      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          aria-hidden
          animate={{ scale: [0.6, 1.15, 0.6], opacity: [0.15, 0.45, 0.15], rotate: [0, 180, 360] }}
          transition={{ duration: 5, repeat: Infinity, delay: s.delay }}
          className="absolute hidden text-aqua-400/40 sm:block"
          style={{ top: s.top, left: s.left, right: s.right }}
        >
          <Sparkles className={s.size} />
        </motion.div>
      ))}

      <div className="container-page relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="eyebrow"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {t('badge')}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="heading-1 mt-5"
            >
              {t('headline')}
              <span className="block text-gradient-brand">
                {t('headlineAccent')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="lead mt-5 max-w-xl"
            >
              {t('subheadline')}
            </motion.p>

            {/* Reasons to keep reading */}
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
            >
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-sm font-medium text-ink-700"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-crystal-100">
                    <Check className="h-3 w-3 text-crystal-600" strokeWidth={3} aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link href={`/${locale}/quote`} className="sm:w-auto">
                <Button size="lg" className="group w-full">
                  {t('ctaPrimary')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Button>
              </Link>
              <Link href={`/${locale}/pricing`} className="sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  {t('ctaSecondary')}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <a
                href={`tel:${site.phoneE164}`}
                className="group flex items-center gap-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-crystal-50 transition-colors group-hover:bg-crystal-100">
                  <Phone className="h-4 w-4 text-crystal-600" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs text-ink-400">{t('ctaPhone')}</span>
                  <span className="font-display font-bold text-ink-900">
                    {tc('phone')}
                  </span>
                </span>
              </a>

              <span className="hidden h-9 w-px bg-ink-100 sm:block" />

              <span className="flex items-center gap-2 text-sm text-ink-500">
                <Users className="h-4 w-4 text-crystal-500" aria-hidden />
                <strong className="font-semibold text-ink-800">500+</strong>
                {t('happyClients')}
              </span>
            </motion.div>
          </div>

          {/* Image composition */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-crystal-200/40 to-aqua-200/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-crystal-900/15">
              <Image
                src="/images/work-in-action.webp"
                alt={t('imageCaption')}
                width={720}
                height={720}
                className="aspect-[4/3] w-full object-cover sm:aspect-square lg:aspect-[4/3]"
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/70 to-transparent" />
              <p className="absolute inset-x-5 bottom-4 text-sm font-medium text-white/90">
                {t('imageCaption')}
              </p>
            </div>

            {/* Price anchor — the single strongest thing to show early */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.45 }}
              className="absolute -left-3 top-6 rounded-2xl border border-ink-100 bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:-left-6"
            >
              <p className="text-[11px] font-medium text-ink-400">
                {t('priceAnchor')}
              </p>
              <p className="font-display text-2xl font-extrabold text-crystal-600">
                {euro(lowestPrice)}
              </p>
              <p className="text-[11px] text-ink-400">{t('priceAnchorUnit')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85, duration: 0.45 }}
              className="absolute -bottom-5 -right-2 flex items-center gap-3 rounded-2xl border border-ink-100 bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:-right-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-whatsapp/10">
                <MessageCircle className="h-5 w-5 text-whatsapp" aria-hidden />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] text-ink-400">
                  {t('quickResponse')}
                </span>
                <span className="font-display text-sm font-bold text-ink-900">
                  {t('quickResponseTime')}
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
