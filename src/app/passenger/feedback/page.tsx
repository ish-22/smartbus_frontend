'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ChatBubbleLeftRightIcon,
  StarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function PassengerFeedbackPage() {
  const [feedbackType, setFeedbackType] = useState('complaint')
  const [message, setMessage] = useState('')

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Feedback</h1>
        <p className="text-gray-600">Share your experience and help us improve</p>
      </div>

      {/* Feedback Form */}
      <Card className="p-8">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Submit Feedback</h3>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Feedback Type */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
              Feedback Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <button
                onClick={() => setFeedbackType('complaint')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  feedbackType === 'complaint'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2" />
                <span className="block font-medium">Complaint</span>
              </button>
              <button
                onClick={() => setFeedbackType('suggestion')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  feedbackType === 'suggestion'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2" />
                <span className="block font-medium">Suggestion</span>
              </button>
              <button
                onClick={() => setFeedbackType('praise')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  feedbackType === 'praise'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2" />
                <span className="block font-medium">Praise</span>
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please describe your feedback in detail..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Submit Feedback
            </Button>
          </div>
        </div>
      </Card>

      {/* Previous Feedback */}
      <Card className="p-8">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Your Previous Feedback</h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { type: 'Complaint', message: 'Bus was late by 30 minutes', status: 'Resolved', date: '2024-01-10' },
            { type: 'Suggestion', message: 'Add more buses on Route 12A', status: 'Under Review', date: '2024-01-08' },
          ].map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.type === 'Complaint' ? 'bg-red-100 text-red-800' :
                  item.type === 'Suggestion' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.type}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-gray-700 mb-2">{item.message}</p>
              <p className="text-sm sm:text-base text-gray-500">{item.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
