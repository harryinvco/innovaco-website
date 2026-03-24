'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
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
  Check,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sun,
  CloudSun,
  Sunset,
  Sparkles,
  CalendarDays,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Send,
  PartyPopper,
  Pencil,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { services as serviceData, generateWhatsAppLink } from '@/lib/services'
import { cn } from '@/lib/utils'
import { addDays, format, isToday, isSunday } from 'date-fns'
import { el, enUS } from 'date-fns/locale'

const iconMap: Record<string, React.ElementType> = {
  Car, Sofa, BedDouble, Heater, SquareDashedBottom,
  Armchair, ArmchairIcon: Armchair, Baby,
}

const timeSlotConfig = [
  { key: 'morning' as const, icon: Sun, hours: '09:00 – 12:00' },
  { key: 'afternoon' as const, icon: CloudSun, hours: '12:00 – 15:00' },
  { key: 'evening' as const, icon: Sunset, hours: '15:00 – 18:00' },
]

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export function BookClient() {
  const t = useTranslations('book')
  const tServices = useTranslations('services')
  const locale = useLocale()
  const searchParams = useSearchParams()
  const dateScrollRef = useRef<HTMLDivElement>(null)
  const dateFnsLocale = locale === 'el' ? el : enUS

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', address: '', notes: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const params = searchParams.getAll('s')
    if (params.length > 0) {
      const serviceIds = params.map((p) => p.split(':')[0])
      setSelectedServices(serviceIds.filter((id) => serviceData.find((s) => s.id === id)))
    }
  }, [searchParams])

  const availableDates = useMemo(() => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 21; i++) {
      const d = addDays(today, i)
      if (!isSunday(d)) dates.push(d)
    }
    return dates
  }, [])

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
    setErrors((e) => ({ ...e, services: '' }))
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (step === 1 && selectedServices.length === 0)
      newErrors.services = t('validation.selectService')
    if (step === 2) {
      if (!selectedDate) newErrors.date = t('validation.selectDate')
      if (!selectedTime) newErrors.time = t('validation.selectTime')
    }
    if (step === 3) {
      if (!formData.fullName.trim()) newErrors.fullName = t('validation.nameRequired')
      if (!formData.phone.trim() || formData.phone.length < 8)
        newErrors.phone = t('validation.phoneRequired')
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goTo = (target: number) => {
    if (target < step || validateStep()) {
      setDirection(target > step ? 1 : -1)
      setStep(target)
    }
  }
  const nextStep = () => goTo(step + 1)
  const prevStep = () => goTo(step - 1)

  const handleSubmit = () => {
    const serviceNames = selectedServices
      .map((id) => {
        const s = serviceData.find((sd) => sd.id === id)
        return s ? tServices(`${s.id}.name`) : id
      })
      .join(', ')

    const message = [
      `Κράτηση Ραντεβού - Krystallo Cleaning`,
      ``,
      `Υπηρεσίες: ${serviceNames}`,
      `Ημερομηνία: ${format(new Date(selectedDate), 'EEEE d MMMM yyyy', { locale: el })}`,
      `Ώρα: ${t(selectedTime as any)}`,
      ``,
      `Όνομα: ${formData.fullName}`,
      `Τηλέφωνο: ${formData.phone}`,
      formData.email ? `Email: ${formData.email}` : '',
      formData.address ? `Διεύθυνση: ${formData.address}` : '',
      formData.notes ? `Σημειώσεις: ${formData.notes}` : '',
    ].filter(Boolean).join('\n')

    window.open(generateWhatsAppLink(message), '_blank')
    setSubmitted(true)
  }

  const resetForm = () => {
    setStep(1)
    setDirection(1)
    setSelectedServices([])
    setSelectedDate('')
    setSelectedTime('')
    setFormData({ fullName: '', phone: '', email: '', address: '', notes: '' })
    setErrors({})
    setSubmitted(false)
  }

  const steps = [
    { label: t('step1'), icon: Sparkles },
    { label: t('step2'), icon: CalendarDays },
    { label: t('step3'), icon: User },
    { label: t('step4'), icon: ShieldCheck },
  ]

  // Completion percentage for the progress ring
  const progress = ((step - 1) / 3) * 100

  if (submitted) {
    return (
      <section className="pt-28 pb-20 min-h-[80vh] flex items-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-24 h-24 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6"
          >
            <PartyPopper className="h-12 w-12 text-[#25D366]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-navy-dark mb-2"
          >
            {t('success.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-body mb-8"
          >
            {t('success.message')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button onClick={resetForm} variant="secondary" size="lg">
              {t('success.bookAnother')}
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-crystal-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-dark">
            {t('pageTitle')}
          </h1>
          <p className="mt-1 text-body text-sm">{t('pageSubtitle')}</p>
        </motion.div>

        {/* Stepper — pill style with animated connector */}
        <div className="relative mb-10">
          {/* Background track */}
          <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-slate-200 hidden sm:block" />
          {/* Active track */}
          <motion.div
            className="absolute top-5 left-[10%] h-0.5 bg-crystal hidden sm:block"
            initial={false}
            animate={{ width: `${(Math.min(step - 1, 3) / 3) * 80}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />

          <div className="flex justify-between relative">
            {steps.map((s, i) => {
              const StepIcon = s.icon
              const isComplete = step > i + 1
              const isCurrent = step === i + 1
              const isClickable = i + 1 < step

              return (
                <button
                  key={i}
                  onClick={() => isClickable && goTo(i + 1)}
                  disabled={!isClickable && !isCurrent}
                  className={cn(
                    'flex flex-col items-center gap-1.5 group relative z-10',
                    isClickable && 'cursor-pointer'
                  )}
                >
                  <motion.div
                    layout
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                      isComplete
                        ? 'bg-crystal text-white shadow-md shadow-crystal/25'
                        : isCurrent
                        ? 'bg-crystal text-white shadow-lg shadow-crystal/30 ring-4 ring-crystal/15'
                        : 'bg-white border-2 border-slate-200 text-slate-400'
                    )}
                  >
                    {isComplete ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <StepIcon className="h-4 w-4" />
                    )}
                  </motion.div>
                  <span
                    className={cn(
                      'text-[11px] font-medium hidden sm:block transition-colors',
                      isCurrent ? 'text-crystal' : isComplete ? 'text-navy-dark' : 'text-slate-400'
                    )}
                  >
                    {s.label}
                  </span>
                  {/* Selection count badge */}
                  {i === 0 && selectedServices.length > 0 && !isCurrent && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-crystal text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {selectedServices.length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-8 min-h-[420px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {/* ─── Step 1: Services ─── */}
                  {step === 1 && (
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-crystal/10 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-crystal" />
                        </div>
                        <h2 className="text-lg font-semibold text-navy-dark">
                          {t('selectServices')}
                        </h2>
                      </div>
                      {errors.services && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mb-3 bg-red-50 rounded-lg px-3 py-2"
                        >
                          {errors.services}
                        </motion.p>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {serviceData.map((service) => {
                          const Icon = iconMap[service.icon]
                          const isSelected = selectedServices.includes(service.id)
                          return (
                            <motion.button
                              key={service.id}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => toggleService(service.id)}
                              className={cn(
                                'flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 relative overflow-hidden',
                                isSelected
                                  ? 'border-crystal bg-crystal/[0.03]'
                                  : 'border-transparent bg-slate-50 hover:bg-slate-100/80'
                              )}
                            >
                              <div
                                className={cn(
                                  'w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200',
                                  isSelected
                                    ? 'bg-crystal text-white shadow-sm shadow-crystal/30'
                                    : 'bg-white text-crystal shadow-sm'
                                )}
                              >
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-navy-dark truncate">
                                  {tServices(`${service.id}.name`)}
                                </p>
                                <p className="text-xs text-body/70 mt-0.5">
                                  {t('from')} &euro;{service.priceMin}
                                </p>
                              </div>
                              {/* Checkmark */}
                              <AnimatePresence>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="w-6 h-6 rounded-full bg-crystal flex items-center justify-center"
                                  >
                                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* ─── Step 2: Date & Time ─── */}
                  {step === 2 && (
                    <div>
                      {/* Date picker */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-crystal/10 flex items-center justify-center">
                          <CalendarDays className="h-4 w-4 text-crystal" />
                        </div>
                        <h2 className="text-lg font-semibold text-navy-dark">
                          {t('selectDate')}
                        </h2>
                      </div>
                      {errors.date && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mb-3 bg-red-50 rounded-lg px-3 py-2"
                        >
                          {errors.date}
                        </motion.p>
                      )}

                      {/* Horizontal scrollable date carousel */}
                      <div className="relative mb-8">
                        <div
                          ref={dateScrollRef}
                          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-2 px-2"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                          {availableDates.map((date) => {
                            const dateStr = format(date, 'yyyy-MM-dd')
                            const isSelected = selectedDate === dateStr
                            const dayName = format(date, 'EEE', { locale: dateFnsLocale })
                            const dayNum = format(date, 'd')
                            const monthName = format(date, 'MMM', { locale: dateFnsLocale })

                            return (
                              <motion.button
                                key={dateStr}
                                whileTap={{ scale: 0.93 }}
                                onClick={() => {
                                  setSelectedDate(dateStr)
                                  setErrors((e) => ({ ...e, date: '' }))
                                }}
                                className={cn(
                                  'snap-center flex-shrink-0 w-[72px] py-3 rounded-2xl text-center transition-all duration-200 relative',
                                  isSelected
                                    ? 'bg-crystal text-white shadow-lg shadow-crystal/30'
                                    : 'bg-slate-50 hover:bg-slate-100 text-navy-dark'
                                )}
                              >
                                <div className={cn(
                                  'text-[11px] font-medium uppercase tracking-wide',
                                  isSelected ? 'text-crystal-100' : 'text-body/60'
                                )}>
                                  {dayName}
                                </div>
                                <div className="text-2xl font-bold mt-0.5">{dayNum}</div>
                                <div className={cn(
                                  'text-[11px] font-medium',
                                  isSelected ? 'text-crystal-100' : 'text-body/60'
                                )}>
                                  {monthName}
                                </div>
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Time slots */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-crystal/10 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-crystal" />
                        </div>
                        <h2 className="text-lg font-semibold text-navy-dark">
                          {t('selectTime')}
                        </h2>
                      </div>
                      {errors.time && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mb-3 bg-red-50 rounded-lg px-3 py-2"
                        >
                          {errors.time}
                        </motion.p>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {timeSlotConfig.map((slot) => {
                          const SlotIcon = slot.icon
                          const isSelected = selectedTime === slot.key
                          return (
                            <motion.button
                              key={slot.key}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => {
                                setSelectedTime(slot.key)
                                setErrors((e) => ({ ...e, time: '' }))
                              }}
                              className={cn(
                                'p-4 rounded-2xl border-2 text-center transition-all duration-200',
                                isSelected
                                  ? 'border-crystal bg-crystal/[0.03]'
                                  : 'border-transparent bg-slate-50 hover:bg-slate-100'
                              )}
                            >
                              <div className={cn(
                                'w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 transition-all',
                                isSelected
                                  ? 'bg-crystal text-white shadow-sm shadow-crystal/30'
                                  : 'bg-white text-crystal shadow-sm'
                              )}>
                                <SlotIcon className="h-5 w-5" />
                              </div>
                              <p className="font-semibold text-sm text-navy-dark">
                                {t(slot.key)}
                              </p>
                              <p className={cn(
                                'text-xs mt-0.5',
                                isSelected ? 'text-crystal' : 'text-body/60'
                              )}>
                                {slot.hours}
                              </p>
                            </motion.button>
                          )
                        })}
                      </div>
                      <p className="text-xs text-body/60 mt-4 flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-crystal" />
                        {t('availabilityNote')}
                      </p>
                    </div>
                  )}

                  {/* ─── Step 3: Contact ─── */}
                  {step === 3 && (
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-crystal/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-crystal" />
                        </div>
                        <h2 className="text-lg font-semibold text-navy-dark">
                          {t('contactDetails')}
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {/* Full Name */}
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            placeholder={t('fullName') + ' *'}
                            value={formData.fullName}
                            onChange={(e) => {
                              setFormData({ ...formData, fullName: e.target.value })
                              setErrors((err) => ({ ...err, fullName: '' }))
                            }}
                            className={cn(
                              'pl-10 h-12 rounded-xl bg-slate-50 border-0 focus:bg-white focus:ring-2 focus:ring-crystal/30',
                              errors.fullName && 'ring-2 ring-red-300 bg-red-50/50'
                            )}
                          />
                          {errors.fullName && (
                            <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>
                          )}
                        </div>
                        {/* Phone */}
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            placeholder={t('phone') + ' *'}
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value })
                              setErrors((err) => ({ ...err, phone: '' }))
                            }}
                            className={cn(
                              'pl-10 h-12 rounded-xl bg-slate-50 border-0 focus:bg-white focus:ring-2 focus:ring-crystal/30',
                              errors.phone && 'ring-2 ring-red-300 bg-red-50/50'
                            )}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>
                          )}
                        </div>
                        {/* Email */}
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            placeholder={t('email')}
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-10 h-12 rounded-xl bg-slate-50 border-0 focus:bg-white focus:ring-2 focus:ring-crystal/30"
                          />
                        </div>
                        {/* Address */}
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            placeholder={t('address')}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="pl-10 h-12 rounded-xl bg-slate-50 border-0 focus:bg-white focus:ring-2 focus:ring-crystal/30"
                          />
                        </div>
                        {/* Notes */}
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Textarea
                            placeholder={t('notes')}
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="pl-10 min-h-[80px] rounded-xl bg-slate-50 border-0 focus:bg-white focus:ring-2 focus:ring-crystal/30"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── Step 4: Confirmation ─── */}
                  {step === 4 && (
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-crystal/10 flex items-center justify-center">
                          <ShieldCheck className="h-4 w-4 text-crystal" />
                        </div>
                        <h2 className="text-lg font-semibold text-navy-dark">
                          {t('confirmation')}
                        </h2>
                      </div>
                      <p className="text-body text-sm mb-5">{t('confirmationText')}</p>

                      <div className="space-y-3">
                        {/* Services */}
                        <div className="bg-slate-50 rounded-2xl p-4 relative group">
                          <button
                            onClick={() => goTo(1)}
                            className="absolute top-3 right-3 p-1.5 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            title={t('edit')}
                          >
                            <Pencil className="h-3.5 w-3.5 text-body" />
                          </button>
                          <p className="text-[11px] font-semibold text-body/60 uppercase tracking-wider mb-2">
                            {t('selectedServices')}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedServices.map((id) => (
                              <span
                                key={id}
                                className="inline-flex items-center gap-1 bg-crystal/10 text-crystal text-xs font-medium px-2.5 py-1 rounded-lg"
                              >
                                {tServices(`${id}.name`)}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 rounded-2xl p-4 relative group">
                            <button
                              onClick={() => goTo(2)}
                              className="absolute top-3 right-3 p-1.5 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                              title={t('edit')}
                            >
                              <Pencil className="h-3.5 w-3.5 text-body" />
                            </button>
                            <p className="text-[11px] font-semibold text-body/60 uppercase tracking-wider mb-1">
                              {t('selectedDate')}
                            </p>
                            <p className="font-semibold text-navy-dark text-sm">
                              {selectedDate && format(new Date(selectedDate), 'EEE, d MMM', { locale: dateFnsLocale })}
                            </p>
                          </div>
                          <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-[11px] font-semibold text-body/60 uppercase tracking-wider mb-1">
                              {t('selectedTime')}
                            </p>
                            <p className="font-semibold text-navy-dark text-sm">
                              {selectedTime && t(selectedTime as any)}
                            </p>
                          </div>
                        </div>

                        {/* Contact info */}
                        <div className="bg-slate-50 rounded-2xl p-4 relative group">
                          <button
                            onClick={() => goTo(3)}
                            className="absolute top-3 right-3 p-1.5 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            title={t('edit')}
                          >
                            <Pencil className="h-3.5 w-3.5 text-body" />
                          </button>
                          <p className="text-[11px] font-semibold text-body/60 uppercase tracking-wider mb-2">
                            {t('contactInfo')}
                          </p>
                          <div className="space-y-1 text-sm">
                            <p className="font-semibold text-navy-dark">{formData.fullName}</p>
                            <p className="text-body">{formData.phone}</p>
                            {formData.email && <p className="text-body">{formData.email}</p>}
                            {formData.address && <p className="text-body">{formData.address}</p>}
                            {formData.notes && (
                              <p className="text-body/70 text-xs mt-2 italic">&ldquo;{formData.notes}&rdquo;</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-5 border-t border-slate-100">
                {step > 1 ? (
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    className="text-body hover:text-navy-dark"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    {t('back')}
                  </Button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <Button onClick={nextStep} size="lg" className="px-8">
                    {t('next')}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="px-8 shadow-lg shadow-[#25D366]/20"
                    onClick={handleSubmit}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {t('submit')}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* ─── Live Side Summary (desktop) ─── */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Summary card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                <h3 className="font-semibold text-navy-dark text-sm mb-4">
                  {t('confirmation')}
                </h3>

                {/* Selected services */}
                {selectedServices.length > 0 ? (
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold text-body/50 uppercase tracking-wider mb-2">
                      {t('selectedServices')}
                    </p>
                    <div className="space-y-1.5">
                      {selectedServices.map((id) => {
                        const service = serviceData.find((s) => s.id === id)
                        const Icon = service ? iconMap[service.icon] : Sparkles
                        return (
                          <div key={id} className="flex items-center gap-2 text-xs">
                            <Icon className="h-3.5 w-3.5 text-crystal" />
                            <span className="text-navy-dark font-medium">{tServices(`${id}.name`)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-body/50 mb-4">{t('validation.selectService')}</p>
                )}

                {/* Date & time */}
                {selectedDate && (
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold text-body/50 uppercase tracking-wider mb-1">
                      {t('selectedDate')}
                    </p>
                    <p className="text-xs font-medium text-navy-dark">
                      {format(new Date(selectedDate), 'EEEE, d MMMM', { locale: dateFnsLocale })}
                    </p>
                  </div>
                )}
                {selectedTime && (
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold text-body/50 uppercase tracking-wider mb-1">
                      {t('selectedTime')}
                    </p>
                    <p className="text-xs font-medium text-navy-dark">{t(selectedTime as any)}</p>
                  </div>
                )}

                {/* Contact */}
                {formData.fullName && (
                  <div>
                    <p className="text-[10px] font-semibold text-body/50 uppercase tracking-wider mb-1">
                      {t('contactInfo')}
                    </p>
                    <p className="text-xs font-medium text-navy-dark">{formData.fullName}</p>
                    {formData.phone && <p className="text-xs text-body">{formData.phone}</p>}
                  </div>
                )}
              </div>

              {/* Quick contact card */}
              <div className="bg-gradient-to-br from-crystal-50 to-crystal-100/50 rounded-2xl p-4 text-center">
                <p className="text-xs text-body mb-2">{t('availabilityNote')}</p>
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
    </section>
  )
}
