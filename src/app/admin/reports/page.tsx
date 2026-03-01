'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  TruckIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { API_BASE_URL } from '@/config/api'

export default function AdminReportsPage() {
  const [stats, setStats] = useState({ 
    today_bookings: 0,
    total_bookings: 0, 
    total_users: 0, 
    active_routes: 0, 
    total_buses: 0,
    active_buses: 0,
    total_incidents: 0,
    resolved_incidents: 0
  })
  const [recentBuses, setRecentBuses] = useState<any[]>([])
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
      const [statsRes, busesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/dashboard/admin/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }),
        fetch(`${API_BASE_URL}/buses`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })
      ])
      
      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data)
      }
      
      if (busesRes.ok) {
        const buses = await busesRes.json()
        setRecentBuses(buses.slice(0, 4))
      }
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    const csvContent = `Metric,Value\nActive Routes,${stats.active_routes}\nTotal Users,${stats.total_users}\nTotal Bookings,${stats.total_bookings}\nTotal Buses,${stats.total_buses}`
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `smartbus-report-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }
  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">System performance and business insights</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={() => alert('Date range filter coming soon')}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={handleExport}>
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Routes</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.active_routes}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <UserGroupIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Users</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total_users}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Bookings</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total_bookings}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
              <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Today Bookings</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.today_bookings}</p>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Trip Analytics</h3>
            <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Trip Analytics Chart</p>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">User Growth</h3>
            <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">User Growth Chart</p>
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">System Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.total_buses > 0 ? ((stats.active_buses / stats.total_buses) * 100).toFixed(1) : 0}%</div>
            <div className="text-sm sm:text-base text-gray-600">Active Buses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.total_incidents}</div>
            <div className="text-sm sm:text-base text-gray-600">Total Incidents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{stats.total_incidents > 0 ? ((stats.resolved_incidents / stats.total_incidents) * 100).toFixed(1) : 0}%</div>
            <div className="text-sm sm:text-base text-gray-600">Incidents Resolved</div>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Recent Bus Registrations</h3>
        <div className="space-y-3">
          {recentBuses.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          ) : (
            recentBuses.map((bus, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-700">Bus {bus.registration_number} registered by {bus.owner?.name || 'N/A'}</span>
                <span className="text-sm sm:text-base text-gray-500">{new Date(bus.created_at).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
