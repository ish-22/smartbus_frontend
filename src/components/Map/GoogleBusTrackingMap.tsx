'use client'

import { useEffect, useRef, useState } from 'react'
import { useGoogleMaps } from '@/hooks/useGoogleMaps'
import type { Bus } from '@/services/api/busApi'

interface GoogleBusTrackingMapProps {
  buses: Bus[]
  selectedBusId?: string
  onBusSelect?: (busId: string | number) => void
  height?: string
  zoom?: number
}

export function GoogleBusTrackingMap({
  buses,
  selectedBusId,
  onBusSelect,
  height = '500px',
  zoom = 12,
}: GoogleBusTrackingMapProps) {
  const mapContainerId = 'google-bus-tracking-map'
  const { map, isLoaded, initializeMap } = useGoogleMaps(mapContainerId)
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map())
  const infoWindowsRef = useRef<Map<string, google.maps.InfoWindow>>(new Map())
  const [mapError, setMapError] = useState<string | null>(null)

  // Initialize map
  useEffect(() => {
    if (!isLoaded) {
      initializeMap({
        center: { lat: 6.9271, lng: 79.8612 }, // Colombo, Sri Lanka
        zoom,
      })
    }
  }, [isLoaded, initializeMap, zoom])

  // Update bus markers
  useEffect(() => {
    if (!map || !isLoaded) return

    try {
      // Remove markers for buses that no longer exist
      markersRef.current.forEach((marker, busId) => {
        if (!buses.find((b) => b.id?.toString() === busId)) {
          marker.setMap(null)
          markersRef.current.delete(busId)
          
          const infoWindow = infoWindowsRef.current.get(busId)
          if (infoWindow) {
            infoWindow.close()
            infoWindowsRef.current.delete(busId)
          }
        }
      })

      // Add or update bus markers
      buses.forEach((bus) => {
        if (!bus.currentLocation) return

        const position = {
          lat: bus.currentLocation.lat,
          lng: bus.currentLocation.lng,
        }

        const isSelected = bus.id?.toString() === selectedBusId
        let marker = markersRef.current.get(bus.id?.toString())

        if (!marker) {
          // Create new marker
          marker = new google.maps.Marker({
            position,
            map,
            title: `Bus ${bus.number}`,
            icon: {
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 6,
              fillColor: isSelected ? '#3b82f6' : '#10b981',
              fillOpacity: 1,
              strokeColor: isSelected ? '#1e40af' : '#047857',
              strokeWeight: 2,
            },
          })

          // Create info window
          const infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(bus),
          })

          infoWindowsRef.current.set(bus.id?.toString() || '', infoWindow)

          // Click handler
          marker.addListener('click', () => {
            // Close all other info windows
            infoWindowsRef.current.forEach((iw) => iw.close())
            infoWindow.open(map, marker)
            onBusSelect?.(bus.id || '')
          })

          markersRef.current.set(bus.id?.toString() || '', marker)
        } else {
          // Update existing marker position and appearance
          marker.setPosition(position)
          marker.setIcon({
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: isSelected ? '#3b82f6' : '#10b981',
            fillOpacity: 1,
            strokeColor: isSelected ? '#1e40af' : '#047857',
            strokeWeight: 2,
          })

          // Update info window content
          const infoWindow = infoWindowsRef.current.get(bus.id?.toString() || '')
          if (infoWindow) {
            infoWindow.setContent(createInfoWindowContent(bus))
          }
        }

        // Handle selection
        if (isSelected) {
          const infoWindow = infoWindowsRef.current.get(bus.id?.toString() || '')
          if (infoWindow) {
            infoWindow.open(map, marker)
          }
          // Center map on selected bus
          map.panTo(position)
        }
      })
    } catch (error) {
      console.error('Error updating bus markers:', error)
      setMapError('Failed to update bus locations on map')
    }
  }, [map, isLoaded, buses, selectedBusId, onBusSelect])

  if (!isLoaded) {
    return (
      <div
        id={mapContainerId}
        className="rounded-lg bg-gray-200 flex items-center justify-center w-full"
        style={{
          height: height || '500px',
        }}
      >
        <div className="text-gray-600">Loading map...</div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {mapError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {mapError}
        </div>
      )}
      <div
        id={mapContainerId}
        className="rounded-lg border border-gray-200 shadow-sm w-full"
        style={{
          height: height || '500px',
        }}
      />
      <div className="text-xs text-gray-500 flex items-center gap-2 px-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span>Active Bus</span>
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        <span>Selected Bus</span>
      </div>
    </div>
  )
}

function createInfoWindowContent(bus: Bus): string {
  const location = bus.currentLocation
  const lastUpdate = bus.lastUpdatedAt
    ? new Date(bus.lastUpdatedAt).toLocaleTimeString()
    : 'Unknown'

  return `
    <div class="p-2 max-w-xs">
      <div class="font-semibold text-gray-900">Bus ${bus.number}</div>
      <div class="text-sm text-gray-600 mt-1">
        <div>Route ID: ${bus.route_id || 'N/A'}</div>
        <div>Capacity: ${bus.capacity} seats</div>
        <div>Available: ${bus.seatsAvailable ?? bus.capacity} seats</div>
        ${location ? `<div class="mt-2 text-xs text-gray-500">
          <div>Lat: ${location.lat.toFixed(6)}</div>
          <div>Lng: ${location.lng.toFixed(6)}</div>
          <div>Last Update: ${lastUpdate}</div>
        </div>` : ''}
      </div>
    </div>
  `
}
