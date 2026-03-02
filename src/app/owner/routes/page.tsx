'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  MapIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import {
  createRouteAPI,
  getRoutesAPI,
  updateRouteAPI,
  deleteRouteAPI,
  type Route,
} from '@/services/api/routeApi'
import { useAuthStore } from '@/store/authStore'
import { useUiStore } from '@/store/uiStore'
import { getBusesAPI, type Bus } from '@/services/api/busApi'

export default function OwnerRoutesPage() {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [routes, setRoutes] = useState<Route[]>([])
  const [buses, setBuses] = useState<Bus[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    start_point: '',
    end_point: '',
    route_number: '',
  })
  const [editingRoute, setEditingRoute] = useState<Route | null>(null)
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const showToast = useUiStore((state) => state.showToast)

  const loadData = async () => {
    try {
      setIsLoadingData(true)
      const [routesData, busesData] = await Promise.all([
        getRoutesAPI(),
        getBusesAPI(token),
      ])
      setRoutes(routesData || [])
      // Filter buses by owner
      const ownerBuses = busesData?.filter((bus) => bus.owner_id === parseInt(user?.id || '0')) || []
      setBuses(ownerBuses)
    } catch (error) {
      console.error('Failed to load data:', error)
      showToast({
        type: 'error',
        message: 'Failed to load routes and buses',
      })
    } finally {
      setIsLoadingData(false)
    }
  }

  // Load routes and buses on mount
  useEffect(() => {
    if (token && user) {
      loadData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user])

  const getBusesForRoute = (routeId: number) => {
    return buses.filter((bus) => bus.route_id === routeId)
  }

  const handleAddRoute = () => {
    setEditingRoute(null)
    setFormData({
      name: '',
      start_point: '',
      end_point: '',
      route_number: '',
    })
    setShowModal(true)
  }

  const handleEditRoute = (route: Route) => {
    setEditingRoute(route)
    setFormData({
      name: route.name,
      start_point: route.start_point || '',
      end_point: route.end_point || '',
      route_number: route.route_number || '',
    })
    setShowModal(true)
  }

  const handleDeleteRoute = async (id: number) => {
    if (!token) {
      showToast({ type: 'error', message: 'Authentication required' })
      return
    }
    if (!confirm('Are you sure you want to delete this route? All buses assigned to this route will be affected.')) return

    try {
      await deleteRouteAPI(id, token)
      showToast({ type: 'success', message: 'Route deleted successfully' })
      loadData()
    } catch (error) {
      showToast({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to delete route',
      })
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
        route_number: formData.route_number || undefined,
      }

      if (editingRoute) {
        await updateRouteAPI(editingRoute.id, payload, token)
        showToast({ type: 'success', message: 'Route updated successfully' })
      } else {
        await createRouteAPI(payload, token)
        showToast({ type: 'success', message: 'Route created successfully' })
      }

      setShowModal(false)
      setFormData({
        name: '',
        start_point: '',
        end_point: '',
        route_number: '',
      })
      setEditingRoute(null)
      loadData()
    } catch (error) {
      console.error('Error saving route:', error)
      showToast({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to save route',
      })
    } finally {
      setLoading(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading routes...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Routes & Timetables
          </h1>
          <p className="text-gray-600">Manage your bus routes and schedule assignments</p>
        </div>
        <Button
          onClick={handleAddRoute}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Route
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <MapIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Total Routes
              </p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {routes.length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Your Buses
              </p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {buses.length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Buses on Routes
              </p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {buses.filter((b) => b.route_id).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Routes Table */}
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
                  Buses Assigned
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
                routes.map((route) => {
                  const busesOnRoute = getBusesForRoute(route.id)
                  return (
                    <tr key={route.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {route.route_number || route.name}
                          </div>
                          <div className="text-sm text-gray-600">{route.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{route.start_point || 'N/A'}</span>
                          <span className="mx-2">→</span>
                          <span>{route.end_point || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {busesOnRoute.length}
                          </span>
                          {busesOnRoute.length > 0 && (
                            <div className="ml-3 text-xs text-gray-600">
                              {busesOnRoute.map((b) => b.number).join(', ')}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button
                            type="button"
                            onClick={() => handleEditRoute(route)}
                            aria-label="Edit route"
                            title="Edit route"
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteRoute(route.id)}
                            aria-label="Delete route"
                            title="Delete route"
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Routes Cards View for Mobile */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {routes.map((route) => {
          const busesOnRoute = getBusesForRoute(route.id)
          return (
            <Card key={route.id} className="p-4">
              <div className="space-y-3">
                <div>
                  <div className="font-bold text-gray-900">
                    {route.route_number || route.name}
                  </div>
                  <div className="text-xs text-gray-600">{route.name}</div>
                </div>

                <div className="flex items-start">
                  <MapPinIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <div>{route.start_point || 'N/A'}</div>
                    <div className="text-xs text-gray-500 my-1">↓</div>
                    <div>{route.end_point || 'N/A'}</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded p-2">
                  <div className="text-xs text-gray-600 mb-1">Buses Assigned: {busesOnRoute.length}</div>
                  {busesOnRoute.length > 0 && (
                    <div className="text-xs text-gray-700 space-y-1">
                      {busesOnRoute.map((bus) => (
                        <div key={bus.id} className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {bus.number}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditRoute(route)}
                    title="Edit route"
                    className="flex-1 text-sm px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                  >
                    <PencilIcon className="h-4 w-4 inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRoute(route.id)}
                    title="Delete route"
                    className="flex-1 text-sm px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    <TrashIcon className="h-4 w-4 inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Add/Edit Route Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingRoute ? 'Edit Route' : 'Add New Route'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                title="Close dialog"
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Route Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Route A - Downtown"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Route Number
                </label>
                <input
                  type="text"
                  value={formData.route_number}
                  onChange={(e) =>
                    setFormData({ ...formData, route_number: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Point
                </label>
                <input
                  type="text"
                  value={formData.start_point}
                  onChange={(e) =>
                    setFormData({ ...formData, start_point: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Main Station"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Point
                </label>
                <input
                  type="text"
                  value={formData.end_point}
                  onChange={(e) =>
                    setFormData({ ...formData, end_point: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Airport"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {loading
                    ? 'Saving...'
                    : editingRoute
                    ? 'Update Route'
                    : 'Create Route'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}