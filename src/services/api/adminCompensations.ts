const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface AdminCompensation {
  id: number;
  booking_id: number;
  bus_owner_id: number;
  offer_id?: number;
  type: 'points_discount' | 'offer_discount' | 'reward_bonus';
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  description: string;
  paid_at?: string;
  created_at: string;
  booking?: any;
  busOwner?: any;
  offer?: any;
}

export interface CompensationStats {
  total_pending: number;
  total_paid: number;
  pending_amount: number;
  paid_amount: number;
  total_amount: number;
}

export const adminCompensationAPI = {
  async getCompensations(token: string): Promise<{ data: AdminCompensation[] }> {
    const response = await fetch(`${API_BASE_URL}/admin-compensations`, {
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

  async getStats(token: string): Promise<CompensationStats> {
    const response = await fetch(`${API_BASE_URL}/admin-compensations/stats`, {
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

  async markAsPaid(token: string, id: number) {
    const response = await fetch(`${API_BASE_URL}/admin-compensations/${id}/paid`, {
      method: 'PATCH',
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

  async getOwnerCompensations(token: string): Promise<{ data: AdminCompensation[], stats: any }> {
    const response = await fetch(`${API_BASE_URL}/owner-compensations`, {
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
};