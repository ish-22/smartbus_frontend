import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArchiveBoxIcon, CheckCircleIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function AdminLostFoundPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lost & Found Management</h1>
        <p className="text-gray-600">Manage lost items and passenger claims</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ArchiveBoxIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Claims</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
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
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <ArchiveBoxIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unclaimed</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Lost Items</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { 
              id: 'LF-001', 
              item: 'Black Wallet', 
              route: 'Route 12A', 
              reportedBy: 'Driver John', 
              date: '2024-01-15',
              status: 'Pending Claim'
            },
            { 
              id: 'LF-002', 
              item: 'Blue Backpack', 
              route: 'Route 8C', 
              reportedBy: 'Driver Sarah', 
              date: '2024-01-14',
              status: 'Claimed'
            },
            { 
              id: 'LF-003', 
              item: 'Mobile Phone', 
              route: 'Route 15B', 
              reportedBy: 'Driver Mike', 
              date: '2024-01-13',
              status: 'Under Review'
            },
          ].map((item, index) => (
            <div key={index} className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <ArchiveBoxIcon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.item}</h4>
                  <p className="text-sm text-gray-600">
                    {item.route} • Reported by {item.reportedBy} • {item.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.status === 'Claimed' ? 'bg-green-100 text-green-800' :
                  item.status === 'Pending Claim' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {item.status}
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
