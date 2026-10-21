/**
 * Flags drawn as SVG rather than emoji.
 *
 * Windows ships no glyphs for regional-indicator emoji, so 🇵🇸 renders there as
 * the bare letters "PS", and the pride flag's ZWJ sequence falls back to a
 * white flag beside a rainbow on older platforms. These are statements meant
 * to be seen, so they are drawn instead of left to the font.
 */

interface FlagProps {
  className?: string
}

const PRIDE_STRIPES = [
  '#E40303',
  '#FF8C00',
  '#FFED00',
  '#008026',
  '#004DFF',
  '#750787',
]

export function PrideFlag({ className }: FlagProps) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={className}
      role="img"
      aria-hidden
      focusable="false"
    >
      {PRIDE_STRIPES.map((colour, i) => (
        <rect
          key={colour}
          x="0"
          y={(i * 20) / PRIDE_STRIPES.length}
          width="30"
          height={20 / PRIDE_STRIPES.length}
          fill={colour}
        />
      ))}
    </svg>
  )
}

export function PalestineFlag({ className }: FlagProps) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={className}
      role="img"
      aria-hidden
      focusable="false"
    >
      <rect x="0" y="0" width="30" height="6.667" fill="#000000" />
      <rect x="0" y="6.667" width="30" height="6.666" fill="#FFFFFF" />
      <rect x="0" y="13.333" width="30" height="6.667" fill="#007A3D" />
      <path d="M0 0 L10 10 L0 20 Z" fill="#CE1126" />
    </svg>
  )
}
