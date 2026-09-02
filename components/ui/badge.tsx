import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-crystal-50 text-crystal-700 ring-1 ring-inset ring-crystal-100',
        solid: 'bg-crystal-500 text-white',
        aqua: 'bg-aqua-50 text-aqua-600 ring-1 ring-inset ring-aqua-100',
        neutral: 'bg-ink-50 text-ink-600 ring-1 ring-inset ring-ink-100',
        outline: 'border border-crystal-200 text-crystal-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
