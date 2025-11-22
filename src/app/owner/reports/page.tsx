import { Card } from '@/components/ui/Card'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

export default function OwnerReportsPage() {
  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate business and operational reports</p>
      </div>
      <Card className="p-8">
        <p className="text-gray-600">Reports interface coming soon...</p>
      </Card>
    </div>
  )
}