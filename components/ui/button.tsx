import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-b from-crystal to-crystal-600 text-white shadow-md shadow-crystal/25 hover:shadow-lg hover:shadow-crystal/30 hover:brightness-110',
        secondary:
          'border-2 border-crystal/20 bg-crystal/[0.06] text-crystal hover:bg-crystal hover:text-white hover:border-crystal hover:shadow-md hover:shadow-crystal/20',
        outline:
          'border border-slate-200 bg-white text-navy-dark hover:bg-slate-50 hover:border-slate-300 shadow-sm',
        ghost:
          'text-body hover:text-crystal hover:bg-crystal/5',
        destructive:
          'bg-gradient-to-b from-red-500 to-red-600 text-white shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/30 hover:brightness-110',
        link: 'text-crystal underline-offset-4 hover:underline p-0 h-auto',
        whatsapp:
          'bg-gradient-to-b from-[#25D366] to-[#1FAD55] text-white shadow-md shadow-[#25D366]/25 hover:shadow-lg hover:shadow-[#25D366]/30 hover:brightness-110',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-[52px] rounded-2xl px-8 text-base',
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
