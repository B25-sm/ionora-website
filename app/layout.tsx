import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SearchModal from '@/components/SearchModal'
import FABs from '@/components/FABs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IONORA - Premium Water Ionizer Marketplace',
  description: 'Discover premium water ionizers from world-leading brands',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {/* Solid background */}
        <div className="min-h-dvh bg-bg text-primary overflow-x-hidden">
          {/* Sticky global navbar */}
          <Navigation />

          {/* Page content (offset for fixed nav) */}
          <main className="pt-16 sm:pt-18 md:pt-20 lg:pt-24 xl:pt-28 2xl:pt-32">
            {children}
          </main>

          {/* Global footer */}
          <Footer />

          {/* Overlays / floating actions available on all pages */}
          <SearchModal />
          <FABs />
        </div>
      </body>
    </html>
  )
}