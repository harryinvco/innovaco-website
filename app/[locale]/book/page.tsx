import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { BookClient } from './BookClient'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'book' })
  return {
    title: t('pageTitle'),
    description: t('pageSubtitle'),
    alternates: { canonical: `/${locale}/book` },
  }
}

export default function BookPage() {
  return (
    <Suspense>
      <BookClient />
    </Suspense>
  )
}
