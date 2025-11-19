import { Card } from '@/components/ui/Card'
import { UsersIcon, TruckIcon, MapIcon, ChartBarIcon, CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Complete system management and oversight</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <UsersIcon className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">User Management</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage passengers, drivers, and owners</p>
            <a href="/admin/users" className="text-red-600 hover:text-red-800 font-medium">
              Manage Users →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <TruckIcon className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Fleet Management</h2>
            </div>
            <p className="text-gray-600 mb-4">Monitor and manage bus fleet</p>
            <a href="/admin/buses" className="text-red-600 hover:text-red-800 font-medium">
              View Fleet →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <MapIcon className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Route Management</h2>
            </div>
            <p className="text-gray-600 mb-4">Configure bus routes and schedules</p>
            <a href="/admin/routes" className="text-red-600 hover:text-red-800 font-medium">
              Manage Routes →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Analytics</h2>
            </div>
            <p className="text-gray-600 mb-4">View system performance metrics</p>
            <a href="/admin/analytics" className="text-red-600 hover:text-red-800 font-medium">
              View Analytics →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Approvals</h2>
            </div>
            <p className="text-gray-600 mb-4">Review pending registrations</p>
            <a href="/admin/approvals" className="text-red-600 hover:text-red-800 font-medium">
              Review Approvals →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <ShieldCheckIcon className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Security</h2>
            </div>
            <p className="text-gray-600 mb-4">System security and monitoring</p>
            <a href="/admin/security" className="text-red-600 hover:text-red-800 font-medium">
              Security Panel →
            </a>
          </Card>
        </div>
      </div>
    </div>
  )
}
