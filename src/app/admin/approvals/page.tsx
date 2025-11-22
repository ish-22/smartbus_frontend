import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  TruckIcon
} from '@heroicons/react/24/outline'

export default function AdminApprovalsPage() {
  const pendingApprovals = [
    { id: 1, type: 'Driver', name: 'John Smith', item: 'License Verification', date: '2024-01-15' },
    { id: 2, type: 'Bus', name: 'Metro Bus Co', item: 'Bus Registration SB-001', date: '2024-01-14' },
    { id: 3, type: 'Owner', name: 'City Transport Ltd', item: 'Company Registration', date: '2024-01-13' },
  ]

  return (
    <div className="space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Approvals</h1>
        <p className="text-gray-600">Review and approve pending requests</p>
      </div>

      {/* Stats */}
      <div className="grid-responsive-3 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ClockIcon className="icon-responsive-md text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Pending</p>
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
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Approved Today</p>
              <p className="text-responsive-lg font-bold text-gray-900">8</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <XCircleIcon className="icon-responsive-md text-red-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Rejected</p>
              <p className="text-responsive-lg font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card className="overflow-hidden">
        <div className="card-responsive border-b border-gray-200">
          <h3 className="text-responsive-lg font-semibold text-gray-900">Pending Approvals</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="card-responsive flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                  {approval.type === 'Driver' ? (
                    <UserIcon className="icon-responsive-md text-gray-600" />
                  ) : approval.type === 'Bus' ? (
                    <TruckIcon className="icon-responsive-md text-gray-600" />
                  ) : (
                    <UserIcon className="icon-responsive-md text-gray-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{approval.item}</h4>
                  <p className="text-responsive-sm text-gray-600">{approval.name} • {approval.date}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button variant="secondary" size="sm" className="text-red-600 border-red-600">
                  <XCircleIcon className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
