'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { StatusIndicator } from '@/components/ui/StatusIndicator'
import { Button } from '@/components/ui/Button'

// Example Analytics Chart Component
export const AnalyticsChart: React.FC<{ data: any }> = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Revenue Trends</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
        {/* Placeholder for Chart.js or similar */}
        <div className="text-gray-400">Chart Component Here</div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-600">$12,450</div>
          <div className="text-sm text-gray-500">This Month</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600">+15%</div>
          <div className="text-sm text-gray-500">Growth</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">1,234</div>
          <div className="text-sm text-gray-500">Rides</div>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Real-time Bus Status Component
export const BusStatusCard: React.FC<{
  busNumber: string
  route: string
  status: 'online' | 'offline'
  nextStop?: string
  eta?: string
}> = ({ busNumber, route, status, nextStop, eta }) => (
  <Card className="border-l-4 border-l-green-500">
    <CardContent>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">Bus #{busNumber}</h4>
          <p className="text-sm text-gray-500">{route}</p>
        </div>
        <StatusIndicator status={status} />
      </div>
      {nextStop && (
        <div className="text-sm text-gray-600">
          Next Stop: {nextStop} {eta && `(${eta})`}
        </div>
      )}
    </CardContent>
  </Card>
)

// Driver PWA Large Button Example
export const DriverActionButton: React.FC<{
  icon: string
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
}> = ({ icon, label, onClick, variant = 'primary' }) => (
  <Button
    size="lg"
    variant={variant}
    onClick={onClick}
    className="w-full h-20 flex-col space-y-2"
  >
    <span className="text-2xl">{icon}</span>
    <span className="font-semibold">{label}</span>
  </Button>
)

// Stats Grid Component
export const StatsGrid: React.FC<{
  stats: Array<{
    label: string
    value: string | number
    icon: string
    color?: string
  }>
}> = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {stats.map((stat, index) => (
      <Card key={index} compact>
        <div className="text-center">
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className={`text-2xl font-bold mb-1 ${stat.color || 'text-gray-800'}`}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-500">{stat.label}</div>
        </div>
      </Card>
    ))}
  </div>
)

// Activity Feed Component
export const ActivityFeed: React.FC<{
  activities: Array<{
    id: string
    message: string
    timestamp: string
    type: 'info' | 'success' | 'warning' | 'error'
  }>
}> = ({ activities }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              activity.type === 'success' ? 'bg-green-500' :
              activity.type === 'warning' ? 'bg-yellow-500' :
              activity.type === 'error' ? 'bg-red-500' :
              'bg-blue-500'
            }`} />
            <div className="flex-1">
              <p className="text-sm text-gray-800">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
