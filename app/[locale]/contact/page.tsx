'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AnimatedSection, AnimatedItem } from '@/components/shared/AnimatedSection'
import { generateWhatsAppLink } from '@/lib/services'

export default function ContactPage() {
  const t = useTranslations('contact')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = [
      `Μήνυμα από ${formData.name}`,
      `Τηλέφωνο: ${formData.phone}`,
      formData.email ? `Email: ${formData.email}` : '',
      ``,
      formData.message,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(generateWhatsAppLink(msg), '_blank')
  }

  const contactInfo = [
    {
      icon: Phone,
      label: t('phone'),
      value: '96653034',
      href: 'tel:+35796653034',
    },
    {
      icon: MessageCircle,
      label: t('whatsapp'),
      value: 'WhatsApp',
      href: 'https://wa.me/35796653034',
      external: true,
    },
    {
      icon: MapPin,
      label: t('location'),
      value: t('locationValue'),
    },
    {
      icon: Clock,
      label: t('hours'),
      value: t('hoursValue'),
    },
  ]

  return (
    <section className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <Badge className="mb-4">{t('pageTitle')}</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-dark">
            {t('pageTitle')}
          </h1>
          <p className="mt-4 text-body text-lg">{t('pageSubtitle')}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((info, i) => (
              <AnimatedItem key={i} delay={i * 0.1}>
                <Card>
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="w-12 h-12 rounded-xl bg-crystal/10 flex items-center justify-center shrink-0">
                      <info.icon className="h-6 w-6 text-crystal" />
                    </div>
                    <div>
                      <p className="text-sm text-body">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.external ? '_blank' : undefined}
                          rel={info.external ? 'noopener noreferrer' : undefined}
                          className="font-semibold text-navy-dark hover:text-crystal transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-navy-dark">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>

          {/* Contact Form */}
          <AnimatedItem delay={0.2}>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-navy-dark mb-4">
                  {t('formTitle')}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t('name')} *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t('phonePlaceholder')} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t('emailPlaceholder')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">{t('message')} *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>
                  <Button type="submit" variant="whatsapp" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t('send')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedItem>
        </div>
      </div>
    </section>
  )
}
