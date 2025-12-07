const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface BookingRewardData {
  user_points: number;
  available_offers: any[];
  redeemed_offers: number[];
}

export interface DiscountCalculation {
  original_fare: number;
  total_discount: number;
  final_amount: number;
  discount_breakdown: {
    points?: {
      points_used: number;
      discount_amount: number;
    };
    offer?: {
      offer_title: string;
      discount_percentage: number;
      discount_amount: number;
    };
  };
}

export const bookingRewardAPI = {
  async getBookingData(token: string): Promise<BookingRewardData> {
    const response = await fetch(`${API_BASE_URL}/booking/reward-data`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  },

  async calculateDiscount(token: string, data: {
    fare: number;
    points_to_use?: number;
    offer_id?: number;
  }): Promise<DiscountCalculation> {
    const response = await fetch(`${API_BASE_URL}/booking/calculate-discount`, {
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
    
    const result = await response.json();
    return result;
  },
};