import { API_BASE_URL } from '@/config/api';

export type FeedbackType = 'complaint' | 'suggestion' | 'praise' | 'general';
export type FeedbackStatus = 'pending' | 'reviewed' | 'resolved' | 'rejected';

export interface Feedback {
  id: number;
  user_id: number;
  subject: string;
  message: string;
  type: FeedbackType;
  rating?: number;
  status: FeedbackStatus;
  admin_response?: string;
  created_at: string;
  user?: { id: number; name: string; email?: string };
  bus?: { id: number; bus_number: string };
  route?: { id: number; route_number: string };
  responder?: { id: number; name: string };
}

const getHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
});

const handleResponse = async (response: Response) => {
  const text = await response.text();
  
  if (!response.ok) {
    console.error('API Error Response:', text);
    throw new Error(`HTTP error! status: ${response.status} - ${text}`);
  }
  
  return text ? JSON.parse(text) : {};
};

export const feedbackAPI = {
  getAll: async (token: string, params?: { type?: string; status?: string }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.type && params.type !== 'all') {
        queryParams.append('type', params.type);
      }
      if (params?.status) {
        queryParams.append('status', params.status);
      }
      
      const url = `http://127.0.0.1:8000/api/feedback.php${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      console.log('Fetching feedback with URL:', url);
      
      const response = await fetch(url);
      const result = await handleResponse(response);
      console.log('Feedback result:', result);
      return result;
    } catch (error) {
      console.error('Get all feedback error:', error);
      return { data: [] };
    }
  },

  create: async (token: string, data: {
    subject: string;
    message: string;
    type: FeedbackType;
    rating?: number;
    bus_id?: number;
    route_id?: number;
  }) => {
    console.log('Creating feedback with direct PHP:', data);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/feedback.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await handleResponse(response);
      console.log('Feedback created successfully:', result);
      return result;
    } catch (error) {
      console.error('Feedback creation error:', error);
      throw error;
    }
  },

  getMy: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/my`, {
        headers: getHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API Error:', error);
      return { data: [] };
    }
  },

  getById: async (token: string, id: number) => {
    const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
      headers: getHeaders(token),
    });
    return handleResponse(response);
  },

  updateStatus: async (token: string, id: number, data: {
    status: FeedbackStatus;
    admin_response?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/feedback/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  getStats: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/feedback/stats`, {
      headers: getHeaders(token),
    });
    return handleResponse(response);
  },

  delete: async (token: string, id: number) => {
    const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return handleResponse(response);
  },
};