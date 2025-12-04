'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ChatBubbleLeftRightIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  TrashIcon,
  EyeIcon,
  XMarkIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useUiStore } from '@/store/uiStore';
import {
  getFeedbackAPI,
  getMyFeedbackAPI,
  getAdminFeedbackAPI,
  getFeedbackByIdAPI,
  updateFeedbackStatusAPI,
  deleteFeedbackAPI,
  getFeedbackStatsAPI,
  createFeedbackAPI,
  type Feedback,
  type FeedbackStatus,
  type FeedbackStats,
  type CreateFeedbackRequest
} from '@/services/api/feedbackApi';

export default function FeedbackPage() {
  const { user, token } = useAuthStore();
  const router = useRouter();
  const { showToast } = useUiStore();
  
  const [viewMode, setViewMode] = useState<'my' | 'all'>('my');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [adminResponse, setAdminResponse] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [createForm, setCreateForm] = useState<CreateFeedbackRequest>({
    subject: '',
    message: '',
    type: 'general',
    bus_id: null,
    route_id: null,
    rating: null
  });

  useEffect(() => {
    if (!user || !token) {
      router.push('/auth/login');
      return;
    }

    loadFeedback();
    if (user.role === 'admin') {
      loadStats();
    }
  }, [user, token, router, viewMode, activeTab, currentPage]);

  const loadFeedback = async () => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      const params: any = {
        per_page: 20,
        page: currentPage,
      };

      if (activeTab !== 'all') {
        if (['complaint', 'suggestion', 'praise', 'general'].includes(activeTab)) {
          params.type = activeTab;
        } else if (['pending', 'reviewed', 'resolved', 'rejected'].includes(activeTab)) {
          params.status = activeTab;
        }
      }

      let response;
      if (viewMode === 'my') {
        response = await getMyFeedbackAPI(token, params);
      } else if (user?.role === 'admin') {
        response = await getAdminFeedbackAPI(token, params);
      } else {
        response = await getFeedbackAPI(token, params);
      }
      
      setFeedback(response.data);
      setTotalPages(response.last_page);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load feedback';
      showToast({ type: 'error', message });
      console.error('Error loading feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    if (!token || user?.role !== 'admin') return;
    
    try {
      const statsData = await getFeedbackStatsAPI(token);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleCreateFeedback = async () => {
    if (!token) return;
    
    try {
      setIsUpdating(true);
      await createFeedbackAPI(createForm, token);
      showToast({ type: 'success', message: 'Feedback submitted successfully!' });
      setShowCreateModal(false);
      setCreateForm({
        subject: '',
        message: '',
        type: 'general',
        bus_id: null,
        route_id: null,
        rating: null
      });
      loadFeedback();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create feedback';
      showToast({ type: 'error', message });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleViewDetails = async (id: number) => {
    if (!token) return;
    
    try {
      const feedbackDetail = await getFeedbackByIdAPI(id, token);
      setSelectedFeedback(feedbackDetail);
      setAdminResponse(feedbackDetail.admin_response || '');
      setShowModal(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load feedback details';
      showToast({ type: 'error', message });
    }
  };

  const handleUpdateStatus = async (id: number, status: FeedbackStatus) => {
    if (!token || user?.role !== 'admin') return;
    
    try {
      setIsUpdating(true);
      await updateFeedbackStatusAPI(id, {
        status,
        admin_response: adminResponse.trim() || undefined,
      }, token);

      showToast({ type: 'success', message: 'Feedback status updated successfully!' });
      setShowModal(false);
      setSelectedFeedback(null);
      setAdminResponse('');
      loadFeedback();
      loadStats();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update feedback status';
      showToast({ type: 'error', message });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    
    if (!confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      await deleteFeedbackAPI(id, token);
      showToast({ type: 'success', message: 'Feedback deleted successfully!' });
      loadFeedback();
      if (user?.role === 'admin') loadStats();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete feedback';
      showToast({ type: 'error', message });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (isLoading && feedback.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Feedback</h1>
          <p className="text-gray-600">
            {viewMode === 'my' ? 'Your feedback and suggestions' : 'All feedback from users'}
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          New Feedback
        </Button>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => {
            setViewMode('my');
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-lg font-medium ${
            viewMode === 'my'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          My Feedback
        </button>
        {user?.role === 'admin' && (
          <button
            onClick={() => {
              setViewMode('all');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-medium ${
              viewMode === 'all'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Feedback
          </button>
        )}
      </div>

      {user?.role === 'admin' && viewMode === 'all' && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
                <ChatBubbleLeftRightIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </Card>
          <Card className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </Card>
          <Card className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Resolved</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.resolved}</p>
              </div>
            </div>
          </Card>
          <Card className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Avg Rating</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                  {stats.average_rating ? stats.average_rating.toFixed(1) : 'N/A'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {['all', 'complaint', 'suggestion', 'praise', 'pending', 'resolved'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm sm:text-base capitalize whitespace-nowrap ${
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

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading feedback...</div>
      ) : feedback.length === 0 ? (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No feedback found.</p>
          </div>
        </Card>
      ) : (
        <>
          <div className="space-y-3 sm:space-y-4">
            {feedback.map((item) => (
              <Card key={item.id} className="p-3 sm:p-4 lg:p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900">{item.subject}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      {item.rating && (
                        <span className="flex items-center space-x-1 text-yellow-500">
                          <StarIcon className="h-4 w-4 fill-current" />
                          <span className="text-xs">{item.rating}/5</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{item.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 flex-wrap">
                      {viewMode === 'all' && <span>By: {item.user?.name || 'Unknown User'}</span>}
                      {item.bus && <span>Bus: {item.bus.number}</span>}
                      {item.route && <span>Route: {item.route.name}</span>}
                      <span>Date: {new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewDetails(item.id)}
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {(item.user_id === user?.id || user?.role === 'admin') && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Create Feedback</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={createForm.subject}
                    onChange={(e) => setCreateForm({...createForm, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter feedback subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={createForm.type}
                    onChange={(e) => setCreateForm({...createForm, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="general">General</option>
                    <option value="complaint">Complaint</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="praise">Praise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={createForm.message}
                    onChange={(e) => setCreateForm({...createForm, message: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your feedback message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating (Optional)</label>
                  <select
                    value={createForm.rating || ''}
                    onChange={(e) => setCreateForm({...createForm, rating: e.target.value ? parseInt(e.target.value) : null})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">No Rating</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="secondary"
                    onClick={() => setShowCreateModal(false)}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateFeedback}
                    disabled={isUpdating || !createForm.subject || !createForm.message}
                  >
                    {isUpdating ? 'Creating...' : 'Create Feedback'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Feedback Details</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedFeedback(null);
                    setAdminResponse('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getTypeColor(selectedFeedback.type)}`}>
                      {selectedFeedback.type}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedFeedback.status)}`}>
                      {selectedFeedback.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedFeedback.subject}</h3>
                  <p className="text-gray-700 mb-4">{selectedFeedback.message}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>From: {selectedFeedback.user?.name} ({selectedFeedback.user?.email})</p>
                    {selectedFeedback.bus && <p>Bus: {selectedFeedback.bus.number}</p>}
                    {selectedFeedback.route && <p>Route: {selectedFeedback.route.name}</p>}
                    {selectedFeedback.rating && <p>Rating: {selectedFeedback.rating}/5</p>}
                    <p>Date: {new Date(selectedFeedback.created_at).toLocaleString()}</p>
                  </div>
                </div>

                {selectedFeedback.admin_response && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-1">Admin Response:</p>
                    <p className="text-sm text-blue-800">{selectedFeedback.admin_response}</p>
                    {selectedFeedback.responder && (
                      <p className="text-xs text-blue-600 mt-1">- {selectedFeedback.responder.name}</p>
                    )}
                  </div>
                )}

                {user?.role === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Response
                    </label>
                    <textarea
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter your response to this feedback..."
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedFeedback(null);
                      setAdminResponse('');
                    }}
                    disabled={isUpdating}
                  >
                    Close
                  </Button>
                  {user?.role === 'admin' && selectedFeedback.status !== 'resolved' && (
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleUpdateStatus(selectedFeedback.id, 'resolved')}
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Updating...' : 'Mark as Resolved'}
                    </Button>
                  )}
                  {user?.role === 'admin' && selectedFeedback.status !== 'reviewed' && (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleUpdateStatus(selectedFeedback.id, 'reviewed')}
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Updating...' : 'Mark as Reviewed'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}