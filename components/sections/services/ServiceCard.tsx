'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  pills: string[]
  price: string
  accent: string
  Icon: LucideIcon
  iconColor: string
  index?: number
}

export function ServiceCard({
  title,
  description,
  pills,
  price,
  Icon,
  index = 0,
}: ServiceCardProps) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className="group flex gap-6 border-b border-slate-100 py-8 last:border-b-0"
    >
      {/* Number */}
      <span className="hidden flex-shrink-0 text-6xl font-bold leading-none text-teal/20 transition-colors duration-300 group-hover:text-teal/60 sm:block">
        {num}
      </span>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start gap-3">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="mt-0.5 flex-shrink-0"
          >
            <Icon className="h-5 w-5 text-teal transition-transform duration-200 group-hover:scale-110 group-hover:rotate-[5deg]" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-navy">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-mono text-xs font-medium text-slate-700"
                >
                  {pill}
                </span>
              ))}
            </div>
            <p className="mt-3 font-mono text-sm font-medium text-teal">{price}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
