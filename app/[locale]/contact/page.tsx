import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ContactClient } from './ContactClient'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' })
  return {
    title: t('pageTitle'),
    description: t('pageSubtitle'),
    alternates: { canonical: `/${locale}/contact` },
  }
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'contact' })

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-gradient-to-b from-crystal-50/70 to-white py-14 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(38,120,209,0.12),transparent)]" />
        <div className="container-page relative text-center">
          <span className="eyebrow">{t('badge')}</span>
          <h1 className="heading-1 mt-5">{t('pageTitle')}</h1>
          <p className="lead mx-auto mt-4 max-w-2xl">{t('pageSubtitle')}</p>
        </div>
      </section>

      <section className="section-below-header">
        <div className="container-page max-w-5xl">
          <ContactClient />
        </div>
      </section>
    </>
  )
}
