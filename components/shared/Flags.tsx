/**
 * Flags drawn as SVG rather than emoji.
 *
 * Windows ships no glyphs for regional-indicator emoji, so 🇮🇱 renders there as
 * the bare letters "IL", and the pride flag's ZWJ sequence degrades to a white
 * flag beside a rainbow on older platforms. These are statements meant to be
 * seen, so they are drawn instead of left to the font.
 *
 * Every flag shares a 30×20 box so a row of them lines up, which means a
 * couple sit slightly off their official proportions.
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
    <svg viewBox="0 0 30 20" className={className} role="img" aria-hidden focusable="false">
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

/** Five-pointed star centred on (cx, cy) with the given outer radius. */
function starPoints(cx: number, cy: number, radius: number): string {
  const points: string[] = []
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? radius : radius * 0.382
    const angle = (Math.PI / 5) * i - Math.PI / 2
    points.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`)
  }
  return points.join(' ')
}

const CANTON_W = 12
const CANTON_H = (20 / 13) * 7

/** The 50 stars: rows of six and five, alternating. */
const US_STARS: Array<[number, number]> = (() => {
  const stars: Array<[number, number]> = []
  for (let row = 0; row < 9; row++) {
    const count = row % 2 === 0 ? 6 : 5
    const y = (CANTON_H / 10) * (row + 1)
    for (let col = 0; col < count; col++) {
      const x =
        row % 2 === 0
          ? (CANTON_W / 12) * (col * 2 + 1)
          : (CANTON_W / 12) * (col * 2 + 2)
      stars.push([x, y])
    }
  }
  return stars
})()

export function UsaFlag({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-hidden focusable="false">
      <rect x="0" y="0" width="30" height="20" fill="#FFFFFF" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect
          key={i}
          x="0"
          y={(20 / 13) * i * 2}
          width="30"
          height={20 / 13}
          fill="#B22234"
        />
      ))}
      <rect x="0" y="0" width={CANTON_W} height={CANTON_H} fill="#3C3B6E" />
      {US_STARS.map(([x, y], i) => (
        <polygon key={i} points={starPoints(x, y, 0.52)} fill="#FFFFFF" />
      ))}
    </svg>
  )
}

export function IsraelFlag({ className }: FlagProps) {
  const r = 4.1
  const dx = r * Math.sin(Math.PI / 3)
  const up = `15,${10 - r} ${15 - dx},${10 + r / 2} ${15 + dx},${10 + r / 2}`
  const down = `15,${10 + r} ${15 - dx},${10 - r / 2} ${15 + dx},${10 - r / 2}`

  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-hidden focusable="false">
      <rect x="0" y="0" width="30" height="20" fill="#FFFFFF" />
      <rect x="0" y="2.6" width="30" height="2.6" fill="#0038B8" />
      <rect x="0" y="14.8" width="30" height="2.6" fill="#0038B8" />
      <polygon points={up} fill="none" stroke="#0038B8" strokeWidth="0.9" />
      <polygon points={down} fill="none" stroke="#0038B8" strokeWidth="0.9" />
    </svg>
  )
}
