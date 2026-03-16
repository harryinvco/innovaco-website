'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePostHog } from 'posthog-js/react'
import { cn } from '@/lib/utils'

interface FormData {
  businessType: string
  challenge: string
  companySize: string
  timeline: string
  source: string
  notes: string
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
}

const initialData: FormData = {
  businessType: '',
  challenge: '',
  companySize: '',
  timeline: '',
  source: '',
  notes: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
}

const businessTypes = [
  'hotel', 'legal', 'accounting', 'medical',
  'realEstate', 'retail', 'construction', 'technology', 'other',
] as const

const challenges = [
  'challengeAI', 'challengeWebApp', 'challengeGrowth',
  'challengeTraining', 'challengeProduct', 'challengeOther',
] as const

const sizes = ['size1', 'size2', 'size3', 'size4', 'size5'] as const

const timelines = [
  'timelineNow', 'timeline1to3', 'timeline3to6', 'timelineExploring',
] as const

const sources = [
  'sourceLinkedIn', 'sourceGoogle', 'sourceReferral',
  'sourceKebe', 'sourceDiggIN', 'sourceOther',
] as const

function RadioCard({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-xl border p-4 text-left text-sm transition-colors',
        selected
          ? 'border-teal bg-teal-50 font-medium text-navy'
          : 'border-slate-200 text-body hover:border-slate-300',
        className
      )}
    >
      {children}
    </button>
  )
}

