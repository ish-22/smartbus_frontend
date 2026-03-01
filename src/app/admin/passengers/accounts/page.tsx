'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  NoSymbolIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { API_BASE_URL } from '@/config/api'

type Passenger = {
  id: number
  name: string
  email: string
  phone: string
  status: string
  joinDate: string
  totalBookings: number
  totalSpent: string
}

export default function PassengerAccountsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [viewingPassenger, setViewingPassenger] = useState<Passenger | null>(null)
  const [editingPassenger, setEditingPassenger] = useState<Passenger | null>(null)
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [loading, setLoading] = useState(true)
  const token = useAuthStore(state => state.token)

  useEffect(() => {
    loadPassengers()
  }, [])

  const loadPassengers = async () => {
    if (!token) return
    try {
      const response = await fetch(`${API_BASE_URL}/users/passengers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setPassengers(data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || 'N/A',
          status: user.status || 'Active',
          joinDate: new Date(user.created_at).toISOString().split('T')[0],
          totalBookings: 0,
          totalSpent: 'LKR 0'
        })))
      }
    } catch (error) {
      console.error('Failed to load passengers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewPassenger = (passenger: Passenger) => {
    setViewingPassenger(passenger)
  }

  const handleEditPassenger = (passenger: Passenger) => {
    setEditingPassenger(passenger)
  }

  const handleToggleStatus = async (passenger: Passenger) => {
    const newStatus = passenger.status === 'Suspended' ? 'Active' : 'Suspended'
    setPassengers(passengers.map(p => 
      p.id === passenger.id ? { ...p, status: newStatus } : p
    ))
  }

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
              title="Filter by status"
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
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading passengers...</div>
        ) : passengers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No passengers found</div>
        ) : (
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
                      <button onClick={() => handleViewPassenger(passenger)} className="text-blue-600 hover:text-blue-900" title="View passenger details">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleEditPassenger(passenger)} className="text-green-600 hover:text-green-900" title="Edit passenger">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      {passenger.status === 'Suspended' ? (
                        <button onClick={() => handleToggleStatus(passenger)} className="text-green-600 hover:text-green-900" title="Activate passenger">
                          <CheckCircleIcon className="h-4 w-4" />
                        </button>
                      ) : (
                        <button onClick={() => handleToggleStatus(passenger)} className="text-red-600 hover:text-red-900" title="Suspend passenger">
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
        )}
      </Card>

      {/* View Passenger Modal */}
      {viewingPassenger && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Passenger Details</h2>
                <button onClick={() => setViewingPassenger(null)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div><span className="font-semibold">Name:</span> {viewingPassenger.name}</div>
                <div><span className="font-semibold">Email:</span> {viewingPassenger.email}</div>
                <div><span className="font-semibold">Phone:</span> {viewingPassenger.phone}</div>
                <div><span className="font-semibold">Status:</span> <span className={`px-2 py-1 text-xs rounded-full ${viewingPassenger.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{viewingPassenger.status}</span></div>
                <div><span className="font-semibold">Join Date:</span> {viewingPassenger.joinDate}</div>
                <div><span className="font-semibold">Total Bookings:</span> {viewingPassenger.totalBookings}</div>
                <div><span className="font-semibold">Total Spent:</span> {viewingPassenger.totalSpent}</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Passenger Modal */}
      {editingPassenger && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit Passenger</h2>
                <button onClick={() => setEditingPassenger(null)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" defaultValue={editingPassenger.name} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" defaultValue={editingPassenger.email} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input type="text" defaultValue={editingPassenger.phone} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="flex gap-3 mt-6">
                  <Button onClick={() => setEditingPassenger(null)} className="flex-1 bg-gray-500 hover:bg-gray-600">Cancel</Button>
                  <Button onClick={() => setEditingPassenger(null)} className="flex-1 bg-red-600 hover:bg-red-700">Save Changes</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
