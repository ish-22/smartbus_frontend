'use client';

import { useState } from 'react';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import FeedbackList from '@/components/feedback/FeedbackList';

export default function DriverFeedbackPage() {
  const [activeTab, setActiveTab] = useState<'submit' | 'my'>('submit');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFeedbackSubmitted = () => {
    setRefreshKey(prev => prev + 1);
    setActiveTab('my');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-green-600">Driver Feedback</h1>
        <p className="text-gray-600">Share feedback about routes, schedules, and operations</p>
      </div>

      <div className="flex space-x-4 border-b">
        {[
          { key: 'submit', label: 'Submit Feedback' },
          { key: 'my', label: 'My Feedback' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-2 px-1 border-b-2 font-medium ${
              activeTab === tab.key
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div key={refreshKey}>
        {activeTab === 'submit' && <FeedbackForm onSuccess={handleFeedbackSubmitted} />}
        {activeTab === 'my' && <FeedbackList showMy={true} />}
      </div>
    </div>
  );
}