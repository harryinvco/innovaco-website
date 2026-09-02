'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { generateWhatsAppLink } from '@/lib/services'

/**
 * Floating WhatsApp button — desktop only; on phones the same action lives in
 * the fixed MobileActionBar at the bottom of the screen.
 */
export function WhatsAppButton() {
  const t = useTranslations('common')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={generateWhatsAppLink(t('defaultWhatsAppMessage'))}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.06 }}
          className="fixed bottom-7 right-7 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/40 transition-colors hover:bg-whatsapp-dark lg:flex"
          aria-label={t('whatsappCta')}
        >
          <MessageCircle className="h-7 w-7" aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
