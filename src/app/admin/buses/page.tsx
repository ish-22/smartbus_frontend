'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

export default function AdminBusesPage() {
  const [activeTab, setActiveTab] = useState('all')

  const buses = [
    { 
      id: 1, 
      number: 'SB-001', 
      owner: 'ABC Transport', 
      route: 'Route 12A',
      status: 'Active',
      capacity: 45,
      lastMaintenance: '2024-01-10'
    },
    { 
      id: 2, 
      number: 'SB-002', 
      owner: 'City Lines', 
      route: 'Route 15B',
      status: 'Maintenance',
      capacity: 40,
      lastMaintenance: '2024-01-05'
    },
    { 
      id: 3, 
      number: 'SB-003', 
      owner: 'Metro Bus Co', 
      route: 'Route 8C',
      status: 'Pending Approval',
      capacity: 50,
      lastMaintenance: '2024-01-12'
    },
  ]

  return (
    <div className="space-responsive-md no-scroll-x">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-responsive-2xl font-bold text-gray-900">Bus Management</h1>
          <p className="text-gray-600">Monitor and manage all buses in the system</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          Add New Bus
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid-responsive-4 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <TruckIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Buses</p>
              <p className="text-responsive-lg font-bold text-gray-900">156</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Active</p>
              <p className="text-responsive-lg font-bold text-gray-900">142</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <WrenchScrewdriverIcon className="icon-responsive-md text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Maintenance</p>
              <p className="text-responsive-lg font-bold text-gray-900">8</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
              <ClockIcon className="icon-responsive-md text-orange-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Pending</p>
              <p className="text-responsive-lg font-bold text-gray-900">6</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['all', 'active', 'maintenance', 'pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-responsive-sm capitalize ${
                activeTab === tab
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Buses Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bus Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buses.map((bus) => (
                <tr key={bus.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{bus.number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {bus.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {bus.route}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      bus.status === 'Active' ? 'bg-green-100 text-green-800' :
                      bus.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {bus.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {bus.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {bus.lastMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-responsive-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      {bus.status === 'Pending Approval' && (
                        <>
                          <button className="text-green-600 hover:text-green-900">
                            <CheckCircleIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <XCircleIcon className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
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
