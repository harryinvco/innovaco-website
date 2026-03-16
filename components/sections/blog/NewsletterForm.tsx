'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Loader2 } from 'lucide-react'

export function NewsletterForm() {
  const t = useTranslations('blog.detail.newsletter')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-sm font-medium text-teal">{t('success')}</p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label htmlFor="newsletter-email" className="sr-only">
        {t('placeholder')}
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('placeholder')}
        required
        disabled={status === 'loading'}
        className="w-full rounded-xl border border-teal-100 bg-white px-4 py-3 text-sm text-body outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/10 disabled:opacity-50"
      />
      {status === 'error' && (
        <p className="text-xs text-red-500">{t('error')}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
      >
        {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
        {t('subscribe')}
      </button>
    </form>
  )
}
