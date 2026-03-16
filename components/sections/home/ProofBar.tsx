'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const clients = [
  { name: 'ICPAC', duration: 3.5, delay: 0 },
  { name: 'Inspektra', duration: 4.2, delay: 0.5 },
  { name: 'Chtisma Trading', duration: 3.8, delay: 1.0 },
  { name: 'Cyprus Medical Council', duration: 4.5, delay: 0.3 },
  { name: 'Schedex', duration: 3.2, delay: 0.8 },
]

export function ProofBar() {
  const t = useTranslations('homepage.proofBar')

  return (
    <section className="bg-navy py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6 lg:px-8">
        <span className="text-sm text-slate-400">{t('trustedBy')}</span>
        {clients.map((client) => (
          <motion.span
            key={client.name}
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: client.duration,
              delay: client.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white"
          >
            {client.name}
          </motion.span>
        ))}
      </div>
    </section>
  )
}
