import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  TruckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

export default function OwnerRegistrationsPage() {
  const registrations = [
    { id: 1, busNumber: 'SB-001', status: 'Approved', date: '2024-01-15', route: 'Route 12A' },
    { id: 2, busNumber: 'SB-002', status: 'Pending', date: '2024-01-14', route: 'Route 15B' },
    { id: 3, busNumber: 'SB-003', status: 'Under Review', date: '2024-01-13', route: 'Route 8C' },
  ]

  return (
    <div className="space-responsive-lg no-scroll-x">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-responsive-2xl font-bold text-gray-900">Bus Registrations</h1>
          <p className="text-gray-600">Manage your bus registration applications</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <PlusIcon className="h-4 w-4 mr-2" />
          Register New Bus
        </Button>
      </div>

      {/* Stats */}
      <div className="grid-responsive-3 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Approved</p>
              <p className="text-responsive-lg font-bold text-gray-900">8</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ClockIcon className="icon-responsive-md text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Pending</p>
              <p className="text-responsive-lg font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <TruckIcon className="icon-responsive-md text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Buses</p>
              <p className="text-responsive-lg font-bold text-gray-900">11</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Registrations Table */}
      <Card className="overflow-hidden">
        <div className="card-responsive border-b border-gray-200">
          <h3 className="text-responsive-lg font-semibold text-gray-900">Registration Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bus Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TruckIcon className="icon-responsive-sm text-gray-400 mr-3" />
                      <span className="font-medium text-gray-900">{registration.busNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {registration.route}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      registration.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      registration.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {registration.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {registration.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-responsive-sm font-medium">
                    <Button variant="secondary" size="sm">
                      <DocumentTextIcon className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
