import { API_BASE_URL } from '@/config/api'

export interface DriverStats {
  total_trips: number
  on_time_rate: number
  passengers_served: number
  average_rating: number
  total_reviews: number
}

export async function getDriverStats(token: string): Promise<DriverStats> {
  const response = await fetch(`${API_BASE_URL}/driver/stats`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch driver statistics')
  }

  return response.json()
}
