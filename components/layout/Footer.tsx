'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Phone, MessageCircle, MapPin } from 'lucide-react'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tServices = useTranslations('services')
  const locale = useLocale()

  const serviceNames = [
    'car',
    'sofa',
    'mattress',
    'radiator',
    'carpet',
    'leather',
    'chair',
    'stroller',
  ] as const

  const quickLinks = [
    { key: 'home', href: `/${locale}` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'quote', href: `/${locale}/quote` },
    { key: 'book', href: `/${locale}/book` },
    { key: 'contact', href: `/${locale}/contact` },
  ]

  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <Image
                src="/images/logo.png"
                alt={t('brand')}
                width={160}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-slate-400 text-sm">{t('tagline')}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">
              {t('services')}
            </h3>
            <ul className="space-y-2">
              {serviceNames.map((name) => (
                <li key={name}>
                  <Link
                    href={`/${locale}/services`}
                    className="text-sm text-slate-400 hover:text-crystal transition-colors"
                  >
                    {tServices(`${name}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-crystal transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">
              {t('contactInfo')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+35796653034"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-crystal transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  96653034
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/35796653034"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4" />
                Cyprus
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Krystallo Cleaning Services. {t('rights')}.
          </p>
        </div>
      </div>
    </footer>
  )
}
