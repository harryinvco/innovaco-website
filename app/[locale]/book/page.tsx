import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'
import { BookingForm } from '@/components/forms/BookingForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'book.meta' })
  return { title: t('title'), description: t('description') }
}

export default function BookPage() {
  const t = useTranslations('book.hero')

  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy md:text-4xl">
            {t('headline')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{t('subheadline')}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            {(['trust1', 'trust2', 'trust3'] as const).map((key) => (
              <span
                key={key}
                className="flex items-center gap-1.5 text-sm text-body"
              >
                <Check className="h-4 w-4 text-teal" />
                {t(key)}
              </span>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="mt-10">
          <BookingForm />
        </div>
      </div>
    </section>
  )
}
