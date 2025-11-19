'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseWebSocketOptions {
  url: string
  onMessage?: (data: any) => void
  onError?: (error: Event) => void
  onOpen?: () => void
  onClose?: () => void
  reconnectAttempts?: number
  reconnectInterval?: number
}

export function useWebSocket({
  url,
  onMessage,
  onError,
  onOpen,
  onClose,
  reconnectAttempts = 5,
  reconnectInterval = 3000
}: UseWebSocketOptions) {
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting')
  const [lastMessage, setLastMessage] = useState<any>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectCountRef = useRef(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        setConnectionStatus('connected')
        reconnectCountRef.current = 0
        onOpen?.()
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setLastMessage(data)
        onMessage?.(data)
      }

      ws.onerror = (error) => {
        onError?.(error)
      }

      ws.onclose = () => {
        setConnectionStatus('disconnected')
        onClose?.()

        // Attempt to reconnect
        if (reconnectCountRef.current < reconnectAttempts) {
          reconnectCountRef.current++
          reconnectTimeoutRef.current = setTimeout(() => {
            setConnectionStatus('connecting')
            connect()
          }, reconnectInterval)
        }
      }
    } catch (error) {
      setConnectionStatus('disconnected')
      console.error('WebSocket connection error:', error)
    }
  }, [url, onMessage, onError, onOpen, onClose, reconnectAttempts, reconnectInterval])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    setConnectionStatus('disconnected')
  }, [])

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message))
    }
  }, [])

  useEffect(() => {
    connect()
    return disconnect
  }, [connect, disconnect])

  return {
    connectionStatus,
    lastMessage,
    sendMessage,
    disconnect
  }
}

interface GPSPosition {
  lat: number
  lng: number
  accuracy?: number
  timestamp: number
}

export function useGPSTracking() {
  const [position, setPosition] = useState<GPSPosition | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const watchIdRef = useRef<number | null>(null)

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser')
      return
    }

    setIsTracking(true)
    setError(null)

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp
        })
      },
      (err) => {
        setError(err.message)
        setIsTracking(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      }
    )
  }, [])

  const stopTracking = useCallback(() => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    setIsTracking(false)
  }, [])

  useEffect(() => {
    return stopTracking
  }, [stopTracking])

  return {
    position,
    error,
    isTracking,
    startTracking,
    stopTracking
  }
}

export function useBusTracking(busId: string) {
  const [busData, setBusData] = useState<any>(null)
  const [passengers, setPassengers] = useState<any[]>([])

  const { connectionStatus, lastMessage } = useWebSocket({
    url: `wss://api.smartbus.com/bus/${busId}`,
    onMessage: (data) => {
      if (data.type === 'bus_update') {
        setBusData(data.bus)
      } else if (data.type === 'passenger_update') {
        setPassengers(data.passengers)
      }
    }
  })

  return {
    busData,
    passengers,
    connectionStatus,
    isConnected: connectionStatus === 'connected'
  }
}

export function useRealTimeUpdates<T>(
  initialData: T,
  updateKey: string
) {
  const [data, setData] = useState<T>(initialData)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const updateData = useCallback((newData: Partial<T>) => {
    setData(prev => ({ ...prev, ...newData }))
    setLastUpdated(new Date())
    
    // Flash animation for visual feedback
    const element = document.querySelector(`[data-update-key="${updateKey}"]`)
    if (element) {
      element.classList.add('update-flash')
      setTimeout(() => {
        element.classList.remove('update-flash')
      }, 500)
    }
  }, [updateKey])

  return {
    data,
    lastUpdated,
    updateData
  }
}
