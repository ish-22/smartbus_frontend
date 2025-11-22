'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  MapPinIcon,
  SignalIcon,
  ClockIcon,
  PlayIcon,
  StopIcon
} from '@heroicons/react/24/outline'

export default function DriverLocationPage() {
  const [isSharing, setIsSharing] = useState(false)

  return (
    <div className="space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Live Location Sharing</h1>
        <p className="text-gray-600">Share your real-time location with passengers</p>
      </div>

      {/* Location Status */}
      <Card className="p-8">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-responsive-md ${
            isSharing ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            <MapPinIcon className={`h-10 w-10 ${
              isSharing ? 'text-green-600' : 'text-gray-400'
            }`} />
          </div>
          <h3 className="text-responsive-xl font-semibold text-gray-900 mb-2">
            Location Sharing {isSharing ? 'Active' : 'Inactive'}
          </h3>
          <p className="text-gray-600 mb-responsive-lg">
            {isSharing 
              ? 'Your location is being shared with passengers in real-time'
              : 'Start sharing your location to help passengers track the bus'
            }
          </p>
          <Button
            onClick={() => setIsSharing(!isSharing)}
            className={isSharing 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-green-600 hover:bg-green-700'
            }
          >
            {isSharing ? (
              <>
                <StopIcon className="icon-responsive-sm mr-2" />
                Stop Sharing
              </>
            ) : (
              <>
                <PlayIcon className="icon-responsive-sm mr-2" />
                Start Sharing
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Location Stats */}
      <div className="grid-responsive-3 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <SignalIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">GPS Signal</p>
              <p className="text-responsive-lg font-bold text-gray-900">Strong</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <ClockIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Last Update</p>
              <p className="text-responsive-lg font-bold text-gray-900">2s ago</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <MapPinIcon className="icon-responsive-md text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Accuracy</p>
              <p className="text-responsive-lg font-bold text-gray-900">±5m</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Location */}
      <Card className="p-8">
        <h3 className="text-responsive-lg font-semibold text-gray-900 mb-responsive-md">Current Location</h3>
        <div className="bg-gray-100 rounded-lg card-responsive text-center">
          <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-responsive-md" />
          <p className="text-gray-600">Map view would be displayed here</p>
          <p className="text-responsive-sm text-gray-500 mt-2">
            Lat: 6.9271, Lng: 79.8612 (Colombo, Sri Lanka)
          </p>
        </div>
      </Card>
    </div>
  )
}
