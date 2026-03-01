'use client';

import { useState } from 'react';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import FeedbackList from '@/components/feedback/FeedbackList';

export default function PassengerFeedbackPage() {
  const [activeTab, setActiveTab] = useState<'submit' | 'my' | 'all'>('submit');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFeedbackSubmitted = () => {
    setRefreshKey(prev => prev + 1);
    setActiveTab('my');
  };

  const handleTabChange = (tab: 'submit' | 'my' | 'all') => {
    setActiveTab(tab);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Feedback</h1>
        <p className="text-gray-600">Share your experience and view feedback</p>
      </div>

      <div className="flex space-x-4 border-b">
        {[
          { key: 'submit', label: 'Submit Feedback' },
          { key: 'my', label: 'My Feedback' },
          { key: 'all', label: 'All Feedback' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key as any)}
            className={`pb-2 px-1 border-b-2 font-medium ${
              activeTab === tab.key
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div key={`${activeTab}-${refreshKey}`}>
        {activeTab === 'submit' && <FeedbackForm onSuccess={handleFeedbackSubmitted} />}
        {activeTab === 'my' && <FeedbackList key="my-list" showMy={true} />}
        {activeTab === 'all' && <FeedbackList key="all-list" showMy={false} />}
      </div>
    </div>
  );
}