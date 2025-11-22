import { Card } from '@/components/ui/Card'
import { ChartBarIcon, ArrowTrendingUpIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function AdminAnalyticsPage() {
  return (
    <div className="space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">System performance and usage analytics</p>
      </div>

      <div className="grid-responsive-4 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <ChartBarIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Trips</p>
              <p className="text-responsive-lg font-bold text-gray-900">45,231</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <ArrowTrendingUpIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Growth Rate</p>
              <p className="text-responsive-lg font-bold text-gray-900">+12%</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <UsersIcon className="icon-responsive-md text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Active Users</p>
              <p className="text-responsive-lg font-bold text-gray-900">8,456</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="icon-responsive-md text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Revenue</p>
              <p className="text-responsive-lg font-bold text-gray-900">₹2.3M</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="card-responsive">
        <h3 className="text-responsive-lg font-semibold text-gray-900 mb-responsive-md">Analytics Dashboard</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Analytics charts would be displayed here</p>
        </div>
      </Card>
    </div>
  )
}
