import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/providers/auth-provider'
import AppLayout from '@/components/layout/AppLayout'
import { TranslationProvider } from '@/context/TranslationContext'
import ConnectionStatus from '@/components/common/ConnectionStatus'

export const metadata: Metadata = {
  title: 'SmartBus - Smart Public Transport System',
  description: 'Real-time bus tracking and booking system for Sri Lanka',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>

      </head>
      <body className="font-sans antialiased">
        <ConnectionStatus />
        <TranslationProvider>
          <AuthProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </AuthProvider>
        </TranslationProvider>
      </body>
    </html>
  )
}
