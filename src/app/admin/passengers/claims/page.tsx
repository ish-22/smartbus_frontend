'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ArchiveBoxIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { API_BASE_URL } from '@/config/api'

type Claim = {
  id: number
  user_id: number
  item_name: string
  description: string
  bus_id: number
  route_id: number
  reported_date: string
  status: string
  contact_info: string
  user?: { name: string }
  bus?: { bus_number: string }
  route?: { route_number: string }
}

export default function PassengerClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([])
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, closed: 0 })
  const [loading, setLoading] = useState(true)
  const token = useAuthStore(state => state.token)

  useEffect(() => {
    loadClaims()
  }, [])

  const loadClaims = async () => {
    if (!token) return
    try {
      const response = await fetch(`${API_BASE_URL}/lost-found`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      if (response.ok) {
        const result = await response.json()
        const dataArray = Array.isArray(result.data) ? result.data : []
        setClaims(dataArray)
        
        setStats({
          total: dataArray.length,
          pending: dataArray.filter((c: Claim) => c.status === 'lost').length,
          resolved: dataArray.filter((c: Claim) => c.status === 'found').length,
          closed: dataArray.filter((c: Claim) => c.status === 'returned').length
        })
      }
    } catch (error) {
      console.error('Failed to load claims:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: number, status: string) => {
    if (!token) return
    try {
      const response = await fetch(`${API_BASE_URL}/lost-found/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ status })
      })
      if (response.ok) {
        loadClaims()
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading claims...</div>
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Lost & Found Claims</h1>
        <p className="text-gray-600">Process passenger claims for lost items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <ArchiveBoxIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Claims</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Resolved</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.resolved}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <XCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Closed</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.closed}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {claims.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            No claims found
          </Card>
        ) : (
          claims.map((claim) => (
          <Card key={claim.id} className="p-3 sm:p-4 lg:p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{claim.item_name}</h3>
                  <span className="text-sm sm:text-base text-gray-500">#{claim.id}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    claim.status === 'lost' ? 'bg-yellow-100 text-yellow-800' :
                    claim.status === 'found' ? 'bg-blue-100 text-blue-800' :
                    claim.status === 'returned' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {claim.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{claim.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-sm sm:text-base text-gray-500">
                  <div>
                    <span className="font-medium">Passenger:</span> {claim.user?.name || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Bus:</span> {claim.bus?.bus_number || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Route:</span> {claim.route?.route_number || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Reported:</span> {claim.reported_date ? new Date(claim.reported_date).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
                <div className="mt-2 text-sm sm:text-base text-gray-500">
                  <span className="font-medium">Contact:</span> {claim.contact_info}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                {claim.status === 'lost' && (
                  <>
                    <Button onClick={() => handleUpdateStatus(claim.id, 'found')} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Mark Found
                    </Button>
                  </>
                )}
                {claim.status === 'found' && (
                  <>
                    <Button onClick={() => handleUpdateStatus(claim.id, 'returned')} size="sm" className="bg-green-600 hover:bg-green-700">
                      Mark Returned
                    </Button>
                  </>
                )}
                {claim.status === 'returned' && (
                  <Button size="sm" variant="secondary" disabled>
                    Completed
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )))}
      </div>
    </div>
  )
}