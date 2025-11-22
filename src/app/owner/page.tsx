import { Card } from '@/components/ui/Card'
import { TruckIcon, ChartBarIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function OwnerDashboard() {
  return (
    <div className="space-responsive-md no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Owner Dashboard</h1>
        <p className="text-gray-600">Fleet management and business overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid-responsive-2 lg:grid-cols-4 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <TruckIcon className="icon-responsive-md text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Buses</p>
              <p className="text-responsive-lg font-bold text-gray-900">24</p>
            </div>
          </div>
        </Card>

        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Today's Revenue</p>
              <p className="text-responsive-lg font-bold text-gray-900">₹45,230</p>
            </div>
          </div>
        </Card>

        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <ChartBarIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Active Trips</p>
              <p className="text-responsive-lg font-bold text-gray-900">18</p>
            </div>
          </div>
        </Card>

        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
              <ClockIcon className="icon-responsive-md text-orange-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">On-Time Rate</p>
              <p className="text-responsive-lg font-bold text-gray-900">94%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Fleet Status */}
      <Card className="card-responsive">
        <h3 className="text-responsive-lg font-semibold text-gray-900 mb-responsive-md">Fleet Status</h3>
        <div className="space-responsive-sm">
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
                <span className="text-responsive-sm text-gray-500">{bus.passengers}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
