import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArchiveBoxIcon, CheckCircleIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function AdminLostFoundPage() {
  return (
    <div className="space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Lost & Found Management</h1>
        <p className="text-gray-600">Manage lost items and passenger claims</p>
      </div>

      <div className="grid-responsive-4 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <ArchiveBoxIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Items</p>
              <p className="text-responsive-lg font-bold text-gray-900">45</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ClockIcon className="icon-responsive-md text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Pending Claims</p>
              <p className="text-responsive-lg font-bold text-gray-900">12</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Resolved</p>
              <p className="text-responsive-lg font-bold text-gray-900">28</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <ArchiveBoxIcon className="icon-responsive-md text-red-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Unclaimed</p>
              <p className="text-responsive-lg font-bold text-gray-900">5</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="card-responsive border-b border-gray-200">
          <h3 className="text-responsive-lg font-semibold text-gray-900">Recent Lost Items</h3>
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
            <div key={index} className="card-responsive flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                  <ArchiveBoxIcon className="icon-responsive-md text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.item}</h4>
                  <p className="text-responsive-sm text-gray-600">
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
