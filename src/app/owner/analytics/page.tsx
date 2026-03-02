'use client'

import { Card } from '@/components/ui/Card'
import { ChartBarIcon, CurrencyDollarIcon, TruckIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { getOwnerAnalyticsAPI, OwnerAnalyticsData } from '@/services/api/dashboardApi'
import { useUiStore } from '@/store/uiStore'

export default function OwnerAnalyticsPage() {
  const [analytics, setAnalytics] = useState<OwnerAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const { token } = useAuthStore()
  const { showToast } = useUiStore()

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true)
        if (!token) {
          showToast({ type: 'error', message: 'Authentication required' })
          return
        }
        const data = await getOwnerAnalyticsAPI(token)
        setAnalytics(data)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load analytics'
        showToast({ type: 'error', message })
        console.error('Analytics error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      loadAnalytics()
    }
  }, [token, showToast])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Revenue & Analytics</h1>
          <p className="text-gray-600">Track your business performance</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-3 sm:p-4 lg:p-6">
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Revenue & Analytics</h1>
        <p className="text-gray-600">Track your business performance</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Monthly Revenue</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {analytics ? formatCurrency(analytics.monthly_revenue) : 'N/A'}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Buses</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {analytics ? formatNumber(analytics.active_buses) : 'N/A'}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Trips</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {analytics ? formatNumber(analytics.total_trips) : 'N/A'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}