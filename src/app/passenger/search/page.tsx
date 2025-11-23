import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MagnifyingGlassIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function PassengerSearchPage() {
  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Search Buses</h1>
        <p className="text-gray-600">Find buses for your journey</p>
      </div>

      <Card className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">From</label>
            <input
              type="text"
              placeholder="Enter departure location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">To</label>
            <input
              type="text"
              placeholder="Enter destination"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              title="Select travel date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Search Buses
        </Button>
      </Card>

      <div className="space-y-3 sm:space-y-4">
        {[
          { route: 'Route 12A', from: 'Colombo Fort', to: 'Kandy', time: '08:30 AM', duration: '3h 30m', price: 'LKR 250' },
          { route: 'Route 15B', from: 'Colombo Fort', to: 'Kandy', time: '10:00 AM', duration: '3h 45m', price: 'LKR 280' },
        ].map((bus, index) => (
          <Card key={index} className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{bus.route}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm sm:text-base text-gray-600">
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {bus.from} → {bus.to}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {bus.time} ({bus.duration})
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{bus.price}</p>
                <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
