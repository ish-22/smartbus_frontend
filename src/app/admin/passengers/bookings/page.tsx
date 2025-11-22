'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

export default function PassengerBookingsPage() {
  const bookings = [
    {
      id: 'SB001',
      passenger: 'John Doe',
      route: 'Colombo - Kandy',
      bus: 'SB-001',
      date: '2024-01-15',
      time: '08:30 AM',
      seats: 2,
      amount: '₹500',
      status: 'Confirmed'
    },
    {
      id: 'SB002',
      passenger: 'Sarah Wilson',
      route: 'Colombo - Galle',
      bus: 'SB-002',
      date: '2024-01-14',
      time: '09:00 AM',
      seats: 1,
      amount: '₹300',
      status: 'Completed'
    },
    {
      id: 'SB003',
      passenger: 'Mike Johnson',
      route: 'Kandy - Colombo',
      bus: 'SB-003',
      date: '2024-01-13',
      time: '02:00 PM',
      seats: 3,
      amount: '₹750',
      status: 'Cancelled'
    }
  ]

  return (
    <div className="space-responsive-md no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Passenger Bookings</h1>
        <p className="text-gray-600">Monitor all passenger bookings and transactions</p>
      </div>

      <div className="grid-responsive-4 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <CalendarIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Bookings</p>
              <p className="text-responsive-lg font-bold text-gray-900">2,567</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Confirmed</p>
              <p className="text-responsive-lg font-bold text-gray-900">2,234</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <XCircleIcon className="icon-responsive-md text-red-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Cancelled</p>
              <p className="text-responsive-lg font-bold text-gray-900">156</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="icon-responsive-md text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Revenue</p>
              <p className="text-responsive-lg font-bold text-gray-900">₹1.2M</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passenger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {booking.passenger}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {booking.route}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {booking.date} {booking.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {booking.seats}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {booking.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}