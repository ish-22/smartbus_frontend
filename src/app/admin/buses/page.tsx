'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { createBusAPI, getBusesAPI, type Bus } from '@/services/api/busApi'
import { getRoutesAPI, type Route } from '@/services/api/routeApi'
import { getAllOwners, type Owner } from '@/services/api/userApi'
import { useAuthStore } from '@/store/authStore'
import { useUiStore } from '@/store/uiStore'

export default function AdminBusesPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null)
  const [loading, setLoading] = useState(false)
  const [buses, setBuses] = useState<Bus[]>([])
  const [routes, setRoutes] = useState<Route[]>([])
  const [owners, setOwners] = useState<Owner[]>([])
  const [formData, setFormData] = useState({ 
    number: '', 
    type: 'normal' as 'expressway' | 'normal', 
    capacity: '', 
    route_id: '',
    owner_id: '',
    model: ''
  })
  const token = useAuthStore(state => state.token)
  const showToast = useUiStore(state => state.showToast)

  useEffect(() => {
    loadBuses()
    loadRoutes()
    loadOwners()
  }, [])

  const loadBuses = async () => {
    try {
      const data = await getBusesAPI(token)
      setBuses(data)
    } catch (error) {
      console.error('Failed to load buses:', error)
    }
  }

  const loadRoutes = async () => {
    try {
      const data = await getRoutesAPI()
      setRoutes(data)
    } catch (error) {
      console.error('Failed to load routes:', error)
    }
  }

  const loadOwners = async () => {
    if (!token) return
    try {
      const data = await getAllOwners(token)
      setOwners(data)
    } catch (error) {
      console.error('Failed to load owners:', error)
    }
  }

  const handleAddBus = () => {
    setFormData({ number: '', type: 'normal', capacity: '', route_id: '', owner_id: '', model: '' })
    setShowModal(true)
  }

  const handleViewBus = (bus: Bus) => {
    setSelectedBus(bus)
    setShowDetailsModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) {
      showToast({ type: 'error', message: 'Authentication required' })
      return
    }
    
    setLoading(true)
    try {
      const payload = {
        number: formData.number,
        type: formData.type,
        capacity: parseInt(formData.capacity),
        route_id: formData.route_id ? parseInt(formData.route_id) : undefined,
        owner_id: formData.owner_id ? parseInt(formData.owner_id) : undefined,
        model: formData.model || undefined
      }
      
      await createBusAPI(payload as any, token)
      showToast({ type: 'success', message: 'Bus created successfully' })
      setShowModal(false)
      setFormData({ number: '', type: 'normal', capacity: '', route_id: '', owner_id: '', model: '' })
      loadBuses()
    } catch (error) {
      console.error('Error creating bus:', error)
      showToast({ type: 'error', message: error instanceof Error ? error.message : 'Failed to create bus' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Bus Management</h1>
          <p className="text-gray-600">Monitor and manage all buses in the system</p>
        </div>
        <Button onClick={handleAddBus} className="bg-red-600 hover:bg-red-700">
          Add New Bus
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Buses</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{buses.length}</p>
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
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{buses.filter(b => !b.status || b.status === 'active').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <WrenchScrewdriverIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Maintenance</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{buses.filter(b => b.status === 'maintenance').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
              <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{buses.filter(b => b.status === 'inactive').length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['all', 'active', 'maintenance', 'pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm sm:text-base capitalize ${
                activeTab === tab
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Buses Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bus Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No buses found. Click &quot;Add New Bus&quot; to create one.
                  </td>
                </tr>
              ) : (
                buses.map((bus) => (
                  <tr key={bus.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{bus.number || bus.bus_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {bus.owner?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {bus.route?.name || bus.route?.route_number || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        bus.status === 'active' ? 'bg-green-100 text-green-800' :
                        bus.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {bus.status || 'active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {bus.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      N/A
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium">
                      <div className="flex space-x-2">
                        <button onClick={() => handleViewBus(bus)} className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Bus</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bus Number *</label>
                <input
                  type="text"
                  required
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., SB-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'expressway' | 'normal' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="normal">Normal</option>
                  <option value="expressway">Expressway</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 45"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                <select
                  value={formData.route_id}
                  onChange={(e) => setFormData({ ...formData, route_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select a route</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.route_number || route.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                <select
                  value={formData.owner_id}
                  onChange={(e) => setFormData({ ...formData, owner_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select an owner</option>
                  {owners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Volvo B9R"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700">
                  {loading ? 'Creating...' : 'Create Bus'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailsModal && selectedBus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Bus Details</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Bus Number</p>
                <p className="text-base text-gray-900">{selectedBus.number || selectedBus.bus_number}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Type</p>
                <p className="text-base text-gray-900 capitalize">{selectedBus.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Capacity</p>
                <p className="text-base text-gray-900">{selectedBus.capacity} passengers</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Owner</p>
                <p className="text-base text-gray-900">{selectedBus.owner?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Route</p>
                <p className="text-base text-gray-900">{selectedBus.route?.name || selectedBus.route?.route_number || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Model</p>
                <p className="text-base text-gray-900">{selectedBus.model || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="text-base text-gray-900 capitalize">{selectedBus.status || 'active'}</p>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => setShowDetailsModal(false)} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
