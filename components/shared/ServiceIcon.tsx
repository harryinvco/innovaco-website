'use client'

import {
  Armchair,
  Baby,
  BedDouble,
  CarFront,
  Droplets,
  Heater,
  RockingChair,
  Rows3,
  Sofa,
  Sparkles,
} from 'lucide-react'

/** Single source of truth for the icon each service is drawn with. */
export const serviceIcons: Record<string, React.ElementType> = {
  Sofa,
  Armchair,
  RockingChair,
  BedDouble,
  CarFront,
  Baby,
  Rows3,
  Droplets,
  Heater,
}

export function ServiceIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = serviceIcons[name] ?? Sparkles
  return <Icon className={className} aria-hidden />
}
