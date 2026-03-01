'use client'

import { useEffect, useMemo, useRef, useState, Suspense, lazy } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  MapPinIcon,
  SignalIcon,
  ClockIcon,
  PlayIcon,
  StopIcon
} from '@heroicons/react/24/outline'
import { useGPSTracking } from '@/hooks/useRealTimeData'
import { useDriverStore } from '@/store/driverStore'
import { useAuthStore } from '@/store/authStore'
import { API_BASE_URL } from '@/config/api'

const LocationMap = lazy(() => import('@/components/Map/LocationMap').then(m => ({ default: m.LocationMap })))

export default function DriverLocationPage() {
  const [isSharing, setIsSharing] = useState(false)
  const { position, error, isTracking, startTracking, stopTracking } = useGPSTracking()
  const { session } = useDriverStore()
  const { token } = useAuthStore()

  const busId = session?.busId
  const [locationName, setLocationName] = useState<string | null>(null)

  const lastUpdateTime = position
    ? new Date(position.timestamp).toLocaleTimeString()
    : null

  const gpsSignalLabel = useMemo(() => {
    if (!position) return 'No Signal'
    if (position.accuracy !== undefined) {
      if (position.accuracy <= 10) return 'Strong'
      if (position.accuracy <= 50) return 'Medium'
      return 'Weak'
    }
    return 'Active'
  }, [position])

  const accuracyLabel = useMemo(() => {
    if (!position || position.accuracy === undefined) return 'Unknown'
    return `±${Math.round(position.accuracy)}m`
  }, [position])

  const toggleSharing = () => {
    if (isSharing) {
      stopTracking()
      setIsSharing(false)
    } else {
      startTracking()
      setIsSharing(true)
    }
  }

  // Auto-start tracking on mount for testing
  useEffect(() => {
    console.log('Component mounted, position:', position)
    console.log('Is tracking:', isTracking)
    console.log('Error:', error)
  }, [position, isTracking, error])

  // Restore sharing state on reload so tracking continues if driver had enabled it
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('driver-location-sharing')
    if (stored === 'true') {
      setIsSharing(true)
      startTracking()
    }
  }, [startTracking])

  // Persist sharing preference
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('driver-location-sharing', isSharing ? 'true' : 'false')
  }, [isSharing])

  // Push location updates to backend whenever tracking and we have a busId
  useEffect(() => {
    if (!isSharing || !position || !busId || !token) return

    const controller = new AbortController()

    const sendUpdate = async () => {
      try {
        await fetch(`${API_BASE_URL}/buses/${busId}/location`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            latitude: position.lat,
            longitude: position.lng
          }),
          signal: controller.signal
        })
      } catch (e) {
        // Network errors are logged silently to avoid spamming UI
        console.error('Failed to update bus location', e)
      }
    }

    // Send immediately on change
    sendUpdate()

    return () => {
      controller.abort()
    }
  }, [isSharing, position, busId, token])

  // Reverse geocode current GPS position to a human-readable place name
  useEffect(() => {
    if (!position) {
      setLocationName(null)
      return
    }

    const controller = new AbortController()

    const fetchLocationName = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'SmartBus/1.0'
          },
          signal: controller.signal
        })

        if (!response.ok) {
          console.error('Geocoding failed:', response.status)
          return
        }

        const data = await response.json()
        console.log('Geocoding result:', data)
        
        const address = data.address || {}
        const city =
          address.city ||
          address.town ||
          address.village ||
          address.suburb ||
          address.county ||
          address.state ||
          null

        setLocationName(city || data.display_name?.split(',')[0] || null)
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          console.error('Failed to reverse geocode location', e)
        }
      }
    }

    fetchLocationName()

    return () => {
      controller.abort()
    }
  }, [position?.lat, position?.lng])

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Live Location Sharing</h1>
        <p className="text-gray-600">Share your real-time location with passengers</p>
      </div>

      {/* Location Status */}
      <Card className="p-8">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 ${
            isSharing ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            <MapPinIcon className={`h-10 w-10 ${
              isSharing ? 'text-green-600' : 'text-gray-400'
            }`} />
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
            Location Sharing {isSharing ? 'Active' : 'Inactive'}
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6">
            {isSharing 
              ? 'Your location is being shared with passengers in real-time'
              : 'Start sharing your location to help passengers track the bus'
            }
          </p>

          {error && (
            <p className="text-sm text-red-600 mb-3">
              Location error: {error}
            </p>
          )}

          {position && (
            <p className="text-sm text-gray-600 mb-3">
              {locationName ? `Location: ${locationName}` : `GPS: ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`}
              {lastUpdateTime && ` (updated at ${lastUpdateTime})`}
            </p>
          )}

          {!position && !error && (
            <p className="text-sm text-gray-500 mb-3">
              Click &quot;Start Sharing&quot; to enable GPS tracking
            </p>
          )}

          <Button
            onClick={toggleSharing}
            className={isSharing 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-green-600 hover:bg-green-700'
            }
          >
            {isSharing ? (
              <>
                <StopIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Stop Sharing
              </>
            ) : (
              <>
                <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Start Sharing
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Location Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <SignalIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">GPS Signal</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {gpsSignalLabel}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Last Update</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {lastUpdateTime ?? '-'}
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
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Accuracy</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {accuracyLabel}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Location */}
      <Card className="p-4 sm:p-6 lg:p-8">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Current Location</h3>
        {!position && (
          <div className="text-center py-8 text-gray-500">
            <MapPinIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p>Click &quot;Start Sharing&quot; above to see your location on the map</p>
          </div>
        )}
        {position && (
          <>
            <div className="w-full h-96 sm:h-[500px] rounded-lg overflow-hidden mb-3 sm:mb-4 border border-gray-200">
              <Suspense fallback={<div className="w-full h-full bg-gray-100 flex items-center justify-center">Loading map...</div>}>
                <LocationMap lat={position.lat} lng={position.lng} locationName={locationName} />
              </Suspense>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-medium">
                {locationName || 'Acquiring location name...'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Lat: {position.lat.toFixed(6)}, Lng: {position.lng.toFixed(6)}
              </p>
              {lastUpdateTime && (
                <p className="text-xs text-gray-400 mt-1">
                  Updated at {lastUpdateTime}
                </p>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
