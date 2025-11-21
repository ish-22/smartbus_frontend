'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ArchiveBoxIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

export default function PassengerClaimsPage() {
  const claims = [
    {
      id: 'LC001',
      passenger: 'John Doe',
      itemName: 'Black Laptop Bag',
      description: 'Left on seat 15A, contains important documents',
      busNumber: 'SB-001',
      route: 'Colombo - Kandy',
      reportedDate: '2024-01-15',
      status: 'Pending',
      contactInfo: '+94 77 123 4567'
    },
    {
      id: 'LC002',
      passenger: 'Sarah Wilson',
      itemName: 'Blue Umbrella',
      description: 'Small blue umbrella with wooden handle',
      busNumber: 'SB-002',
      route: 'Colombo - Galle',
      reportedDate: '2024-01-14',
      status: 'Found',
      contactInfo: '+94 77 234 5678'
    },
    {
      id: 'LC003',
      passenger: 'Mike Johnson',
      itemName: 'Mobile Phone',
      description: 'Samsung Galaxy S21, black color with blue case',
      busNumber: 'SB-003',
      route: 'Kandy - Colombo',
      reportedDate: '2024-01-13',
      status: 'Claimed',
      contactInfo: '+94 77 345 6789'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lost & Found Claims</h1>
        <p className="text-gray-600">Process passenger claims for lost items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ArchiveBoxIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Claims</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">56</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Closed</p>
              <p className="text-2xl font-bold text-gray-900">10</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {claims.map((claim) => (
          <Card key={claim.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{claim.itemName}</h3>
                  <span className="text-sm text-gray-500">#{claim.id}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    claim.status === 'Found' ? 'bg-blue-100 text-blue-800' :
                    claim.status === 'Claimed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {claim.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{claim.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Passenger:</span> {claim.passenger}
                  </div>
                  <div>
                    <span className="font-medium">Bus:</span> {claim.busNumber}
                  </div>
                  <div>
                    <span className="font-medium">Route:</span> {claim.route}
                  </div>
                  <div>
                    <span className="font-medium">Reported:</span> {claim.reportedDate}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <span className="font-medium">Contact:</span> {claim.contactInfo}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                {claim.status === 'Pending' && (
                  <>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Mark Found
                    </Button>
                    <Button size="sm" variant="secondary">
                      Contact
                    </Button>
                  </>
                )}
                {claim.status === 'Found' && (
                  <>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Mark Claimed
                    </Button>
                    <Button size="sm" variant="secondary">
                      Contact
                    </Button>
                  </>
                )}
                {claim.status === 'Claimed' && (
                  <Button size="sm" variant="secondary" disabled>
                    Completed
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