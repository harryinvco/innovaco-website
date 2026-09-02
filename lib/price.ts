import type { ServiceConfig, ServiceTier } from '@/lib/services'
import { entryPrice } from '@/lib/services'

type Translate = (key: string) => string

export function euro(amount: number): string {
  return `€${amount}`
}

/** "From €20" / "€25 – €30" / "€60" / "Quoted after we see it" */
export function tierPriceText(tier: ServiceTier, t: Translate): string {
  switch (tier.kind) {
    case 'onRequest':
      return t('price.onRequest')
    case 'from':
      return `${t('price.from')} ${euro(tier.min)}`
    case 'range':
      return `${euro(tier.min)} – ${euro(tier.max)}`
    default:
      return euro(tier.min)
  }
}

/** Compact form for cards and chips — no "from" prefix, no spaces around the dash. */
export function tierPriceCompact(tier: ServiceTier, t: Translate): string {
  switch (tier.kind) {
    case 'onRequest':
      return t('price.onRequestShort')
    case 'range':
      return `${euro(tier.min)}–${euro(tier.max)}`
    default:
      return euro(tier.min)
  }
}

/** Headline price for a whole service: its cheapest published tier. */
export function servicePriceText(service: ServiceConfig, t: Translate): string {
  const entry = entryPrice(service)
  if (entry === null) return t('price.onRequest')
  return `${t('price.from')} ${euro(entry)}`
}

/** What one unit of a service is called — "per seat", "per m²", … */
export function unitLabel(service: ServiceConfig, t: Translate): string {
  return t(`units.${service.unit}.per`)
}

export function quantityLabel(
  service: ServiceConfig,
  quantity: number,
  t: Translate
): string {
  return t(`units.${service.unit}.${quantity === 1 ? 'one' : 'many'}`)
}

/** Total for a line: unit price × quantity, kept in the tier's own shape. */
export function lineTotalText(
  tier: ServiceTier,
  quantity: number,
  t: Translate
): string {
  if (tier.kind === 'onRequest') return t('price.onRequestShort')
  const min = tier.min * quantity
  const max = tier.max * quantity
  if (tier.kind === 'from') return `${t('price.from')} ${euro(min)}`
  if (min === max) return euro(min)
  return `${euro(min)} – ${euro(max)}`
}
