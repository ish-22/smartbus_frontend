'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { ChartBarIcon, ArrowTrendingUpIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { API_BASE_URL } from '@/config/api'

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState({ 
    total_bookings: 0, 
    total_users: 0, 
    total_routes: 0, 
    total_buses: 0 
  })
  const [loading, setLoading] = useState(true)
  const token = useAuthStore(state => state.token)

  useEffect(() => {
    if (token) {
      loadStats()
    }
  }, [token])

  const loadStats = async () => {
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
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">System performance and usage analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Bookings</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total_bookings}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <ArrowTrendingUpIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Routes</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total_routes}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Users</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total_users}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Buses</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total_buses}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Analytics Dashboard</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Analytics charts would be displayed here</p>
        </div>
      </Card>
    </div>
  )
}
