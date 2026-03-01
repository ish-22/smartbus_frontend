'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  ShieldCheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { API_BASE_URL } from '@/config/api'

type Driver = {
  id: number
  name: string
  email: string
  phone: string
  driver_type: string
  created_at: string
}

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0 })
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    password: '', 
    driver_type: '',
    license_number: '',
    license_expiry_date: '',
    nic_number: '',
    date_of_birth: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_phone: ''
  })
  const token = typeof window !== 'undefined' ? useAuthStore(state => state.token) : null

  useEffect(() => {
    setMounted(true)
    if (token) {
      loadDrivers()
    } else {
      setLoading(false)
    }
  }, [token])

  const loadDrivers = async () => {
    if (!token) return
    try {
      const response = await fetch(`${API_BASE_URL}/users/drivers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      const data = await response.json()
      if (response.ok) {
        setDrivers(data)
        setStats({
          total: data.length,
          active: data.length,
          pending: 0
        })
      } else {
        console.error('API Error:', data)
        alert(`Error: ${data.message || 'Failed to load drivers'}`)
      }
    } catch (error) {
      console.error('Failed to load drivers:', error)
      alert('Network error: Failed to load drivers')
    } finally {
      setLoading(false)
    }
  }

  const handleAddDriver = async () => {
    if (!token) return
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ ...formData, role: 'driver' })
      })
      const result = await response.json()
      console.log('Add driver response:', result)
      if (response.ok) {
        setShowAddModal(false)
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          password: '', 
          driver_type: '',
          license_number: '',
          license_expiry_date: '',
          nic_number: '',
          date_of_birth: '',
          address: '',
          emergency_contact_name: '',
          emergency_contact_phone: ''
        })
        loadDrivers()
      } else {
        console.error('Failed to add driver:', result)
        alert(result.message || 'Failed to add driver')
      }
    } catch (error) {
      console.error('Failed to add driver:', error)
      alert('Failed to add driver')
    }
  }

  if (!mounted || loading) {
    return <div className="text-center py-8">Loading drivers...</div>
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Driver Management</h1>
          <p className="text-gray-600">Manage driver accounts and approvals</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-red-600 hover:bg-red-700">
          Add Driver
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Drivers</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Avg Rating</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">4.7</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Drivers Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  License
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Trips
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No drivers found
                  </td>
                </tr>
              ) : (
                drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                      </div>
                      <div className="ml-3 min-w-0">
                        <div className="font-medium text-gray-900">{driver.name}</div>
                        <div className="text-sm text-gray-500">{driver.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {driver.driver_type || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    N/A
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-gray-900">N/A</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium">
                    <div className="flex space-x-2">
                      <Button variant="secondary" size="sm" onClick={() => { setSelectedDriver(driver); setShowViewModal(true); }}>
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* View Driver Modal */}
      {showViewModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Driver Details</h2>
                <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selectedDriver.name}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedDriver.email}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedDriver.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Driver Type</p>
                    <p className="font-medium">{selectedDriver.driver_type || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Status</p>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Joined Date</p>
                    <p className="font-medium">{new Date(selectedDriver.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={() => setShowViewModal(false)} className="bg-gray-500 hover:bg-gray-600">Close</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Add Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Add New Driver</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="Driver name" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="driver@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">Phone</label>
                    <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="+94 77 123 4567" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">Password</label>
                    <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="Password" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">Driver Type</label>
                    <select value={formData.driver_type} onChange={(e) => setFormData({...formData, driver_type: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg">
                      <option value="">Select type</option>
                      <option value="normal">Normal</option>
                      <option value="expressway">Expressway</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">License Number</label>
                    <input type="text" value={formData.license_number} onChange={(e) => setFormData({...formData, license_number: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">License Expiry</label>
                    <input type="date" value={formData.license_expiry_date} onChange={(e) => setFormData({...formData, license_expiry_date: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">NIC Number</label>
                    <input type="text" value={formData.nic_number} onChange={(e) => setFormData({...formData, nic_number: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">Date of Birth</label>
                    <input type="date" value={formData.date_of_birth} onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">Emergency Contact Name</label>
                    <input type="text" value={formData.emergency_contact_name} onChange={(e) => setFormData({...formData, emergency_contact_name: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">Emergency Contact Phone</label>
                    <input type="text" value={formData.emergency_contact_phone} onChange={(e) => setFormData({...formData, emergency_contact_phone: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium mb-1">Address</label>
                  <textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" rows={2} />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <Button onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-500 hover:bg-gray-600">Cancel</Button>
                  <Button onClick={handleAddDriver} className="flex-1 bg-red-600 hover:bg-red-700">Add Driver</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
