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
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Passenger Management</h1>
        <p className="text-gray-600">Complete control over passenger accounts, feedback, and services</p>
      </div>

      {/* Quick Stats */}
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
              <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Monthly Bookings</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">2,567</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <ChatBubbleLeftRightIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Feedback Items</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Rewards</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {passengerSections.map((section) => (
          <Card key={section.title} className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
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
                    <section.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      section.color === 'blue' ? 'text-blue-600' :
                      section.color === 'purple' ? 'text-purple-600' :
                      section.color === 'green' ? 'text-green-600' :
                      section.color === 'yellow' ? 'text-yellow-600' :
                      'text-red-600'
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
    </div>
  )
}
