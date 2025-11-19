'use client'

import { usePathname } from 'next/navigation'
import ModernSidebar from './ModernSidebar'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  
  // Determine role from pathname
  const getRole = (): 'admin' | 'owner' | 'passenger' | 'driver' | null => {
    if (pathname.startsWith('/admin')) return 'admin'
    if (pathname.startsWith('/owner')) return 'owner'
    if (pathname.startsWith('/passenger')) return 'passenger'
    if (pathname.startsWith('/driver')) return 'driver'
    return null
  }

  const role = getRole()

  // Don't show sidebar on auth pages or home page
  if (!role || pathname.startsWith('/auth') || pathname === '/') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ModernSidebar role={role} />
      <main className="flex-1 overflow-auto ml-0 lg:ml-60">
        <div className="min-h-full bg-gray-50">
          <div className="p-8 lg:p-12">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
