'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  StarIcon,
  GiftIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { API_BASE_URL } from '@/config/api'

type Reward = {
  user_id: number
  total_points: number
  user?: { name: string, created_at: string }
}

export default function PassengerRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [stats, setStats] = useState({ totalIssued: 0, totalRedeemed: 0, activeMembers: 0 })
  const [loading, setLoading] = useState(true)
  const [adjustingUser, setAdjustingUser] = useState<Reward | null>(null)
  const [pointsAmount, setPointsAmount] = useState('')
  const [adjustType, setAdjustType] = useState<'add' | 'deduct'>('add')
  const token = useAuthStore(state => state.token)

  useEffect(() => {
    loadRewards()
  }, [])

  const loadRewards = async () => {
    if (!token) return
    try {
      const response = await fetch(`${API_BASE_URL}/rewards/history`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        console.log('Rewards API response:', data)
        
        const dataArray = Array.isArray(data) ? data : []
        
        // Group by user and calculate totals
        const userRewards = dataArray.reduce((acc: any, reward: any) => {
          if (!acc[reward.user_id]) {
            acc[reward.user_id] = {
              user_id: reward.user_id,
              total_points: 0,
              user: reward.user
            }
          }
          acc[reward.user_id].total_points += reward.points
          return acc
        }, {})
        
        const rewardsArray = Object.values(userRewards)
        setRewards(rewardsArray)
        
        const totalIssued = dataArray.filter((r: any) => r.type === 'earned').reduce((sum: number, r: any) => sum + r.points, 0)
        const totalRedeemed = dataArray.filter((r: any) => r.type === 'redeemed').reduce((sum: number, r: any) => sum + Math.abs(r.points), 0)
        
        setStats({
          totalIssued,
          totalRedeemed,
          activeMembers: rewardsArray.length
        })
      }
    } catch (error) {
      console.error('Failed to load rewards:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdjustPoints = async () => {
    if (!token || !adjustingUser || !pointsAmount) return
    try {
      const endpoint = adjustType === 'add' ? '/rewards/add' : '/rewards/deduct'
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: adjustingUser.user_id,
          points: parseInt(pointsAmount),
          description: `Admin ${adjustType === 'add' ? 'added' : 'deducted'} points`
        })
      })
      if (response.ok) {
        setAdjustingUser(null)
        setPointsAmount('')
        loadRewards()
      }
    } catch (error) {
      console.error('Failed to adjust points:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading rewards...</div>
  }

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
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.totalIssued.toLocaleString()}</p>
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
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.totalRedeemed.toLocaleString()}</p>
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
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.activeMembers}</p>
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
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">LKR 2.3M</p>
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
              {rewards.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No rewards data found
                  </td>
                </tr>
              ) : (
                rewards.map((reward) => (
                <tr key={reward.user_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {reward.user?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      reward.total_points >= 1000 ? 'bg-yellow-100 text-yellow-800' :
                      reward.total_points >= 500 ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {reward.total_points >= 1000 ? 'Gold' : reward.total_points >= 500 ? 'Silver' : 'Bronze'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {reward.total_points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                    {reward.total_points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {reward.user?.created_at ? new Date(reward.user.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button onClick={() => setAdjustingUser(reward)} size="sm" variant="secondary">
                      Adjust Points
                    </Button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Adjust Points Modal */}
      {adjustingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Adjust Points</h2>
                <button onClick={() => setAdjustingUser(null)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">User</label>
                  <input type="text" value={adjustingUser.user?.name || 'N/A'} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Current Points</label>
                  <input type="text" value={adjustingUser.total_points} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Action</label>
                  <select value={adjustType} onChange={(e) => setAdjustType(e.target.value as 'add' | 'deduct')} className="w-full px-3 py-2 border rounded-lg">
                    <option value="add">Add Points</option>
                    <option value="deduct">Deduct Points</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Points Amount</label>
                  <input type="number" value={pointsAmount} onChange={(e) => setPointsAmount(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter points" />
                </div>
                <div className="flex gap-3 mt-6">
                  <Button onClick={() => setAdjustingUser(null)} className="flex-1 bg-gray-500 hover:bg-gray-600">Cancel</Button>
                  <Button onClick={handleAdjustPoints} className="flex-1 bg-red-600 hover:bg-red-700">Confirm</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}