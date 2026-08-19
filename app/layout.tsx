import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600']
})

export const metadata: Metadata = {
  title: 'Fohlioo',
  description: 'Better choices. Smarter collections.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${plusJakarta.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col font-sans'>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
