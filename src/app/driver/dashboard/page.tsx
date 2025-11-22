import { Card } from '@/components/ui/Card'
import { CalendarIcon, UsersIcon, MapPinIcon, QrCodeIcon, ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function DriverDashboard() {
  return (
    <div className="space-responsive-md sm:space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-xl sm:text-responsive-2xl font-bold text-gray-900">Driver Dashboard</h1>
        <p className="text-responsive-sm sm:text-responsive-base text-gray-600 mt-1">Manage your trips and passenger services</p>
      </div>
      
      <div className="space-responsive-sm sm:space-responsive-md">
        <div className="grid-responsive-1 sm:grid-cols-2 lg:grid-cols-3 gap-responsive-sm sm:gap-responsive-md">
          <Card className="p-4 sm:card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-responsive-md">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <CalendarIcon className="icon-responsive-sm sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-responsive-base sm:text-responsive-lg font-semibold ml-3 truncate">My Schedule</h2>
            </div>
            <p className="text-responsive-sm sm:text-responsive-base text-gray-600 mb-3 sm:mb-responsive-md line-clamp-2">View today's routes and timings</p>
            <a href="/driver/schedule" className="text-responsive-sm sm:text-responsive-base text-green-600 hover:text-green-800 font-medium">
              View Schedule →
            </a>
          </Card>
          
          <Card className="p-4 sm:card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-responsive-md">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <UsersIcon className="icon-responsive-sm sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-responsive-base sm:text-responsive-lg font-semibold ml-3 truncate">Passengers</h2>
            </div>
            <p className="text-responsive-sm sm:text-responsive-base text-gray-600 mb-3 sm:mb-responsive-md line-clamp-2">Manage passenger bookings</p>
            <a href="/driver/passengers" className="text-responsive-sm sm:text-responsive-base text-green-600 hover:text-green-800 font-medium">
              View Passengers →
            </a>
          </Card>
          
          <Card className="p-4 sm:card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-responsive-md">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <MapPinIcon className="icon-responsive-sm sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-responsive-base sm:text-responsive-lg font-semibold ml-3 truncate">GPS Tracking</h2>
            </div>
            <p className="text-responsive-sm sm:text-responsive-base text-gray-600 mb-3 sm:mb-responsive-md line-clamp-2">Share live location with passengers</p>
            <a href="/driver/location" className="text-responsive-sm sm:text-responsive-base text-green-600 hover:text-green-800 font-medium">
              Start Tracking →
            </a>
          </Card>
          
          <Card className="p-4 sm:card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-responsive-md">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <QrCodeIcon className="icon-responsive-sm sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-responsive-base sm:text-responsive-lg font-semibold ml-3 truncate">QR Scanner</h2>
            </div>
            <p className="text-responsive-sm sm:text-responsive-base text-gray-600 mb-3 sm:mb-responsive-md line-clamp-2">Scan passenger tickets</p>
            <a href="/driver/qr-scanner" className="text-responsive-sm sm:text-responsive-base text-green-600 hover:text-green-800 font-medium">
              Open Scanner →
            </a>
          </Card>
          
          <Card className="p-4 sm:card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-responsive-md">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <ExclamationTriangleIcon className="icon-responsive-sm sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-responsive-base sm:text-responsive-lg font-semibold ml-3 truncate">Report Incident</h2>
            </div>
            <p className="text-responsive-sm sm:text-responsive-base text-gray-600 mb-3 sm:mb-responsive-md line-clamp-2">Report issues or emergencies</p>
            <a href="/driver/incidents" className="text-responsive-sm sm:text-responsive-base text-green-600 hover:text-green-800 font-medium">
              Report Issue →
            </a>
          </Card>
          
          <Card className="p-4 sm:card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-responsive-md">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <MagnifyingGlassIcon className="icon-responsive-sm sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-responsive-base sm:text-responsive-lg font-semibold ml-3 truncate">Lost Items</h2>
            </div>
            <p className="text-responsive-sm sm:text-responsive-base text-gray-600 mb-3 sm:mb-responsive-md line-clamp-2">Manage lost and found items</p>
            <a href="/driver/lost-found" className="text-responsive-sm sm:text-responsive-base text-green-600 hover:text-green-800 font-medium">
              View Items →
            </a>
          </Card>
        </div>
      </div>
    </div>
  )
}
