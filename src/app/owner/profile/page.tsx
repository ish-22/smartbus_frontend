import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { UserIcon } from '@heroicons/react/24/outline'

export default function OwnerProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your business profile</p>
      </div>
      <Card className="p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
            <UserIcon className="h-12 w-12 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Metro Bus Company</h2>
            <p className="text-gray-600">Bus Owner since 2020</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input type="text" value="Metro Bus Company" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
            <input type="text" value="LIC-2024-001" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <Button className="bg-purple-600 hover:bg-purple-700">Edit Profile</Button>
        </div>
      </Card>
    </div>
  )
}