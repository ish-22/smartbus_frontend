import { useEffect, useState, useCallback, useRef } from 'react'

interface MapOptions {
  center?: google.maps.LatLngLiteral
  zoom?: number
  mapTypeId?: google.maps.MapTypeId
}

export function useGoogleMaps(
  containerElementId: string,
  apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const initializeMap = useCallback(
    (options: MapOptions = {}) => {
      if (typeof window === 'undefined' || !window.google) {
        setError('Google Maps API not loaded')
        setLoading(false)
        return
      }

      try {
        const container = document.getElementById(containerElementId)
        if (!container) {
          setError(`Container element with id "${containerElementId}" not found`)
          setLoading(false)
          return
        }

        const defaultOptions: google.maps.MapOptions = {
          zoom: 12,
          center: { lat: 6.9271, lng: 79.8612 }, // Colombo, Sri Lanka
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          ...options,
        }

        if (!mapRef.current) {
          mapRef.current = new google.maps.Map(container, defaultOptions)
          setMap(mapRef.current)
          setError(null)
        }
        setIsLoaded(true)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(`Failed to initialize map: ${errorMessage}`)
        console.error('Map initialization error:', err)
      } finally {
        setLoading(false)
      }
    },
    [containerElementId]
  )

  // Lazy load Google Maps API if not already loaded
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!apiKey) {
      setError('Google Maps API key is not configured')
      setLoading(false)
      return
    }

    // Check if Google Maps is already loaded
    if (window.google?.maps) {
      setLoading(false)
      return
    }

    // Check if script is already in progress
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Wait for it to load
      const checkInterval = setInterval(() => {
        if (window.google?.maps) {
          clearInterval(checkInterval)
          setLoading(false)
        }
      }, 100)
      return
    }

    // Load Google Maps API
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`
    script.async = true
    script.defer = true

    const handleScriptLoad = () => {
      setLoading(false)
    }

    const handleScriptError = () => {
      setError('Failed to load Google Maps API')
      setLoading(false)
    }

    script.addEventListener('load', handleScriptLoad)
    script.addEventListener('error', handleScriptError)

    document.body.appendChild(script)

    return () => {
      script.removeEventListener('load', handleScriptLoad)
      script.removeEventListener('error', handleScriptError)
    }
  }, [apiKey])

  return {
    map,
    isLoaded,
    loading,
    error,
    initializeMap,
  }
}
