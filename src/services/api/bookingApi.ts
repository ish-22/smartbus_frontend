import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export type Booking = {
	id: number;
	user_id: number;
	bus_id: number;
	route_id?: number;
	seat_number?: string;
	ticket_category?: string;
	status: 'pending' | 'confirmed' | 'cancelled';
	total_amount: number;
	payment_method: string;
	created_at: string;
	updated_at: string;
	user?: any;
	bus?: any;
	route?: any;
};

export type CreateBookingRequest = {
	bus_id: number;
	route_id?: number;
	seat_number?: string;
	ticket_category?: string;
	total_amount: number;
	payment_method: string;
};

function getAuthHeaders(token: string): HeadersInit {
	return {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': `Bearer ${token}`,
	};
}

export async function getBookingsAPI(token: string): Promise<Booking[]> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BOOKINGS.LIST}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch bookings');
	}

	return response.json();
}

export async function createBookingAPI(data: CreateBookingRequest, token: string): Promise<Booking> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BOOKINGS.CREATE}`, {
		method: 'POST',
		headers: getAuthHeaders(token),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to create booking' }));
		throw new Error(error.message || 'Failed to create booking');
	}

	return response.json();
}

export async function getBookingAPI(id: string, token: string): Promise<Booking> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BOOKINGS.DETAIL(id)}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch booking');
	}

	return response.json();
}

export async function cancelBookingAPI(id: string, token: string): Promise<Booking> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BOOKINGS.CANCEL(id)}`, {
		method: 'PATCH',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to cancel booking');
	}

	return response.json();
}