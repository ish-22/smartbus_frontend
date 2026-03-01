'use client'

import { Card } from '@/components/ui/Card'
import { ShieldCheckIcon, ExclamationTriangleIcon, KeyIcon, EyeIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'

interface SecurityStats {
  security_score: number
  threats_blocked: number
  active_sessions: number
  audit_logs: number
}

interface SecurityEvent {
  event: string
  time: string
  severity: 'high' | 'medium' | 'low'
}

export default function AdminSecurityPage() {
  const [stats, setStats] = useState<SecurityStats>({
    security_score: 0,
    threats_blocked: 0,
    active_sessions: 0,
    audit_logs: 0,
  })
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [loading, setLoading] = useState(true)
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    loadSecurityData()
  }, [])

  const loadSecurityData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/dashboard/security/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setEvents(data.events)
      }
    } catch (error) {
      console.error('Failed to load security data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Security</h1>
        <p className="text-gray-600">System security monitoring and controls</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Security Score</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.security_score}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Threats Blocked</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.threats_blocked}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <KeyIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Sessions</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.active_sessions}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Audit Logs</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.audit_logs.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Security Events</h3>
        <div className="space-y-3">
          {loading ? (
            <p className="text-gray-500">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-gray-500">No recent security events</p>
          ) : (
            events.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-700">{item.event}</span>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.severity === 'high' ? 'bg-red-100 text-red-800' :
                    item.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.severity}
                  </span>
                  <span className="text-sm sm:text-base text-gray-500">{item.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
