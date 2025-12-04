import { Card } from '@/components/ui/Card'
import { CalendarIcon, UsersIcon, MapPinIcon, QrCodeIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function DriverDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6 sm:space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl sm:text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Driver Dashboard</h1>
        <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mt-1">Manage your trips and passenger services</p>
      </div>
      
      <div className="space-y-3 sm:space-y-4 sm:space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 sm:gap-4 sm:gap-6">
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">My Schedule</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">View today's routes and timings</p>
            <a href="/driver/schedule" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              View Schedule →
            </a>
          </Card>
          
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">Passengers</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">Manage passenger bookings</p>
            <a href="/driver/passengers" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              View Passengers →
            </a>
          </Card>
          
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">GPS Tracking</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">Share live location with passengers</p>
            <a href="/driver/location" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              Start Tracking →
            </a>
          </Card>
          
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <QrCodeIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">QR Scanner</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">Scan passenger tickets</p>
            <a href="/driver/qr-scanner" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              Open Scanner →
            </a>
          </Card>
          
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <ExclamationTriangleIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">Report Incident</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">Report issues or emergencies</p>
            <a href="/driver/incidents" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              Report Issue →
            </a>
          </Card>
          
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">Lost Items</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">Manage lost and found items</p>
            <a href="/driver/lost-found" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              View Items →
            </a>
          </Card>
          
          <Link href="/driver/profile">
            <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">My Profile</h2>
              </div>
              <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">View and edit your profile</p>
              <span className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
                View Profile →
              </span>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
