import { API_BASE_URL } from '@/config/api'

export interface ScanResult {
  valid: boolean
  ticket_id: string
  passenger: string
  seat: string
  route: string
  booking_id?: number
  message?: string
}

export interface RecentScan {
  id: string
  passenger: string
  time: string
  status: string
}

export async function validateTicket(ticketId: string, token: string): Promise<ScanResult> {
  const response = await fetch(`${API_BASE_URL}/qr/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ ticket_id: ticketId })
  })

  if (!response.ok) {
    const text = await response.text()
    try {
      const error = JSON.parse(text)
      throw new Error(error.message || 'Failed to validate ticket')
    } catch {
      throw new Error('Server error: ' + response.status)
    }
  }

  return response.json()
}

export async function confirmBoarding(bookingId: number, token: string) {
  const response = await fetch(`${API_BASE_URL}/qr/confirm-boarding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ booking_id: bookingId })
  })

  if (!response.ok) {
    throw new Error('Failed to confirm boarding')
  }

  return response.json()
}

export async function getRecentScans(token: string): Promise<RecentScan[]> {
  const response = await fetch(`${API_BASE_URL}/qr/recent-scans`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch recent scans')
  }

  return response.json()
}
