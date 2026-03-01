'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { feedbackAPI, type Feedback } from '@/services/api/feedback';
import { useAuthStore } from '@/store/authStore';

export default function FeedbackList({ showMy = false }: { showMy?: boolean }) {
  const { token, user } = useAuthStore();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadFeedback();
  }, [filter, showMy, token]);

  const loadFeedback = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      let data;
      
      if (showMy) {
        data = await feedbackAPI.getMy(token);
      } else {
        if (filter === 'all') {
          data = await feedbackAPI.getAll(token, {});
        } else {
          data = await feedbackAPI.getAll(token, { type: filter });
        }
      }
      
      setFeedback(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      console.error('Failed to load feedback:', error);
      setFeedback([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'complaint': return 'bg-red-100 text-red-800';
      case 'suggestion': return 'bg-blue-100 text-blue-800';
      case 'praise': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-4">
      {!showMy && (
        <div className="flex space-x-2 mb-4">
          {['all', 'complaint', 'suggestion', 'praise'].map((type) => (
            <button
              key={type}
              onClick={() => {
                console.log('Filter clicked:', type);
                setFilter(type);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}

      {feedback.length === 0 ? (
        <Card className="p-8 text-center text-gray-500">
          No feedback found.
        </Card>
      ) : (
        <div className="space-y-4">
          {feedback.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{item.subject}</h3>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-2">{item.message}</p>
              
              <div className="text-sm text-gray-500 flex justify-between">
                <span>By: {item.user?.name}</span>
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
              </div>

              {item.admin_response && (
                <div className="mt-3 p-3 bg-blue-50 rounded">
                  <p className="text-sm font-medium text-blue-900">Admin Response:</p>
                  <p className="text-sm text-blue-800">{item.admin_response}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}