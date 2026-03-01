'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { getCurrentDriverAssignment, type DriverAssignmentResponse } from '@/services/api/driverApi'

type ScheduleItem = {
  id: number
  route: string
  departureTime: string
  arrivalTime: string
  status: string
  passengers: number
}

export default function DriverSchedulePage() {
  const router = useRouter()
  const { user, token } = useAuthStore()
  const [schedules, setSchedules] = useState<ScheduleItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [assignmentDetails, setAssignmentDetails] = useState<DriverAssignmentResponse | null>(null)
  const [totalHours, setTotalHours] = useState<string>('-')
  const [totalDistance, setTotalDistance] = useState<string>('-')

  useEffect(() => {
    const loadSchedule = async () => {
      if (!user?.id || !token || user.role !== 'driver') {
        setSchedules([])
        setLoading(false)
        return
      }

      try {
        const response = await getCurrentDriverAssignment(parseInt(user.id as unknown as string, 10), token)

        if (response && response.assignment) {
          setAssignmentDetails(response)

          const assignment = response.assignment
          const busDetails = response.bus_details || assignment.bus
          const route: any = busDetails?.route

          const routeLabel =
            route?.start_point && route?.end_point
              ? `${route.start_point} - ${route.end_point}`
              : route?.name ?? 'Assigned route'

          const assignmentDateLabel = assignment.assignment_date
            ? new Date(assignment.assignment_date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            : 'Today'

          // Distance and duration from route metadata (if available)
          const metadata = route?.metadata || {}
          const distanceValue: string | number | undefined =
            metadata.distance ?? route?.distance
          const durationValue: string | number | undefined =
            metadata.duration

          if (distanceValue !== undefined && distanceValue !== null) {
            const distanceStr = typeof distanceValue === 'number'
              ? `${distanceValue} km`
              : String(distanceValue)
            setTotalDistance(distanceStr)
          } else {
            setTotalDistance('-')
          }

          if (durationValue !== undefined && durationValue !== null) {
            const durationStr = String(durationValue)
            setTotalHours(durationStr)
          } else {
            setTotalHours('-')
          }

          setSchedules([
            {
              id: assignment.id ?? 1,
              route: routeLabel,
              departureTime: assignmentDateLabel,
              // No exact arrival time in backend yet
              arrivalTime: '—',
              status: 'Upcoming',
              // TODO: hook into bookings API to get real passenger count per trip
              passengers: 0
            }
          ])
        } else {
          setAssignmentDetails(null)
          setSchedules([])
          setTotalHours('-')
          setTotalDistance('-')
        }
      } catch (err) {
        console.error('Error loading driver schedule:', err)
        setError('Failed to load today\'s schedule.')
        setAssignmentDetails(null)
        setSchedules([])
        setTotalHours('-')
        setTotalDistance('-')
      } finally {
        setLoading(false)
      }
    }

    loadSchedule()
  }, [user, token])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading schedule...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">My Schedule</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Today's routes and timings</p>
        {error && (
          <p className="text-xs sm:text-sm text-red-600 mt-1">
            {error}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Today's Trips</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {schedules.length}
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
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Hours</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {totalHours}
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
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Distance</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {totalDistance}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">{schedule.route}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 space-y-1 sm:space-y-0">
                  <span className="text-xs sm:text-sm text-gray-600">Departure: {schedule.departureTime}</span>
                  <span className="text-xs sm:text-sm text-gray-600">Arrival: {schedule.arrivalTime}</span>
                  <span className="text-xs sm:text-sm text-gray-600">Passengers: {schedule.passengers}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                  schedule.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {schedule.status}
                </span>
                {schedule.status === 'Upcoming' && (
                  <Button
                    className="bg-green-600 hover:bg-green-700 px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base-sm"
                    onClick={() => router.push('/driver/trip')}
                    disabled={!assignmentDetails}
                  >
                    <PlayIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Start Trip</span>
                    <span className="sm:hidden">Start</span>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}