'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Bot, Code2, TrendingUp, GraduationCap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const cards = [
  { ns: 'ai' as const, Icon: Bot, href: '/services/ai', num: '01' },
  { ns: 'development' as const, Icon: Code2, href: '/services/development', num: '02' },
  { ns: 'growth' as const, Icon: TrendingUp, href: '/services/growth', num: '03' },
  { ns: 'training' as const, Icon: GraduationCap, href: '/services/training', num: '04' },
]

function BentoCard({
  Icon,
  title,
  description,
  price,
  linkText,
  href,
  num,
  index,
}: {
  Icon: LucideIcon
  title: string
  description: string
  price: string
  linkText: string
  href: string
  num: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <Link href={href} className="group relative block overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 transition-colors duration-300 hover:border-teal/30">
        <Icon className="h-12 w-12 text-navy" strokeWidth={1.2} />
        <h3 className="mt-5 text-2xl font-semibold text-navy">{title}</h3>
        <p className="mt-2 text-base text-muted-foreground">{description}</p>
        <p className="mt-4 font-mono text-sm font-medium text-teal">{price}</p>
        <span className="mt-3 inline-block text-sm font-medium text-navy group-hover:text-teal">
          {linkText}
        </span>
        {/* Decorative number */}
        <motion.span
          className="pointer-events-none absolute bottom-3 right-5 select-none text-8xl font-bold leading-none text-slate-100"
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
        >
          {num}
        </motion.span>
      </Link>
    </motion.div>
  )
}

export function ServicesOverview() {
  const t = useTranslations('homepage.servicesOverview')
  const locale = useLocale()

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-teal">
          {t('label')}
        </p>
        <h2 className="mt-2 text-4xl font-bold text-navy">{t('headline')}</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {t('description')}
        </p>

        {/* Top row — 2 large cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.slice(0, 2).map((card, i) => (
            <BentoCard
              key={card.ns}
              Icon={card.Icon}
              title={t(`${card.ns}.title`)}
              description={t(`${card.ns}.shortDesc`)}
              price={t(`${card.ns}.price`)}
              linkText={t(`${card.ns}.link`)}
              href={`/${locale}${card.href}`}
              num={card.num}
              index={i}
            />
          ))}
        </div>

        {/* Stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 rounded-2xl bg-slate-50 p-6"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:divide-x sm:divide-slate-200">
            {(['stat1', 'stat2', 'stat3'] as const).map((key) => (
              <div key={key} className="text-center">
                <p className="font-mono text-2xl font-bold text-teal">
                  {t(`${key}Label`)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(`${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom row — 2 smaller cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.slice(2).map((card, i) => (
            <BentoCard
              key={card.ns}
              Icon={card.Icon}
              title={t(`${card.ns}.title`)}
              description={t(`${card.ns}.shortDesc`)}
              price={t(`${card.ns}.price`)}
              linkText={t(`${card.ns}.link`)}
              href={`/${locale}${card.href}`}
              num={card.num}
              index={i + 2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
