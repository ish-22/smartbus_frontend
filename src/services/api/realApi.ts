// Real API integration with backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface BusParams {
  route?: string;
  from?: string;
  to?: string;
}

interface BookingData {
  busId: string;
  seatNumber: number;
  passengerName: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Buses
  async getBuses(params?: BusParams) {
    const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
    return this.request(`/buses${query}`);
  }

  // Bookings
  async createBooking(data: BookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Real-time tracking
  async getBusLocation(busId: string) {
    return this.request(`/buses/${busId}/location`);
  }
}

export const api = new ApiService();