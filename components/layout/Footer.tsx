'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { generateWhatsAppLink, services } from '@/lib/services'
import { site } from '@/lib/site'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tc = useTranslations('common')
  const tServices = useTranslations('services')
  const tContact = useTranslations('contact')
  const locale = useLocale()

  const quickLinks = ['home', 'services', 'pricing', 'quote', 'book', 'contact']
  const hrefFor = (key: string) =>
    key === 'home' ? `/${locale}` : `/${locale}/${key}`

  return (
    <footer className="bg-ink-900 pb-safe-bar text-white lg:pb-0">
      <div className="container-page py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Image
              src="/images/logo-white.png"
              alt={site.name}
              width={280}
              height={169}
              className="h-14 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {t('tagline')}
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href={`tel:${site.phoneE164}`}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-semibold transition-colors hover:bg-white/20"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {tc('phone')}
              </a>
              <a
                href={generateWhatsAppLink(tc('defaultWhatsAppMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-whatsapp px-4 text-sm font-semibold transition-colors hover:bg-whatsapp-dark"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-4">
            <h2 className="mb-4 text-sm font-semibold text-white">
              {t('services')}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/${locale}/services#${service.id}`}
                    className="text-sm text-white/60 transition-colors hover:text-aqua-300"
                  >
                    {tServices(`${service.id}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-sm font-semibold text-white">
              {t('quickLinks')}
            </h2>
            <ul className="space-y-2">
              {quickLinks.map((key) => (
                <li key={key}>
                  <Link
                    href={hrefFor(key)}
                    className="text-sm text-white/60 transition-colors hover:text-aqua-300"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-sm font-semibold text-white">
              {t('contactInfo')}
            </h2>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="flex items-start gap-2 transition-colors hover:text-aqua-300"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {tc('phone')}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {tContact('locationValue')}
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {t('hours')}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {site.name}. {t('rights')}.
          </p>
          <p className="text-[13px] text-white/50">
            {t('madeBy')}{' '}
            <a
              href="https://innovaco.com.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/80 underline-offset-4 transition-colors hover:text-aqua-300 hover:underline"
            >
              Innovaco
            </a>{' '}
            <span aria-hidden>&#127464;&#127486;</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
