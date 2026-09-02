import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { QuoteClient } from './QuoteClient'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'quote' })
  return {
    title: t('pageTitle'),
    description: t('pageSubtitle'),
    alternates: { canonical: `/${locale}/quote` },
  }
}

export default function QuotePage() {
  return (
    <Suspense>
      <QuoteClient />
    </Suspense>
  )
}
