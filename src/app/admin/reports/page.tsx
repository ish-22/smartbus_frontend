'use client'

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

export default function AdminReportsPage() {
  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">System performance and business insights</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Daily Trips</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">1,234</p>
              <p className="text-sm sm:text-base text-green-600">+12% from yesterday</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <UserGroupIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Users</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">8,456</p>
              <p className="text-sm sm:text-base text-green-600">+5% from last week</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Bookings</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">2,567</p>
              <p className="text-sm sm:text-base text-green-600">+8% from last week</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Revenue</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">LKR 1,23,456</p>
              <p className="text-sm sm:text-base text-green-600">+15% from last month</p>
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
            <div className="text-3xl font-bold text-green-600">98.5%</div>
            <div className="text-sm sm:text-base text-gray-600">System Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">2.3s</div>
            <div className="text-sm sm:text-base text-gray-600">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">94.2%</div>
            <div className="text-sm sm:text-base text-gray-600">On-Time Performance</div>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Recent System Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New bus registration approved', time: '5 minutes ago', type: 'success' },
            { action: 'Route 12A schedule updated', time: '15 minutes ago', type: 'info' },
            { action: 'Driver complaint resolved', time: '1 hour ago', type: 'warning' },
            { action: 'System backup completed', time: '2 hours ago', type: 'info' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-700">{activity.action}</span>
              <span className="text-sm sm:text-base text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
