import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['el', 'en'],
  defaultLocale: 'el',
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
