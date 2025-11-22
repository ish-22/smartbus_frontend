'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  StarIcon,
  GiftIcon,
  TrophyIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

export default function PassengerRewardsPage() {
  const rewards = [
    {
      id: 1,
      passenger: 'John Doe',
      totalPoints: 1250,
      redeemedPoints: 500,
      availablePoints: 750,
      totalTrips: 45,
      memberSince: '2024-01-15',
      tier: 'Gold'
    },
    {
      id: 2,
      passenger: 'Sarah Wilson',
      totalPoints: 890,
      redeemedPoints: 200,
      availablePoints: 690,
      totalTrips: 23,
      memberSince: '2024-01-10',
      tier: 'Silver'
    },
    {
      id: 3,
      passenger: 'Mike Johnson',
      totalPoints: 450,
      redeemedPoints: 100,
      availablePoints: 350,
      totalTrips: 12,
      memberSince: '2024-01-05',
      tier: 'Bronze'
    }
  ]

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Passenger Rewards</h1>
        <p className="text-gray-600">Manage loyalty points and rewards system</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Points Issued</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">125,430</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <GiftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Points Redeemed</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">45,230</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Members</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">8,456</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Savings Generated</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">₹2.3M</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passenger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Redeemed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Trips</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member Since</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rewards.map((reward) => (
                <tr key={reward.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {reward.passenger}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      reward.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                      reward.tier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {reward.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {reward.totalPoints}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                    {reward.availablePoints}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {reward.redeemedPoints}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {reward.totalTrips}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {reward.memberSince}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button size="sm" variant="secondary">
                      Adjust Points
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}