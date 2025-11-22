import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { TruckIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline'

export default function OwnerFleetPage() {
  const buses = [
    { id: 'SB-001', route: 'Route 12A', driver: 'John Silva', status: 'Active', location: 'Colombo Fort' },
    { id: 'SB-002', route: 'Route 15B', driver: 'Mary Fernando', status: 'Active', location: 'Kandy' },
    { id: 'SB-003', route: 'Route 8C', driver: 'David Perera', status: 'Maintenance', location: 'Depot' },
  ]

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Fleet Management</h1>
          <p className="text-gray-600">Monitor and manage your bus fleet</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">Add New Bus</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {buses.map((bus) => (
          <Card key={bus.id} className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{bus.id}</h3>
                  <p className="text-gray-600">{bus.route}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm sm:text-base text-gray-600">{bus.driver}</p>
                </div>
                <div className="text-center">
                  <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm sm:text-base text-gray-600">{bus.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm sm:text-base ${
                  bus.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {bus.status}
                </span>
                <Button variant="secondary" size="sm">Manage</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}