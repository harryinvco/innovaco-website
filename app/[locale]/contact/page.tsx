import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { useLocale, useTranslations } from 'next-intl'
import { MapPin, Mail, MessageCircle, Linkedin } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact.meta' })
  return { title: t('title'), description: t('description') }
}

export default function ContactPage() {
  const t = useTranslations('contact.info')
  const locale = useLocale()

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr]">
          {/* Left — Info */}
          <div>
            <h1 className="text-3xl font-bold text-navy md:text-4xl">
              {t('headline')}
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              {t('subheadline')}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-body">
                <MapPin className="h-5 w-5 flex-shrink-0 text-teal" />
                {t('location')}
              </div>
              <a
                href="mailto:hello@hninnovaco.com"
                className="flex items-center gap-3 text-sm text-body transition-colors hover:text-teal"
              >
                <Mail className="h-5 w-5 flex-shrink-0 text-teal" />
                hello@hninnovaco.com
              </a>
              <a
                href="https://wa.me/35799000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-body transition-colors hover:text-teal"
              >
                <MessageCircle className="h-5 w-5 flex-shrink-0 text-teal" />
                {t('chatWhatsApp')}
              </a>
              <a
                href="https://www.linkedin.com/company/hninnovaco"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-body transition-colors hover:text-teal"
              >
                <Linkedin className="h-5 w-5 flex-shrink-0 text-teal" />
                {t('connectLinkedIn')}
              </a>
            </div>

            <Link
              href={`/${locale}/book`}
              className="mt-8 inline-block text-sm font-medium text-teal hover:underline"
            >
              {t('preferCall')}
            </Link>
          </div>

          {/* Right — Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
