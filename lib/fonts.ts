import { Commissioner, Manrope } from 'next/font/google'

/**
 * Body / UI face.
 *
 * Commissioner was drawn by Kostas Bartsokas, a Greek type designer, and its
 * Greek is native-quality rather than an afterthought bolted onto a Latin
 * design — the accents are properly weighted, the ζ/ξ/ψ descenders are clean
 * and the x-height matches the Latin so mixed EL/EN lines sit evenly.
 */
export const fontSans = Commissioner({
  subsets: ['latin', 'latin-ext', 'greek'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

/**
 * Display face for headings — geometric, confident, and one of the few
 * modern grotesques on Google Fonts that ships a real Greek character set.
 */
export const fontDisplay = Manrope({
  subsets: ['latin', 'latin-ext', 'greek'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})
