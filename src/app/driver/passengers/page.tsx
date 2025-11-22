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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Passenger Management</h1>
        <p className="text-gray-600">Current trip passenger list</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Passengers</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Boarded</p>
              <p className="text-2xl font-bold text-gray-900">38</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <QrCodeIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">7</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passenger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {passengers.map((passenger) => (
                <tr key={passenger.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {passenger.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {passenger.seat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {passenger.from} → {passenger.to}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {passenger.ticketId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      passenger.status === 'Boarded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {passenger.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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