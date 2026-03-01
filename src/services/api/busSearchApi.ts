const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api';

export interface BusSearchParams {
  from?: string;
  to?: string;
  date?: string;
}

export interface Bus {
  id: number;
  trip_number: number;
  name: string;
  route: string;
  from: string;
  to: string;
  time: string;
  duration: string;
  price: number;
}

export const busSearchAPI = {
  searchBuses: async (params?: BusSearchParams): Promise<Bus[]> => {
    const queryParams = new URLSearchParams();
    if (params?.from) queryParams.append('from', params.from);
    if (params?.to) queryParams.append('to', params.to);
    if (params?.date) queryParams.append('date', params.date);
    
    const url = `${API_BASE}/buses/search${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch buses');
    }
    
    return response.json();
  }
};
