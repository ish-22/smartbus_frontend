import { Card } from '@/components/ui/Card'
import { ShieldCheckIcon, ExclamationTriangleIcon, KeyIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function AdminSecurityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Security</h1>
        <p className="text-gray-600">System security monitoring and controls</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShieldCheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Security Score</p>
              <p className="text-2xl font-bold text-gray-900">98%</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Threats Blocked</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <KeyIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Sessions</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <EyeIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Audit Logs</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Events</h3>
        <div className="space-y-3">
          {[
            { event: 'Failed login attempt blocked', time: '2 minutes ago', severity: 'high' },
            { event: 'New admin user created', time: '1 hour ago', severity: 'medium' },
            { event: 'Password policy updated', time: '3 hours ago', severity: 'low' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">{item.event}</span>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.severity === 'high' ? 'bg-red-100 text-red-800' :
                  item.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.severity}
                </span>
                <span className="text-sm text-gray-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