export function BookingForm() {
  const t = useTranslations('book')
  const tVal = useTranslations('book.validation')
  const locale = useLocale()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(initialData)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const posthog = usePostHog()
  const [stepErrors, setStepErrors] = useState<string[]>([])

  function update(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }))
    setStepErrors([])
  }

  function validateStep1(): boolean {
    const errs: string[] = []
    if (!data.businessType) errs.push('businessType')
    if (!data.challenge) errs.push('challenge')
    if (!data.companySize) errs.push('companySize')
    setStepErrors(errs)
    return errs.length === 0
  }

  function validateStep2(): boolean {
    const errs: string[] = []
    if (!data.timeline) errs.push('timeline')
    setStepErrors(errs)
    return errs.length === 0
  }

  function validateStep3(): boolean {
    const errs: string[] = []
    if (data.firstName.length < 2) errs.push('firstName')
    if (data.lastName.length < 2) errs.push('lastName')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.push('email')
    if (!data.companyName) errs.push('companyName')
    setStepErrors(errs)
    return errs.length === 0
  }

  function goNext() {
    if (step === 1 && validateStep1()) {
      posthog?.capture('booking_step_completed', { step: 1 })
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      posthog?.capture('booking_step_completed', { step: 2 })
      setStep(3)
    }
  }

  async function onSubmit() {
    if (!validateStep3()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      posthog?.capture('booking_step_completed', { step: 3 })
      posthog?.capture('booking_form_completed', {
        businessType: data.businessType,
        challenge: data.challenge,
      })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-teal" />
        <h2 className="mt-4 text-2xl font-bold text-navy">{t('success.headline')}</h2>
        <p className="mt-2 text-muted-foreground">{t('success.body')}</p>
        <Link
          href={`/${locale}`}
          className="mt-6 inline-block text-sm font-medium text-teal hover:underline"
        >
          {t('success.backHome')}
        </Link>
      </div>
    )
  }

  const stepLabels = [t('progress.step1'), t('progress.step2'), t('progress.step3')]

  return (
    <>
      {/* Progress bar */}
      <div className="mx-auto flex max-w-xl items-center justify-center gap-3">
        {stepLabels.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                step > i + 1
                  ? 'bg-teal text-white'
                  : step === i + 1
                    ? 'bg-teal text-white'
                    : 'bg-slate-200 text-muted-foreground'
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                'hidden text-sm sm:inline',
                step === i + 1 ? 'font-medium text-navy' : 'text-muted-foreground'
              )}
            >
              {label}
            </span>
            {i < 2 && (
              <div className="mx-1 h-px w-8 bg-slate-200 sm:w-12" />
            )}
          </div>
        ))}
      </div>

      {/* Form card */}
      <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {status === 'error' && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {t('error')}
          </p>
        )}

        <AnimatePresence mode="wait">
        {/* Step 1 */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-6"
          >
            {/* Business type */}
            <div>
              <p className="font-medium text-navy">
                {t('step1.businessType')}
                {stepErrors.includes('businessType') && (
                  <span className="ml-2 text-xs text-red-500">{tVal('required')}</span>
                )}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {businessTypes.map((key) => (
                  <RadioCard
                    key={key}
                    selected={data.businessType === t(`step1.${key}`)}
                    onClick={() => update('businessType', t(`step1.${key}`))}
                  >
                    {t(`step1.${key}`)}
                  </RadioCard>
                ))}
              </div>
            </div>

            {/* Challenge */}
            <div>
              <p className="font-medium text-navy">
                {t('step1.challenge')}
                {stepErrors.includes('challenge') && (
                  <span className="ml-2 text-xs text-red-500">{tVal('required')}</span>
                )}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {challenges.map((key) => (
                  <RadioCard
                    key={key}
                    selected={data.challenge === t(`step1.${key}`)}
                    onClick={() => update('challenge', t(`step1.${key}`))}
                  >
                    {t(`step1.${key}`)}
                  </RadioCard>
                ))}
              </div>
            </div>

            {/* Company size */}
            <div>
              <p className="font-medium text-navy">
                {t('step1.companySize')}
                {stepErrors.includes('companySize') && (
                  <span className="ml-2 text-xs text-red-500">{tVal('required')}</span>
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => update('companySize', t(`step1.${key}`))}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm transition-colors',
                      data.companySize === t(`step1.${key}`)
                        ? 'bg-teal font-medium text-white'
                        : 'bg-slate-100 text-body hover:bg-slate-200'
                    )}
                  >
                    {t(`step1.${key}`)}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={goNext}
              className="w-full rounded-xl bg-teal px-6 py-3 font-medium text-white transition-colors hover:bg-teal-dark"
            >
              {t('nav.next')}
            </button>
          </motion.div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-6"
          >
            {/* Timeline */}
            <div>
              <p className="font-medium text-navy">
                {t('step2.timeline')}
                {stepErrors.includes('timeline') && (
                  <span className="ml-2 text-xs text-red-500">{tVal('required')}</span>
                )}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {timelines.map((key) => (
                  <RadioCard
                    key={key}
                    selected={data.timeline === t(`step2.${key}`)}
                    onClick={() => update('timeline', t(`step2.${key}`))}
                  >
                    {t(`step2.${key}`)}
                  </RadioCard>
                ))}
              </div>
            </div>

            {/* Source */}
            <div>
              <p className="font-medium text-navy">{t('step2.source')}</p>
              <select
                value={data.source}
                onChange={(e) => update('source', e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-body outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10"
              >
                <option value="">{t('step2.sourcePlaceholder')}</option>
                {sources.map((key) => (
                  <option key={key} value={t(`step2.${key}`)}>
                    {t(`step2.${key}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <p className="font-medium text-navy">{t('step2.notes')}</p>
              <textarea
                rows={4}
                value={data.notes}
                onChange={(e) => update('notes', e.target.value)}
                placeholder={t('step2.notesPlaceholder')}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-body outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-body transition-colors hover:bg-slate-50"
              >
                {t('nav.back')}
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex-1 rounded-xl bg-teal px-6 py-3 font-medium text-white transition-colors hover:bg-teal-dark"
              >
                {t('nav.next')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="booking-firstName" className="block text-sm font-medium text-navy">
                  {t('step3.firstName')}
                </label>
                <input
                  id="booking-firstName"
                  type="text"
                  value={data.firstName}
                  onChange={(e) => update('firstName', e.target.value)}
                  disabled={status === 'loading'}
                  className={cn(
                    'mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-body outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10 disabled:opacity-50',
                    stepErrors.includes('firstName') ? 'border-red-300' : 'border-slate-200'
                  )}
                />
                {stepErrors.includes('firstName') && (
                  <p className="mt-1 text-xs text-red-500">{tVal('nameMin')}</p>
                )}
              </div>
              <div>
                <label htmlFor="booking-lastName" className="block text-sm font-medium text-navy">
                  {t('step3.lastName')}
                </label>
                <input
                  id="booking-lastName"
                  type="text"
                  value={data.lastName}
                  onChange={(e) => update('lastName', e.target.value)}
                  disabled={status === 'loading'}
                  className={cn(
                    'mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-body outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10 disabled:opacity-50',
                    stepErrors.includes('lastName') ? 'border-red-300' : 'border-slate-200'
                  )}
                />
                {stepErrors.includes('lastName') && (
                  <p className="mt-1 text-xs text-red-500">{tVal('nameMin')}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="booking-email" className="block text-sm font-medium text-navy">
                {t('step3.email')}
              </label>
              <input
                id="booking-email"
                type="email"
                value={data.email}
                onChange={(e) => update('email', e.target.value)}
                disabled={status === 'loading'}
                className={cn(
                  'mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-body outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10 disabled:opacity-50',
                  stepErrors.includes('email') ? 'border-red-300' : 'border-slate-200'
                )}
              />
              {stepErrors.includes('email') && (
                <p className="mt-1 text-xs text-red-500">{tVal('emailInvalid')}</p>
              )}
            </div>

            <div>
              <label htmlFor="booking-phone" className="block text-sm font-medium text-navy">
                {t('step3.phone')}{' '}
                <span className="text-xs text-muted-foreground">
                  {t('step3.phoneLabel')}
                </span>
              </label>
              <input
                id="booking-phone"
                type="tel"
                value={data.phone}
                onChange={(e) => update('phone', e.target.value)}
                disabled={status === 'loading'}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-body outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10 disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="booking-companyName" className="block text-sm font-medium text-navy">
                {t('step3.companyName')}
              </label>
              <input
                id="booking-companyName"
                type="text"
                value={data.companyName}
                onChange={(e) => update('companyName', e.target.value)}
                disabled={status === 'loading'}
                className={cn(
                  'mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-body outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10 disabled:opacity-50',
                  stepErrors.includes('companyName') ? 'border-red-300' : 'border-slate-200'
                )}
              />
              {stepErrors.includes('companyName') && (
                <p className="mt-1 text-xs text-red-500">{tVal('required')}</p>
              )}
            </div>

            <p className="text-xs text-muted-foreground">{t('step3.note')}</p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={status === 'loading'}
                className="flex-1 rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-body transition-colors hover:bg-slate-50 disabled:opacity-50"
              >
                {t('nav.back')}
              </button>
              <button
                type="button"
                onClick={onSubmit}
                disabled={status === 'loading'}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3 font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
              >
                {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
                {t('nav.submit')}
              </button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </>
  )
}
