import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { useLocale, useTranslations } from 'next-intl'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Linkedin } from 'lucide-react'
import { NewsletterForm } from '@/components/sections/blog/NewsletterForm'
import { JsonLd } from '@/components/shared/JsonLd'

export function generateStaticParams() {
  return allPosts.flatMap((post) => [
    { slug: post.slug, locale: 'en' },
    { slug: post.slug, locale: 'el' },
  ])
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: locale === 'el' ? post.titleEl : post.title,
    description: locale === 'el' ? post.summaryEl : post.summary,
  }
}

function MDXBody({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code)
  return (
    <div className="prose prose-slate prose-lg max-w-none prose-headings:text-navy prose-p:leading-relaxed prose-a:text-teal prose-strong:text-navy prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-navy prose-code:before:content-none prose-code:after:content-none">
      <MDXContent />
    </div>
  )
}

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const t = useTranslations('blog')
  const tDetail = useTranslations('blog.detail')
  const locale = useLocale()

  const post = allPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const title = locale === 'el' ? post.titleEl : post.title
  const tags = post.tags ?? []

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          datePublished: post.date,
          author: { '@type': 'Person', name: post.author },
        }}
      />
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
            {/* Main column */}
            <div>
              {/* Header */}
              <div className="border-b border-slate-200 pb-8">
                {tags[0] && (
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
                    {tags[0]}
                  </span>
                )}
                <h1 className="mt-3 text-3xl font-bold text-navy">{title}</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t('by')} {post.author} ·{' '}
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {/* MDX content */}
              <div className="mt-8">
                <MDXBody code={post.body.code} />
              </div>

              {/* Author bio */}
              <div className="mt-12 flex gap-5 rounded-2xl bg-slate-50 p-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs text-muted-foreground">
                  HN
                </div>
                <div>
                  <p className="font-semibold text-navy">{post.author}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tDetail('authorBio')}
                  </p>
                  <a
                    href="https://www.linkedin.com/company/hninnovaco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm text-teal hover:underline"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              {/* Newsletter */}
              <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6">
                <p className="font-semibold text-navy">
                  {tDetail('newsletter.heading')}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tDetail('newsletter.body')}
                </p>
                <div className="mt-4">
                  <NewsletterForm />
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 rounded-2xl bg-navy p-6 text-white">
                <p className="font-semibold">{tDetail('sidebar.heading')}</p>
                <Link
                  href={`/${locale}/book`}
                  className="mt-4 block rounded-xl bg-teal px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-teal-light"
                >
                  {tDetail('sidebar.cta')}
                </Link>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
