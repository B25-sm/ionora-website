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
      <body className={inter.className}>
        {/* Gradient background */}
        <div className="min-h-dvh bg-gradient-to-br from-[#FFE797] to-[#B45253]">
          {/* Sticky global navbar */}
          <Navigation />

          {/* Page content (offset for fixed nav) */}
          <main className="pt-20">
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