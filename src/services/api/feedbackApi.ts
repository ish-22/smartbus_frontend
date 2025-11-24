import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export type Feedback = {
	id: number;
	user_id?: number;
	bus_id?: number;
	rating: number;
	comment?: string;
	created_at: string;
	user?: any;
	bus?: any;
};

export type CreateFeedbackRequest = {
	bus_id?: number;
	rating: number;
	comment?: string;
};

function getAuthHeaders(token?: string | null): HeadersInit {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	};
	
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}
	
	return headers;
}

export async function getFeedbackAPI(): Promise<Feedback[]> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FEEDBACK.LIST}`, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch feedback');
	}

	return response.json();
}

export async function createFeedbackAPI(data: CreateFeedbackRequest, token: string): Promise<Feedback> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FEEDBACK.CREATE}`, {
		method: 'POST',
		headers: getAuthHeaders(token),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to submit feedback' }));
		throw new Error(error.message || 'Failed to submit feedback');
	}

	return response.json();
}