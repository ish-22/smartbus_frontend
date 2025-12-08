const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface BookingRewardData {
  user_points: number;
  available_offers: Array<{
    id: number;
    title: string;
    discount_percentage: number;
    required_points: number;
  }>;
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
      offer_id: number;
      offer_title: string;
      discount_percentage: number;
      discount_amount: number;
    };
  };
}

export const bookingRewardAPI = {
  async getBookingData(token: string): Promise<BookingRewardData> {
    const response = await fetch(`${API_BASE_URL}/rewards/points`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Fetch offers
    const offersResponse = await fetch(`${API_BASE_URL}/offers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    const offersData = offersResponse.ok ? await offersResponse.json() : { data: [] };
    
    // Fetch redeemed offers
    const redeemedResponse = await fetch(`${API_BASE_URL}/offers/redeemed`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    const redeemedData = redeemedResponse.ok ? await redeemedResponse.json() : { redeemed_offer_ids: [] };
    const redeemedOfferIds = redeemedData.redeemed_offer_ids || [];
    
    return {
      user_points: result.total_points || 0,
      available_offers: offersData.data || [],
      redeemed_offers: redeemedOfferIds
    };
  },

  async calculateDiscount(token: string, data: {
    fare: number;
    points_to_use?: number;
    offer_id?: number;
  }): Promise<DiscountCalculation> {
    let totalDiscount = 0;
    const breakdown: any = {};
    
    // Calculate points discount (1 point = Rs. 1, max 50% of fare)
    if (data.points_to_use && data.points_to_use > 0) {
      const maxPointsDiscount = Math.floor(data.fare * 0.5);
      const pointsDiscount = Math.min(data.points_to_use, maxPointsDiscount);
      totalDiscount += pointsDiscount;
      breakdown.points = {
        points_used: pointsDiscount,
        discount_amount: pointsDiscount
      };
    }
    
    // Calculate offer discount
    if (data.offer_id) {
      try {
        const offerResponse = await fetch(`${API_BASE_URL}/offers`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (offerResponse.ok) {
          const offersData = await offerResponse.json();
          const offer = offersData.data?.find((o: any) => o.id === data.offer_id);
          
          if (offer) {
            const offerDiscount = (data.fare * offer.discount_percentage) / 100;
            totalDiscount += offerDiscount;
            breakdown.offer = {
              offer_id: offer.id,
              offer_title: offer.title,
              discount_percentage: offer.discount_percentage,
              discount_amount: offerDiscount
            };
          }
        }
      } catch (error) {
        console.error('Failed to fetch offer details:', error);
      }
    }
    
    return {
      original_fare: data.fare,
      total_discount: totalDiscount,
      final_amount: data.fare - totalDiscount,
      discount_breakdown: breakdown
    };
  }
};