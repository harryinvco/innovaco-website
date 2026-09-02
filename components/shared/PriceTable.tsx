'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, Info } from 'lucide-react'
import { ServiceIcon } from '@/components/shared/ServiceIcon'
import { services as allServices, type ServiceConfig } from '@/lib/services'
import { tierPriceText, unitLabel } from '@/lib/price'
import { cn } from '@/lib/utils'

interface PriceTableProps {
  /** Defaults to the full price list */
  items?: ServiceConfig[]
  /** Each card links through to the calculator with that service preselected */
  linkToQuote?: boolean
  className?: string
}

export function PriceTable({
  items = allServices,
  linkToQuote = true,
  className,
}: PriceTableProps) {
  const t = useTranslations()
  const tServices = useTranslations('services')
  const locale = useLocale()

  return (
    <div className={cn('gap-4 md:columns-2 md:gap-4', className)}>
      {items.map((service) => {
        const multi = service.tiers.length > 1
        const body = (
          <div className="flex h-full flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 group-hover:border-crystal-200 group-hover:shadow-card-hover sm:p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-crystal-500 text-white shadow-brand">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-base font-bold leading-snug text-ink-900 sm:text-lg">
                  {tServices(`${service.id}.name`)}
                </h3>

                {!multi && (
                  <p className="mt-1 font-display text-xl font-extrabold text-crystal-600 tabular">
                    {tierPriceText(service.tiers[0], t)}
                    {service.tiers[0].kind !== 'onRequest' && (
                      <span className="ml-1 text-sm font-semibold text-ink-400">
                        / {t(`units.${service.unit}.one`)}
                      </span>
                    )}
                  </p>
                )}
              </div>

              {linkToQuote && (
                <ArrowRight
                  className="mt-1 h-4 w-4 shrink-0 text-ink-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-crystal-500"
                  aria-hidden
                />
              )}
            </div>

            {multi && (
              <ul className="space-y-2 rounded-xl bg-crystal-50/70 p-4">
                {service.tiers.map((tier) => (
                  <li
                    key={tier.id}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span className="text-ink-600">
                      {tServices(`${service.id}.tiers.${tier.id}`)}
                    </span>
                    <span className="shrink-0 font-display font-bold text-ink-900 tabular">
                      {tierPriceText(tier, t)}
                      {service.unit === 'sqm' && (
                        <span className="ml-1 text-xs font-semibold text-ink-400">
                          / {t('units.sqm.one')}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {service.conditionDependent && (
              <p className="mt-auto flex items-center gap-1.5 text-xs text-ink-400">
                <Info className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {t('price.conditionNote')}
              </p>
            )}
          </div>
        )

        return (
          /* Deliberately not scroll-animated: the price list is the point of
             the page, so it must never depend on an observer firing. */
          <div key={service.id} className="group mb-4 break-inside-avoid">
            {linkToQuote ? (
              <Link
                href={`/${locale}/quote?service=${service.id}`}
                className="block h-full"
                aria-label={`${tServices(`${service.id}.name`)} — ${unitLabel(service, t)}`}
              >
                {body}
              </Link>
            ) : (
              body
            )}
          </div>
        )
      })}
    </div>
  )
}
