'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { navigationConfig, roleColors, type UserRole, type NavigationItem } from '@/config/navigation'

interface ModernSidebarProps {
  role: UserRole
}

export default function ModernSidebar({ role }: ModernSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const pathname = usePathname()
  const navigation = navigationConfig[role]
  const colors = roleColors[role]



  const isActive = (href: string) => pathname === href


  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200"
      >
        {isMobileOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-600" />
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
        fixed top-0 left-0 h-full ${colors.bg} z-40 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-60'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        flex flex-col shadow-xl
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${colors.accent} rounded-xl flex items-center justify-center`}>
                <span className="text-white text-xl">🚌</span>
              </div>
              {!isCollapsed && (
                <div>
                  <h2 className="text-lg font-semibold text-white">SmartBus</h2>
                  <p className="text-sm text-gray-400 capitalize">{role}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 group
                  ${isActive(item.href)
                    ? `${colors.light} shadow-sm` 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                <item.icon className={`h-5 w-5 ${isActive(item.href) ? 'text-current' : 'text-gray-400 group-hover:text-gray-300'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  )
}
