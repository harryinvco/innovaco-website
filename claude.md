
## Project Identity

**Project:** HN Innovaco Ltd — Corporate website
**Owner:** Harry Newton (CEO, HN Innovaco Ltd)
**Partner:** Nikolas Manitaras (Co-founder)
**Company HQ:** Larnaca, Cyprus
**Markets:** Cyprus (primary) · Greece · Lebanon · UK · EU
**Goal:** A conversion-first, bilingual corporate website that positions Innovaco as Cyprus's leading AI and digital transformation company — and generates qualified inbound leads.

---

## Tech Stack — Non-Negotiable

```
Framework:     Next.js 14 (App Router — not Pages Router)
Language:      TypeScript (strict mode)
Styling:       Tailwind CSS v3
Components:    shadcn/ui (radix-ui primitives)
Animations:    Framer Motion
Icons:         Lucide React
Fonts:         Geist Sans + Geist Mono (next/font/local)
CMS:           Contentlayer (for blog/case studies MDX)
i18n:          next-intl (Greek + English)
Forms:         react-hook-form + zod
Email:         Resend (API)
Deployment:    Vercel (primary) or Coolify self-hosted
Analytics:     PostHog (self-hosted instance)
```

**Do not introduce dependencies outside this list without explicit approval.**
If a better tool exists, raise it — don't just install it.

---

## Repository Structure

```
innovaco-website/
├── app/
│   ├── [locale]/              # All routes wrapped in locale
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   │   ├── ai/            # AI services overview
│   │   │   ├── development/
│   │   │   ├── growth/
│   │   │   └── training/
│   │   ├── case-studies/
│   │   │   └── [slug]/
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   ├── contact/
│   │   └── book/              # Booking / discovery call page
│   ├── api/
│   │   ├── contact/route.ts
│   │   ├── book/route.ts
│   │   └── newsletter/route.ts
│   └── layout.tsx             # Root layout
├── components/
│   ├── ui/                    # shadcn primitives (do not edit)
│   ├── layout/                # Header, Footer, Nav
│   ├── sections/              # Page sections (Hero, Services, etc.)
│   ├── forms/                 # Contact, booking, newsletter forms
│   └── shared/                # Reusable across sections
├── content/
│   ├── case-studies/          # MDX files
│   └── blog/                  # MDX files
├── messages/
│   ├── en.json                # English copy
│   └── el.json                # Greek copy
├── lib/
│   ├── fonts.ts
│   ├── utils.ts               # cn() and helpers
│   ├── validations.ts         # Zod schemas
│   └── resend.ts              # Email sending
├── types/
│   └── index.ts
├── public/
│   ├── images/
│   ├── logos/
│   └── og/                    # OG images
├── styles/
│   └── globals.css
├── contentlayer.config.ts
├── next.config.ts
├── middleware.ts              # i18n routing
└── tailwind.config.ts
```

---

## Design System

### Colour Palette

```typescript
// tailwind.config.ts — extend these exactly
colors: {
  navy:  { DEFAULT: '#1B3A5C', light: '#2A5480', dark: '#0F2236' },
  teal:  { DEFAULT: '#0E7F6E', light: '#12A08A', dark: '#095C50' },
  gold:  { DEFAULT: '#C9992A', light: '#E0AE3A', dark: '#9E7820' },
  slate: { DEFAULT: '#F0F4F8', dark: '#1A2332' },
  body:  '#334155',     // body text
  muted: '#64748B',     // secondary text
}
```

### Typography Scale

```
Display:    72px / bold / navy — hero headlines
H1:         48px / bold / navy
H2:         36px / semibold / navy
H3:         24px / semibold / navy or teal
H4:         20px / medium / navy
Body:       16px / normal / body (#334155)
Small:      14px / normal / muted
Caption:    12px / normal / muted
```

### Spacing System

Use Tailwind's default scale. Section vertical padding: `py-24` (desktop), `py-16` (tablet), `py-12` (mobile). Container max-width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

### Component Conventions

