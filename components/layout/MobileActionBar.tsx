'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Calculator, MessageCircle, Phone } from 'lucide-react'
import { generateWhatsAppLink } from '@/lib/services'
import { site } from '@/lib/site'

/**
 * Always-visible call / WhatsApp / price bar on small screens.
 *
 * Hidden on /quote and /book, which each carry their own contextual bottom
 * bar — two stacked bars would eat half the viewport on a phone.
 */
export function MobileActionBar() {
  const t = useTranslations('common')
  const tNav = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  const suppressed = ['/quote', '/book'].some((p) =>
    pathname.startsWith(`/${locale}${p}`)
  )
  if (suppressed) return null

  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 px-3 pt-2 backdrop-blur-lg lg:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${site.phoneE164}`}
          className="flex h-12 flex-col items-center justify-center rounded-xl text-[11px] font-semibold text-ink-600 transition-colors active:bg-ink-50"
        >
          <Phone className="mb-0.5 h-[18px] w-[18px] text-crystal-500" aria-hidden />
          {t('callUs')}
        </a>
        <a
          href={generateWhatsAppLink(t('defaultWhatsAppMessage'))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-col items-center justify-center rounded-xl bg-whatsapp text-[11px] font-semibold text-white transition-colors active:bg-whatsapp-dark"
        >
          <MessageCircle className="mb-0.5 h-[18px] w-[18px]" aria-hidden />
          WhatsApp
        </a>
        <Link
          href={`/${locale}/quote`}
          className="flex h-12 flex-col items-center justify-center rounded-xl bg-crystal-500 text-[11px] font-semibold text-white transition-colors active:bg-crystal-600"
        >
          <Calculator className="mb-0.5 h-[18px] w-[18px]" aria-hidden />
          {tNav('quote')}
        </Link>
      </div>
    </div>
  )
}
