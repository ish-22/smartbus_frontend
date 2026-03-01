'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  TruckIcon,
  MapPinIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { API_BASE_URL } from '@/config/api'

type Bus = {
  id: number
  bus_number: string
  registration_number: string
  capacity: number
  status: string
  owner_id: number
  route_id: number
  created_at: string
  owner?: { name: string }
  route?: { name: string; route_number: string }
}

export default function AdminOwnerFleetPage() {
  const [buses, setBuses] = useState<Bus[]>([])
  const [stats, setStats] = useState({ total: 0, active: 0, maintenance: 0, inactive: 0 })
  const [loading, setLoading] = useState(true)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null)
  const token = useAuthStore(state => state.token)

  useEffect(() => {
    if (token) {
      loadBuses()
    }
  }, [token])

  const loadBuses = async () => {
    if (!token) return
    try {
      const response = await fetch(`${API_BASE_URL}/buses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setBuses(data)
        setStats({
          total: data.length,
          active: data.filter((b: Bus) => b.status === 'active').length,
          maintenance: data.filter((b: Bus) => b.status === 'maintenance').length,
          inactive: data.filter((b: Bus) => b.status === 'inactive').length
        })
      }
    } catch (error) {
      console.error('Failed to load buses:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
        <p className="text-gray-600">Monitor all buses owned by registered operators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TruckIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Fleet</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <MapPinIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <WrenchScrewdriverIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">{stats.maintenance}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out of Service</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Fleet Overview</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bus
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No buses found
                  </td>
                </tr>
              ) : (
                buses.map((bus) => (
                  <tr key={bus.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <TruckIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{bus.registration_number || bus.bus_number}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bus.owner?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bus.route?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        bus.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : bus.status === 'maintenance'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {bus.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bus.capacity} seats
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => { setSelectedBus(bus); setShowViewModal(true); }}>
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* View Bus Modal */}
      {showViewModal && selectedBus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Bus Details</h2>
                <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Bus Number</p>
                    <p className="font-medium">{selectedBus.registration_number || selectedBus.bus_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p className="font-medium">{selectedBus.capacity} seats</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{selectedBus.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Owner</p>
                    <p className="font-medium">{selectedBus.owner?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">{selectedBus.route?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route Number</p>
                    <p className="font-medium">{selectedBus.route?.route_number || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button onClick={() => setShowViewModal(false)} variant="secondary">Close</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
