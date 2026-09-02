'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AnimatedItem } from '@/components/shared/AnimatedSection'
import { generateWhatsAppLink } from '@/lib/services'
import { site } from '@/lib/site'

export function ContactClient() {
  const t = useTranslations('contact')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = [
      `${t('whatsappTitle')} — ${form.name}`,
      `${t('phone')}: ${form.phone}`,
      form.email ? `Email: ${form.email}` : '',
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(generateWhatsAppLink(body), '_blank', 'noopener,noreferrer')
  }

  const channels = [
    {
      icon: Phone,
      label: t('phone'),
      value: site.phoneDisplay,
      href: `tel:${site.phoneE164}`,
      accent: 'bg-crystal-50 text-crystal-600',
    },
    {
      icon: MessageCircle,
      label: t('whatsapp'),
      value: t('whatsappValue'),
      href: generateWhatsAppLink(t('pageSubtitle')),
      external: true,
      accent: 'bg-whatsapp/10 text-whatsapp',
    },
    {
      icon: MapPin,
      label: t('location'),
      value: t('locationValue'),
      accent: 'bg-aqua-50 text-aqua-500',
    },
    {
      icon: Clock,
      label: t('hours'),
      value: t('hoursValue'),
      accent: 'bg-ink-50 text-ink-500',
    },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-3 lg:col-span-2">
        {channels.map((channel, i) => {
          const Icon = channel.icon
          const inner = (
            <div className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 transition-all duration-300 hover:border-crystal-200 hover:shadow-card">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${channel.accent}`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-ink-400">
                  {channel.label}
                </span>
                <span className="block font-display font-bold text-ink-900">
                  {channel.value}
                </span>
              </span>
            </div>
          )

          return (
            <AnimatedItem key={channel.label} delay={i * 0.07}>
              {channel.href ? (
                <a
                  href={channel.href}
                  target={channel.external ? '_blank' : undefined}
                  rel={channel.external ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </AnimatedItem>
          )
        })}
      </div>

      <AnimatedItem delay={0.15} className="lg:col-span-3">
        <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold text-ink-900">
            {t('formTitle')}
          </h2>
          <p className="mt-1 text-sm text-ink-400">{t('formSubtitle')}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">{t('name')} *</Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={update('name')}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">{t('phonePlaceholder')} *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={update('phone')}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">{t('emailPlaceholder')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={update('email')}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">{t('message')} *</Label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder={t('messagePlaceholder')}
                value={form.message}
                onChange={update('message')}
              />
            </div>

            <Button type="submit" variant="whatsapp" size="lg" className="w-full">
              <MessageCircle className="h-5 w-5" aria-hidden />
              {t('send')}
            </Button>
          </form>
        </div>
      </AnimatedItem>
    </div>
  )
}
