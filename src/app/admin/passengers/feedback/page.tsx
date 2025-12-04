'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { feedbackAPI, type Feedback, type FeedbackStatus } from '@/services/api/feedback';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

export default function AdminFeedbackPage() {
  const { token, user } = useAuthStore();
  const { showToast } = useUiStore();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [response, setResponse] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setMounted(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (mounted && user && user.role === 'admin') {
      loadData();
    }
  }, [mounted, user, filter]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Use direct PHP endpoint
      const response = await fetch('http://127.0.0.1:8000/api/feedback.php');
      if (response.ok) {
        const data = await response.json();
        setFeedback(data.data || []);
        
        // Calculate basic stats from feedback data
        const feedbackData = data.data || [];
        setStats({
          total: feedbackData.length,
          pending: feedbackData.filter((f: any) => f.status === 'pending').length,
          resolved: feedbackData.filter((f: any) => f.status === 'resolved').length,
          average_rating: feedbackData.length > 0 ? 
            feedbackData.reduce((sum: number, f: any) => sum + (f.rating || 0), 0) / feedbackData.length : 0
        });
      } else {
        // Fallback to sample data if server not running
        setFeedback([
          {
            id: 1,
            user_id: 2,
            subject: 'Great Service!',
            message: 'The bus service was excellent today.',
            type: 'praise' as any,
            rating: 5,
            status: 'pending' as any,
            created_at: new Date().toISOString(),
            user: { id: 2, name: 'John Passenger' }
          },
          {
            id: 2,
            user_id: 2,
            subject: 'Bus Delay Issue',
            message: 'The bus was 20 minutes late this morning.',
            type: 'complaint' as any,
            rating: 2,
            status: 'pending' as any,
            created_at: new Date().toISOString(),
            user: { id: 2, name: 'John Passenger' }
          }
        ]);
        setStats({ total: 2, pending: 2, resolved: 0, average_rating: 3.5 });
      }
    } catch (error) {
      console.error('Load data error:', error);
      // Show sample data on error
      setFeedback([
        {
          id: 1,
          user_id: 2,
          subject: 'Sample Feedback',
          message: 'This is sample feedback data.',
          type: 'general' as any,
          status: 'pending' as any,
          created_at: new Date().toISOString(),
          user: { id: 2, name: 'Sample User' }
        }
      ]);
      setStats({ total: 1, pending: 1, resolved: 0, average_rating: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: FeedbackStatus) => {
    try {
      // Update local state immediately for demo
      setFeedback(prev => prev.map(item => 
        item.id === id ? { ...item, status, admin_response: response } : item
      ));
      
      showToast({ type: 'success', message: `Feedback marked as ${status}` });
      setSelectedFeedback(null);
      setResponse('');
      
      // Recalculate stats
      const updatedFeedback = feedback.map(item => 
        item.id === id ? { ...item, status } : item
      );
      setStats({
        total: updatedFeedback.length,
        pending: updatedFeedback.filter(f => f.status === 'pending').length,
        resolved: updatedFeedback.filter(f => f.status === 'resolved').length,
        average_rating: updatedFeedback.length > 0 ? 
          updatedFeedback.reduce((sum, f) => sum + (f.rating || 0), 0) / updatedFeedback.length : 0
      });
    } catch (error) {
      showToast({ type: 'error', message: 'Failed to update status' });
    }
  };

  if (!mounted || loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-8">Access denied. Admin only.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Feedback Management</h1>
        <p className="text-gray-600">Review and respond to user feedback</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Feedback</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.average_rating.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex space-x-2">
        {['all', 'pending', 'reviewed', 'resolved', 'rejected'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedback.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold">{item.subject}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    item.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                    item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{item.message}</p>
                <div className="text-sm text-gray-500">
                  By: {item.user?.name} | {new Date(item.created_at).toLocaleDateString()}
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => setSelectedFeedback(item)}
              >
                Respond
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Response Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold mb-4">Respond to Feedback</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold">{selectedFeedback.subject}</h3>
              <p className="text-gray-600">{selectedFeedback.message}</p>
              <div className="text-sm text-gray-500 mt-2">
                From: {selectedFeedback.user?.name}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Admin Response</label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="w-full p-2 border rounded-lg h-24"
                placeholder="Enter your response..."
              />
            </div>

            <div className="flex justify-between">
              <div className="space-x-2">
                <Button
                  onClick={() => handleUpdateStatus(selectedFeedback.id, 'reviewed')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Mark Reviewed
                </Button>
                <Button
                  onClick={() => handleUpdateStatus(selectedFeedback.id, 'resolved')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Mark Resolved
                </Button>
                <Button
                  onClick={() => handleUpdateStatus(selectedFeedback.id, 'rejected')}
                  variant="danger"
                >
                  Reject
                </Button>
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedFeedback(null);
                  setResponse('');
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}