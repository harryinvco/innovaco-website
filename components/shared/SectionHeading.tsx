'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <AnimatedSection
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="heading-2">{title}</h2>
      {subtitle && <p className="lead mt-4">{subtitle}</p>}
    </AnimatedSection>
  )
}
