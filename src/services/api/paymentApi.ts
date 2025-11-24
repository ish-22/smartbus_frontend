import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export type Payment = {
	id: number;
	booking_id?: number;
	amount: number;
	status: 'pending' | 'completed' | 'failed';
	gateway?: string;
	meta?: any;
	created_at: string;
	booking?: any;
};

export type CreatePaymentRequest = {
	booking_id: number;
	amount: number;
	gateway?: string;
	meta?: any;
};

export type UpdatePaymentStatusRequest = {
	status: 'pending' | 'completed' | 'failed';
	gateway?: string;
	meta?: any;
};

function getAuthHeaders(token: string): HeadersInit {
	return {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': `Bearer ${token}`,
	};
}

export async function createPaymentAPI(data: CreatePaymentRequest, token: string): Promise<Payment> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PAYMENTS.CREATE}`, {
		method: 'POST',
		headers: getAuthHeaders(token),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to create payment' }));
		throw new Error(error.message || 'Failed to create payment');
	}

	return response.json();
}

export async function getPaymentAPI(id: string, token: string): Promise<Payment> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PAYMENTS.DETAIL(id)}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch payment');
	}

	return response.json();
}

export async function updatePaymentStatusAPI(id: string, data: UpdatePaymentStatusRequest, token: string): Promise<Payment> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PAYMENTS.UPDATE_STATUS(id)}`, {
		method: 'PATCH',
		headers: getAuthHeaders(token),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to update payment status' }));
		throw new Error(error.message || 'Failed to update payment status');
	}

	return response.json();
}