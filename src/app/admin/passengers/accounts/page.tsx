'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  NoSymbolIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function PassengerAccountsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const passengers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      status: 'Active',
      joinDate: '2024-01-15',
      totalBookings: 45,
      totalSpent: '₹12,450'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+91 9876543211',
      status: 'Active',
      joinDate: '2024-01-10',
      totalBookings: 23,
      totalSpent: '₹8,230'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 9876543212',
      status: 'Suspended',
      joinDate: '2024-01-05',
      totalBookings: 12,
      totalSpent: '₹3,450'
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Passenger Accounts</h1>
          <p className="text-gray-600">Manage passenger registrations and account status</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          Export Data
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search passengers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            <FunnelIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Passengers Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Passenger
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {passengers.map((passenger) => (
                <tr key={passenger.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                      </div>
                      <div className="ml-3 min-w-0">
                        <div className="font-medium text-gray-900">{passenger.name}</div>
                        <div className="text-sm sm:text-base text-gray-500">ID: {passenger.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm sm:text-base text-gray-900">{passenger.email}</div>
                    <div className="text-sm sm:text-base text-gray-500">{passenger.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      passenger.status === 'Active' ? 'bg-green-100 text-green-800' :
                      passenger.status === 'Suspended' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {passenger.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                    {passenger.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                    {passenger.totalBookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                    {passenger.totalSpent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      {passenger.status === 'Suspended' ? (
                        <button className="text-green-600 hover:text-green-900">
                          <CheckCircleIcon className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className="text-red-600 hover:text-red-900">
                          <NoSymbolIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
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
