import { Card } from '@/components/ui/Card'
import { MagnifyingGlassIcon, TicketIcon, MapPinIcon, GiftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function PassengerDashboard() {
  return (
    <div className="space-responsive-md no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Passenger Dashboard</h1>
        <p className="text-gray-600">Plan your journey and track buses in real-time</p>
      </div>

      {/* Quick Actions */}
      <div className="grid-responsive-2 lg:grid-cols-4 gap-responsive-md">
        <Link href="/passenger/search">
          <Card className="card-responsive hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MagnifyingGlassIcon className="icon-responsive-md text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Find Buses</h3>
              <p className="text-responsive-sm text-gray-600">Search routes and schedules</p>
            </div>
          </Card>
        </Link>

        <Link href="/passenger/booking">
          <Card className="card-responsive hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TicketIcon className="icon-responsive-md text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Book Tickets</h3>
              <p className="text-responsive-sm text-gray-600">Reserve your seat online</p>
            </div>
          </Card>
        </Link>

        <Link href="/passenger/tracking">
          <Card className="card-responsive hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPinIcon className="icon-responsive-md text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Track Buses</h3>
              <p className="text-responsive-sm text-gray-600">Real-time bus locations</p>
            </div>
          </Card>
        </Link>

        <Link href="/passenger/rewards">
          <Card className="card-responsive hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <GiftIcon className="icon-responsive-md text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Rewards</h3>
              <p className="text-responsive-sm text-gray-600">Earn points and offers</p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Bookings */}
      <Card className="card-responsive">
        <h3 className="text-responsive-lg font-semibold text-gray-900 mb-responsive-md">Recent Bookings</h3>
        <div className="space-responsive-sm">
          {[
            { route: 'Route 12A', date: 'Today, 2:30 PM', status: 'Confirmed', seat: 'A12' },
            { route: 'Route 15B', date: 'Yesterday, 9:00 AM', status: 'Completed', seat: 'B08' },
            { route: 'Route 8C', date: 'Dec 18, 5:45 PM', status: 'Completed', seat: 'C15' },
          ].map((booking, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div>
                <span className="font-medium text-gray-900">{booking.route}</span>
                <p className="text-responsive-sm text-gray-600">{booking.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-responsive-sm text-gray-600">Seat {booking.seat}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}