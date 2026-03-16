import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { MapPin, Mail, MessageCircle, Linkedin } from 'lucide-react'

const serviceLinks = [
  { key: 'aiServices' as const, href: '/services/ai' },
  { key: 'development' as const, href: '/services/development' },
  { key: 'growth' as const, href: '/services/growth' },
  { key: 'training' as const, href: '/services/training' },
]

const companyLinks = [
  { key: 'about' as const, href: '/about' },
  { key: 'caseStudies' as const, href: '/case-studies' },
  { key: 'blog' as const, href: '/blog' },
  { key: 'contact' as const, href: '/contact' },
]

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  return (
    <footer className="bg-navy-dark">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div>
            <p className="text-lg font-bold text-white">{t('brandName')}</p>
            <p className="mt-1 text-sm text-slate-400">{t('brandTagline')}</p>
            <p className="mt-3 text-sm text-slate-400">{t('builtIn')}</p>
            <a
              href="https://www.linkedin.com/company/hninnovaco"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>

          {/* Col 2 — Services */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              {t('servicesHeading')}
            </p>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              {t('companyHeading')}
            </p>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              {t('contactHeading')}
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                {t('location')}
              </li>
              <li>
                <a
                  href="mailto:hello@hninnovaco.com"
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  hello@hninnovaco.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/35799000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 flex-shrink-0" />
                  {t('chatWhatsApp')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-6 sm:flex-row">
          <p className="text-xs text-slate-600">
            {t('copyright')} · {t('deployedOn')}
          </p>
          <Link
            href={`/${locale}/privacy`}
            className="text-xs text-slate-500 transition-colors hover:text-white"
          >
            {t('privacyPolicy')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
