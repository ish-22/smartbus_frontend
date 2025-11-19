'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  icon: string
  label: string
}

interface MobileNavigationProps {
  items: NavItem[]
  className?: string
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  items,
  className
}) => {
  const pathname = usePathname()

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50',
      className
    )}>
      <div className="grid h-16" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center p-2 text-xs transition-colors duration-200',
                isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-blue-600'
              )}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

// Predefined navigation sets for different user roles
export const PassengerMobileNav: React.FC = () => {
  const items: NavItem[] = [
    { href: '/passenger/dashboard', icon: '🏠', label: 'Home' },
    { href: '/passenger/search', icon: '🔍', label: 'Track' },
    { href: '/passenger/tickets', icon: '🎫', label: 'Tickets' },
    { href: '/passenger/rewards', icon: '🎁', label: 'Rewards' }
  ]

  return <MobileNavigation items={items} />
}

export const DriverMobileNav: React.FC = () => {
  const items: NavItem[] = [
    { href: '/driver/dashboard', icon: '🏠', label: 'Home' },
    { href: '/driver/route', icon: '🗺️', label: 'Route' },
    { href: '/driver/passengers', icon: '👥', label: 'Passengers' },
    { href: '/driver/scanner', icon: '📷', label: 'Scanner' }
  ]

  return <MobileNavigation items={items} />
}

export const OwnerMobileNav: React.FC = () => {
  const items: NavItem[] = [
    { href: '/owner/dashboard', icon: '🏠', label: 'Home' },
    { href: '/owner/fleet', icon: '🚌', label: 'Fleet' },
    { href: '/owner/analytics', icon: '📊', label: 'Analytics' },
    { href: '/owner/drivers', icon: '👨‍✈️', label: 'Drivers' }
  ]

  return <MobileNavigation items={items} />
}

export const AdminMobileNav: React.FC = () => {
  const items: NavItem[] = [
    { href: '/admin/dashboard', icon: '🏠', label: 'Home' },
    { href: '/admin/users', icon: '👤', label: 'Users' },
    { href: '/admin/system', icon: '⚙️', label: 'System' },
    { href: '/admin/reports', icon: '📋', label: 'Reports' }
  ]

  return <MobileNavigation items={items} />
}
