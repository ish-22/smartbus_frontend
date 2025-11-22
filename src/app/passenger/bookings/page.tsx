import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CalendarIcon, TicketIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function PassengerBookingsPage() {
  return (
    <div className="space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Bookings & Tickets</h1>
        <p className="text-gray-600">Manage your bus bookings and e-tickets</p>
      </div>

      <div className="grid-responsive-3 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <TicketIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Active Tickets</p>
              <p className="text-responsive-lg font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CalendarIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Bookings</p>
              <p className="text-responsive-lg font-bold text-gray-900">45</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <span className="text-purple-600 text-responsive-xl">₹</span>
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Spent</p>
              <p className="text-responsive-lg font-bold text-gray-900">₹12,450</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-responsive-md">
        <div>
          <h2 className="text-responsive-xl font-semibold text-gray-900 mb-responsive-md">Upcoming Trips</h2>
          <div className="space-responsive-sm">
            {[
              {
                id: 'TKT-001234',
                route: 'Route 12A',
                from: 'Colombo Fort',
                to: 'Kandy',
                date: '2024-01-20',
                time: '08:30 AM',
                seat: 'A12',
                price: '₹250',
                status: 'Confirmed'
              },
              {
                id: 'TKT-001235',
                route: 'Route 8C',
                from: 'Negombo',
                to: 'Colombo',
                date: '2024-01-22',
                time: '02:15 PM',
                seat: 'B08',
                price: '₹180',
                status: 'Confirmed'
              }
            ].map((booking, index) => (
              <Card key={index} className="card-responsive">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        <TicketIcon className="icon-responsive-md text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-responsive-lg font-semibold text-gray-900">{booking.route}</h3>
                        <p className="text-responsive-sm text-gray-600">Ticket ID: {booking.id}</p>
                      </div>
                    </div>
                    
                    <div className="grid-responsive-4 gap-responsive-sm text-responsive-sm">
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{booking.from} → {booking.to}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{booking.time}</span>
                      </div>
                      <div>
                        <span className="font-medium">Seat {booking.seat}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-6">
                    <p className="text-responsive-lg font-bold text-gray-900">{booking.price}</p>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                    <div className="mt-3 space-x-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View Ticket
                      </Button>
                      <Button variant="secondary" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-responsive-xl font-semibold text-gray-900 mb-responsive-md">Booking History</h2>
          <Card className="card-responsive">
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-responsive-md" />
              <p className="text-gray-500">Your booking history will appear here</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
