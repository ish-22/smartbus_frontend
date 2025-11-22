import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { 
  BuildingOfficeIcon,
  TruckIcon,
  ArrowRightOnRectangleIcon,
  ArrowRightIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

export default function AdminOwnersPage() {
  const ownerSections = [
    {
      title: 'Owner Accounts',
      description: 'Manage bus owner registrations, profiles, and verification',
      href: '/admin/owners/accounts',
      icon: BuildingOfficeIcon,
      stats: '45 Active Owners',
      color: 'purple'
    },
    {
      title: 'Bus Registrations',
      description: 'Approve new bus registrations and documentation',
      href: '/admin/owners/registrations',
      icon: TruckIcon,
      stats: '12 Pending Approvals',
      color: 'blue'
    },
    {
      title: 'Fleet Status',
      description: 'Monitor all buses owned by registered operators',
      href: '/admin/owners/fleet',
      icon: TruckIcon,
      stats: '156 Total Buses',
      color: 'green'
    },
    {
      title: 'Ownership Transfer',
      description: 'Process bus ownership transfers between operators',
      href: '/admin/owners/transfers',
      icon: ArrowRightOnRectangleIcon,
      stats: '3 Pending Transfers',
      color: 'yellow'
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Bus Owner Management</h1>
        <p className="text-gray-600">Complete control over bus owners, registrations, and fleet operations</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <BuildingOfficeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Owners</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Fleet</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Monthly Revenue</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">₹2.3M</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ArrowRightOnRectangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending Actions</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">15</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {ownerSections.map((section) => (
          <Card key={section.title} className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    section.color === 'purple' ? 'bg-purple-100' :
                    section.color === 'blue' ? 'bg-blue-100' :
                    section.color === 'green' ? 'bg-green-100' :
                    'bg-yellow-100'
                  }`}>
                    <section.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      section.color === 'purple' ? 'text-purple-600' :
                      section.color === 'blue' ? 'text-blue-600' :
                      section.color === 'green' ? 'text-green-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{section.title}</h3>
                </div>
                <p className="text-gray-600 mb-3 sm:mb-4">{section.description}</p>
                <p className="text-sm sm:text-base font-medium text-gray-500 mb-3 sm:mb-4">{section.stats}</p>
              </div>
            </div>
            <Link href={section.href}>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Manage
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Recent Owner Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New owner registration: Metro Bus Co', time: '2 hours ago', type: 'info' },
            { action: 'Bus ownership transfer approved', time: '4 hours ago', type: 'success' },
            { action: 'Fleet inspection completed: City Lines', time: '6 hours ago', type: 'info' },
            { action: 'New bus registration pending approval', time: '8 hours ago', type: 'warning' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-700">{activity.action}</span>
              <span className="text-sm sm:text-base text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
