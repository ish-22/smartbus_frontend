import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArchiveBoxIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function PassengerLostFoundPage() {
  return (
    <div className="space-responsive-lg no-scroll-x">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-responsive-2xl font-bold text-gray-900">Lost & Found</h1>
          <p className="text-gray-600">Report lost items and track your claims</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusIcon className="h-4 w-4 mr-2" />
          Report Lost Item
        </Button>
      </div>

      <div className="grid-responsive-3 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <ArchiveBoxIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">My Claims</p>
              <p className="text-responsive-lg font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ArchiveBoxIcon className="icon-responsive-md text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Pending</p>
              <p className="text-responsive-lg font-bold text-gray-900">2</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <ArchiveBoxIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Resolved</p>
              <p className="text-responsive-lg font-bold text-gray-900">1</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8">
        <h3 className="text-responsive-lg font-semibold text-gray-900 mb-responsive-lg">Report Lost Item</h3>
        <div className="grid-responsive-2 gap-responsive-md">
          <div>
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Item Description</label>
            <input
              type="text"
              placeholder="e.g., Black leather wallet"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Route/Bus Number</label>
            <input
              type="text"
              placeholder="e.g., Route 12A or Bus SB-001"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Date Lost</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Contact Number</label>
            <input
              type="tel"
              placeholder="+94 77 123 4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Additional Details</label>
            <textarea
              rows={3}
              placeholder="Any additional information about the lost item..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Submit Claim
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="card-responsive border-b border-gray-200">
          <h3 className="text-responsive-lg font-semibold text-gray-900">My Claims</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            {
              id: 'LF-P001',
              item: 'Black Wallet',
              route: 'Route 12A',
              date: '2024-01-15',
              status: 'Under Review'
            },
            {
              id: 'LF-P002',
              item: 'Blue Umbrella',
              route: 'Route 8C',
              date: '2024-01-10',
              status: 'Found - Ready for Pickup'
            },
            {
              id: 'LF-P003',
              item: 'Mobile Phone',
              route: 'Route 15B',
              date: '2024-01-05',
              status: 'Resolved'
            }
          ].map((claim, index) => (
            <div key={index} className="card-responsive flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                  <ArchiveBoxIcon className="icon-responsive-md text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{claim.item}</h4>
                  <p className="text-responsive-sm text-gray-600">
                    Claim ID: {claim.id} • {claim.route} • {claim.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  claim.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  claim.status === 'Found - Ready for Pickup' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {claim.status}
                </span>
                <Button variant="secondary" size="sm">
                  <EyeIcon className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
