'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MapIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { createRouteAPI, getRoutesAPI, updateRouteAPI, deleteRouteAPI, type Route } from '@/services/api/routeApi'
import { useAuthStore } from '@/store/authStore'
import { useUiStore } from '@/store/uiStore'

export default function AdminRoutesPage() {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [routes, setRoutes] = useState<Route[]>([])
  const [formData, setFormData] = useState({ name: '', start_point: '', end_point: '', route_number: '' })
  const [editingRoute, setEditingRoute] = useState<Route | null>(null)
  const token = useAuthStore(state => state.token)
  const showToast = useUiStore(state => state.showToast)

  useEffect(() => {
    loadRoutes()
  }, [])

  const loadRoutes = async () => {
    try {
      const data = await getRoutesAPI()
      setRoutes(data)
    } catch (error) {
      console.error('Failed to load routes:', error)
    }
  }

  const handleAddRoute = () => {
    setEditingRoute(null)
    setFormData({ name: '', start_point: '', end_point: '', route_number: '' })
    setShowModal(true)
  }

  const handleEditRoute = (route: Route) => {
    setEditingRoute(route)
    setFormData({
      name: route.name,
      start_point: route.start_point || '',
      end_point: route.end_point || '',
      route_number: route.route_number || ''
    })
    setShowModal(true)
  }

  const handleDeleteRoute = async (id: number) => {
    if (!token) {
      showToast({ type: 'error', message: 'Authentication required' })
      return
    }
    if (!confirm('Are you sure you want to delete this route?')) return
    
    try {
      await deleteRouteAPI(id, token)
      showToast({ type: 'success', message: 'Route deleted successfully' })
      loadRoutes()
    } catch (error) {
      showToast({ type: 'error', message: error instanceof Error ? error.message : 'Failed to delete route' })
    }
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
        name: formData.name,
        start_point: formData.start_point || undefined,
        end_point: formData.end_point || undefined,
        route_number: formData.route_number || undefined
      }
      
      if (editingRoute) {
        await updateRouteAPI(editingRoute.id, payload, token)
        showToast({ type: 'success', message: 'Route updated successfully' })
      } else {
        await createRouteAPI(payload, token)
        showToast({ type: 'success', message: 'Route created successfully' })
      }
      
      setShowModal(false)
      setFormData({ name: '', start_point: '', end_point: '', route_number: '' })
      setEditingRoute(null)
      loadRoutes()
    } catch (error) {
      console.error('Error saving route:', error)
      showToast({ type: 'error', message: error instanceof Error ? error.message : 'Failed to save route' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Routes Management</h1>
          <p className="text-gray-600">Manage bus routes and schedules</p>
        </div>
        <Button onClick={handleAddRoute} className="bg-red-600 hover:bg-red-700">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Route
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <MapIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Routes</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{routes.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <MapIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Routes</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{routes.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <MapIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Under Review</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From - To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {routes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No routes found. Click &quot;Add Route&quot; to create one.
                  </td>
                </tr>
              ) : (
                routes.map((route) => (
                  <tr key={route.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {route.route_number || route.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {route.start_point || 'N/A'} → {route.end_point || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      N/A
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium">
                      <div className="flex space-x-2">
                        <button type="button" onClick={() => handleEditRoute(route)} aria-label="Edit route" className="text-blue-600 hover:text-blue-900">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => handleDeleteRoute(route.id)} aria-label="Delete route" className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-4 w-4" />
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
              <h2 className="text-xl font-bold">{editingRoute ? 'Edit Route' : 'Add New Route'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Colombo - Kandy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route Number</label>
                <input
                  type="text"
                  value={formData.route_number}
                  onChange={(e) => setFormData({ ...formData, route_number: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 12A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Point</label>
                <input
                  type="text"
                  value={formData.start_point}
                  onChange={(e) => setFormData({ ...formData, start_point: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Colombo Fort"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Point</label>
                <input
                  type="text"
                  value={formData.end_point}
                  onChange={(e) => setFormData({ ...formData, end_point: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Kandy"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700">
                  {loading ? 'Saving...' : editingRoute ? 'Update Route' : 'Create Route'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
