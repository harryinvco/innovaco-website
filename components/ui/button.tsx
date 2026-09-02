import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-crystal-500 text-white shadow-brand hover:bg-crystal-600 hover:shadow-brand-lg',
        secondary:
          'border border-crystal-200 bg-crystal-50 text-crystal-700 hover:border-crystal-300 hover:bg-crystal-100',
        outline:
          'border border-ink-200 bg-white text-ink-900 shadow-sm hover:border-ink-300 hover:bg-ink-50',
        ghost: 'text-ink-600 hover:bg-crystal-50 hover:text-crystal-700',
        inverse:
          'bg-white text-ink-900 shadow-lg shadow-black/10 hover:bg-crystal-50',
        destructive:
          'bg-red-500 text-white shadow-md shadow-red-500/25 hover:bg-red-600',
        link: 'h-auto p-0 text-crystal-600 underline-offset-4 hover:underline',
        whatsapp:
          'bg-whatsapp text-white shadow-md shadow-whatsapp/30 hover:bg-whatsapp-dark hover:shadow-lg hover:shadow-whatsapp/35',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 rounded-lg px-3.5 text-xs',
        lg: 'h-[52px] rounded-2xl px-7 text-base',
        icon: 'h-10 w-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
