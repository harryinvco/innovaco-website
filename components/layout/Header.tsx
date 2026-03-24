'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navLinks = [
  { key: 'home', href: '' },
  { key: 'services', href: '/services' },
  { key: 'quote', href: '/quote' },
  { key: 'book', href: '/book' },
  { key: 'contact', href: '/contact' },
]

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const otherLocale = locale === 'el' ? 'en' : 'el'
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
  const switchLocaleHref = `/${otherLocale}${pathnameWithoutLocale === '/' ? '' : pathnameWithoutLocale}`

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="Krystallo Cleaning Services"
              width={160}
              height={52}
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const href = `/${locale}${link.href}`
              const isActive =
                link.href === ''
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(href)

              return (
                <Link
                  key={link.key}
                  href={href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-crystal bg-crystal/10'
                      : 'text-body hover:text-crystal hover:bg-crystal/5'
                  )}
                >
                  {t(link.key)}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <Link
              href={switchLocaleHref}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 hover:border-crystal hover:text-crystal transition-colors uppercase"
            >
              {otherLocale}
            </Link>

            {/* WhatsApp - Desktop */}
            <a
              href="https://wa.me/35796653034"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Button variant="whatsapp" size="sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                WhatsApp
              </Button>
            </a>

            {/* Phone - Desktop */}
            <a href="tel:+35796653034" className="hidden lg:flex">
              <Button variant="secondary" size="sm">
                <Phone className="h-4 w-4 mr-1" />
                96653034
              </Button>
            </a>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <Image
                      src="/images/logo.png"
                      alt="Krystallo"
                      width={140}
                      height={46}
                      className="h-10 w-auto"
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-6">
                  {navLinks.map((link) => {
                    const href = `/${locale}${link.href}`
                    const isActive =
                      link.href === ''
                        ? pathname === `/${locale}` || pathname === `/${locale}/`
                        : pathname.startsWith(href)

                    return (
                      <Link
                        key={link.key}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                          isActive
                            ? 'text-crystal bg-crystal/10'
                            : 'text-body hover:text-crystal hover:bg-crystal/5'
                        )}
                      >
                        {t(link.key)}
                      </Link>
                    )
                  })}
                </nav>
                <div className="mt-6 flex flex-col gap-3">
                  <a href="tel:+35796653034">
                    <Button variant="secondary" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      96653034
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/35796653034"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="whatsapp" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
