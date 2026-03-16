'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, Bot, Code2, TrendingUp, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePostHog } from 'posthog-js/react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const serviceLinks = [
  { key: 'aiServices' as const, descKey: 'aiServicesDesc' as const, href: '/services/ai', Icon: Bot },
  { key: 'development' as const, descKey: 'developmentDesc' as const, href: '/services/development', Icon: Code2 },
  { key: 'growth' as const, descKey: 'growthDesc' as const, href: '/services/growth', Icon: TrendingUp },
  { key: 'training' as const, descKey: 'trainingDesc' as const, href: '/services/training', Icon: GraduationCap },
]

const mainLinks = [
  { key: 'caseStudies' as const, href: '/case-studies' },
  { key: 'about' as const, href: '/about' },
  { key: 'blog' as const, href: '/blog' },
]

export function Header() {
  const t = useTranslations('nav')
  const tHeader = useTranslations('header')
  const tHero = useTranslations('homepage.hero')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const posthog = usePostHog()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function switchLocale(newLocale: string) {
    const pathWithoutLocale = pathname.replace(/^\/(el|en)/, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  function isActive(href: string): boolean {
    const localePath = `/${locale}${href}`
    return pathname === localePath || pathname.startsWith(`${localePath}/`)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-white/5 bg-slate-950/90 backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Left — Wordmark */}
        <Link href={`/${locale}`} className="flex flex-shrink-0 items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal text-sm font-bold text-white">
            HN
          </span>
          <span className="text-base font-semibold text-white">Innovaco</span>
        </Link>

        {/* Centre — Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* Services dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  'bg-transparent text-sm text-slate-400 transition-colors duration-150 hover:bg-transparent hover:text-white data-[state=open]:bg-transparent data-[state=open]:text-white',
                  serviceLinks.some((l) => isActive(l.href)) && 'text-white'
                )}
              >
                {t('services')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[480px] rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
                  <p className="mb-3 px-2 text-xs font-medium uppercase tracking-widest text-slate-500">
                    {t('services')}
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {serviceLinks.map((link) => (
                      <NavigationMenuLink asChild key={link.key}>
                        <Link
                          href={`/${locale}${link.href}`}
                          className={cn(
                            'flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-slate-800',
                            isActive(link.href) && 'bg-slate-800'
                          )}
                        >
                          <link.Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" />
                          <div>
                            <p className="text-sm font-medium text-white">
                              {t(link.key)}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400">
                              {t(link.descKey)}
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Main links */}
            {mainLinks.map((link) => (
              <NavigationMenuItem key={link.key}>
                <NavigationMenuLink asChild>
                  <Link
                    href={`/${locale}${link.href}`}
                    className={cn(
                      'relative inline-flex h-9 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm text-slate-400 transition-colors duration-150 hover:bg-transparent hover:text-white',
                      isActive(link.href) && 'text-white'
                    )}
                  >
                    {t(link.key)}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-2 right-2 h-0.5 rounded-full bg-teal"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Language switcher — segmented control */}
          <div className="inline-flex rounded-lg bg-slate-800 p-0.5">
            <button
              onClick={() => switchLocale('el')}
              className={cn(
                'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                locale === 'el'
                  ? 'bg-slate-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              ΕΛ
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={cn(
                'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                locale === 'en'
                  ? 'bg-slate-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              EN
            </button>
          </div>

          {/* Book a call — desktop */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="hidden lg:inline-flex"
          >
            <Link
              href={`/${locale}/book`}
              onClick={() => posthog?.capture('book_call_clicked', { source: 'header' })}
              className="rounded-lg bg-teal px-4 py-1.5 text-sm font-medium text-white transition-all hover:ring-2 hover:ring-teal/40 hover:ring-offset-1 hover:ring-offset-slate-950"
            >
              {t('bookCall')}
            </Link>
          </motion.div>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l border-slate-800 bg-slate-950 sm:w-[360px]"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5 text-left">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal text-sm font-bold text-white">
                    HN
                  </span>
                  <span className="text-base font-semibold text-white">
                    Innovaco
                  </span>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-1">
                {/* Services section */}
                <p className="mb-1 px-3 text-xs font-medium uppercase tracking-widest text-slate-500">
                  {t('services')}
                </p>
                {serviceLinks.map((link) => (
                  <SheetClose asChild key={link.key}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-white',
                        isActive(link.href) && 'text-white'
                      )}
                    >
                      <link.Icon className="h-4 w-4 text-teal" />
                      {t(link.key)}
                    </Link>
                  </SheetClose>
                ))}

                {/* Divider */}
                <div className="my-3 border-t border-slate-800" />

                {/* Main links */}
                {mainLinks.map((link) => (
                  <SheetClose asChild key={link.key}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className={cn(
                        'rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-white',
                        isActive(link.href) && 'text-white'
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </SheetClose>
                ))}

                <SheetClose asChild>
                  <Link
                    href={`/${locale}/contact`}
                    className={cn(
                      'rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-white',
                      isActive('/contact') && 'text-white'
                    )}
                  >
                    {t('contact')}
                  </Link>
                </SheetClose>

                {/* Divider */}
                <div className="my-3 border-t border-slate-800" />

                {/* Language switcher — mobile */}
                <div className="px-3">
                  <div className="inline-flex rounded-lg bg-slate-800 p-0.5">
                    <button
                      onClick={() => {
                        switchLocale('el')
                        setMobileOpen(false)
                      }}
                      className={cn(
                        'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                        locale === 'el'
                          ? 'bg-slate-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      )}
                    >
                      ΕΛ
                    </button>
                    <button
                      onClick={() => {
                        switchLocale('en')
                        setMobileOpen(false)
                      }}
                      className={cn(
                        'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                        locale === 'en'
                          ? 'bg-slate-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      )}
                    >
                      EN
                    </button>
                  </div>
                </div>

                {/* Book a call — mobile */}
                <SheetClose asChild>
                  <Link
                    href={`/${locale}/book`}
                    className="mt-4 block rounded-lg bg-teal px-4 py-3 text-center text-sm font-medium text-white transition-all hover:ring-2 hover:ring-teal/40"
                  >
                    {t('bookCall')}
                  </Link>
                </SheetClose>

                {/* Status badge */}
                <div className="mt-6 px-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-3 py-1.5 text-xs font-medium text-teal">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                    </span>
                    {tHero('badge')}
                  </span>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
