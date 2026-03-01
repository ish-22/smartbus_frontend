const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Offer {
  id: number;
  title: string;
  description: string;
  discount_percentage: number;
  required_points: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired';
  created_at: string;
}

export interface OwnerPayment {
  id: number;
  owner_id: number;
  offer_id: number;
  passenger_id: number;
  booking_id?: number;
  discount_amount: number;
  status: 'pending' | 'paid';
  created_at: string;
  offer?: Offer;
  passenger?: { id: number; name: string };
  booking?: { id: number; [key: string]: unknown };
}

export const offerAPI = {
  async getActiveOffers(token: string): Promise<{ data: Offer[] }> {
    const response = await fetch(`${API_BASE_URL}/offers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async createOffer(token: string, data: Partial<Offer>) {
    const response = await fetch(`${API_BASE_URL}/offers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
      if (errorData.errors) {
        const validationErrors = Object.values(errorData.errors).flat().join(', ');
        throw new Error(`${errorMessage}: ${validationErrors}`);
      }
      throw new Error(errorMessage);
    }
    
    return response.json();
  },

  async updateOffer(token: string, id: number, data: Partial<Offer>) {
    const response = await fetch(`${API_BASE_URL}/offers/${id}`, {
      method: 'PUT',
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

  async deleteOffer(token: string, id: number) {
    const response = await fetch(`${API_BASE_URL}/offers/${id}`, {
      method: 'DELETE',
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

  async redeemOffer(token: string, data: { offer_id: number; booking_id?: number }) {
    const response = await fetch(`${API_BASE_URL}/offers/redeem`, {
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

  async checkEligibility(token: string, offerId: number) {
    const response = await fetch(`${API_BASE_URL}/offers/${offerId}/eligibility`, {
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

  async getRedeemedOffers(token: string) {
    const response = await fetch(`${API_BASE_URL}/offers/redeemed`, {
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

export const ownerPaymentAPI = {
  async getPayments(token: string): Promise<{ data: OwnerPayment[] }> {
    const response = await fetch(`${API_BASE_URL}/owner-payments`, {
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
    const response = await fetch(`${API_BASE_URL}/owner-payments/${id}/paid`, {
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

  async getStats(token: string) {
    const response = await fetch(`${API_BASE_URL}/owner-payments/stats`, {
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