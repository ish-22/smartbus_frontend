'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { navigationConfig, type UserRole } from '@/config/navigation'

interface ModernSidebarProps {
  role: UserRole
  onCollapseChange?: (collapsed: boolean) => void
}

export default function ModernSidebar({ role, onCollapseChange }: ModernSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const pathname = usePathname()
  const navigation = navigationConfig[role]

  const isActive = (href: string) => pathname === href

  const getRoleColor = () => {
    switch (role) {
      case 'admin': return 'bg-red-600'
      case 'owner': return 'bg-purple-600'
      case 'passenger': return 'bg-blue-600'
      case 'driver': return 'bg-green-600'
      default: return 'bg-blue-600'
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200"
      >
        {isMobileOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-700" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        flex flex-col shadow-lg
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-4">
            <div className={`w-10 h-10 ${getRoleColor()} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <span className="text-white text-lg font-bold">🚌</span>
            </div>
            {!isCollapsed && (
              <div className="ml-3 min-w-0">
                <h2 className="text-lg font-bold text-gray-900 truncate">SmartBus</h2>
                <p className="text-sm text-gray-500 capitalize truncate">{role} Panel</p>
              </div>
            )}
          </div>
          {/* Menu Toggle Button - Always under logo */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                const newCollapsed = !isCollapsed
                setIsCollapsed(newCollapsed)
                onCollapseChange?.(newCollapsed)
              }}
              className="hidden lg:block p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group
                  ${active
                    ? `${getRoleColor()} text-white shadow-sm` 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                  ${isCollapsed ? 'justify-center' : 'space-x-3'}
                `}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => window.location.href = '/'}
            className={`
              w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
              text-red-600 hover:bg-red-50 hover:text-red-700
              ${isCollapsed ? 'justify-center' : 'space-x-3'}
            `}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  )
}
