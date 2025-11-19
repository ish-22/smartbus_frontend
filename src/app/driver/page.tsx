import { Card } from '@/components/ui/Card'
import { PlayIcon, MapPinIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'

export default function DriverDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
        <p className="text-gray-600">Welcome back, John Doe</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlayIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Your Trip</h3>
            <p className="text-gray-600 mb-4">Begin your scheduled route</p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Start Trip
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Location</h3>
            <p className="text-gray-600 mb-4">Share your live location</p>
            <Button variant="secondary" className="w-full">
              Enable GPS
            </Button>
          </div>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        <div className="space-y-4">
          {[
            { route: 'Route 12A', time: '08:00 AM', status: 'Completed', passengers: 42 },
            { route: 'Route 12A', time: '10:30 AM', status: 'In Progress', passengers: 28 },
            { route: 'Route 12A', time: '01:00 PM', status: 'Upcoming', passengers: 0 },
            { route: 'Route 12A', time: '03:30 PM', status: 'Upcoming', passengers: 0 },
          ].map((trip, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <span className="font-medium text-gray-900">{trip.route}</span>
                  <p className="text-sm text-gray-600">{trip.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  trip.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  trip.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {trip.status}
                </span>
                <div className="flex items-center space-x-1">
                  <UserGroupIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{trip.passengers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
