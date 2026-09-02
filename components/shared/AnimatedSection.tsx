'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RevealState = 'static' | 'hidden' | 'shown'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to stagger this element behind its neighbours */
  delay?: number
  /** How far the element travels on the way in */
  distance?: number
}

/**
 * Scroll-reveal that can never leave content invisible.
 *
 * The server renders it fully visible. On mount we only hide an element if it
 * starts below the fold AND the browser gives us a live IntersectionObserver —
 * so a missed observer, a disabled-JS visitor or a reduced-motion setting all
 * end up with plain, readable content instead of a blank section. A passive
 * scroll listener backs the observer up, since fast flick-scrolling can skip
 * observer callbacks entirely.
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [state, setState] = useState<RevealState>('static')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return
    }

    // Anything already on screen stays as rendered — no flash, nothing to miss.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return

    setState('hidden')

    let done = false
    const show = () => {
      if (done) return
      done = true
      setState('shown')
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show()
      },
      { rootMargin: '0px 0px -6% 0px' }
    )
    observer.observe(el)

    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.94) show()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return { ref, state }
}

function revealStyle(state: RevealState, delay: number, distance: number) {
  if (state === 'static') return undefined
  return {
    opacity: state === 'shown' ? 1 : 0,
    transform: state === 'shown' ? 'none' : `translateY(${distance}px)`,
    transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
  }
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  distance = 20,
}: RevealProps) {
  const { ref, state } = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={className} style={revealStyle(state, delay, distance)}>
      {children}
    </div>
  )
}

export function AnimatedItem({
  children,
  className,
  delay = 0,
  distance = 14,
}: RevealProps) {
  const { ref, state } = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={className} style={revealStyle(state, delay, distance)}>
      {children}
    </div>
  )
}

/** Same reveal, rendered as a list item so it can live inside <ul>/<ol>. */
export function AnimatedListItem({
  children,
  className,
  delay = 0,
  distance = 14,
}: RevealProps) {
  const { ref, state } = useReveal<HTMLLIElement>()
  return (
    <li ref={ref} className={cn(className)} style={revealStyle(state, delay, distance)}>
      {children}
    </li>
  )
}
