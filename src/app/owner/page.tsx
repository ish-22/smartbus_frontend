import { Card } from '@/components/ui/Card'
import { TruckIcon, ChartBarIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function OwnerDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Owner Dashboard</h1>
        <p className="text-gray-600">Fleet management and business overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Buses</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Today&apos;s Revenue</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">LKR 45,230</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Trips</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">18</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
              <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">On-Time Rate</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">94%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Fleet Status */}
      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Fleet Status</h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { bus: 'Bus #001', route: 'Route 12A', status: 'Active', passengers: '32/45' },
            { bus: 'Bus #002', route: 'Route 15B', status: 'Active', passengers: '28/40' },
            { bus: 'Bus #003', route: 'Route 8C', status: 'Maintenance', passengers: '0/45' },
            { bus: 'Bus #004', route: 'Route 22A', status: 'Active', passengers: '41/50' },
          ].map((bus, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">{bus.bus}</span>
                <span className="text-gray-600">{bus.route}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  bus.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {bus.status}
                </span>
                <span className="text-sm sm:text-base text-gray-500">{bus.passengers}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
