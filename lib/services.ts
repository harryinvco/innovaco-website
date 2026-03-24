export interface ServiceConfig {
  id: string
  slug: string
  icon: string
  nameKey: string
  descriptionKey: string
  benefitKeys: string[]
  priceUnit: string
  priceMin: number
  priceMax: number
  quantityLabel: string
  maxQuantity: number
}

export const services: ServiceConfig[] = [
  {
    id: 'car',
    slug: 'car-cleaning',
    icon: 'Car',
    nameKey: 'services.car.name',
    descriptionKey: 'services.car.description',
    benefitKeys: [
      'services.car.benefit1',
      'services.car.benefit2',
      'services.car.benefit3',
    ],
    priceUnit: 'per_vehicle',
    priceMin: 40,
    priceMax: 80,
    quantityLabel: 'quote.vehicles',
    maxQuantity: 5,
  },
  {
    id: 'sofa',
    slug: 'sofa-cleaning',
    icon: 'Sofa',
    nameKey: 'services.sofa.name',
    descriptionKey: 'services.sofa.description',
    benefitKeys: [
      'services.sofa.benefit1',
      'services.sofa.benefit2',
      'services.sofa.benefit3',
    ],
    priceUnit: 'per_seat',
    priceMin: 15,
    priceMax: 30,
    quantityLabel: 'quote.seats',
    maxQuantity: 10,
  },
  {
    id: 'mattress',
    slug: 'mattress-cleaning',
    icon: 'BedDouble',
    nameKey: 'services.mattress.name',
    descriptionKey: 'services.mattress.description',
    benefitKeys: [
      'services.mattress.benefit1',
      'services.mattress.benefit2',
      'services.mattress.benefit3',
    ],
    priceUnit: 'per_mattress',
    priceMin: 30,
    priceMax: 60,
    quantityLabel: 'quote.mattresses',
    maxQuantity: 6,
  },
  {
    id: 'radiator',
    slug: 'radiator-cleaning',
    icon: 'Heater',
    nameKey: 'services.radiator.name',
    descriptionKey: 'services.radiator.description',
    benefitKeys: [
      'services.radiator.benefit1',
      'services.radiator.benefit2',
      'services.radiator.benefit3',
    ],
    priceUnit: 'per_unit',
    priceMin: 20,
    priceMax: 40,
    quantityLabel: 'quote.units',
    maxQuantity: 15,
  },
  {
    id: 'carpet',
    slug: 'carpet-cleaning',
    icon: 'SquareDashedBottom',
    nameKey: 'services.carpet.name',
    descriptionKey: 'services.carpet.description',
    benefitKeys: [
      'services.carpet.benefit1',
      'services.carpet.benefit2',
      'services.carpet.benefit3',
    ],
    priceUnit: 'per_sqm',
    priceMin: 5,
    priceMax: 12,
    quantityLabel: 'quote.sqm',
    maxQuantity: 100,
  },
  {
    id: 'leather',
    slug: 'leather-sofa-cleaning',
    icon: 'Armchair',
    nameKey: 'services.leather.name',
    descriptionKey: 'services.leather.description',
    benefitKeys: [
      'services.leather.benefit1',
      'services.leather.benefit2',
      'services.leather.benefit3',
    ],
    priceUnit: 'per_piece',
    priceMin: 25,
    priceMax: 50,
    quantityLabel: 'quote.pieces',
    maxQuantity: 8,
  },
  {
    id: 'chair',
    slug: 'chair-cleaning',
    icon: 'ArmchairIcon',
    nameKey: 'services.chair.name',
    descriptionKey: 'services.chair.description',
    benefitKeys: [
      'services.chair.benefit1',
      'services.chair.benefit2',
      'services.chair.benefit3',
    ],
    priceUnit: 'per_chair',
    priceMin: 10,
    priceMax: 25,
    quantityLabel: 'quote.chairs',
    maxQuantity: 20,
  },
  {
    id: 'stroller',
    slug: 'stroller-carseat-cleaning',
    icon: 'Baby',
    nameKey: 'services.stroller.name',
    descriptionKey: 'services.stroller.description',
    benefitKeys: [
      'services.stroller.benefit1',
      'services.stroller.benefit2',
      'services.stroller.benefit3',
    ],
    priceUnit: 'per_item',
    priceMin: 25,
    priceMax: 50,
    quantityLabel: 'quote.items',
    maxQuantity: 5,
  },
]

export interface QuoteSelection {
  serviceId: string
  quantity: number
}

export function calculateEstimate(selections: QuoteSelection[]): {
  min: number
  max: number
} {
  let min = 0
  let max = 0
  for (const sel of selections) {
    const service = services.find((s) => s.id === sel.serviceId)
    if (service) {
      min += service.priceMin * sel.quantity
      max += service.priceMax * sel.quantity
    }
  }
  return { min, max }
}

export function generateWhatsAppLink(
  message: string,
  phone: string = '35796653034'
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
