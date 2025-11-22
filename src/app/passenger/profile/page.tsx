import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function PassengerProfilePage() {
  return (
    <div className="space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <Card className="p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <UserIcon className="h-12 w-12 text-blue-600" />
          </div>
          <div>
            <h2 className="text-responsive-2xl font-bold text-gray-900">John Doe</h2>
            <p className="text-gray-600">Passenger since January 2024</p>
            <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
              Change Photo
            </Button>
          </div>
        </div>

        <div className="grid-responsive-2 gap-responsive-md">
          <div>
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">
              <EnvelopeIcon className="h-4 w-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value="john@example.com"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">
              <PhoneIcon className="h-4 w-4 inline mr-2" />
              Phone
            </label>
            <input
              type="tel"
              value="+94 77 123 4567"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">
              <MapPinIcon className="h-4 w-4 inline mr-2" />
              Address
            </label>
            <textarea
              rows={3}
              value="123 Main Street, Colombo 07, Sri Lanka"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="card-responsive">
        <h3 className="text-responsive-lg font-semibold text-gray-900 mb-responsive-md">Travel Statistics</h3>
        <div className="grid-responsive-3 gap-responsive-md">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">45</div>
            <div className="text-responsive-sm text-gray-600">Total Trips</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">₹12,450</div>
            <div className="text-responsive-sm text-gray-600">Total Spent</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">850</div>
            <div className="text-responsive-sm text-gray-600">Reward Points</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
