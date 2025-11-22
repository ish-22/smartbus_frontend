import { Card } from '@/components/ui/Card'
import { TruckIcon, UserIcon, CurrencyDollarIcon, ChartBarIcon, WrenchScrewdriverIcon, TagIcon } from '@heroicons/react/24/outline'

export default function OwnerDashboard() {
  return (
    <div className="space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Bus Owner Dashboard</h1>
        <p className="text-gray-600">Manage your fleet and business operations</p>
      </div>
      
      <div className="space-responsive-md">
        <div className="grid-responsive-2 lg:grid-cols-3 gap-responsive-md">
          <Card className="card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-responsive-md">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <TruckIcon className="icon-responsive-md text-purple-600" />
              </div>
              <h2 className="text-responsive-lg font-semibold ml-3">My Fleet</h2>
            </div>
            <p className="text-gray-600 mb-responsive-md">Manage your bus fleet</p>
            <a href="/owner/fleet" className="text-purple-600 hover:text-purple-800 font-medium">
              View Fleet →
            </a>
          </Card>
          
          <Card className="card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-responsive-md">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <UserIcon className="icon-responsive-md text-purple-600" />
              </div>
              <h2 className="text-responsive-lg font-semibold ml-3">Drivers</h2>
            </div>
            <p className="text-gray-600 mb-responsive-md">Manage your drivers</p>
            <a href="/owner/drivers" className="text-purple-600 hover:text-purple-800 font-medium">
              View Drivers →
            </a>
          </Card>
          
          <Card className="card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-responsive-md">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <CurrencyDollarIcon className="icon-responsive-md text-purple-600" />
              </div>
              <h2 className="text-responsive-lg font-semibold ml-3">Revenue</h2>
            </div>
            <p className="text-gray-600 mb-responsive-md">Track earnings and payments</p>
            <a href="/owner/revenue" className="text-purple-600 hover:text-purple-800 font-medium">
              View Revenue →
            </a>
          </Card>
          
          <Card className="card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-responsive-md">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <ChartBarIcon className="icon-responsive-md text-purple-600" />
              </div>
              <h2 className="text-responsive-lg font-semibold ml-3">Performance</h2>
            </div>
            <p className="text-gray-600 mb-responsive-md">Analyze fleet performance</p>
            <a href="/owner/performance" className="text-purple-600 hover:text-purple-800 font-medium">
              View Analytics →
            </a>
          </Card>
          
          <Card className="card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-responsive-md">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <WrenchScrewdriverIcon className="icon-responsive-md text-purple-600" />
              </div>
              <h2 className="text-responsive-lg font-semibold ml-3">Maintenance</h2>
            </div>
            <p className="text-gray-600 mb-responsive-md">Schedule and track maintenance</p>
            <a href="/owner/maintenance" className="text-purple-600 hover:text-purple-800 font-medium">
              Maintenance Log →
            </a>
          </Card>
          
          <Card className="card-responsive hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-responsive-md">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <TagIcon className="icon-responsive-md text-purple-600" />
              </div>
              <h2 className="text-responsive-lg font-semibold ml-3">Offers & Promotions</h2>
            </div>
            <p className="text-gray-600 mb-responsive-md">Create promotional campaigns</p>
            <a href="/owner/offers" className="text-purple-600 hover:text-purple-800 font-medium">
              Manage Offers →
            </a>
          </Card>
        </div>
      </div>
    </div>
  )
}
