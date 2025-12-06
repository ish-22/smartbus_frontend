import { API_BASE_URL } from '@/config/api';

export type LostFoundStatus = 'lost' | 'found' | 'returned';

export interface LostFoundItem {
  id: number;
  item_name: string;
  description: string;
  found_location: string;
  found_date: string;
  status: LostFoundStatus;
  user_id: number;
  bus_id?: number;
  created_at: string;
  updated_at: string;
  user?: { id: number; name: string; email?: string };
  bus?: { id: number; number: string };
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

export const lostFoundAPI = {
  getAll: async (token: string, params?: { status?: string }) => {
    try {
      const url = new URL(`${API_BASE_URL}/lost-found`);
      if (params?.status) url.searchParams.append('status', params.status);
      
      const response = await fetch(url.toString(), {
        headers: getHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Get all lost & found items error:', error);
      return { data: [] };
    }
  },

  create: async (token: string, data: {
    item_name: string;
    description: string;
    found_location: string;
    found_date: string;
    status: LostFoundStatus;
    bus_id?: number;
  }) => {
    console.log('Creating lost & found item:', data);
    
    try {
      const response = await fetch(`${API_BASE_URL}/lost-found`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      
      const result = await handleResponse(response);
      console.log('Item created successfully:', result);
      return result;
    } catch (error) {
      console.error('Item creation error:', error);
      throw error;
    }
  },

  getMy: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/lost-found/my`, {
        headers: getHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API Error:', error);
      return { data: [] };
    }
  },

  getById: async (token: string, id: number) => {
    const response = await fetch(`${API_BASE_URL}/lost-found/${id}`, {
      headers: getHeaders(token),
    });
    return handleResponse(response);
  },

  update: async (token: string, id: number, data: Partial<{
    item_name: string;
    description: string;
    found_location: string;
    found_date: string;
    status: LostFoundStatus;
    bus_id?: number;
  }>) => {
    const response = await fetch(`${API_BASE_URL}/lost-found/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateStatus: async (token: string, id: number, status: LostFoundStatus) => {
    const response = await fetch(`${API_BASE_URL}/lost-found/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  getStats: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/lost-found/stats`, {
      headers: getHeaders(token),
    });
    return handleResponse(response);
  },

  delete: async (token: string, id: number) => {
    const response = await fetch(`${API_BASE_URL}/lost-found/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return handleResponse(response);
  },
};
