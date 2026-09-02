import { site } from '@/lib/site'

/**
 * Pricing mirrors the published Krystallo price list ("ΝΕΟΣ ΤΙΜΟΚΑΤΑΛΟΓΟΣ").
 *
 *   'from'      — an opening price; the real figure depends on the item's condition
 *   'range'     — quoted between two figures
 *   'fixed'     — a single flat figure
 *   'onRequest' — not on the printed list, quoted after we see the piece
 */
export type PriceKind = 'from' | 'range' | 'fixed' | 'onRequest'

export interface ServiceTier {
  id: string
  kind: PriceKind
  min: number
  max: number
}

export interface ServiceConfig {
  id: string
  icon: string
  /** i18n key suffix under `units.*` — what a single unit of this service is */
  unit: string
  /** Ceiling for the quantity stepper in the calculator */
  maxQuantity: number
  /** Price list footnote: "depending on the condition" */
  conditionDependent: boolean
  /** Pulled forward in the homepage grid */
  featured?: boolean
  tiers: ServiceTier[]
}

export const services: ServiceConfig[] = [
  {
    id: 'sofa',
    icon: 'Sofa',
    unit: 'seat',
    maxQuantity: 12,
    conditionDependent: true,
    featured: true,
    tiers: [{ id: 'seat', kind: 'from', min: 20, max: 20 }],
  },
  {
    id: 'armchair',
    icon: 'Armchair',
    unit: 'piece',
    maxQuantity: 10,
    conditionDependent: true,
    featured: true,
    tiers: [{ id: 'standard', kind: 'from', min: 25, max: 25 }],
  },
  {
    id: 'chair',
    icon: 'RockingChair',
    unit: 'chair',
    maxQuantity: 24,
    conditionDependent: true,
    tiers: [{ id: 'standard', kind: 'from', min: 7, max: 7 }],
  },
  {
    id: 'mattress',
    icon: 'BedDouble',
    unit: 'mattress',
    maxQuantity: 8,
    conditionDependent: false,
    featured: true,
    tiers: [
      { id: 'superDouble', kind: 'fixed', min: 70, max: 70 },
      { id: 'double', kind: 'fixed', min: 60, max: 60 },
      { id: 'single', kind: 'fixed', min: 40, max: 40 },
      { id: 'cot', kind: 'range', min: 25, max: 30 },
    ],
  },
  {
    id: 'car',
    icon: 'CarFront',
    unit: 'vehicle',
    maxQuantity: 4,
    conditionDependent: true,
    featured: true,
    tiers: [{ id: 'standard', kind: 'from', min: 60, max: 60 }],
  },
  {
    id: 'baby',
    icon: 'Baby',
    unit: 'item',
    maxQuantity: 6,
    conditionDependent: false,
    tiers: [
      { id: 'carSeat', kind: 'range', min: 20, max: 25 },
      { id: 'stroller', kind: 'range', min: 25, max: 30 },
      { id: 'travelCot', kind: 'fixed', min: 30, max: 30 },
    ],
  },
  {
    id: 'carpet',
    icon: 'Rows3',
    unit: 'sqm',
    maxQuantity: 120,
    conditionDependent: false,
    featured: true,
    tiers: [
      { id: 'standard', kind: 'range', min: 8, max: 10 },
      { id: 'persian', kind: 'range', min: 10, max: 12 },
    ],
  },
  {
    id: 'leather',
    icon: 'Droplets',
    unit: 'piece',
    maxQuantity: 8,
    conditionDependent: true,
    tiers: [{ id: 'standard', kind: 'onRequest', min: 0, max: 0 }],
  },
  {
    id: 'radiator',
    icon: 'Heater',
    unit: 'unit',
    maxQuantity: 15,
    conditionDependent: true,
    tiers: [{ id: 'standard', kind: 'onRequest', min: 0, max: 0 }],
  },
]

export const featuredServices = services.filter((s) => s.featured)

export function getService(id: string): ServiceConfig | undefined {
  return services.find((s) => s.id === id)
}

export function getTier(service: ServiceConfig, tierId?: string): ServiceTier {
  return service.tiers.find((t) => t.id === tierId) ?? service.tiers[0]
}

/** Lowest published figure for a service — powers every "from €X" label. */
export function entryPrice(service: ServiceConfig): number | null {
  const priced = service.tiers.filter((t) => t.kind !== 'onRequest')
  if (priced.length === 0) return null
  return Math.min(...priced.map((t) => t.min))
}

export interface QuoteSelection {
  serviceId: string
  tierId: string
  quantity: number
}

export interface Estimate {
  min: number
  max: number
  /** At least one line is an open-ended "from €X", so the total is a floor */
  startingFrom: boolean
  /** At least one line is quoted after inspection and is not in the total */
  hasOnRequest: boolean
}

export function calculateEstimate(selections: QuoteSelection[]): Estimate {
  let min = 0
  let max = 0
  let startingFrom = false
  let hasOnRequest = false

  for (const sel of selections) {
    const service = getService(sel.serviceId)
    if (!service) continue
    const tier = getTier(service, sel.tierId)
    if (tier.kind === 'onRequest') {
      hasOnRequest = true
      continue
    }
    if (tier.kind === 'from') startingFrom = true
    min += tier.min * sel.quantity
    max += tier.max * sel.quantity
  }

  return { min, max, startingFrom, hasOnRequest }
}

export function generateWhatsAppLink(
  message: string,
  phone: string = site.whatsapp
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
