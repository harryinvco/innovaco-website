import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { allPosts } from 'contentlayer/generated'
import { BlogFilter } from '@/components/sections/blog/BlogFilter'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog.meta' })
  return { title: t('title'), description: t('description') }
}

export default function BlogPage() {
  const t = useTranslations('blog')

  const sorted = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const postData = sorted.map((post) => ({
    title: post.title,
    summary: post.summary,
    date: post.date,
    author: post.author,
    tags: post.tags ?? [],
    slug: post.slug,
  }))

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-navy md:text-5xl">
            {t('hero.headline')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t('hero.subheadline')}
          </p>
        </div>
      </section>

      {/* Posts with filter */}
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogFilter posts={postData} />
        </div>
      </section>
    </>
  )
}
