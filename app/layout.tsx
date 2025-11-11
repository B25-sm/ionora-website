import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SearchModal from '@/components/SearchModal'
import CallbackModal from '@/components/CallBackModal'
import FABs from '@/components/FABs'
import { CartProvider } from '@/components/cart/CartProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ionora.in'),
  title: 'IONORA - Premium Water Ionizer Marketplace',
  description: 'Discover premium water ionizers from world-leading brands',
  keywords: ['water ionizer', 'alkaline water', 'ionized water', 'Life Ionizers™', 'Mediqua™', 'Medisoul™', 'Tycoon', 'Kyron'],
  authors: [{ name: 'IONORA' }],
  creator: 'IONORA',
  publisher: 'IONORA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://ionora.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ionora.in',
    siteName: 'IONORA',
    title: 'IONORA - Premium Water Ionizer Marketplace',
    description: 'Discover premium water ionizers from world-leading brands',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IONORA - Premium Water Ionizer Marketplace',
    description: 'Discover premium water ionizers from world-leading brands',
  },
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
          <CartProvider>
            {/* Sticky global navbar */}
            <Navigation />

            {/* Page content (offset for fixed nav) */}
            <main className="pt-16 sm:pt-20 md:pt-24">
              {children}
            </main>

            {/* Global footer */}
            <Footer />

            {/* Overlays / floating actions available on all pages */}
            <SearchModal />
            <FABs />
            <CallbackModal />
          </CartProvider>
        </div>
      </body>
    </html>
  )
}