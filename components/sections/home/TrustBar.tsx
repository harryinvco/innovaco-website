'use client'

import { useTranslations } from 'next-intl'
import { Leaf, MapPin, ReceiptText, Timer } from 'lucide-react'
import { AnimatedListItem } from '@/components/shared/AnimatedSection'

const items = [
  { icon: ReceiptText, key: 'item1' },
  { icon: Leaf, key: 'item2' },
  { icon: Timer, key: 'item3' },
  { icon: MapPin, key: 'item4' },
]

export function TrustBar() {
  const t = useTranslations('homepage.trustBar')

  return (
    <section className="border-y border-ink-100 bg-white">
      <div className="container-page">
        <ul className="grid grid-cols-2 divide-ink-100 lg:grid-cols-4 lg:divide-x">
          {items.map(({ icon: Icon, key }, i) => (
            <AnimatedListItem
              key={key}
              delay={i * 0.07}
              className="flex items-start gap-3 px-1 py-6 lg:px-6"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-crystal-50">
                <Icon className="h-[18px] w-[18px] text-crystal-600" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-sm font-bold text-ink-900">
                  {t(`${key}Title`)}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-ink-400">
                  {t(`${key}Desc`)}
                </span>
              </span>
            </AnimatedListItem>
          ))}
        </ul>
      </div>
    </section>
  )
}
