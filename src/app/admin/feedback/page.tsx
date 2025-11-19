'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  HandThumbUpIcon,
  ClockIcon,
  CheckCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline'

export default function AdminFeedbackPage() {
  const [activeTab, setActiveTab] = useState('all')

  const feedback = [
    { 
      id: 1, 
      passenger: 'John Doe', 
      type: 'Complaint', 
      subject: 'Bus was late by 30 minutes',
      status: 'Pending',
      date: '2024-01-15',
      priority: 'High'
    },
    { 
      id: 2, 
      passenger: 'Sarah Wilson', 
      type: 'Suggestion', 
      subject: 'Add more buses on Route 12A',
      status: 'Under Review',
      date: '2024-01-14',
      priority: 'Medium'
    },
    { 
      id: 3, 
      passenger: 'Mike Johnson', 
      type: 'Praise', 
      subject: 'Excellent service by driver',
      status: 'Resolved',
      date: '2024-01-13',
      priority: 'Low'
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feedback Management</h1>
          <p className="text-gray-600">Monitor and respond to passenger feedback</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Complaints</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Suggestions</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <HandThumbUpIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Praise</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['all', 'complaints', 'suggestions', 'praise', 'pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
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

      {/* Feedback List */}
      <div className="space-y-4">
        {feedback.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{item.passenger}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.type === 'Complaint' ? 'bg-red-100 text-red-800' :
                    item.type === 'Suggestion' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.type}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.priority === 'High' ? 'bg-red-100 text-red-800' :
                    item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.subject}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{item.date}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    item.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    item.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
                <Button variant="secondary" size="sm">
                  Respond
                </Button>
                {item.status === 'Pending' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
