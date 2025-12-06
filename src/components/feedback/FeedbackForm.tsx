'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { feedbackAPI, type FeedbackType } from '@/services/api/feedback';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

export default function FeedbackForm({ onSuccess }: { onSuccess?: () => void }) {
  const { token } = useAuthStore();
  const { showToast } = useUiStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    type: 'general' as FeedbackType,
    rating: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('=== FORM SUBMISSION DEBUG ===');
    console.log('Token available:', !!token);
    console.log('Form data:', formData);
    
    if (!token) {
      console.error('No authentication token available');
      showToast({ type: 'error', message: 'Please log in to submit feedback' });
      return;
    }

    if (!formData.subject.trim() || !formData.message.trim()) {
      showToast({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const submitData = {
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        type: formData.type,
        rating: formData.rating > 0 ? formData.rating : undefined,
      };
      
      console.log('Submitting data:', submitData);
      
      const result = await feedbackAPI.create(token, submitData);
      
      console.log('Submission successful:', result);
      showToast({ type: 'success', message: 'Feedback submitted successfully!' });
      
      // Reset form
      setFormData({ subject: '', message: '', type: 'general', rating: 0 });
      onSuccess?.();
      
    } catch (error: any) {
      console.error('=== FORM SUBMISSION ERROR ===');
      console.error('Error object:', error);
      
      const errorMessage = error?.message || 'Failed to submit feedback';
      showToast({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Submit Feedback</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as FeedbackType })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="general">General</option>
            <option value="complaint">Complaint</option>
            <option value="suggestion">Suggestion</option>
            <option value="praise">Praise</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-2 border rounded-lg h-24"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Rating (Optional)</label>
          <select
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            className="w-full p-2 border rounded-lg"
          >
            <option value={0}>No Rating</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </Card>
  );
}