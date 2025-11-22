import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GiftIcon } from '@heroicons/react/24/outline'

export default function OwnerOffersPage() {
  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Offers & Promotions</h1>
          <p className="text-gray-600">Create and manage promotional campaigns</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">Create Offer</Button>
      </div>
      <Card className="p-8">
        <p className="text-gray-600">Offers management interface coming soon...</p>
      </Card>
    </div>
  )
}