'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import ModernSidebar from './ModernSidebar'
import LanguageSelector from '@/components/LanguageSelector'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
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
      <ModernSidebar role={role} onCollapseChange={setSidebarCollapsed} />
      <main className={`flex-1 overflow-auto transition-all duration-300 ml-0 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="min-h-full">
          {/* Header with Language Selector */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold text-gray-900">SmartBus</h1>
              <LanguageSelector />
            </div>
          </div>
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
