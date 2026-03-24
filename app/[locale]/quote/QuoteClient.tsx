'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Car,
  Sofa,
  BedDouble,
  Heater,
  SquareDashedBottom,
  Armchair,
  Baby,
  Minus,
  Plus,
  MessageCircle,
  CalendarCheck,
  Check,
  Sparkles,
  Receipt,
  ArrowRight,
  Info,
  Phone,
  X,
  ShoppingCart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  services as serviceData,
  calculateEstimate,
  generateWhatsAppLink,
  type QuoteSelection,
} from '@/lib/services'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  Car, Sofa, BedDouble, Heater, SquareDashedBottom,
  Armchair, ArmchairIcon: Armchair, Baby,
}

export function QuoteClient() {
  const t = useTranslations('quote')
  const tServices = useTranslations('services')
  const locale = useLocale()
  const searchParams = useSearchParams()

  const [selections, setSelections] = useState<Map<string, number>>(new Map())
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  useEffect(() => {
    const preSelect = searchParams.get('service')
    if (preSelect && serviceData.find((s) => s.id === preSelect)) {
      setSelections(new Map([[preSelect, 1]]))
    }
  }, [searchParams])

  const toggleService = (id: string) => {
    const next = new Map(selections)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.set(id, 1)
    }
    setSelections(next)
  }

  const updateQuantity = (id: string, delta: number) => {
    const next = new Map(selections)
    const service = serviceData.find((s) => s.id === id)
    if (!service) return
    const current = next.get(id) || 1
    const newVal = Math.max(1, Math.min(service.maxQuantity, current + delta))
    next.set(id, newVal)
    setSelections(next)
  }

  const removeService = (id: string) => {
    const next = new Map(selections)
    next.delete(id)
    setSelections(next)
  }

  const quoteSelections: QuoteSelection[] = Array.from(selections.entries()).map(
    ([serviceId, quantity]) => ({ serviceId, quantity })
  )
  const estimate = calculateEstimate(quoteSelections)
  const hasSelections = selections.size > 0
  const totalItems = Array.from(selections.values()).reduce((a, b) => a + b, 0)

  const buildWhatsAppMessage = () => {
    const lines = ['Γεια σας! Θα ήθελα προσφορά για:', '']
    Array.from(selections.entries()).forEach(([serviceId, qty]) => {
      const service = serviceData.find((s) => s.id === serviceId)
      if (service) {
        lines.push(`- ${tServices(`${service.id}.name`)} x${qty}`)
      }
    })
    lines.push('', `Εκτιμώμενο κόστος: €${estimate.min} - €${estimate.max}`)
    return generateWhatsAppLink(lines.join('\n'))
  }

  const buildBookingParams = () => {
    const params = new URLSearchParams()
    Array.from(selections.entries()).forEach(([serviceId, qty]) => {
      params.append('s', `${serviceId}:${qty}`)
    })
    return `/${locale}/book?${params.toString()}`
  }

  return (
    <section className="pt-24 pb-32 lg:pb-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-crystal-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 bg-crystal/10 text-crystal text-sm font-medium px-3.5 py-1.5 rounded-full mb-4">
            <Receipt className="h-3.5 w-3.5" />
            {t('pageTitle')}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-dark">
            {t('pageTitle')}
          </h1>
          <p className="mt-2 text-body max-w-lg mx-auto">
            {t('pageSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ─── Service Selection Grid ─── */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-crystal/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-crystal" />
              </div>
              <h2 className="text-lg font-semibold text-navy-dark">
                {t('selectServices')}
              </h2>
              {hasSelections && (
                <span className="ml-auto text-xs text-crystal font-semibold bg-crystal/10 px-2.5 py-1 rounded-full">
                  {selections.size} {t('selected')}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceData.map((service, i) => {
                const Icon = iconMap[service.icon]
                const isSelected = selections.has(service.id)
                const qty = selections.get(service.id) || 0

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    layout
                  >
                    <div
                      className={cn(
                        'rounded-2xl border-2 transition-all duration-200 overflow-hidden',
                        isSelected
                          ? 'border-crystal bg-white shadow-md shadow-crystal/5'
                          : 'border-transparent bg-white shadow-sm hover:shadow-md'
                      )}
                    >
                      {/* Main clickable area */}
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleService(service.id)}
                        className="flex items-center gap-3 p-4 w-full text-left"
                      >
                        <div
                          className={cn(
                            'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200',
                            isSelected
                              ? 'bg-crystal text-white shadow-sm shadow-crystal/30'
                              : 'bg-slate-100 text-crystal'
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-navy-dark truncate">
                            {tServices(`${service.id}.name`)}
                          </p>
                          <p className="text-xs text-body/60 mt-0.5">
                            &euro;{service.priceMin} – {service.priceMax} / {tServices('perUnit')}
                          </p>
                        </div>
                        {/* Selection indicator */}
                        <div
                          className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-200',
                            isSelected
                              ? 'bg-crystal text-white'
                              : 'border-2 border-slate-200'
                          )}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>

                      {/* Quantity controls — expand when selected */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                          >
                            <div className="px-4 pb-4 pt-1">
                              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
                                <span className="text-xs font-medium text-body">
                                  {t(service.quantityLabel.replace('quote.', '') as any)}
                                </span>
                                <div className="flex items-center gap-1">
                                  <motion.button
                                    whileTap={{ scale: 0.85 }}
                                    onClick={(e) => { e.stopPropagation(); updateQuantity(service.id, -1) }}
                                    disabled={qty <= 1}
                                    className={cn(
                                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                                      qty <= 1
                                        ? 'bg-slate-100 text-slate-300'
                                        : 'bg-white text-navy-dark shadow-sm hover:shadow-md active:bg-slate-50'
                                    )}
                                  >
                                    <Minus className="h-3.5 w-3.5" />
                                  </motion.button>
                                  <motion.span
                                    key={qty}
                                    initial={{ scale: 1.3, color: '#0EA5E9' }}
                                    animate={{ scale: 1, color: '#0F172A' }}
                                    className="w-10 text-center font-bold text-base"
                                  >
                                    {qty}
                                  </motion.span>
                                  <motion.button
                                    whileTap={{ scale: 0.85 }}
                                    onClick={(e) => { e.stopPropagation(); updateQuantity(service.id, 1) }}
                                    disabled={qty >= service.maxQuantity}
                                    className={cn(
                                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                                      qty >= service.maxQuantity
                                        ? 'bg-slate-100 text-slate-300'
                                        : 'bg-white text-navy-dark shadow-sm hover:shadow-md active:bg-slate-50'
                                    )}
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                  </motion.button>
                                </div>
                              </div>
                              {/* Per-service subtotal */}
                              <div className="flex justify-between items-center mt-2 px-1">
                                <span className="text-[11px] text-body/50">{t('subtotal')}</span>
                                <span className="text-sm font-semibold text-navy-dark">
                                  &euro;{service.priceMin * qty} – {service.priceMax * qty}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ─── Desktop Summary Panel ─── */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                {/* Summary header */}
                <div className="bg-gradient-to-r from-crystal-50 to-crystal-100/50 px-6 py-4 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-navy-dark flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-crystal" />
                      {t('summary')}
                    </h2>
                    {hasSelections && (
                      <span className="text-xs font-bold text-crystal bg-white px-2.5 py-1 rounded-full shadow-sm">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {!hasSelections ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                        <ShoppingCart className="h-7 w-7 text-slate-300" />
                      </div>
                      <p className="text-body/60 text-sm">{t('noServicesSelected')}</p>
                    </div>
                  ) : (
                    <>
                      {/* Line items */}
                      <div className="space-y-3 mb-5">
                        <AnimatePresence>
                          {Array.from(selections.entries()).map(([serviceId, qty]) => {
                            const service = serviceData.find((s) => s.id === serviceId)
                            if (!service) return null
                            const Icon = iconMap[service.icon]
                            return (
                              <motion.div
                                key={serviceId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-3 group"
                              >
                                <div className="w-9 h-9 rounded-lg bg-crystal/10 flex items-center justify-center shrink-0">
                                  <Icon className="h-4 w-4 text-crystal" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-navy-dark truncate">
                                    {tServices(`${service.id}.name`)}
                                  </p>
                                  <p className="text-xs text-body/50">
                                    x{qty} &middot; &euro;{service.priceMin * qty} – {service.priceMax * qty}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeService(serviceId)}
                                  className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all"
                                >
                                  <X className="h-3.5 w-3.5 text-red-400" />
                                </button>
                              </motion.div>
                            )
                          })}
                        </AnimatePresence>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-slate-100 mb-4" />

                      {/* Total */}
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-navy-dark">{t('total')}</span>
                        <motion.span
                          key={`${estimate.min}-${estimate.max}`}
                          initial={{ scale: 1.1, color: '#0EA5E9' }}
                          animate={{ scale: 1, color: '#0F172A' }}
                          className="text-2xl font-bold"
                        >
                          &euro;{estimate.min} – {estimate.max}
                        </motion.span>
                      </div>

                      {/* Disclaimer */}
                      <p className="text-[11px] text-body/50 flex items-start gap-1.5 mb-6">
                        <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        {t('disclaimer')}
                      </p>

                      {/* CTAs */}
                      <div className="space-y-2.5">
                        <Link href={buildBookingParams()} className="block">
                          <Button size="lg" className="w-full shadow-sm">
                            <CalendarCheck className="h-4 w-4 mr-2" />
                            {t('proceedToBook')}
                            <ArrowRight className="h-4 w-4 ml-auto" />
                          </Button>
                        </Link>
                        <a
                          href={buildWhatsAppMessage()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button variant="whatsapp" className="w-full shadow-sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {t('contactWhatsApp')}
                          </Button>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Help card */}
              <div className="bg-gradient-to-br from-crystal-50 to-crystal-100/50 rounded-2xl p-4 text-center">
                <p className="text-xs text-body/70 mb-2">{t('needHelp')}</p>
                <a href="tel:+35796653034">
                  <Button variant="secondary" size="sm" className="w-full text-xs">
                    <Phone className="h-3.5 w-3.5 mr-1.5" />
                    96653034
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile Bottom Bar ─── */}
      <AnimatePresence>
        {hasSelections && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 lg:hidden z-40"
          >
            <div className="bg-white/95 backdrop-blur-lg border-t border-slate-200 px-4 py-3 safe-bottom">
              {/* Collapsed bar */}
              {!mobileDrawerOpen && (
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => setMobileDrawerOpen(true)}
                    className="flex-1 text-left"
                  >
                    <p className="text-xs text-body/60">
                      {selections.size} {t('servicesCount')} &middot; {totalItems} {t('itemsCount')}
                    </p>
                    <p className="text-lg font-bold text-navy-dark">
                      &euro;{estimate.min} – {estimate.max}
                    </p>
                  </button>
                  <Link href={buildBookingParams()}>
                    <Button size="lg" className="shrink-0">
                      {t('proceedToBook')}
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              )}

              {/* Expanded drawer */}
              {mobileDrawerOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-navy-dark text-sm">{t('summary')}</h3>
                    <button
                      onClick={() => setMobileDrawerOpen(false)}
                      className="p-1.5 rounded-lg hover:bg-slate-100"
                    >
                      <X className="h-4 w-4 text-body" />
                    </button>
                  </div>

                  <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                    {Array.from(selections.entries()).map(([serviceId, qty]) => {
                      const service = serviceData.find((s) => s.id === serviceId)
                      if (!service) return null
                      return (
                        <div key={serviceId} className="flex items-center justify-between text-sm">
                          <span className="text-body truncate mr-2">
                            {tServices(`${service.id}.name`)} x{qty}
                          </span>
                          <span className="font-medium text-navy-dark shrink-0">
                            &euro;{service.priceMin * qty}–{service.priceMax * qty}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex justify-between items-center py-2 border-t border-slate-100 mb-3">
                    <span className="font-semibold text-navy-dark text-sm">{t('total')}</span>
                    <span className="text-xl font-bold text-crystal">
                      &euro;{estimate.min} – {estimate.max}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={buildWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="whatsapp" className="w-full" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        WhatsApp
                      </Button>
                    </a>
                    <Link href={buildBookingParams()}>
                      <Button className="w-full" size="sm">
                        {t('proceedToBook')}
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
