'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Clock, MapPin, Menu, MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { locales, type Locale } from '@/i18n'
import { generateWhatsAppLink } from '@/lib/services'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const navLinks = [
  { key: 'home', href: '' },
  { key: 'services', href: '/services' },
  { key: 'pricing', href: '/pricing' },
  { key: 'quote', href: '/quote' },
  { key: 'contact', href: '/contact' },
]

export function Header() {
  const t = useTranslations('nav')
  const tc = useTranslations('common')
  const tContact = useTranslations('contact')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Swap the first path segment when it is a locale, rather than trusting the
  // active locale to match the URL.
  const segments = pathname.split('/').filter(Boolean)
  const restOfPath = (locales.includes(segments[0] as Locale) ? segments.slice(1) : segments).join('/')
  const localeHref = (target: string) =>
    restOfPath ? `/${target}/${restOfPath}` : `/${target}`

  const isActive = (href: string) =>
    href === ''
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(`/${locale}${href}`)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility strip — opening hours and a one-tap phone number */}
      <div className="hidden bg-ink-900 text-white/80 lg:block">
        <div className="container-page flex h-10 items-center justify-between text-[13px]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-aqua-300" aria-hidden />
              {tContact('hoursValue')}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-aqua-300" aria-hidden />
              {tContact('locationValue')}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={generateWhatsAppLink(tc('defaultWhatsAppMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              WhatsApp
            </a>
            <a
              href={`tel:${site.phoneE164}`}
              className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-aqua-300"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {tc('phone')}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'border-b transition-all duration-300',
          scrolled
            ? 'border-ink-100 bg-white/95 shadow-sm backdrop-blur-md'
            : 'border-transparent bg-white/85 backdrop-blur-sm'
        )}
      >
        <div className="container-page">
          <div className="flex h-[4.75rem] items-center justify-between gap-4 lg:h-[5.5rem]">
            <Link
              href={`/${locale}`}
              className="flex shrink-0 items-center"
              aria-label={site.name}
            >
              <Image
                src="/images/logo.png"
                alt={site.name}
                width={280}
                height={169}
                className="h-11 w-auto sm:h-12 lg:h-14"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  className={cn(
                    'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'bg-crystal-50 text-crystal-700'
                      : 'text-ink-600 hover:bg-crystal-50/70 hover:text-crystal-700'
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Language switcher */}
              <div className="flex items-center rounded-lg border border-ink-200 p-0.5 text-xs font-semibold">
                {locales.map((code) => (
                  <Link
                    key={code}
                    href={localeHref(code)}
                    aria-current={locale === code ? 'true' : undefined}
                    className={cn(
                      'rounded-md px-2 py-1 uppercase transition-colors',
                      locale === code
                        ? 'bg-crystal-500 text-white'
                        : 'text-ink-400 hover:text-ink-700'
                    )}
                  >
                    {code}
                  </Link>
                ))}
              </div>

              <Link href={`/${locale}/quote`} className="hidden sm:block">
                <Button size="sm">{tc('getQuote')}</Button>
              </Link>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" aria-label={tc('menu')}>
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      <Image
                        src="/images/logo.png"
                        alt={site.name}
                        width={240}
                        height={145}
                        className="h-11 w-auto"
                      />
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="mt-8 flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.key}
                        href={`/${locale}${link.href}`}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                          isActive(link.href)
                            ? 'bg-crystal-50 text-crystal-700'
                            : 'text-ink-600 hover:bg-crystal-50/70'
                        )}
                      >
                        {t(link.key)}
                      </Link>
                    ))}
                    <Link
                      href={`/${locale}/book`}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-4 py-3 text-base font-medium text-ink-600 transition-colors hover:bg-crystal-50/70"
                    >
                      {t('book')}
                    </Link>
                  </nav>

                  <div className="mt-8 flex flex-col gap-2.5 border-t border-ink-100 pt-6">
                    <a href={`tel:${site.phoneE164}`}>
                      <Button variant="outline" className="w-full">
                        <Phone className="h-4 w-4" />
                        {tc('phone')}
                      </Button>
                    </a>
                    <a
                      href={generateWhatsAppLink(tc('defaultWhatsAppMessage'))}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="whatsapp" className="w-full">
                        <MessageCircle className="h-4 w-4" />
                        {tc('whatsappCta')}
                      </Button>
                    </a>
                    <p className="pt-2 text-center text-xs text-ink-400">
                      {tContact('hoursValue')}
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
