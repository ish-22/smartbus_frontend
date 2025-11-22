import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MapIcon } from '@heroicons/react/24/outline'

export default function OwnerRoutesPage() {
  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Routes & Timetables</h1>
          <p className="text-gray-600">Manage routes and schedules</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">Add Route</Button>
      </div>
      <Card className="p-8">
        <p className="text-gray-600">Route management interface coming soon...</p>
      </Card>
    </div>
  )
}