**Cards:** `rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow`
**Buttons — Primary:** `bg-teal text-white hover:bg-teal-dark rounded-xl px-6 py-3 font-medium`
**Buttons — Secondary:** `border-2 border-navy text-navy hover:bg-navy hover:text-white rounded-xl px-6 py-3`
**Buttons — Ghost:** `text-teal hover:text-teal-dark underline-offset-4 hover:underline`
**Badges:** `bg-teal/10 text-teal rounded-full px-3 py-1 text-sm font-medium`
**Section labels:** Small caps, teal, tracking-widest — used above H2 headings

---

## i18n Rules

- **All user-facing text lives in `messages/en.json` and `messages/el.json`**
- No hardcoded strings in components — always use `useTranslations()` hook
- Default locale: `el` (Greek)
- Supported locales: `['el', 'en']`
- Language switcher in header — persists via cookie
- Greek text is always reviewed by Harry before shipping — mark any machine-translated copy with `// TODO: human review`
- URL structure: `/el/...` and `/en/...` — locale in URL, not subdomain
- OG images and meta should respect locale

---

## Content Architecture

### Pages

| Route | Purpose | Priority |
|-------|---------|---------|
| `/` | Homepage — hero, proof, services overview, CTA | P0 |
| `/services/ai` | AI services — chatbots, voice, MVPs, audits | P0 |
| `/services/development` | Dev services — web apps, tools, mobile, APIs | P0 |
| `/services/growth` | Growth hacking + digital marketing | P1 |
| `/services/training` | ANAD training + consulting | P1 |
| `/case-studies` | All case studies | P0 |
| `/case-studies/[slug]` | Individual case study | P0 |
| `/about` | Company, team, values, vision | P1 |
| `/contact` | Contact form + map | P1 |
| `/book` | Discovery call booking (custom) | P0 |
| `/blog` | Articles and insights | P2 |
| `/blog/[slug]` | Individual article | P2 |

### Case Studies (initial)

- **ICPAC** — bilingual AI chatbot for Cyprus's largest accounting body
- **Chtisma Trading** — dual AI deployment (customer-facing + internal staff)
- **Inspektra** — 6-dashboard PostHog analytics suite for a field service platform
- **Cyprus Medical Council** — doctor registry web platform

### Services Content (from `messages/*.json`)

Six AI service lines, three dev service types, four growth hacking services, four training programmes. See `messages/en.json` for full copy.

---

## Conversion Architecture

**Primary CTA everywhere:** "Book a free discovery call" — links to `/book`
**Secondary CTA:** "View our work" — links to `/case-studies`
**Tertiary CTA (blog/resources):** "Get the guide" — email capture

**The booking page** is a custom-built form (no Calendly) that:
1. Asks 4 qualifying questions (company type, main challenge, team size, timeline)
2. Collects name, email, phone, company name
3. Shows available slots (hardcoded initially, dynamic later)
4. Sends confirmation email via Resend to both Harry and the prospect
5. Sends Harry a WhatsApp notification via n8n webhook (provide webhook URL in env)

**Lead capture touchpoints:**
- Book a call CTA (all pages)
- Contact form (`/contact`)
- Newsletter signup (footer)
- Resource download (blog posts — PDF guides)

---

## SEO Requirements

- Every page has a unique `<title>` and `<meta description>` — from translations file
- OG image per page (static for now, dynamic for blog/case studies)
- `robots.txt` and `sitemap.xml` auto-generated
- Structured data: Organization, WebSite, Service, Article schemas
- Core Web Vitals must pass: LCP < 2.5s, CLS < 0.1, FID < 100ms
- All images use `next/image` with proper `alt` text from translations
- No content shifts on language switch
- Canonical tags on all pages

---

## Performance Rules

- **No client components by default** — use `'use client'` only when genuinely needed (forms, animations, interactive elements)
- Images: WebP format, next/image with `sizes` prop always set
- Fonts: loaded via `next/font/local`, no FOUT
- Animation: Framer Motion with `viewport={{ once: true }}` on scroll animations — do not animate on every scroll
- No layout shift on hydration — use proper skeleton states
- Bundle: no barrel imports from shadcn — import directly
- PostHog: loaded async, does not block render

---

