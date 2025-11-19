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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Approvals</h1>
        <p className="text-gray-600">Review and approve pending requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
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
              <p className="text-sm font-medium text-gray-600">Approved Today</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {approval.type === 'Driver' ? (
                    <UserIcon className="h-6 w-6 text-gray-600" />
                  ) : approval.type === 'Bus' ? (
                    <TruckIcon className="h-6 w-6 text-gray-600" />
                  ) : (
                    <UserIcon className="h-6 w-6 text-gray-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{approval.item}</h4>
                  <p className="text-sm text-gray-600">{approval.name} • {approval.date}</p>
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
