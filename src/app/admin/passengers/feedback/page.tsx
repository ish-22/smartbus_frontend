'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ChatBubbleLeftRightIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

export default function PassengerFeedbackPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      passenger: 'John Doe',
      type: 'Complaint',
      subject: 'Bus was late by 30 minutes',
      message: 'The bus on Route 12A was consistently late.',
      rating: 2,
      date: '2024-01-15',
      status: 'Pending',
      busNumber: 'SB-001'
    },
    {
      id: 2,
      passenger: 'Sarah Wilson',
      type: 'Suggestion',
      subject: 'Add more buses during peak hours',
      message: 'Route 15B needs more buses during morning rush hour.',
      rating: 4,
      date: '2024-01-14',
      status: 'Reviewed',
      busNumber: 'SB-002'
    }
  ])

  const deleteFeedback = (id: number) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      setFeedback(feedback.filter(item => item.id !== id))
    }
  }

  return (
    <div className="space-responsive-md no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Passenger Feedback</h1>
        <p className="text-gray-600">Review and respond to passenger feedback</p>
      </div>

      <div className="grid-responsive-4 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ChatBubbleLeftRightIcon className="icon-responsive-md text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Feedback</p>
              <p className="text-responsive-lg font-bold text-gray-900">156</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <ExclamationTriangleIcon className="icon-responsive-md text-red-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Complaints</p>
              <p className="text-responsive-lg font-bold text-gray-900">23</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Resolved</p>
              <p className="text-responsive-lg font-bold text-gray-900">89</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <StarIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Avg Rating</p>
              <p className="text-responsive-lg font-bold text-gray-900">4.2</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-responsive-sm">
        {feedback.map((item) => (
          <Card key={item.id} className="card-responsive">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{item.subject}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.type === 'Complaint' ? 'bg-red-100 text-red-800' :
                    item.type === 'Suggestion' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{item.message}</p>
                <div className="flex items-center space-x-4 text-responsive-sm text-gray-500">
                  <span>By: {item.passenger}</span>
                  <span>Bus: {item.busNumber}</span>
                  <span>Date: {item.date}</span>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Resolve
                </Button>
                <Button variant="secondary" size="sm">
                  Reply
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => deleteFeedback(item.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}