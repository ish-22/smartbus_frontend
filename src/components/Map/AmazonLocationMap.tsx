'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

interface AmazonLocationMapProps {
  lat: number
  lng: number
  locationName?: string | null
}

const AMAZON_API_KEY = process.env.NEXT_PUBLIC_AMAZON_LOCATION_API_KEY

export function AmazonLocationMap({ lat, lng, locationName }: AmazonLocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const marker = useRef<maplibregl.Marker | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current || !AMAZON_API_KEY) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://maps.geo.us-east-1.amazonaws.com/maps/v0/maps/StandardLight/style-descriptor?key=${AMAZON_API_KEY}`,
      center: [lng, lat],
      zoom: 15,
    })

    marker.current = new maplibregl.Marker({ color: '#ef4444' })
      .setLngLat([lng, lat])
      .setPopup(
        new maplibregl.Popup().setHTML(
          `<div style="padding: 8px;">
            <strong>${locationName || 'Current Location'}</strong><br/>
            Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}
          </div>`
        )
      )
      .addTo(map.current)

    return () => {
      marker.current?.remove()
      map.current?.remove()
    }
  }, [])

  useEffect(() => {
    if (!map.current || !marker.current) return
    
    const newLngLat: [number, number] = [lng, lat]
    marker.current.setLngLat(newLngLat)
    map.current.setCenter(newLngLat)
    
    marker.current.setPopup(
      new maplibregl.Popup().setHTML(
        `<div style="padding: 8px;">
          <strong>${locationName || 'Current Location'}</strong><br/>
          Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}
        </div>`
      )
    )
  }, [lat, lng, locationName])

  if (!AMAZON_API_KEY) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
        Amazon Location API key not configured
      </div>
    )
  }

  return <div ref={mapContainer} className="w-full h-full rounded-lg" />
}
