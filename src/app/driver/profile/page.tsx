import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { UserIcon, StarIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function DriverProfilePage() {
  return (
    <div className="space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Your driver information and statistics</p>
      </div>

      <Card className="p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <UserIcon className="h-12 w-12 text-green-600" />
          </div>
          <div>
            <h2 className="text-responsive-2xl font-bold text-gray-900">John Smith</h2>
            <p className="text-gray-600">Driver ID: DR-001</p>
            <div className="flex items-center mt-2">
              <StarIcon className="icon-responsive-sm text-yellow-400 mr-1" />
              <span className="text-responsive-lg font-semibold text-gray-900">4.8</span>
              <span className="text-gray-600 ml-2">(234 reviews)</span>
            </div>
          </div>
        </div>

        <div className="grid-responsive-2 gap-responsive-md">
          <div>
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">License Number</label>
            <input
              type="text"
              value="DL123456789"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Experience</label>
            <input
              type="text"
              value="5 years"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value="+94 77 987 6543"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
            <input
              type="tel"
              value="+94 77 123 4567"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button className="bg-green-600 hover:bg-green-700">
            Update Profile
          </Button>
        </div>
      </Card>

      <Card className="card-responsive">
        <h3 className="text-responsive-lg font-semibold text-gray-900 mb-responsive-md">Performance Statistics</h3>
        <div className="grid-responsive-4 gap-responsive-md">
          <div className="text-center">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-2">
              <TruckIcon className="icon-responsive-lg text-blue-600" />
            </div>
            <div className="text-responsive-2xl font-bold text-gray-900">1,234</div>
            <div className="text-responsive-sm text-gray-600">Total Trips</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-2">
              <ClockIcon className="icon-responsive-lg text-green-600" />
            </div>
            <div className="text-responsive-2xl font-bold text-gray-900">94%</div>
            <div className="text-responsive-sm text-gray-600">On-Time Rate</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-2">
              <UserIcon className="icon-responsive-lg text-purple-600" />
            </div>
            <div className="text-responsive-2xl font-bold text-gray-900">45,678</div>
            <div className="text-responsive-sm text-gray-600">Passengers Served</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-yellow-100 rounded-lg w-fit mx-auto mb-2">
              <StarIcon className="icon-responsive-lg text-yellow-600" />
            </div>
            <div className="text-responsive-2xl font-bold text-gray-900">4.8</div>
            <div className="text-responsive-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
