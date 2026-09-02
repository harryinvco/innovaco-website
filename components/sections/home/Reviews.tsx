'use client'

import { useTranslations } from 'next-intl'
import { Quote, Star } from 'lucide-react'
import { AnimatedItem } from '@/components/shared/AnimatedSection'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { reviews } from '@/lib/reviews'

/**
 * Renders nothing until real reviews are added to lib/reviews.ts, so the site
 * never ships invented testimonials.
 */
export function Reviews() {
  const t = useTranslations('homepage.reviews')

  if (reviews.length === 0) return null

  return (
    <section className="section bg-white">
      <div className="container-page">
        <SectionHeading eyebrow={t('badge')} title={t('title')} />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <AnimatedItem
              key={`${review.name}-${i}`}
              delay={Math.min(i, 5) * 0.06}
              className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
            >
              <Quote className="h-6 w-6 text-crystal-200" aria-hidden />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                {review.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
                <span className="text-sm">
                  <span className="block font-semibold text-ink-900">
                    {review.name}
                  </span>
                  {review.area && (
                    <span className="block text-xs text-ink-400">{review.area}</span>
                  )}
                </span>
                <span className="flex gap-0.5" aria-label={`${review.rating}/5`}>
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </span>
              </figcaption>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  )
}