## Environment Variables

```bash
# .env.local
RESEND_API_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
N8N_BOOKING_WEBHOOK_URL=
N8N_CONTACT_WEBHOOK_URL=
NEXT_PUBLIC_SITE_URL=https://hninnovaco.com
```

---

## Writing Style — Copy Rules

These apply to all content added to translation files:

**English:**
- Direct and confident — no filler phrases ("leveraging", "holistic", "synergies")
- Short sentences. One idea per sentence.
- No em dashes — use a comma, a period, or restructure
- Technical enough to be credible, clear enough for a business owner who isn't technical
- CTA copy is always action-first: "Book a call", "See the work", "Get the guide"

**Greek:**
- Natural business Greek — not translated English. Not overly formal.
- Harry reviews all Greek copy before shipping
- Avoid Anglicisms unless the term is genuinely better in English (e.g. "chatbot", "AI")
- All Greek copy marked `// NOTE: Reviewed by Harry` once approved

---

## Do Not Do List

- Do not use `pages/` directory — App Router only
- Do not hardcode any colour values — use Tailwind config tokens
- Do not hardcode any text strings — use translation keys
- Do not use `<img>` tags — always `next/image`
- Do not use `any` in TypeScript — use proper types or `unknown`
- Do not install UI libraries beyond shadcn (no MUI, Chakra, Ant Design)
- Do not use inline styles — Tailwind classes only
- Do not commit `.env.local` or any secrets
- Do not create pages without meta tags
- Do not use client-side data fetching for content that can be static
- Do not build the blog/case study system with a database — MDX files only (Contentlayer)
- Do not add Calendly or any third-party booking widget — booking is custom-built

---

## Git Conventions

```
feat:     new feature
fix:      bug fix
content:  copy or translation updates
style:    styling/design changes (no logic change)
refactor: code restructure
perf:     performance improvements
chore:    tooling, deps, config
```

Branch naming: `feat/hero-section`, `fix/mobile-nav`, `content/greek-services`
PRs: squash merge to main. No direct pushes to main.

---

## Current Status Tracker

> Update this section as work progresses.

| Section | Status | Notes |
|---------|--------|-------|
| Project setup | TODO | — |
| Design tokens + tailwind config | TODO | — |
| Layout (header + footer) | TODO | — |
| Homepage | TODO | — |
| AI services page | TODO | — |
| Development services page | TODO | — |
| Growth services page | TODO | — |
| Training services page | TODO | — |
| Case studies index | TODO | — |
| Case study detail | TODO | — |
| About page | TODO | — |
| Contact page | TODO | — |
| Booking page | TODO | — |
| Blog index | TODO | — |
| Blog detail | TODO | — |
| i18n setup | TODO | — |
| SEO + meta | TODO | — |
| Contact form + Resend | TODO | — |
| Booking form + webhook | TODO | — |
| PostHog analytics | TODO | — |
| Deployment config | TODO | — |

---

## Key Business Context (for copy decisions)

When writing or reviewing copy, Claude should understand:

- **Target buyer in Cyprus:** Business owner, 35–60, runs a company with 5–50 staff. Not necessarily technical. Has heard of ChatGPT. Doesn't know what RAG means. Trusts reputation over brand.
- **Primary objection:** "Is this actually proven? Do you have local experience?" — Answer: ICPAC, Chtisma, Inspektra, Cyprus Med Council. Named, real, local.
- **Secondary objection:** "Will my data be safe?" — Answer: self-hosted on EU infrastructure (Hetzner), GDPR compliant, client data never on US servers.
- **The WhatsApp angle:** In Cyprus, WhatsApp is a primary business channel. Mention it wherever relevant — it's a credibility signal that we understand the local market.
- **ANAD angle:** On training pages, always surface the ANAD subsidy. "Up to 80% subsidised" is a headline feature, not a footnote.
- **Language:** Cypriot clients default to Greek. English for international leads, Greek for local. Always show the language switcher prominently.
- **The hotspot vision:** Innovaco is building toward becoming the anchor tech institution in Larnaca. This ambition should come through in the About page and Vision sections — without sounding grandiose.