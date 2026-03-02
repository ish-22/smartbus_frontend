'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MapPinIcon, SignalIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useBusStore } from '@/store/busStore'
import { useAuthStore } from '@/store/authStore'
import { GoogleBusTrackingMap } from '@/components/Map/GoogleBusTrackingMap'
import type { Bus } from '@/services/api/busApi'

export function SchedulesAndTracking() {
  const { buses, search, isLoading } = useBusStore()
  const { token, user } = useAuthStore()
  const [selectedBusId, setSelectedBusId] = useState<string | undefined>(undefined)
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([])
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null)

  // Load initial buses
  useEffect(() => {
    if (token) {
      search()
    }
  }, [token, search])

  // Auto-refresh bus locations
  useEffect(() => {
    if (!autoRefresh || !token) return

    const interval = setInterval(() => {
      search()
      setLastRefreshTime(new Date())
    }, 10000) // Refresh every 10 seconds

    return () => clearInterval(interval)
  }, [autoRefresh, token, search])

  // Filter buses - show only owner's buses with locations
  useEffect(() => {
    let busesByLocation = buses.filter((bus) => bus.currentLocation)
    
    // If user is owner, filter by owner_id
    if (user?.role === 'owner' && user?.id) {
      busesByLocation = busesByLocation.filter(
        (bus) => bus.owner_id === parseInt(user.id)
      )
    }
    
    setFilteredBuses(busesByLocation)

    // Auto-select first bus if none selected
    if (selectedBusId && !busesByLocation.find((b) => b.id?.toString() === selectedBusId)) {
      setSelectedBusId(busesByLocation[0]?.id?.toString())
    }
  }, [buses, selectedBusId, user])

  const selectedBus = filteredBuses.find((b) => b.id?.toString() === selectedBusId)
  const activeBusCount = filteredBuses.length

  const handleRefresh = async () => {
    await search()
    setLastRefreshTime(new Date())
  }

  const handleBusSelect = (busId: string | number) => {
    setSelectedBusId(busId.toString())
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Schedules & Real-Time Tracking
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Live GPS tracking of all buses on routes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              autoRefresh
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <SignalIcon className="h-4 w-4 inline mr-2" />
            {autoRefresh ? 'Live' : 'Paused'}
          </button>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            size="sm"
            variant="secondary"
          >
            <ArrowPathIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600">Active Buses</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">
            {filteredBuses.length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Real-Time Tracking</div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {activeBusCount}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Last Updated</div>
          <div className="text-sm font-mono text-gray-800 mt-2">
            {lastRefreshTime
              ? lastRefreshTime.toLocaleTimeString()
              : 'Never'}
          </div>
        </Card>
      </div>

      {/* Main Map Section */}
      <Card className="p-4 sm:p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Live Bus Locations
          </h3>
          {filteredBuses.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No buses with live locations</p>
              <p className="text-sm text-gray-500">
                Buses will appear here once they start sharing their GPS location
              </p>
            </div>
          ) : (
            <GoogleBusTrackingMap
              buses={filteredBuses}
              selectedBusId={selectedBusId}
              onBusSelect={handleBusSelect}
              height="500px"
            />
          )}
        </div>
      </Card>

      {/* Selected Bus Details */}
      {selectedBus && (
        <Card className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            📍 Bus #{selectedBus.number} - Detailed View
          </h3>
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Bus Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 uppercase mb-1">Bus Number</div>
                  <div className="text-lg font-bold text-gray-900">
                    #{selectedBus.number}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 uppercase mb-1">Route</div>
                  <div className="text-lg font-bold text-gray-900">
                    {selectedBus.route?.name || selectedBus.route?.route_number || 'N/A'}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 uppercase mb-1">Capacity</div>
                  <div className="text-lg font-bold text-gray-900">{selectedBus.capacity}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 uppercase mb-1">Status</div>
                  <div
                    className={`text-lg font-bold ${
                      selectedBus.status === 'active'
                        ? 'text-green-600'
                        : selectedBus.status === 'maintenance'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {selectedBus.status || 'Active'}
                  </div>
                </div>
              </div>
            </div>

            {/* Location Information */}
            {selectedBus.currentLocation && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  📍 Live Location
                </h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Latitude</div>
                      <div className="font-mono text-sm font-bold text-gray-900">
                        {selectedBus.currentLocation.lat.toFixed(6)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Longitude</div>
                      <div className="font-mono text-sm font-bold text-gray-900">
                        {selectedBus.currentLocation.lng.toFixed(6)}
                      </div>
                    </div>
                    {selectedBus.lastUpdatedAt && (
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Last Update</div>
                        <div className="text-sm font-bold text-gray-900">
                          {new Date(selectedBus.lastUpdatedAt).toLocaleTimeString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Seat Info */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Passenger Capacity
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-xs text-gray-600 uppercase mb-1">Available Seats</div>
                  <div className="text-3xl font-bold text-green-600">
                    {selectedBus.seatsAvailable ?? selectedBus.capacity}
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="text-xs text-gray-600 uppercase mb-1">Occupied</div>
                  <div className="text-3xl font-bold text-orange-600">
                    {selectedBus.capacity - (selectedBus.seatsAvailable ?? selectedBus.capacity)}
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-xs text-gray-600 uppercase mb-1">Total Capacity</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {selectedBus.capacity}
                  </div>
                </div>
              </div>
            </div>

            {/* Driver & Route Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedBus.driver && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    👤 Driver Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="font-semibold text-gray-900 text-lg mb-2">
                      {selectedBus.driver.name}
                    </div>
                    {selectedBus.driver.email && (
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="text-gray-600">Email: </span>{selectedBus.driver.email}
                      </div>
                    )}
                    {selectedBus.driver.phone && (
                      <div className="text-sm text-gray-700">
                        <span className="text-gray-600">Phone: </span>{selectedBus.driver.phone}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectedBus.route && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    🚌 Route Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="font-semibold text-gray-900 text-lg mb-2">
                      {selectedBus.route.name}
                    </div>
                    {(selectedBus.route.start_point || selectedBus.route.end_point) && (
                      <div className="text-sm text-gray-700">
                        <span className="text-gray-600">From: </span>
                        {selectedBus.route.start_point || 'N/A'}
                        <br />
                        <span className="text-gray-600">To: </span>
                        {selectedBus.route.end_point || 'N/A'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Bus List */}
      {filteredBuses.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Your Buses with Live Tracking
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBuses.map((bus) => (
              <button
                key={bus.id}
                onClick={() => handleBusSelect(bus.id || '')}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedBusId === bus.id?.toString()
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="space-y-3">
                  <div>
                    <div className="font-bold text-lg text-gray-900">
                      Bus #{bus.number}
                    </div>
                    {bus.route && (
                      <div className="text-sm text-gray-600">
                        Route: {bus.route.name || bus.route.route_number}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{bus.capacity} seats</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-medium text-green-600">
                        {bus.seatsAvailable ?? bus.capacity} seats
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={`font-medium px-2 py-1 rounded text-xs ${
                          bus.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : bus.status === 'maintenance'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {bus.status || 'Active'}
                      </span>
                    </div>
                  </div>

                  {bus.currentLocation && (
                    <div className="border-t pt-3">
                      <div className="text-xs text-gray-600 mb-2">Current Location:</div>
                      <div className="bg-gray-50 rounded p-2 text-xs font-mono space-y-1">
                        <div>Lat: {bus.currentLocation.lat.toFixed(6)}</div>
                        <div>Lng: {bus.currentLocation.lng.toFixed(6)}</div>
                        {bus.lastUpdatedAt && (
                          <div className="text-gray-600 pt-1">
                            Updated: {new Date(bus.lastUpdatedAt).toLocaleTimeString()}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {bus.driver && (
                    <div className="border-t pt-3">
                      <div className="text-xs text-gray-600 mb-1">Driver:</div>
                      <div className="text-sm font-medium text-gray-900">
                        {bus.driver.name}
                      </div>
                      {bus.driver.phone && (
                        <div className="text-xs text-gray-600">
                          {bus.driver.phone}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
