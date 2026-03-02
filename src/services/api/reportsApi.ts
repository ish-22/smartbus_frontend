import { API_BASE_URL } from '@/config/api';

const getHeaders = (token: string): HeadersInit => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}`,
});

export interface ReportInfo {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  icon: string;
}

export interface RevenueSummary {
  total_revenue: number;
  total_trips: number;
  cancelled_trips: number;
  completion_rate: number;
}

export interface RevenueReport {
  summary: RevenueSummary;
  daily_revenue: Array<{ date: string; revenue: number; trips: number }>;
  monthly_revenue: Array<{ month: string; revenue: number; trips: number; avg_fare: number }>;
  top_buses: Array<{ id: number; bus_number: string; revenue: number; trips: number; status: string }>;
}

export interface BusPerformance {
  id: number;
  bus_number: string;
  model: string;
  status: string;
  total_bookings: number;
  completed_trips: number;
  cancelled_trips: number;
  completion_rate: number;
  revenue: number;
  avg_fare: number;
}

export interface BookingStats {
  booking_status: {
    total: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  payment_methods: Array<{ payment_method: string; count: number; revenue: number }>;
  payment_status: Array<{ payment_status: string; count: number; revenue: number }>;
}

export interface Incident {
  id: number;
  driver_id: number;
  bus_id: number;
  type: string;
  title: string;
  description: string;
  location: string;
  severity: string;
  status: string;
  admin_response?: string;
  resolved_by?: number;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface IncidentReportData {
  summary: {
    total_incidents: number;
    pending: number;
    resolved: number;
    resolution_rate: number;
  };
  by_type: Array<{ type: string; count: number; resolved: number }>;
  recent_incidents: Incident[];
}

export async function getReportsIndex(token: string): Promise<{ available_reports: ReportInfo[] }> {
  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to fetch reports index');
  }

  return response.json();
}

export async function getRevenueReport(token: string): Promise<RevenueReport> {
  const response = await fetch(`${API_BASE_URL}/reports/revenue`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to fetch revenue report');
  }

  return response.json();
}

export async function getBusPerformanceReport(token: string): Promise<BusPerformance[]> {
  const response = await fetch(`${API_BASE_URL}/reports/bus-performance`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to fetch bus performance report');
  }

  return response.json();
}

export async function getIncidentReport(token: string): Promise<IncidentReportData> {
  const response = await fetch(`${API_BASE_URL}/reports/incidents`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to fetch incident report');
  }

  return response.json();
}

export async function getBookingStatsReport(token: string): Promise<BookingStats> {
  const response = await fetch(`${API_BASE_URL}/reports/booking-stats`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to fetch booking stats report');
  }

  return response.json();
}
