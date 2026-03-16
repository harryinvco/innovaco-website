'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// ─── Typing effect hook ──────────────────────────────────────
function useTypingEffect(
  lines: { text: string; className: string }[],
  charDelay: number,
  lineDelay: number,
  startDelay: number
) {
  const [displayed, setDisplayed] = useState<
    { text: string; className: string; done: boolean }[]
  >([])
  const [allDone, setAllDone] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let currentLine = 0
    let currentChar = 0
    let cancelled = false

    function tick() {
      if (cancelled) return

      if (currentLine >= lines.length) {
        setAllDone(true)
        return
      }

      const line = lines[currentLine]

      if (currentChar === 0) {
        setDisplayed((prev) => [
          ...prev,
          { text: '', className: line.className, done: false },
        ])
      }

      if (currentChar < line.text.length) {
        const char = line.text[currentChar]
        setDisplayed((prev) => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          updated[updated.length - 1] = { ...last, text: last.text + char }
          return updated
        })
        currentChar++
        timeout = setTimeout(tick, charDelay)
      } else {
        setDisplayed((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            done: true,
          }
          return updated
        })
        currentLine++
        currentChar = 0
        timeout = setTimeout(tick, lineDelay)
      }
    }

    timeout = setTimeout(tick, startDelay)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [lines, charDelay, lineDelay, startDelay])

  return { displayed, allDone }
}

// ─── Floating particles ──────────────────────────────────────
const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: `${5 + Math.random() * 90}%`,
  y: `${5 + Math.random() * 90}%`,
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 3,
}))

// ─── Component ───────────────────────────────────────────────
export function Hero() {
  const t = useTranslations('homepage.hero')
  const locale = useLocale()

  const terminalLines = useMemo(
    () => [
      { text: '$ dify deploy --client icpac --lang el,en', className: '' },
      {
        text: '✓ Knowledge base: 847 documents indexed',
        className: 'text-green-400',
      },
      {
        text: '✓ WhatsApp Business API connected',
        className: 'text-green-400',
      },
      {
        text: '✓ Bilingual prompts: Greek + English',
        className: 'text-green-400',
      },
      {
        text: '✓ Self-hosted: Hetzner EU (Frankfurt)',
        className: 'text-green-400',
      },
      { text: '$ status check', className: '' },
      {
        text: '✓ Live · 3 active sessions · 0 errors',
        className: 'text-green-400',
      },
    ],
    []
  )

  const { displayed, allDone } = useTypingEffect(terminalLines, 30, 400, 1200)

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#050A14]">
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(14,127,110,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute h-[2px] w-[2px] rounded-full bg-teal/20"
          style={{ left: p.x, top: p.y }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-28">
        {/* Left column — 60% */}
        <div className="w-full lg:w-[60%]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-1.5 text-xs font-medium text-teal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              {t('badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="mt-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="block text-5xl font-normal leading-tight text-white md:text-6xl lg:text-7xl"
            >
              {t('headlinePart1')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="block bg-gradient-to-r from-teal to-teal/60 bg-clip-text text-5xl italic leading-tight text-transparent md:text-6xl lg:text-[5rem]"
            >
              {t('headlinePart2')}
              <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.05em] animate-pulse bg-teal" />
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            className="mt-6 max-w-lg text-lg text-slate-400 md:text-xl"
          >
            {t('subheadline')}
          </motion.p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            >
              <Link
                href={`/${locale}/book`}
                className="group inline-flex items-center rounded-xl bg-white px-6 py-3 font-medium text-navy transition-colors hover:bg-slate-100"
              >
                {t('ctaPrimary')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
            >
              <Link
                href={`/${locale}/case-studies`}
                className="inline-flex rounded-xl border border-slate-600 bg-transparent px-6 py-3 font-medium text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
              >
                {t('ctaSecondary')}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right column — 40% — Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="w-full lg:w-[40%]"
        >
          <div
            className="overflow-hidden rounded-xl border border-slate-700/50 bg-[#0C1220]"
            style={{
              boxShadow: '0 0 80px 0 rgba(14, 127, 110, 0.15)',
            }}
          >
            {/* Title bar */}
            <div className="flex items-center border-b border-slate-700/50 bg-[#0C1220] px-4 py-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="mx-auto text-xs text-slate-500">
                {t('terminalTitle')}
              </span>
              <div className="w-[52px]" />
            </div>

            {/* Terminal body */}
            <div className="px-5 py-4">
              <div className="min-h-[220px] space-y-1 font-mono text-[13px] leading-relaxed">
                {displayed.map((line, i) => (
                  <div key={i} className="flex">
                    <span
                      className={
                        line.className ||
                        (line.text.startsWith('$')
                          ? 'text-white'
                          : 'text-slate-400')
                      }
                    >
                      {line.text.startsWith('$') ? (
                        <>
                          <span className="text-teal">$</span>
                          <span className="text-white">
                            {line.text.slice(1)}
                          </span>
                        </>
                      ) : (
                        line.text
                      )}
                    </span>
                    {/* Cursor on current typing line */}
                    {i === displayed.length - 1 && !line.done && (
                      <span className="ml-[1px] inline-block h-[1.1em] w-[7px] translate-y-[1px] animate-pulse bg-slate-400" />
                    )}
                  </div>
                ))}
                {/* Final blinking cursor */}
                {allDone && (
                  <div className="flex items-center">
                    <span className="text-teal">$</span>
                    <span className="ml-2 inline-block h-[1.1em] w-[7px] translate-y-[1px] animate-pulse bg-slate-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
