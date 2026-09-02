'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Info,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Receipt,
  ShoppingCart,
  Sparkles,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServiceIcon } from '@/components/shared/ServiceIcon'
import {
  calculateEstimate,
  entryPrice,
  generateWhatsAppLink,
  getService,
  getTier,
  services as serviceData,
  type QuoteSelection,
} from '@/lib/services'
import {
  euro,
  lineTotalText,
  servicePriceText,
  tierPriceCompact,
} from '@/lib/price'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

interface Line {
  tierId: string
  quantity: number
}

export function QuoteClient() {
  const t = useTranslations('quote')
  const tRoot = useTranslations()
  const tServices = useTranslations('services')
  const locale = useLocale()
  const searchParams = useSearchParams()

  const [lines, setLines] = useState<Map<string, Line>>(new Map())
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Deep link from a service card: /quote?service=mattress
  useEffect(() => {
    const preselect = searchParams.get('service')
    const service = preselect ? getService(preselect) : undefined
    if (service) {
      setLines(
        new Map([[service.id, { tierId: service.tiers[0].id, quantity: 1 }]])
      )
    }
  }, [searchParams])

  const toggleService = (id: string) => {
    const service = getService(id)
    if (!service) return
    setLines((prev) => {
      const next = new Map(prev)
      if (next.has(id)) next.delete(id)
      else next.set(id, { tierId: service.tiers[0].id, quantity: 1 })
      return next
    })
  }

  const setTier = (id: string, tierId: string) =>
    setLines((prev) => {
      const next = new Map(prev)
      const line = next.get(id)
      if (line) next.set(id, { ...line, tierId })
      return next
    })

  const changeQuantity = (id: string, delta: number) => {
    const service = getService(id)
    if (!service) return
    setLines((prev) => {
      const next = new Map(prev)
      const line = next.get(id)
      if (!line) return prev
      const quantity = Math.max(
        1,
        Math.min(service.maxQuantity, line.quantity + delta)
      )
      next.set(id, { ...line, quantity })
      return next
    })
  }

  const removeService = (id: string) =>
    setLines((prev) => {
      const next = new Map(prev)
      next.delete(id)
      return next
    })

  const selections: QuoteSelection[] = useMemo(
    () =>
      Array.from(lines.entries()).map(([serviceId, line]) => ({
        serviceId,
        tierId: line.tierId,
        quantity: line.quantity,
      })),
    [lines]
  )

  const estimate = useMemo(() => calculateEstimate(selections), [selections])
  const hasSelections = lines.size > 0
  const totalItems = Array.from(lines.values()).reduce(
    (sum, line) => sum + line.quantity,
    0
  )

  const totalText = useMemo(() => {
    if (estimate.min === 0 && estimate.max === 0) {
      return estimate.hasOnRequest ? tRoot('price.onRequestShort') : euro(0)
    }
    const range =
      estimate.min === estimate.max
        ? euro(estimate.min)
        : `${euro(estimate.min)} – ${euro(estimate.max)}`
    return estimate.startingFrom ? `${tRoot('price.from')} ${range}` : range
  }, [estimate, tRoot])

  const whatsAppHref = useMemo(() => {
    const priced: string[] = []
    const onRequest: string[] = []

    for (const sel of selections) {
      const service = getService(sel.serviceId)
      if (!service) continue
      const tier = getTier(service, sel.tierId)
      const name = tServices(`${service.id}.name`)
      const tierName =
        service.tiers.length > 1
          ? ` (${tServices(`${service.id}.tiers.${tier.id}`)})`
          : ''
      if (tier.kind === 'onRequest') {
        onRequest.push(`• ${name}${tierName} x${sel.quantity}`)
      } else {
        priced.push(
          `• ${name}${tierName} x${sel.quantity} — ${lineTotalText(tier, sel.quantity, tRoot)}`
        )
      }
    }

    const parts = [t('whatsappIntro'), '', ...priced]
    if (priced.length > 0) {
      parts.push('', `${t('whatsappTotal')}: ${totalText}`)
    }
    if (onRequest.length > 0) {
      parts.push('', t('whatsappOnRequest'), ...onRequest)
    }
    return generateWhatsAppLink(parts.join('\n'))
  }, [selections, t, tRoot, tServices, totalText])

  const bookingHref = useMemo(() => {
    const params = new URLSearchParams()
    for (const sel of selections) {
      params.append('s', `${sel.serviceId}:${sel.tierId}:${sel.quantity}`)
    }
    return `/${locale}/book?${params.toString()}`
  }, [selections, locale])

  return (
    <section className="min-h-screen bg-gradient-to-b from-crystal-50/60 via-white to-white pb-40 pt-12 lg:pb-20">
      <div className="container-page max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="eyebrow">
            <Receipt className="h-3.5 w-3.5" aria-hidden />
            {t('badge')}
          </span>
          <h1 className="heading-2 mt-4">{t('pageTitle')}</h1>
          <p className="lead mx-auto mt-3 max-w-xl">{t('pageSubtitle')}</p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* ── Service picker ── */}
          <div className="lg:col-span-3">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-crystal-50">
                <Sparkles className="h-4 w-4 text-crystal-600" aria-hidden />
              </span>
              <h2 className="font-display text-lg font-bold text-ink-900">
                {t('selectServices')}
              </h2>
              {hasSelections && (
                <span className="ml-auto rounded-full bg-crystal-50 px-2.5 py-1 text-xs font-semibold text-crystal-700">
                  {lines.size} {t('selected', { count: lines.size })}
                </span>
              )}
            </div>

            <div className="grid items-start gap-3 sm:grid-cols-2">
              {serviceData.map((service, i) => {
                const line = lines.get(service.id)
                const isSelected = Boolean(line)
                const tier = getTier(service, line?.tierId)

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i, 8) * 0.03 }}
                    layout
                    className={cn(
                      'overflow-hidden rounded-2xl border-2 bg-white transition-all duration-200',
                      isSelected
                        ? 'border-crystal-500 shadow-card'
                        : 'border-ink-100 hover:border-ink-200 hover:shadow-card'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleService(service.id)}
                      aria-pressed={isSelected}
                      className="flex w-full items-center gap-3 p-4 text-left"
                    >
                      <span
                        className={cn(
                          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200',
                          isSelected
                            ? 'bg-crystal-500 text-white'
                            : 'bg-crystal-50 text-crystal-600'
                        )}
                      >
                        <ServiceIcon name={service.icon} className="h-5 w-5" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-sm font-bold leading-snug text-ink-900">
                          {tServices(`${service.id}.name`)}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-400 tabular">
                          {servicePriceText(service, tRoot)}
                          {entryPrice(service) !== null &&
                            ` / ${tRoot(`units.${service.unit}.one`)}`}
                        </span>
                      </span>

                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
                          isSelected
                            ? 'bg-crystal-500 text-white'
                            : 'border-2 border-ink-200'
                        )}
                      >
                        {isSelected && (
                          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isSelected && line && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                          <div className="space-y-3 px-4 pb-4">
                            {/* Tier picker for services with sizes/types */}
                            {service.tiers.length > 1 && (
                              <div>
                                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                                  {t('chooseType')}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {service.tiers.map((option) => (
                                    <button
                                      key={option.id}
                                      type="button"
                                      onClick={() => setTier(service.id, option.id)}
                                      aria-pressed={line.tierId === option.id}
                                      className={cn(
                                        'rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors',
                                        line.tierId === option.id
                                          ? 'bg-crystal-500 text-white'
                                          : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                                      )}
                                    >
                                      {tServices(`${service.id}.tiers.${option.id}`)}
                                      <span className="ml-1.5 opacity-70 tabular">
                                        {tierPriceCompact(option, tRoot)}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between rounded-xl bg-ink-50 p-2.5">
                              <span className="pl-1.5 text-xs font-medium text-ink-600">
                                {tRoot(
                                  `units.${service.unit}.${line.quantity === 1 ? 'one' : 'many'}`
                                )}
                              </span>
                              <span className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => changeQuantity(service.id, -1)}
                                  disabled={line.quantity <= 1}
                                  aria-label="-"
                                  className={cn(
                                    'flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                    line.quantity <= 1
                                      ? 'text-ink-200'
                                      : 'bg-white text-ink-900 shadow-sm hover:shadow'
                                  )}
                                >
                                  <Minus className="h-3.5 w-3.5" aria-hidden />
                                </button>
                                <span className="w-9 text-center font-display font-bold tabular">
                                  {line.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => changeQuantity(service.id, 1)}
                                  disabled={line.quantity >= service.maxQuantity}
                                  aria-label="+"
                                  className={cn(
                                    'flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                    line.quantity >= service.maxQuantity
                                      ? 'text-ink-200'
                                      : 'bg-white text-ink-900 shadow-sm hover:shadow'
                                  )}
                                >
                                  <Plus className="h-3.5 w-3.5" aria-hidden />
                                </button>
                              </span>
                            </div>

                            <div className="flex items-baseline justify-between px-1">
                              <span className="text-[11px] text-ink-400">
                                {t('subtotal')}
                              </span>
                              <span className="font-display text-sm font-bold text-ink-900 tabular">
                                {lineTotalText(tier, line.quantity, tRoot)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ── Desktop summary ── */}
          <aside className="hidden lg:col-span-2 lg:block">
            <div className="sticky top-32 space-y-4">
              <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
                <div className="flex items-center justify-between border-b border-ink-100 bg-crystal-50/60 px-6 py-4">
                  <h2 className="flex items-center gap-2 font-display font-bold text-ink-900">
                    <Receipt className="h-4 w-4 text-crystal-600" aria-hidden />
                    {t('summary')}
                  </h2>
                  {hasSelections && (
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-crystal-700 shadow-sm">
                      {totalItems} {t('itemsCount', { count: totalItems })}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  {!hasSelections ? (
                    <div className="py-8 text-center">
                      <span className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-50">
                        <ShoppingCart className="h-7 w-7 text-ink-200" aria-hidden />
                      </span>
                      <p className="text-sm text-ink-400">
                        {t('noServicesSelected')}
                      </p>
                    </div>
                  ) : (
                    <>
                      <ul className="mb-5 space-y-3">
                        <AnimatePresence initial={false}>
                          {selections.map((sel) => {
                            const service = getService(sel.serviceId)
                            if (!service) return null
                            const tier = getTier(service, sel.tierId)
                            return (
                              <motion.li
                                key={sel.serviceId}
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -16, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="group flex items-center gap-3"
                              >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-crystal-50">
                                  <ServiceIcon
                                    name={service.icon}
                                    className="h-4 w-4 text-crystal-600"
                                  />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-sm font-medium text-ink-900">
                                    {tServices(`${service.id}.name`)}
                                  </span>
                                  <span className="block text-xs text-ink-400 tabular">
                                    {service.tiers.length > 1 &&
                                      `${tServices(`${service.id}.tiers.${tier.id}`)} · `}
                                    x{sel.quantity} ·{' '}
                                    {lineTotalText(tier, sel.quantity, tRoot)}
                                  </span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeService(sel.serviceId)}
                                  aria-label={tServices(`${service.id}.name`)}
                                  className="rounded-md p-1 opacity-0 transition-all hover:bg-red-50 focus-visible:opacity-100 group-hover:opacity-100"
                                >
                                  <X className="h-3.5 w-3.5 text-red-400" aria-hidden />
                                </button>
                              </motion.li>
                            )
                          })}
                        </AnimatePresence>
                      </ul>

                      <div className="mb-4 h-px bg-ink-100" />

                      <div className="mb-2 flex items-baseline justify-between gap-2">
                        <span className="text-sm font-semibold text-ink-900">
                          {t('total')}
                        </span>
                        <motion.span
                          key={totalText}
                          initial={{ scale: 1.06 }}
                          animate={{ scale: 1 }}
                          className="font-display text-2xl font-extrabold text-ink-900 tabular"
                        >
                          {totalText}
                        </motion.span>
                      </div>

                      {estimate.hasOnRequest && (
                        <p className="mb-3 rounded-lg bg-aqua-50 px-3 py-2 text-[11px] leading-relaxed text-aqua-600">
                          {t('onRequestNote')}
                        </p>
                      )}

                      <p className="mb-6 flex items-start gap-1.5 text-[11px] leading-relaxed text-ink-400">
                        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                        {t('disclaimer')}
                      </p>

                      <div className="space-y-2.5">
                        <Link href={bookingHref} className="block">
                          <Button size="lg" className="w-full">
                            <CalendarCheck className="h-4 w-4" aria-hidden />
                            {t('proceedToBook')}
                            <ArrowRight className="ml-auto h-4 w-4" aria-hidden />
                          </Button>
                        </Link>
                        <a
                          href={whatsAppHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button variant="whatsapp" className="w-full">
                            <MessageCircle className="h-4 w-4" aria-hidden />
                            {t('contactWhatsApp')}
                          </Button>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-crystal-50/70 p-4 text-center">
                <p className="mb-2 text-xs text-ink-500">{t('needHelp')}</p>
                <a href={`tel:${site.phoneE164}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="h-3.5 w-3.5" aria-hidden />
                    {site.phoneDisplay}
                  </Button>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Mobile summary bar ── */}
      <AnimatePresence>
        {hasSelections && (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
          >
            <div className="safe-bottom border-t border-ink-100 bg-white/95 px-4 pt-3 backdrop-blur-lg">
              {drawerOpen ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-display text-sm font-bold text-ink-900">
                      {t('summary')}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setDrawerOpen(false)}
                      aria-label={tRoot('common.close')}
                      className="rounded-lg p-1.5 hover:bg-ink-50"
                    >
                      <X className="h-4 w-4 text-ink-500" aria-hidden />
                    </button>
                  </div>

                  <ul className="mb-3 max-h-48 space-y-2 overflow-y-auto">
                    {selections.map((sel) => {
                      const service = getService(sel.serviceId)
                      if (!service) return null
                      const tier = getTier(service, sel.tierId)
                      return (
                        <li
                          key={sel.serviceId}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <span className="truncate text-ink-600">
                            {tServices(`${service.id}.name`)}
                            {service.tiers.length > 1 &&
                              ` · ${tServices(`${service.id}.tiers.${tier.id}`)}`}{' '}
                            x{sel.quantity}
                          </span>
                          <span className="shrink-0 font-medium text-ink-900 tabular">
                            {lineTotalText(tier, sel.quantity, tRoot)}
                          </span>
                        </li>
                      )
                    })}
                  </ul>

                  {estimate.hasOnRequest && (
                    <p className="mb-3 rounded-lg bg-aqua-50 px-3 py-2 text-[11px] leading-relaxed text-aqua-600">
                      {t('onRequestNote')}
                    </p>
                  )}

                  <div className="mb-3 flex items-center justify-between border-t border-ink-100 py-2">
                    <span className="text-sm font-semibold text-ink-900">
                      {t('total')}
                    </span>
                    <span className="font-display text-xl font-extrabold text-crystal-600 tabular">
                      {totalText}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a href={whatsAppHref} target="_blank" rel="noopener noreferrer">
                      <Button variant="whatsapp" className="w-full" size="sm">
                        <MessageCircle className="h-4 w-4" aria-hidden />
                        WhatsApp
                      </Button>
                    </a>
                    <Link href={bookingHref}>
                      <Button className="w-full" size="sm">
                        {t('proceedToBook')}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    className="flex-1 text-left"
                  >
                    <span className="block text-xs text-ink-400">
                      {lines.size} {t('servicesCount', { count: lines.size })} ·{' '}
                      {totalItems} {t('itemsCount', { count: totalItems })}
                    </span>
                    <span className="block font-display text-lg font-extrabold text-ink-900 tabular">
                      {totalText}
                    </span>
                  </button>
                  <Link href={bookingHref}>
                    <Button size="lg" className="shrink-0">
                      {t('proceedToBook')}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
