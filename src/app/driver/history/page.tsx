import { Card } from '@/components/ui/Card'
import { ClockIcon, MapPinIcon, UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function DriverHistoryPage() {
  return (
    <div className="space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Trip History</h1>
        <p className="text-gray-600">Your completed trips and performance</p>
      </div>

      <div className="grid-responsive-4 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <ClockIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">This Week</p>
              <p className="text-responsive-lg font-bold text-gray-900">28</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Completed</p>
              <p className="text-responsive-lg font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <UserGroupIcon className="icon-responsive-md text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Passengers</p>
              <p className="text-responsive-lg font-bold text-gray-900">45,678</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ClockIcon className="icon-responsive-md text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Hours</p>
              <p className="text-responsive-lg font-bold text-gray-900">2,456</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="card-responsive border-b border-gray-200">
          <h3 className="text-responsive-lg font-semibold text-gray-900">Recent Trips</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Passengers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: '2024-01-15', route: 'Route 12A', duration: '3h 30m', passengers: 42, status: 'Completed' },
                { date: '2024-01-15', route: 'Route 12A', duration: '3h 45m', passengers: 38, status: 'Completed' },
                { date: '2024-01-14', route: 'Route 12A', duration: '3h 25m', passengers: 45, status: 'Completed' },
                { date: '2024-01-14', route: 'Route 12A', duration: '3h 40m', passengers: 41, status: 'Completed' },
              ].map((trip, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-responsive-sm text-gray-900">
                    {trip.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-responsive-sm text-gray-900">{trip.route}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-responsive-sm text-gray-900">
                    {trip.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-responsive-sm text-gray-900">
                    {trip.passengers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
