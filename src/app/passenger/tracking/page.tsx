import { Card } from '@/components/ui/Card'
import { MapPinIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/outline'

export default function PassengerTrackingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Live Tracking</h1>
        <p className="text-gray-600">Track your bus in real-time</p>
      </div>

      <Card className="p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Track Your Bus</h3>
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Enter bus number or booking ID"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Track
          </button>
        </div>
        
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          <div className="text-center">
            <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Live map tracking would be displayed here</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Active Bookings</h3>
        <div className="space-y-4">
          {[
            { 
              busNumber: 'SB-001', 
              route: 'Route 12A', 
              status: 'On Route', 
              eta: '15 minutes',
              currentLocation: 'Maharagama Junction'
            },
            { 
              busNumber: 'SB-045', 
              route: 'Route 8C', 
              status: 'Boarding', 
              eta: 'Now',
              currentLocation: 'Colombo Fort Terminal'
            },
          ].map((booking, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TruckIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{booking.busNumber} - {booking.route}</h4>
                  <p className="text-sm text-gray-600">{booking.currentLocation}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  booking.status === 'On Route' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {booking.status}
                </span>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  ETA: {booking.eta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
