import { API_BASE_URL } from '@/config/api';

const getHeaders = (token: string): HeadersInit => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}`,
});

export interface AdminDashboardStats {
  total_users: number;
  total_passengers: number;
  total_drivers: number;
  total_owners: number;
  total_admins: number;
  active_routes: number;
  total_buses: number;
  active_buses: number;
  today_trips: number;
  today_bookings: number;
  pending_incidents: number;
  resolved_incidents: number;
  total_incidents: number;
}

export interface OwnerDashboardStats {
  total_buses: number;
  active_buses: number;
  total_drivers: number;
  total_routes: number;
  today_bookings: number;
  total_bookings: number;
  pending_incidents: number;
  resolved_incidents: number;
}

export interface PassengerDashboardStats {
  total_bookings: number;
  upcoming_bookings: number;
  completed_trips: number;
  cancelled_bookings: number;
}

export async function getAdminDashboardStats(token: string): Promise<AdminDashboardStats> {
  const response = await fetch(`${API_BASE_URL}/dashboard/admin/stats`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to fetch admin dashboard statistics');
  }

  return response.json();
}

export async function getOwnerDashboardStats(token: string): Promise<OwnerDashboardStats> {
  const response = await fetch(`${API_BASE_URL}/dashboard/owner/stats`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to fetch owner dashboard statistics');
  }

  return response.json();
}

export async function getPassengerDashboardStats(token: string): Promise<PassengerDashboardStats> {
  const response = await fetch(`${API_BASE_URL}/dashboard/passenger/stats`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to fetch passenger dashboard statistics');
  }

  return response.json();
}

