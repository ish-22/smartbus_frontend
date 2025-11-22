import { Card } from '@/components/ui/Card'
import { 
  UserGroupIcon,
  UserIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function AdminUsersPage() {
  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Overview of all system users across different roles</p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <UserGroupIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Passengers</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">12,543</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Drivers</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <BuildingOfficeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Bus Owners</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">System Admins</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent User Activity */}
      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Recent User Activity</h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { action: 'New passenger registration: John Doe', time: '5 minutes ago', type: 'passenger' },
            { action: 'Driver approved: Mike Johnson', time: '15 minutes ago', type: 'driver' },
            { action: 'Bus owner verification completed', time: '1 hour ago', type: 'owner' },
            { action: 'Passenger account suspended', time: '2 hours ago', type: 'passenger' },
          ].map((activity, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-gray-100 last:border-b-0 space-y-1 sm:space-y-0">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  activity.type === 'passenger' ? 'bg-blue-500' :
                  activity.type === 'driver' ? 'bg-green-500' :
                  activity.type === 'owner' ? 'bg-purple-500' :
                  'bg-red-500'
                }`} />
                <span className="text-sm sm:text-base text-gray-700 truncate">{activity.action}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0 self-start sm:self-center">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
