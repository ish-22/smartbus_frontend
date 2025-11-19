'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PlayIcon, StopIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function DriverTripPage() {
  const [tripActive, setTripActive] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Start Trip</h1>
        <p className="text-gray-600">Begin your scheduled route</p>
      </div>

      <Card className="p-8">
        <div className="text-center">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${
            tripActive ? 'bg-red-100' : 'bg-green-100'
          }`}>
            {tripActive ? (
              <StopIcon className="h-16 w-16 text-red-600" />
            ) : (
              <PlayIcon className="h-16 w-16 text-green-600" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {tripActive ? 'Trip in Progress' : 'Ready to Start'}
          </h2>
          
          <p className="text-gray-600 mb-8">
            {tripActive 
              ? 'Your trip is currently active. Tap to end the trip.'
              : 'Tap the button below to start your scheduled trip.'
            }
          </p>

          <Button
            onClick={() => setTripActive(!tripActive)}
            className={`px-12 py-4 text-lg font-semibold ${
              tripActive 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {tripActive ? 'End Trip' : 'Start Trip'}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Route</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <MapPinIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">Route 12A</p>
              <p className="text-sm text-gray-600">Colombo Fort → Kandy</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ClockIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">Scheduled Time</p>
              <p className="text-sm text-gray-600">08:30 AM - 12:00 PM</p>
            </div>
          </div>
        </div>
      </Card>

      {tripActive && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">45 min</div>
              <div className="text-sm text-gray-600">Trip Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">28</div>
              <div className="text-sm text-gray-600">Passengers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">Stops Completed</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
