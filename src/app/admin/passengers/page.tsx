'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { 
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  StarIcon,
  ArchiveBoxIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { API_BASE_URL } from '@/config/api'

type PassengerStats = {
  total_passengers: number
  monthly_bookings: number
  feedback_items: number
  active_rewards: number
}

export default function AdminPassengersPage() {
  const [stats, setStats] = useState<PassengerStats>({
    total_passengers: 0,
    monthly_bookings: 0,
    feedback_items: 0,
    active_rewards: 0
  })
  const [loading, setLoading] = useState(true)
  const token = useAuthStore(state => state.token)

  useEffect(() => {
    loadPassengerStats()
  }, [])

  const loadPassengerStats = async () => {
    if (!token) return
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setStats({
          total_passengers: data.total_passengers || 0,
          monthly_bookings: data.today_bookings || 0,
          feedback_items: data.total_feedback || 0,
          active_rewards: data.active_offers || 0
        })
      }
    } catch (error) {
      console.error('Failed to load passenger stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const passengerSections = [
    {
      title: 'Passenger Accounts',
      description: 'Manage passenger registrations, profiles, and account status',
      href: '/admin/passengers/accounts',
      icon: UserGroupIcon,
      stats: loading ? '...' : `${stats.total_passengers.toLocaleString()} Active Users`,
      color: 'blue'
    },
    {
      title: 'Feedback Center',
      description: 'Review complaints, suggestions, and passenger feedback',
      href: '/admin/passengers/feedback',
      icon: ChatBubbleLeftRightIcon,
      stats: loading ? '...' : `${stats.feedback_items} Pending Reviews`,
      color: 'purple'
    },
    {
      title: 'Booking History',
      description: 'Monitor all passenger bookings and transaction history',
      href: '/admin/passengers/bookings',
      icon: CalendarIcon,
      stats: loading ? '...' : `${stats.monthly_bookings.toLocaleString()} Today`,
      color: 'green'
    },
    {
      title: 'Passenger Rewards',
      description: 'Manage loyalty points, rewards, and redemption system',
      href: '/admin/passengers/rewards',
      icon: StarIcon,
      stats: loading ? '...' : `${stats.active_rewards} Active Offers`,
      color: 'yellow'
    },
    {
      title: 'Lost & Found Claims',
      description: 'Process passenger claims for lost items',
      href: '/admin/passengers/claims',
      icon: ArchiveBoxIcon,
      stats: '0 Pending Claims',
      color: 'red'
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Passenger Management</h1>
        <p className="text-gray-600">Complete control over passenger accounts, feedback, and services</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <UserGroupIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Passengers</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{loading ? '...' : stats.total_passengers.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Today's Bookings</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{loading ? '...' : stats.monthly_bookings.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <ChatBubbleLeftRightIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Feedback Items</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{loading ? '...' : stats.feedback_items}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Offers</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{loading ? '...' : stats.active_rewards}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {passengerSections.map((section) => (
          <Card key={section.title} className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    section.color === 'blue' ? 'bg-blue-100' :
                    section.color === 'purple' ? 'bg-purple-100' :
                    section.color === 'green' ? 'bg-green-100' :
                    section.color === 'yellow' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <section.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      section.color === 'blue' ? 'text-blue-600' :
                      section.color === 'purple' ? 'text-purple-600' :
                      section.color === 'green' ? 'text-green-600' :
                      section.color === 'yellow' ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{section.title}</h3>
                </div>
                <p className="text-gray-600 mb-3 sm:mb-4">{section.description}</p>
                <p className="text-sm sm:text-base font-medium text-gray-500 mb-3 sm:mb-4">{section.stats}</p>
              </div>
            </div>
            <Link href={section.href}>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Manage
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
