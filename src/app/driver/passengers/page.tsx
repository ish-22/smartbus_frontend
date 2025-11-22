'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  UsersIcon,
  CheckCircleIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline'

export default function DriverPassengersPage() {
  const passengers = [
    {
      id: 1,
      name: 'John Doe',
      seat: '15A',
      from: 'Colombo',
      to: 'Kandy',
      ticketId: 'SB001',
      status: 'Boarded'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      seat: '12B',
      from: 'Kelaniya',
      to: 'Kandy',
      ticketId: 'SB002',
      status: 'Pending'
    }
  ]

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Passenger Management</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Current trip passenger list</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Passengers</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Boarded</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">38</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <QrCodeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">7</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3 sm:space-y-4">
        {passengers.map((passenger) => (
          <Card key={passenger.id} className="p-3 sm:p-4 lg:p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{passenger.name}</h3>
                <div className="mt-1 space-y-1">
                  <p className="text-xs sm:text-sm text-gray-600">Seat: {passenger.seat}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{passenger.from} → {passenger.to}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Ticket: {passenger.ticketId}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 text-xs sm:text-sm rounded-full ${
                  passenger.status === 'Boarded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {passenger.status}
                </span>
                {passenger.status === 'Pending' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base-sm">
                    <QrCodeIcon className="h-3 w-3 mr-1" />
                    Scan
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <Card className="hidden lg:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passenger</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seat</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {passengers.map((passenger) => (
                <tr key={passenger.id} className="hover:bg-gray-50">
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap font-medium text-gray-900 text-sm">
                    {passenger.name}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {passenger.seat}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {passenger.from} → {passenger.to}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                    {passenger.ticketId}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      passenger.status === 'Boarded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {passenger.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    {passenger.status === 'Pending' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <QrCodeIcon className="h-4 w-4 mr-1" />
                        Scan
                      </Button>
                    )}
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