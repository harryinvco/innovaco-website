'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/lib/services'

export function HomeCTA() {
  const t = useTranslations('homepage.cta')

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-dark" />

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(14,165,233,0.1),transparent_60%)]" />

      {/* Sparkle animations */}
      {[
        { top: '10%', left: '5%', delay: 0 },
        { top: '20%', right: '8%', delay: 1 },
        { bottom: '15%', left: '12%', delay: 2 },
        { bottom: '25%', right: '15%', delay: 0.5 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, delay: pos.delay }}
          className="absolute text-crystal/20"
          style={pos}
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
      ))}

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <Image
              src="/images/logo.png"
              alt="Krystallo Cleaning Services"
              width={160}
              height={50}
              className="h-14 w-auto brightness-0 invert opacity-60 mx-auto"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            {t('title')}
          </h2>
          <p className="text-crystal-200/80 text-lg mb-10 max-w-md mx-auto">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+35796653034">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-navy-dark hover:bg-crystal-50 text-base shadow-xl shadow-black/10 font-semibold group"
              >
                <Phone className="h-5 w-5 mr-2 text-crystal" />
                {t('phone')} — 96653034
              </Button>
            </a>
            <a
              href={generateWhatsAppLink('Γεια σας! Ενδιαφέρομαι για βιολογικό καθαρισμό.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="whatsapp"
                size="lg"
                className="w-full sm:w-auto text-base shadow-xl shadow-black/10"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {t('whatsapp')}
              </Button>
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-sm text-white/30">
            {t('trustLine')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
