'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { usePostHog } from 'posthog-js/react'
import { contactSchema, type ContactFormData } from '@/lib/validations'

const sourceKeys = [
  'sourceLinkedIn',
  'sourceGoogle',
  'sourceReferral',
  'sourceKebe',
  'sourceOther',
] as const

export function ContactForm() {
  const t = useTranslations('contact.form')
  const locale = useLocale()
  const posthog = usePostHog()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      posthog?.capture('contact_form_submitted')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-teal" />
        <h3 className="mt-4 text-xl font-bold text-navy">{t('successHeading')}</h3>
        <p className="mt-2 text-muted-foreground">{t('successBody')}</p>
        <Link
          href={`/${locale}`}
          className="mt-6 text-sm font-medium text-teal hover:underline"
        >
          {t('backHome')}
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {status === 'error' && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {t('errorMessage')}
        </p>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy">
          {t('name')}
        </label>
        <input
          id="name"
          type="text"
          placeholder={t('namePlaceholder')}
          disabled={status === 'loading'}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-body outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10 disabled:opacity-50"
          {...register('name')}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{t('validation.nameMin')}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy">
          {t('email')}
        </label>
        <input
          id="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          disabled={status === 'loading'}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-body outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10 disabled:opacity-50"
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{t('validation.emailInvalid')}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-navy">
          {t('company')}
        </label>
        <input
          id="company"
          type="text"
          placeholder={t('companyPlaceholder')}
          disabled={status === 'loading'}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-body outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10 disabled:opacity-50"
          {...register('company')}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy">
          {t('message')}
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder={t('messagePlaceholder')}
          disabled={status === 'loading'}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-body outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10 disabled:opacity-50"
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{t('validation.messageMin')}</p>
        )}
      </div>

      {/* Source */}
      <div>
        <label htmlFor="source" className="block text-sm font-medium text-navy">
          {t('source')}
        </label>
        <select
          id="source"
          disabled={status === 'loading'}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-body outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10 disabled:opacity-50"
          {...register('source')}
        >
          <option value="">{t('sourcePlaceholder')}</option>
          {sourceKeys.map((key) => (
            <option key={key} value={t(key)}>
              {t(key)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3 font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
      >
        {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === 'loading' ? t('sending') : t('submit')}
      </button>
    </form>
  )
}
