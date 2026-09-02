export interface Review {
  /** Customer's name as they gave it — first name and initial is plenty */
  name: string
  /** Town or district, e.g. "Λεμεσός" / "Limassol" */
  area?: string
  rating: 1 | 2 | 3 | 4 | 5
  /** Written in the language the customer used; shown as-is */
  quote: string
  /** Which service they booked — matches an id in lib/services.ts */
  service?: string
}

/**
 * Real customer reviews only.
 *
 * Deliberately empty: the reviews section on the homepage renders nothing
 * while this list is empty, so the site never shows invented testimonials.
 * Paste genuine reviews here (from WhatsApp, Google or Facebook, with the
 * customer's permission) and the section appears on its own.
 */
export const reviews: Review[] = []
