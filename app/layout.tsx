import './globals.css'

/**
 * The locale layout owns <html> and <body> (it needs `lang` from the route
 * segment), so this root layout must stay a pass-through — rendering a second
 * html/body here nests documents and breaks hydration.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
