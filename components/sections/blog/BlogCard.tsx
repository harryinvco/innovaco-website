import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

interface BlogCardProps {
  title: string
  summary: string
  date: string
  author: string
  tags: string[]
  slug: string
}

export function BlogCard({
  title,
  summary,
  date,
  author,
  tags,
  slug,
}: BlogCardProps) {
  const t = useTranslations('blog')
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}/blog/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
    >
      {/* Cover placeholder */}
      <div className="flex h-44 items-center justify-center bg-navy-50 text-sm text-muted-foreground">
        {title}
      </div>
      <div className="p-6">
        {tags[0] && (
          <span className="rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
            {tags[0]}
          </span>
        )}
        <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-navy group-hover:text-teal">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {summary}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {new Date(date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}{' '}
            · {author}
          </span>
          <span className="font-medium text-teal">{t('read')}</span>
        </div>
      </div>
    </Link>
  )
}
