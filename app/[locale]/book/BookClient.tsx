'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { addDays, format, isSunday } from 'date-fns'
import { el, enUS } from 'date-fns/locale'
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CloudSun,
  MessageCircle,
  Minus,
  PartyPopper,
  Plus,
  ShieldCheck,
  Sparkles,
  Sun,
  Sunset,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ServiceIcon } from '@/components/shared/ServiceIcon'
import {
  calculateEstimate,
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
import { cn } from '@/lib/utils'

const timeSlots = [
  { key: 'morning', icon: Sun, hours: '09:00 – 12:00' },
  { key: 'midday', icon: CloudSun, hours: '12:00 – 15:00' },
  { key: 'afternoon', icon: Sunset, hours: '15:00 – 18:00' },
] as const

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
}

interface Line {
  tierId: string
  quantity: number
}

export function BookClient() {
  const t = useTranslations('book')
  const tRoot = useTranslations()
  const tQuote = useTranslations('quote')
  const tServices = useTranslations('services')
  const locale = useLocale()
  const searchParams = useSearchParams()
  const dateLocale = locale === 'el' ? el : enUS

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [lines, setLines] = useState<Map<string, Line>>(new Map())
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  // Carried over from the calculator: ?s=mattress:double:2
  useEffect(() => {
    const raw = searchParams.getAll('s')
    if (raw.length === 0) return
    const next = new Map<string, Line>()
    for (const entry of raw) {
      const [serviceId, tierId, qty] = entry.split(':')
      const service = getService(serviceId)
      if (!service) continue
      next.set(serviceId, {
        tierId: getTier(service, tierId).id,
        quantity: Math.min(
          service.maxQuantity,
          Math.max(1, Number.parseInt(qty ?? '1', 10) || 1)
        ),
      })
    }
    if (next.size > 0) setLines(next)
  }, [searchParams])

  const availableDates = useMemo(() => {
    const today = new Date()
    const dates: Date[] = []
    for (let i = 1; i <= 21; i++) {
      const day = addDays(today, i)
      if (!isSunday(day)) dates.push(day)
    }
    return dates
  }, [])

  const toggleService = (id: string) => {
    const service = getService(id)
    if (!service) return
    setLines((prev) => {
      const next = new Map(prev)
      if (next.has(id)) next.delete(id)
      else next.set(id, { tierId: service.tiers[0].id, quantity: 1 })
      return next
    })
    setErrors((e) => ({ ...e, services: '' }))
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
      next.set(id, {
        ...line,
        quantity: Math.max(
          1,
          Math.min(service.maxQuantity, line.quantity + delta)
        ),
      })
      return next
    })
  }

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

  const validateStep = (): boolean => {
    const next: Record<string, string> = {}
    if (step === 1 && lines.size === 0)
      next.services = t('validation.selectService')
    if (step === 2) {
      if (!selectedDate) next.date = t('validation.selectDate')
      if (!selectedTime) next.time = t('validation.selectTime')
    }
    if (step === 3) {
      if (!form.fullName.trim()) next.fullName = t('validation.nameRequired')
      if (form.phone.replace(/\D/g, '').length < 8)
        next.phone = t('validation.phoneRequired')
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const goTo = (target: number) => {
    if (target < step || validateStep()) {
      setDirection(target > step ? 1 : -1)
      setStep(target)
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const handleSubmit = () => {
    const serviceLines = selections.map((sel) => {
      const service = getService(sel.serviceId)!
      const tier = getTier(service, sel.tierId)
      const tierName =
        service.tiers.length > 1
          ? ` (${tServices(`${service.id}.tiers.${tier.id}`)})`
          : ''
      return `• ${tServices(`${service.id}.name`)}${tierName} x${sel.quantity} — ${lineTotalText(tier, sel.quantity, tRoot)}`
    })

    const message = [
      t('whatsappTitle'),
      '',
      `${t('selectedServices')}:`,
      ...serviceLines,
      '',
      `${tQuote('estimatedCost')}: ${totalText}`,
      '',
      `${t('selectedDate')}: ${format(new Date(selectedDate), 'EEEE d MMMM yyyy', { locale: dateLocale })}`,
      `${t('selectedTime')}: ${t(selectedTime as 'morning')}`,
      '',
      `${t('fullName')}: ${form.fullName}`,
      `${t('phone')}: ${form.phone}`,
      form.email ? `Email: ${form.email}` : '',
      form.address ? `${t('address')}: ${form.address}` : '',
      form.notes ? `${t('notes')}: ${form.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(generateWhatsAppLink(message), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const reset = () => {
    setStep(1)
    setDirection(1)
    setLines(new Map())
    setSelectedDate('')
    setSelectedTime('')
    setForm({ fullName: '', phone: '', email: '', address: '', notes: '' })
    setErrors({})
    setSubmitted(false)
  }

  const steps = [
    { label: t('step1'), icon: Sparkles },
    { label: t('step2'), icon: CalendarDays },
    { label: t('step3'), icon: User },
    { label: t('step4'), icon: ShieldCheck },
  ]

  if (submitted) {
    return (
      <section className="flex min-h-[70vh] items-center py-16">
        <div className="container-page max-w-lg text-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-whatsapp/10"
          >
            <PartyPopper className="h-12 w-12 text-whatsapp" aria-hidden />
          </motion.span>
          <h1 className="heading-2">{t('success.title')}</h1>
          <p className="lead mt-3">{t('success.message')}</p>
          <Button onClick={reset} variant="outline" size="lg" className="mt-8">
            {t('success.bookAnother')}
          </Button>
        </div>
      </section>
    )
  }

  const fields = [
    { name: 'fullName', label: t('fullName'), required: true, autoComplete: 'name', type: 'text' },
    { name: 'phone', label: t('phone'), required: true, autoComplete: 'tel', type: 'tel' },
    { name: 'email', label: t('email'), required: false, autoComplete: 'email', type: 'email' },
    { name: 'address', label: t('address'), required: false, autoComplete: 'street-address', type: 'text' },
  ] as const

  return (
    <section className="min-h-screen bg-gradient-to-b from-crystal-50/60 via-white to-white py-12">
      <div className="container-page max-w-5xl">
        <div className="text-center">
          <h1 className="heading-2">{t('pageTitle')}</h1>
          <p className="lead mt-2">{t('pageSubtitle')}</p>
        </div>

        {/* Stepper */}
        <div className="relative mt-10">
          <div className="absolute left-[12%] right-[12%] top-5 hidden h-0.5 bg-ink-100 sm:block" />
          <motion.div
            className="absolute left-[12%] top-5 hidden h-0.5 bg-crystal-500 sm:block"
            initial={false}
            animate={{ width: `${((step - 1) / 3) * 76}%` }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
          <ol className="relative flex justify-between">
            {steps.map((s, i) => {
              const Icon = s.icon
              const complete = step > i + 1
              const current = step === i + 1
              const clickable = i + 1 < step
              return (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => clickable && goTo(i + 1)}
                    disabled={!clickable}
                    aria-current={current ? 'step' : undefined}
                    className="relative z-10 flex flex-col items-center gap-1.5"
                  >
                    <span
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300',
                        complete
                          ? 'bg-crystal-500 text-white shadow-brand'
                          : current
                            ? 'bg-crystal-500 text-white shadow-brand ring-4 ring-crystal-100'
                            : 'border-2 border-ink-200 bg-white text-ink-300'
                      )}
                    >
                      {complete ? (
                        <Check className="h-5 w-5" aria-hidden />
                      ) : (
                        <Icon className="h-4 w-4" aria-hidden />
                      )}
                    </span>
                    <span
                      className={cn(
                        'hidden text-[11px] font-medium sm:block',
                        current
                          ? 'text-crystal-700'
                          : complete
                            ? 'text-ink-800'
                            : 'text-ink-300'
                      )}
                    >
                      {s.label}
                    </span>
                    {i === 0 && lines.size > 0 && !current && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-aqua-400 text-[10px] font-bold text-white">
                        {lines.size}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="min-h-[26rem] rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                  {/* Step 1 — services */}
                  {step === 1 && (
                    <div>
                      <h2 className="mb-5 font-display text-lg font-bold text-ink-900">
                        {t('selectServices')}
                      </h2>
                      {errors.services && (
                        <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                          {errors.services}
                        </p>
                      )}
                      <div className="grid items-start gap-3 sm:grid-cols-2">
                        {serviceData.map((service) => {
                          const line = lines.get(service.id)
                          const isSelected = Boolean(line)
                          return (
                            <div
                              key={service.id}
                              className={cn(
                                'overflow-hidden rounded-2xl border-2 transition-all duration-200',
                                isSelected
                                  ? 'border-crystal-500 bg-white'
                                  : 'border-transparent bg-ink-50 hover:bg-ink-100/70'
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
                                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors',
                                    isSelected
                                      ? 'bg-crystal-500 text-white'
                                      : 'bg-white text-crystal-600 shadow-sm'
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
                                  </span>
                                </span>
                                {isSelected && (
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crystal-500 text-white">
                                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                                  </span>
                                )}
                              </button>

                              <AnimatePresence initial={false}>
                                {isSelected && line && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div className="space-y-3 px-4 pb-4">
                                      {service.tiers.length > 1 && (
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
                                      )}

                                      <div className="flex items-center justify-between rounded-xl bg-ink-50 p-2">
                                        <span className="pl-2 text-xs font-medium text-ink-600">
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
                                              'flex h-8 w-8 items-center justify-center rounded-lg',
                                              line.quantity <= 1
                                                ? 'text-ink-200'
                                                : 'bg-white text-ink-900 shadow-sm'
                                            )}
                                          >
                                            <Minus className="h-3.5 w-3.5" aria-hidden />
                                          </button>
                                          <span className="w-8 text-center font-display font-bold tabular">
                                            {line.quantity}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => changeQuantity(service.id, 1)}
                                            disabled={line.quantity >= service.maxQuantity}
                                            aria-label="+"
                                            className={cn(
                                              'flex h-8 w-8 items-center justify-center rounded-lg',
                                              line.quantity >= service.maxQuantity
                                                ? 'text-ink-200'
                                                : 'bg-white text-ink-900 shadow-sm'
                                            )}
                                          >
                                            <Plus className="h-3.5 w-3.5" aria-hidden />
                                          </button>
                                        </span>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2 — date & time */}
                  {step === 2 && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink-900">
                          <CalendarDays className="h-5 w-5 text-crystal-600" aria-hidden />
                          {t('selectDate')}
                        </h2>
                        {errors.date && (
                          <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                            {errors.date}
                          </p>
                        )}
                        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
                          {availableDates.map((date) => {
                            const value = date.toISOString()
                            const isActive = selectedDate === value
                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => {
                                  setSelectedDate(value)
                                  setErrors((e) => ({ ...e, date: '' }))
                                }}
                                aria-pressed={isActive}
                                className={cn(
                                  'flex w-[4.5rem] shrink-0 flex-col items-center rounded-2xl border-2 py-3 transition-all duration-200',
                                  isActive
                                    ? 'border-crystal-500 bg-crystal-500 text-white shadow-brand'
                                    : 'border-ink-100 bg-white text-ink-600 hover:border-crystal-200'
                                )}
                              >
                                <span className="text-[11px] uppercase opacity-70">
                                  {format(date, 'EEE', { locale: dateLocale })}
                                </span>
                                <span className="font-display text-xl font-extrabold">
                                  {format(date, 'd')}
                                </span>
                                <span className="text-[11px] opacity-70">
                                  {format(date, 'MMM', { locale: dateLocale })}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink-900">
                          <Clock className="h-5 w-5 text-crystal-600" aria-hidden />
                          {t('selectTime')}
                        </h2>
                        {errors.time && (
                          <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                            {errors.time}
                          </p>
                        )}
                        <div className="grid gap-3 sm:grid-cols-3">
                          {timeSlots.map((slot) => {
                            const Icon = slot.icon
                            const isActive = selectedTime === slot.key
                            return (
                              <button
                                key={slot.key}
                                type="button"
                                onClick={() => {
                                  setSelectedTime(slot.key)
                                  setErrors((e) => ({ ...e, time: '' }))
                                }}
                                aria-pressed={isActive}
                                className={cn(
                                  'flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200',
                                  isActive
                                    ? 'border-crystal-500 bg-crystal-50'
                                    : 'border-ink-100 bg-white hover:border-crystal-200'
                                )}
                              >
                                <Icon
                                  className={cn(
                                    'h-6 w-6',
                                    isActive ? 'text-crystal-600' : 'text-ink-300'
                                  )}
                                  aria-hidden
                                />
                                <span className="text-sm font-semibold text-ink-900">
                                  {t(slot.key).split(' (')[0]}
                                </span>
                                <span className="text-xs text-ink-400 tabular">
                                  {slot.hours}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                        <p className="mt-4 text-xs text-ink-400">
                          {t('availabilityNote')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3 — details */}
                  {step === 3 && (
                    <div>
                      <h2 className="mb-5 font-display text-lg font-bold text-ink-900">
                        {t('contactDetails')}
                      </h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {fields.map((field) => (
                          <div
                            key={field.name}
                            className={cn(
                              'space-y-1.5',
                              field.name === 'address' && 'sm:col-span-2'
                            )}
                          >
                            <Label htmlFor={field.name}>
                              {field.label}
                              {field.required && ' *'}
                            </Label>
                            <Input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              autoComplete={field.autoComplete}
                              value={form[field.name]}
                              onChange={(e) => {
                                setForm((prev) => ({
                                  ...prev,
                                  [field.name]: e.target.value,
                                }))
                                setErrors((prev) => ({ ...prev, [field.name]: '' }))
                              }}
                              aria-invalid={Boolean(errors[field.name])}
                              className={cn(
                                errors[field.name] && 'border-red-400 focus-visible:ring-red-400'
                              )}
                            />
                            {errors[field.name] && (
                              <p className="text-xs text-red-600">
                                {errors[field.name]}
                              </p>
                            )}
                          </div>
                        ))}
                        <div className="space-y-1.5 sm:col-span-2">
                          <Label htmlFor="notes">{t('notes')}</Label>
                          <Textarea
                            id="notes"
                            name="notes"
                            placeholder={t('notesPlaceholder')}
                            value={form.notes}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, notes: e.target.value }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4 — confirm */}
                  {step === 4 && (
                    <div>
                      <h2 className="font-display text-lg font-bold text-ink-900">
                        {t('confirmation')}
                      </h2>
                      <p className="mt-1 text-sm text-ink-400">
                        {t('confirmationText')}
                      </p>

                      <dl className="mt-6 divide-y divide-ink-100 rounded-2xl border border-ink-100">
                        <div className="flex items-start justify-between gap-4 p-4">
                          <dt className="text-sm text-ink-400">
                            {t('selectedServices')}
                          </dt>
                          <dd className="text-right text-sm font-medium text-ink-900">
                            {selections.map((sel) => {
                              const service = getService(sel.serviceId)!
                              const tier = getTier(service, sel.tierId)
                              return (
                                <span key={sel.serviceId} className="block">
                                  {tServices(`${service.id}.name`)}
                                  {service.tiers.length > 1 &&
                                    ` · ${tServices(`${service.id}.tiers.${tier.id}`)}`}{' '}
                                  <span className="text-ink-400">x{sel.quantity}</span>
                                </span>
                              )
                            })}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-4 p-4">
                          <dt className="text-sm text-ink-400">
                            {t('selectedDate')}
                          </dt>
                          <dd className="text-right text-sm font-medium text-ink-900">
                            {selectedDate &&
                              format(new Date(selectedDate), 'EEEE d MMMM yyyy', {
                                locale: dateLocale,
                              })}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-4 p-4">
                          <dt className="text-sm text-ink-400">
                            {t('selectedTime')}
                          </dt>
                          <dd className="text-right text-sm font-medium text-ink-900">
                            {selectedTime && t(selectedTime as 'morning')}
                          </dd>
                        </div>
                        <div className="flex items-start justify-between gap-4 p-4">
                          <dt className="text-sm text-ink-400">
                            {t('contactInfo')}
                          </dt>
                          <dd className="text-right text-sm font-medium text-ink-900">
                            <span className="block">{form.fullName}</span>
                            <span className="block">{form.phone}</span>
                            {form.address && (
                              <span className="block text-ink-400">{form.address}</span>
                            )}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-4 bg-crystal-50/60 p-4">
                          <dt className="text-sm font-semibold text-ink-900">
                            {tQuote('estimatedCost')}
                          </dt>
                          <dd className="font-display text-xl font-extrabold text-crystal-600 tabular">
                            {totalText}
                          </dd>
                        </div>
                      </dl>

                      {estimate.hasOnRequest && (
                        <p className="mt-3 rounded-lg bg-aqua-50 px-3 py-2 text-xs leading-relaxed text-aqua-600">
                          {tQuote('onRequestNote')}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between gap-3 border-t border-ink-100 pt-6">
                {step > 1 ? (
                  <Button variant="ghost" onClick={() => goTo(step - 1)}>
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                    {t('back')}
                  </Button>
                ) : (
                  <span />
                )}

                {step < 4 ? (
                  <Button onClick={() => goTo(step + 1)}>
                    {t('next')}
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </Button>
                ) : (
                  <Button variant="whatsapp" size="lg" onClick={handleSubmit}>
                    <MessageCircle className="h-5 w-5" aria-hidden />
                    {t('submit')}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Live summary */}
          <aside>
            <div className="sticky top-32 rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
              <h2 className="font-display text-sm font-bold text-ink-900">
                {t('summaryTitle')}
              </h2>

              {lines.size === 0 ? (
                <p className="mt-3 text-sm text-ink-400">{t('summaryEmpty')}</p>
              ) : (
                <>
                  <ul className="mt-4 space-y-2.5">
                    {selections.map((sel) => {
                      const service = getService(sel.serviceId)!
                      const tier = getTier(service, sel.tierId)
                      return (
                        <li
                          key={sel.serviceId}
                          className="flex items-baseline justify-between gap-3 text-sm"
                        >
                          <span className="min-w-0 text-ink-600">
                            <span className="block truncate">
                              {tServices(`${service.id}.name`)} x{sel.quantity}
                            </span>
                            {service.tiers.length > 1 && (
                              <span className="block text-xs text-ink-400">
                                {tServices(`${service.id}.tiers.${tier.id}`)}
                              </span>
                            )}
                          </span>
                          <span className="shrink-0 font-medium text-ink-900 tabular">
                            {lineTotalText(tier, sel.quantity, tRoot)}
                          </span>
                        </li>
                      )
                    })}
                  </ul>

                  <div className="mt-4 flex items-baseline justify-between border-t border-ink-100 pt-4">
                    <span className="text-sm font-semibold text-ink-900">
                      {tQuote('total')}
                    </span>
                    <span className="font-display text-lg font-extrabold text-crystal-600 tabular">
                      {totalText}
                    </span>
                  </div>
                </>
              )}

              {selectedDate && (
                <p className="mt-4 flex items-center gap-2 border-t border-ink-100 pt-4 text-xs text-ink-500">
                  <CalendarDays className="h-3.5 w-3.5 text-crystal-500" aria-hidden />
                  {format(new Date(selectedDate), 'd MMM yyyy', { locale: dateLocale })}
                  {selectedTime && ` · ${t(selectedTime as 'morning').split(' (')[0]}`}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
