'use client'

import { useEffect, useRef, useState } from 'react'
import { useGoogleMaps } from '@/hooks/useGoogleMaps'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  PlayIcon,
  StopIcon,
} from '@heroicons/react/24/outline'
import { useGPSTracking } from '@/hooks/useRealTimeData'
import { useDriverStore } from '@/store/driverStore'

interface DriverLocationMarker {
  lat: number
  lng: number
  accuracy?: number
}

export function DriverGPSTrackingMap() {
  const mapContainerId = 'driver-gps-tracking-map'
  const { map, isLoaded, initializeMap } = useGoogleMaps(mapContainerId)
  const { position, error, startTracking, stopTracking } = useGPSTracking()
  const { session } = useDriverStore()

  const markerRef = useRef<google.maps.Marker | null>(null)
  const circleRef = useRef<google.maps.Circle | null>(null)
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)

  // Initialize map
  useEffect(() => {
    if (!isLoaded && position) {
      initializeMap({
        center: {
          lat: position.lat,
          lng: position.lng,
        },
        zoom: 15,
      })
    }
  }, [isLoaded, initializeMap, position])

  // Update driver location marker
  useEffect(() => {
    if (!map || !isLoaded || !position) return

    try {
      const markerPosition = {
        lat: position.lat,
        lng: position.lng,
      }

      // Create/Update marker
      if (!markerRef.current) {
        markerRef.current = new google.maps.Marker({
          position: markerPosition,
          map,
          title: `${session?.busNumber || 'Your Bus'}`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: isSharing ? '#3b82f6' : '#6b7280',
            fillOpacity: 1,
            strokeColor: isSharing ? '#1e40af' : '#374151',
            strokeWeight: 2,
          },
        })

        // Create info window
        infoWindowRef.current = new google.maps.InfoWindow({
          content: createInfoWindowContent(markerPosition),
        })

        markerRef.current.addListener('click', () => {
          if (infoWindowRef.current) {
            infoWindowRef.current.open(map, markerRef.current)
          }
        })
      } else {
        markerRef.current.setPosition(markerPosition)
        markerRef.current.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: isSharing ? '#3b82f6' : '#6b7280',
          fillOpacity: 1,
          strokeColor: isSharing ? '#1e40af' : '#374151',
          strokeWeight: 2,
        })
      }

      // Update accuracy circle
      if (position.accuracy !== undefined) {
        if (!circleRef.current) {
          circleRef.current = new google.maps.Circle({
            center: markerPosition,
            radius: position.accuracy,
            map,
            fillColor: '#3b82f6',
            fillOpacity: 0.1,
            strokeColor: '#3b82f6',
            strokeOpacity: 0.3,
            strokeWeight: 1,
          })
        } else {
          circleRef.current.setCenter(markerPosition)
          circleRef.current.setRadius(position.accuracy)
        }
      }

      // Center map on current location
      map.panTo(markerPosition)
      setLastUpdateTime(new Date())
    } catch (err) {
      console.error('Error updating driver location marker:', err)
      setMapError('Failed to update location on map')
    }
  }, [map, isLoaded, position, isSharing, session?.busNumber])

  // Handle location sharing toggle
  const toggleSharing = () => {
    if (isSharing) {
      stopTracking()
      setIsSharing(false)
    } else {
      startTracking()
      setIsSharing(true)
    }
  }

  // Persist sharing state
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('driver-location-sharing', isSharing ? 'true' : 'false')
  }, [isSharing])

  // Restore sharing state on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('driver-location-sharing')
    if (stored === 'true') {
      setIsSharing(true)
      startTracking()
    }
  }, [startTracking])

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <Card className="p-4">
          <div
            className="rounded-lg bg-gray-200 flex items-center justify-center w-full h-96"
          >
            <div className="text-gray-600">Loading map...</div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {mapError && (
        <Card className="p-4 bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{mapError}</p>
        </Card>
      )}

      {error && (
        <Card className="p-4 bg-yellow-50 border border-yellow-200">
          <p className="text-sm text-yellow-700">
            <strong>GPS Error:</strong> {error}
          </p>
        </Card>
      )}

      {/* Map */}
      <Card className="p-4">
        <div
          id={mapContainerId}
          className="rounded-lg border border-gray-200 w-full h-96"
        />
      </Card>

      {/* Status and Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${isSharing ? 'bg-green-500' : 'bg-gray-400'}`}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {isSharing ? 'Location Sharing Active' : 'Location Sharing Paused'}
              </span>
            </div>
            <Button
              onClick={toggleSharing}
              variant={isSharing ? 'danger' : 'success'}
              size="sm"
              className="w-full"
            >
              {isSharing ? (
                <>
                  <StopIcon className="h-4 w-4 mr-2" />
                  Stop Sharing
                </>
              ) : (
                <>
                  <PlayIcon className="h-4 w-4 mr-2" />
                  Start Sharing
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">
                Last Update
              </div>
              <div className="text-sm font-mono text-gray-900 mt-1">
                {lastUpdateTime ? lastUpdateTime.toLocaleTimeString() : 'No data'}
              </div>
            </div>
            {position && position.accuracy !== undefined && (
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">
                  Accuracy
                </div>
                <div className="text-sm font-mono text-gray-900 mt-1">
                  ±{Math.round(position.accuracy)}m
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Coordinates */}
      {position && (
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Current Location
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-600">Latitude</div>
              <div className="text-sm font-mono text-gray-900 mt-1">
                {position.lat.toFixed(6)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Longitude</div>
              <div className="text-sm font-mono text-gray-900 mt-1">
                {position.lng.toFixed(6)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Bus</div>
              <div className="text-sm font-mono text-gray-900 mt-1">
                {session?.busNumber || 'Unknown'}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Legend */}
      <Card className="p-4">
        <div className="text-xs text-gray-600 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Your current location (when sharing)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 opacity-20"></div>
            <span>Accuracy radius</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

function createInfoWindowContent(position?: DriverLocationMarker): string {
  if (!position) {
    return '<div class="p-2"><strong>Your Location</strong></div>'
  }

  const accuracy = position.accuracy
    ? `<div class="text-xs text-gray-500">Accuracy: ±${Math.round(position.accuracy)}m</div>`
    : ''

  return `
    <div class="p-2">
      <strong>Your Current Location</strong>
      <div class="text-xs text-gray-600 mt-1">
        <div>Lat: ${position.lat.toFixed(6)}</div>
        <div>Lng: ${position.lng.toFixed(6)}</div>
        ${accuracy}
      </div>
    </div>
  `
}
