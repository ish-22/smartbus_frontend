const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api';

export interface BusSeatData {
  bus_id: number;
  capacity: number;
  booked_seats: string[];
  available_count: number;
}

export const busSeatAPI = {
  getAvailableSeats: async (busId: number, travelDate?: string, tripNumber?: number): Promise<BusSeatData> => {
    const params = new URLSearchParams();
    if (travelDate) params.append('travel_date', travelDate);
    if (tripNumber) params.append('trip_number', tripNumber.toString());
    
    const queryString = params.toString();
    const response = await fetch(`${API_BASE}/buses/${busId}/seats${queryString ? '?' + queryString : ''}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch seat availability');
    }
    
    return response.json();
  }
};
