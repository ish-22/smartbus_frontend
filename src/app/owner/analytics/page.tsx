import { Card } from '@/components/ui/Card'
import { ChartBarIcon, CurrencyDollarIcon, TruckIcon } from '@heroicons/react/24/outline'

export default function OwnerAnalyticsPage() {
  return (
    <div className="space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Revenue & Analytics</h1>
        <p className="text-gray-600">Track your business performance</p>
      </div>
      <div className="grid-responsive-3 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Monthly Revenue</p>
              <p className="text-responsive-lg font-bold text-gray-900">₹1,25,000</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <TruckIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Active Buses</p>
              <p className="text-responsive-lg font-bold text-gray-900">18</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <ChartBarIcon className="icon-responsive-md text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Trips</p>
              <p className="text-responsive-lg font-bold text-gray-900">2,456</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}