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
    <div className="space-responsive-md no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Bus Owner Management</h1>
        <p className="text-gray-600">Complete control over bus owners, registrations, and fleet operations</p>
      </div>

      {/* Quick Stats */}
      <div className="grid-responsive-4 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <BuildingOfficeIcon className="icon-responsive-md text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Owners</p>
              <p className="text-responsive-lg font-bold text-gray-900">45</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <TruckIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Fleet</p>
              <p className="text-responsive-lg font-bold text-gray-900">156</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Monthly Revenue</p>
              <p className="text-responsive-lg font-bold text-gray-900">₹2.3M</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ArrowRightOnRectangleIcon className="icon-responsive-md text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Pending Actions</p>
              <p className="text-responsive-lg font-bold text-gray-900">15</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid-responsive-2 gap-responsive-md">
        {ownerSections.map((section) => (
          <Card key={section.title} className="card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    section.color === 'purple' ? 'bg-purple-100' :
                    section.color === 'blue' ? 'bg-blue-100' :
                    section.color === 'green' ? 'bg-green-100' :
                    'bg-yellow-100'
                  }`}>
                    <section.icon className={`icon-responsive-md ${
                      section.color === 'purple' ? 'text-purple-600' :
                      section.color === 'blue' ? 'text-blue-600' :
                      section.color === 'green' ? 'text-green-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  <h3 className="text-responsive-lg font-semibold text-gray-900">{section.title}</h3>
                </div>
                <p className="text-gray-600 mb-responsive-md">{section.description}</p>
                <p className="text-responsive-sm font-medium text-gray-500 mb-responsive-md">{section.stats}</p>
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
      <Card className="card-responsive">
        <h3 className="text-responsive-lg font-semibold text-gray-900 mb-responsive-md">Recent Owner Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New owner registration: Metro Bus Co', time: '2 hours ago', type: 'info' },
            { action: 'Bus ownership transfer approved', time: '4 hours ago', type: 'success' },
            { action: 'Fleet inspection completed: City Lines', time: '6 hours ago', type: 'info' },
            { action: 'New bus registration pending approval', time: '8 hours ago', type: 'warning' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-700">{activity.action}</span>
              <span className="text-responsive-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
