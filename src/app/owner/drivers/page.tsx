import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { UserIcon, PhoneIcon, MapIcon } from '@heroicons/react/24/outline'

export default function OwnerDriversPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Assignments</h1>
          <p className="text-gray-600">Manage your drivers and assignments</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">Add Driver</Button>
      </div>
      <Card className="p-8">
        <p className="text-gray-600">Driver management interface coming soon...</p>
      </Card>
    </div>
  )
}