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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
        <p className="text-gray-600">Today's routes and timings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Trips</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPinIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Distance</p>
              <p className="text-2xl font-bold text-gray-900">230 km</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{schedule.route}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span>Departure: {schedule.departureTime}</span>
                  <span>Arrival: {schedule.arrivalTime}</span>
                  <span>Passengers: {schedule.passengers}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  schedule.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {schedule.status}
                </span>
                {schedule.status === 'Upcoming' && (
                  <Button className="bg-green-600 hover:bg-green-700">
                    <PlayIcon className="h-4 w-4 mr-2" />
                    Start Trip
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