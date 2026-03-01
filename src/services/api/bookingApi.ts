import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export type Booking = {
	id: number;
	user_id: number;
	bus_id: number;
	route_id?: number;
	seat_number: string;
	fare: number;
	status: 'confirmed' | 'cancelled' | 'completed';
	travel_date: string;
	payment_method: 'cash' | 'credit_card' | 'debit_card' | 'digital_wallet';
	payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
	transaction_id?: string;
	discount_amount: number;
	points_used: number;
	payment_date?: string;
	created_at: string;
	updated_at: string;
	user?: any;
	bus?: any;
	route?: any;
	total_amount?: number;
};

export type CreateBookingRequest = {
	bus_id: number;
	route_id?: number;
	seat_number: string;
	fare: number;
	payment_method: 'cash' | 'credit_card' | 'debit_card' | 'digital_wallet';
	points_to_use?: number;
	// Card payment fields
	card_number?: string;
	card_expiry?: string;
	card_cvv?: string;
	card_holder_name?: string;
	// Wallet payment fields
	wallet_type?: string;
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

export async function completeBookingAPI(id: string, token: string): Promise<{
	success: boolean;
	message: string;
	data: Booking;
	points_awarded: number;
	bonus_points: number;
	total_points_earned: number;
	total_points: number;
}> {
	const response = await fetch(`${API_BASE_URL}/bookings/${id}/complete`, {
		method: 'PATCH',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to complete booking');
	}

	return response.json();
}

export type DriverPassenger = {
	id: number;
	name: string;
	seat: string;
	from: string;
	to: string;
	ticketId: string;
	status: string;
};

export type DriverPassengerStats = {
	total: number;
	boarded: number;
	pending: number;
};

export type DriverPassengersResponse = {
	stats: DriverPassengerStats;
	passengers: DriverPassenger[];
};

export async function getDriverPassengersAPI(token: string): Promise<DriverPassengersResponse> {
	const response = await fetch(`${API_BASE_URL}/drivers/me/passengers`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch driver passengers' }));
		throw new Error(error.message || 'Failed to fetch driver passengers');
	}

	return response.json();
}