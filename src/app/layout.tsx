import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/providers/auth-provider'
import AppLayout from '@/components/layout/AppLayout'

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
        <AuthProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
