import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { isLocale, locales } from '@/i18n'
import { fontDisplay, fontSans } from '@/lib/fonts'
import { site } from '@/lib/site'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileActionBar } from '@/components/layout/MobileActionBar'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { PageTransition } from '@/components/providers/PageTransition'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'common' })

  return {
    metadataBase: new URL(site.url),
    title: {
      template: `%s | ${site.name}`,
      default: `${site.name} — ${t('tagline')}`,
    },
    description: t('siteDescription'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        el: '/el',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: locale === 'el' ? 'el_CY' : 'en_CY',
      title: `${site.name} — ${t('tagline')}`,
      description: t('siteDescription'),
      url: `/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} — ${t('tagline')}`,
      description: t('siteDescription'),
    },
    icons: {
      icon: '/images/logo.png',
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isLocale(locale)) notFound()

  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: 'common' })

  return (
    <html
      lang={locale}
      className={`${fontSans.variable} ${fontDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-crystal-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
          >
            {t('skipToContent')}
          </a>
          <Header />
          <PageTransition>
            <main
              id="main-content"
              className="header-offset pb-safe-bar lg:pb-0"
            >
              {children}
            </main>
          </PageTransition>
          <Footer />
          <MobileActionBar />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
