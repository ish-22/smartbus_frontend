import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArchiveBoxIcon } from '@heroicons/react/24/outline'

export default function DriverFoundItemsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Found Items</h1>
          <p className="text-gray-600">Report items found on your bus</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">Report Found Item</Button>
      </div>
      <Card className="p-8">
        <p className="text-gray-600">Found items management interface coming soon...</p>
      </Card>
    </div>
  )
}