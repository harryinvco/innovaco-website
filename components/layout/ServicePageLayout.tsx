import Link from 'next/link'
import { useLocale } from 'next-intl'
import { HomeCTA } from '@/components/sections/home/HomeCTA'
import { JsonLd } from '@/components/shared/JsonLd'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hninnovaco.com'

interface ServicePageLayoutProps {
  label: string
  headline: string
  subheadline: string
  ctaText: string
  ctaHref: string
  children: React.ReactNode
}

export function ServicePageLayout({
  label,
  headline,
  subheadline,
  ctaText,
  ctaHref,
  children,
}: ServicePageLayoutProps) {
  const locale = useLocale()

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: label,
          description: subheadline,
          provider: {
            '@type': 'Organization',
            name: 'HN Innovaco Ltd',
            url: baseUrl,
          },
        }}
      />
      {/* Hero */}
      <section className="bg-navy-dark py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-teal">
            {label}
          </p>
          <h1 className="mt-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            {headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">{subheadline}</p>
          <div className="mt-8">
            <Link
              href={`/${locale}${ctaHref}`}
              className="inline-flex rounded-xl bg-teal px-6 py-3 font-medium text-white transition-colors hover:bg-teal-light"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </section>

      {/* Page-specific sections */}
      {children}

      {/* Bottom CTA */}
      <HomeCTA />
    </>
  )
}
