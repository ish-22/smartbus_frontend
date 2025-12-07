const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface RewardTransaction {
  id: number;
  user_id: number;
  points: number;
  reason: string;
  description: string;
  booking_id?: number;
  created_at: string;
}

export interface RewardStats {
  total_points: number;
}

export const rewardAPI = {
  async getUserPoints(token: string): Promise<RewardStats> {
    const response = await fetch(`${API_BASE_URL}/rewards/points`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getRewardHistory(token: string): Promise<{ data: RewardTransaction[] }> {
    const response = await fetch(`${API_BASE_URL}/rewards/history`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async addPoints(token: string, data: { user_id: number; points: number; description?: string }) {
    const response = await fetch(`${API_BASE_URL}/rewards/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async deductPoints(token: string, data: { user_id: number; points: number; description?: string }) {
    const response = await fetch(`${API_BASE_URL}/rewards/deduct`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
};