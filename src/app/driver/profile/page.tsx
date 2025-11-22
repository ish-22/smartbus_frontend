import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { UserIcon, StarIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function DriverProfilePage() {
  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Your driver information and statistics</p>
      </div>

      <Card className="p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <UserIcon className="h-12 w-12 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">John Smith</h2>
            <p className="text-gray-600">Driver ID: DR-001</p>
            <div className="flex items-center mt-2">
              <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-1" />
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">4.8</span>
              <span className="text-gray-600 ml-2">(234 reviews)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">License Number</label>
            <input
              type="text"
              value="DL123456789"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Experience</label>
            <input
              type="text"
              value="5 years"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value="+94 77 987 6543"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Emergency Contact</label>
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

      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Performance Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-2">
              <TruckIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">1,234</div>
            <div className="text-sm sm:text-base text-gray-600">Total Trips</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-2">
              <ClockIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">94%</div>
            <div className="text-sm sm:text-base text-gray-600">On-Time Rate</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-2">
              <UserIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">45,678</div>
            <div className="text-sm sm:text-base text-gray-600">Passengers Served</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-yellow-100 rounded-lg w-fit mx-auto mb-2">
              <StarIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-yellow-600" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">4.8</div>
            <div className="text-sm sm:text-base text-gray-600">Average Rating</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
