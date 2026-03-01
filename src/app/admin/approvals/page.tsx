'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  TruckIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { API_BASE_URL } from '@/config/api'

type Bus = {
  id: number
  registration_number: string
  status: string
  owner?: { name: string }
  created_at: string
}

export default function AdminApprovalsPage() {
  const [pendingBuses, setPendingBuses] = useState<Bus[]>([])
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 })
  const [loading, setLoading] = useState(true)
  const token = useAuthStore(state => state.token)

  useEffect(() => {
    if (token) {
      loadPendingApprovals()
    }
  }, [token])

  const loadPendingApprovals = async () => {
    if (!token) return
    try {
      const response = await fetch(`${API_BASE_URL}/buses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        const pending = data.filter((b: Bus) => b.status === 'pending')
        setPendingBuses(pending)
        setStats({
          pending: pending.length,
          approved: data.filter((b: Bus) => b.status === 'active').length,
          rejected: data.filter((b: Bus) => b.status === 'rejected').length
        })
      }
    } catch (error) {
      console.error('Failed to load approvals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = async (busId: number, newStatus: string) => {
    if (!token) return
    try {
      const bus = pendingBuses.find(b => b.id === busId)
      if (!bus) return

      const response = await fetch(`${API_BASE_URL}/buses/${busId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          number: bus.registration_number,
          type: 'normal',
          capacity: 50,
          status: newStatus 
        })
      })
      if (response.ok) {
        loadPendingApprovals()
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Approvals</h1>
        <p className="text-gray-600">Review and approve pending requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Approved</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <XCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Rejected</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card className="overflow-hidden">
        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Pending Approvals</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {pendingBuses.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No pending approvals
            </div>
          ) : (
            pendingBuses.map((bus) => (
              <div key={bus.id} className="p-3 sm:p-4 lg:p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                    <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Bus Registration {bus.registration_number}</h4>
                    <p className="text-sm sm:text-base text-gray-600">{bus.owner?.name || 'N/A'} • {new Date(bus.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproval(bus.id, 'active')}>
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button variant="secondary" size="sm" className="text-red-600 border-red-600" onClick={() => handleApproval(bus.id, 'rejected')}>
                    <XCircleIcon className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
