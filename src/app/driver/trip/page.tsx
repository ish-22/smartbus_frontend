'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PlayIcon, StopIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useGPSTracking } from '@/hooks/useRealTimeData'
import { useAuthStore } from '@/store/authStore'
import { getCurrentDriverAssignment, type DriverAssignmentResponse } from '@/services/api/driverApi'

export default function DriverTripPage() {
  const [tripActive, setTripActive] = useState(false)
  const { position, error, isTracking, startTracking, stopTracking } = useGPSTracking()
  const { user, token } = useAuthStore()
  const [assignmentDetails, setAssignmentDetails] = useState<DriverAssignmentResponse | null>(null)

  const handleToggleTrip = () => {
    if (tripActive) {
      stopTracking()
      setTripActive(false)
    } else {
      startTracking()
      setTripActive(true)
    }
  }

  // Load current assignment for route info
  useEffect(() => {
    const loadAssignment = async () => {
      if (!user?.id || !token || user.role !== 'driver') {
        setAssignmentDetails(null)
        return
      }

      try {
        const response = await getCurrentDriverAssignment(parseInt(user.id as unknown as string, 10), token)
        if (response && response.assignment) {
          setAssignmentDetails(response)
        } else {
          setAssignmentDetails(null)
        }
      } catch (e) {
        console.error('Error loading driver assignment for trip page:', e)
        setAssignmentDetails(null)
      }
    }

    loadAssignment()
  }, [user, token])

  // Ensure tracking stops when component unmounts or tripActive flips off unexpectedly
  useEffect(() => {
    if (!tripActive && isTracking) {
      stopTracking()
    }
  }, [tripActive, isTracking, stopTracking])

  const lastUpdateTime = position
    ? new Date(position.timestamp).toLocaleTimeString()
    : null

  const assignment = assignmentDetails?.assignment
  const busDetails = assignmentDetails?.bus_details || assignment?.bus
  const route: any = busDetails?.route

  const routeName = route?.name || 'Assigned route'
  const routeDirection =
    route?.start_point && route?.end_point
      ? `${route.start_point} \u2192 ${route.end_point}`
      : routeName

  const assignmentDateText = assignment?.assignment_date
    ? new Date(assignment.assignment_date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Today'

  const duration = route?.metadata?.duration || null
  const scheduledTimeText = duration
    ? `${assignmentDateText} • ${duration}`
    : assignmentDateText

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Start Trip</h1>
        <p className="text-gray-600">Begin your scheduled route</p>
      </div>

      <Card className="p-8">
        <div className="text-center">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 ${
            tripActive ? 'bg-red-100' : 'bg-green-100'
          }`}>
            {tripActive ? (
              <StopIcon className="h-16 w-16 text-red-600" />
            ) : (
              <PlayIcon className="h-16 w-16 text-green-600" />
            )}
          </div>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {tripActive ? 'Trip in Progress' : 'Ready to Start'}
          </h2>
          
          <p className="text-gray-600 mb-4 sm:mb-6">
            {tripActive 
              ? 'Your trip is currently active. Your location is being tracked.'
              : 'Tap the button below to start your scheduled trip and begin location tracking.'
            }
          </p>

          {error && (
            <p className="text-sm text-red-600 mb-4">
              Location error: {error}
            </p>
          )}

          {position && (
            <p className="text-sm text-gray-600 mb-4">
              Current position: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
              {lastUpdateTime && ` (updated at ${lastUpdateTime})`}
            </p>
          )}

          <Button
            onClick={handleToggleTrip}
            className={`px-12 py-4 text-base sm:text-lg lg:text-xl font-semibold ${
              tripActive 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {tripActive ? 'End Trip' : 'Start Trip'}
          </Button>
        </div>
      </Card>

      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Current Route</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center space-x-3">
            <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">{routeName}</p>
              <p className="text-sm sm:text-base text-gray-600">{routeDirection}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">Scheduled Time</p>
              <p className="text-sm sm:text-base text-gray-600">{scheduledTimeText}</p>
            </div>
          </div>
        </div>
      </Card>

      {tripActive && (
        <Card className="p-3 sm:p-4 lg:p-6">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Trip Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">45 min</div>
              <div className="text-sm sm:text-base text-gray-600">Trip Duration</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">28</div>
              <div className="text-sm sm:text-base text-gray-600">Passengers</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600">12</div>
              <div className="text-sm sm:text-base text-gray-600">Stops Completed</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
