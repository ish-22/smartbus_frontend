import { Card } from '@/components/ui/Card'
import { CalendarIcon, UsersIcon, MapPinIcon, QrCodeIcon, ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function DriverDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
        <p className="text-gray-600">Manage your trips and passenger services</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">My Schedule</h2>
            </div>
            <p className="text-gray-600 mb-4">View today's routes and timings</p>
            <a href="/driver/schedule" className="text-green-600 hover:text-green-800 font-medium">
              View Schedule →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <UsersIcon className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Passengers</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage passenger bookings</p>
            <a href="/driver/passengers" className="text-green-600 hover:text-green-800 font-medium">
              View Passengers →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPinIcon className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">GPS Tracking</h2>
            </div>
            <p className="text-gray-600 mb-4">Share live location with passengers</p>
            <a href="/driver/location" className="text-green-600 hover:text-green-800 font-medium">
              Start Tracking →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <QrCodeIcon className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">QR Scanner</h2>
            </div>
            <p className="text-gray-600 mb-4">Scan passenger tickets</p>
            <a href="/driver/qr-scanner" className="text-green-600 hover:text-green-800 font-medium">
              Open Scanner →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <ExclamationTriangleIcon className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Report Incident</h2>
            </div>
            <p className="text-gray-600 mb-4">Report issues or emergencies</p>
            <a href="/driver/incidents" className="text-green-600 hover:text-green-800 font-medium">
              Report Issue →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <MagnifyingGlassIcon className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Lost Items</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage lost and found items</p>
            <a href="/lost-found" className="text-green-600 hover:text-green-800 font-medium">
              View Items →
            </a>
          </Card>
        </div>
      </div>
    </div>
  )
}
