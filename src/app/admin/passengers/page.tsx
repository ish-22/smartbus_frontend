import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { 
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  StarIcon,
  ArchiveBoxIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function AdminPassengersPage() {
  const passengerSections = [
    {
      title: 'Passenger Accounts',
      description: 'Manage passenger registrations, profiles, and account status',
      href: '/admin/passengers/accounts',
      icon: UserGroupIcon,
      stats: '12,543 Active Users',
      color: 'blue'
    },
    {
      title: 'Feedback Center',
      description: 'Review complaints, suggestions, and passenger feedback',
      href: '/admin/passengers/feedback',
      icon: ChatBubbleLeftRightIcon,
      stats: '23 Pending Reviews',
      color: 'purple'
    },
    {
      title: 'Booking History',
      description: 'Monitor all passenger bookings and transaction history',
      href: '/admin/passengers/bookings',
      icon: CalendarIcon,
      stats: '2,567 This Month',
      color: 'green'
    },
    {
      title: 'Passenger Rewards',
      description: 'Manage loyalty points, rewards, and redemption system',
      href: '/admin/passengers/rewards',
      icon: StarIcon,
      stats: '₹45,230 Redeemed',
      color: 'yellow'
    },
    {
      title: 'Lost & Found Claims',
      description: 'Process passenger claims for lost items',
      href: '/admin/passengers/claims',
      icon: ArchiveBoxIcon,
      stats: '8 Pending Claims',
      color: 'red'
    },
  ]

  return (
    <div className="space-responsive-md no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Passenger Management</h1>
        <p className="text-gray-600">Complete control over passenger accounts, feedback, and services</p>
      </div>

      {/* Quick Stats */}
      <div className="grid-responsive-4 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <UserGroupIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Passengers</p>
              <p className="text-responsive-lg font-bold text-gray-900">12,543</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CalendarIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Monthly Bookings</p>
              <p className="text-responsive-lg font-bold text-gray-900">2,567</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <ChatBubbleLeftRightIcon className="icon-responsive-md text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Feedback Items</p>
              <p className="text-responsive-lg font-bold text-gray-900">156</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <StarIcon className="icon-responsive-md text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Active Rewards</p>
              <p className="text-responsive-lg font-bold text-gray-900">89</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid-responsive-2 lg:grid-cols-3 gap-responsive-md">
        {passengerSections.map((section) => (
          <Card key={section.title} className="card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    section.color === 'blue' ? 'bg-blue-100' :
                    section.color === 'purple' ? 'bg-purple-100' :
                    section.color === 'green' ? 'bg-green-100' :
                    section.color === 'yellow' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <section.icon className={`icon-responsive-md ${
                      section.color === 'blue' ? 'text-blue-600' :
                      section.color === 'purple' ? 'text-purple-600' :
                      section.color === 'green' ? 'text-green-600' :
                      section.color === 'yellow' ? 'text-yellow-600' :
                      'text-red-600'
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
    </div>
  )
}
