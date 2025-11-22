'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

export default function DriverSchedulePage() {
  const schedules = [
    {
      id: 1,
      route: 'Colombo - Kandy',
      departureTime: '06:00 AM',
      arrivalTime: '09:00 AM',
      status: 'Upcoming',
      passengers: 45
    },
    {
      id: 2,
      route: 'Kandy - Colombo',
      departureTime: '02:00 PM',
      arrivalTime: '05:00 PM',
      status: 'Scheduled',
      passengers: 38
    }
  ]

  return (
    <div className="space-responsive-md no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">My Schedule</h1>
        <p className="text-responsive-sm text-gray-600 mt-1">Today's routes and timings</p>
      </div>

      <div className="grid-responsive-3 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <CalendarIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Today's Trips</p>
              <p className="text-responsive-lg font-bold text-gray-900">2</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <ClockIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Hours</p>
              <p className="text-responsive-lg font-bold text-gray-900">6</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <MapPinIcon className="icon-responsive-md text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Distance</p>
              <p className="text-responsive-lg font-bold text-gray-900">230 km</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-responsive-sm">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="card-responsive">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-responsive-base font-semibold text-gray-900 truncate">{schedule.route}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 space-y-1 sm:space-y-0">
                  <span className="text-responsive-xs text-gray-600">Departure: {schedule.departureTime}</span>
                  <span className="text-responsive-xs text-gray-600">Arrival: {schedule.arrivalTime}</span>
                  <span className="text-responsive-xs text-gray-600">Passengers: {schedule.passengers}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-responsive-xs ${
                  schedule.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {schedule.status}
                </span>
                {schedule.status === 'Upcoming' && (
                  <Button className="bg-green-600 hover:bg-green-700 btn-responsive-sm">
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