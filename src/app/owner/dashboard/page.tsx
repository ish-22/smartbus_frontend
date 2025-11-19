import { Card } from '@/components/ui/Card'
import { TruckIcon, UserIcon, CurrencyDollarIcon, ChartBarIcon, WrenchScrewdriverIcon, TagIcon } from '@heroicons/react/24/outline'

export default function OwnerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bus Owner Dashboard</h1>
        <p className="text-gray-600">Manage your fleet and business operations</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TruckIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">My Fleet</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage your bus fleet</p>
            <a href="/owner/fleet" className="text-purple-600 hover:text-purple-800 font-medium">
              View Fleet →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UserIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Drivers</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage your drivers</p>
            <a href="/owner/drivers" className="text-purple-600 hover:text-purple-800 font-medium">
              View Drivers →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Revenue</h2>
            </div>
            <p className="text-gray-600 mb-4">Track earnings and payments</p>
            <a href="/owner/revenue" className="text-purple-600 hover:text-purple-800 font-medium">
              View Revenue →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Performance</h2>
            </div>
            <p className="text-gray-600 mb-4">Analyze fleet performance</p>
            <a href="/owner/performance" className="text-purple-600 hover:text-purple-800 font-medium">
              View Analytics →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <WrenchScrewdriverIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Maintenance</h2>
            </div>
            <p className="text-gray-600 mb-4">Schedule and track maintenance</p>
            <a href="/owner/maintenance" className="text-purple-600 hover:text-purple-800 font-medium">
              Maintenance Log →
            </a>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TagIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold ml-3">Offers & Promotions</h2>
            </div>
            <p className="text-gray-600 mb-4">Create promotional campaigns</p>
            <a href="/owner/offers" className="text-purple-600 hover:text-purple-800 font-medium">
              Manage Offers →
            </a>
          </Card>
        </div>
      </div>
    </div>
  )
}
